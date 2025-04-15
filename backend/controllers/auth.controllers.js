import bcrypt from 'bcryptjs'
import crypto from 'crypto'

import User from '../models/user.model.js'

import generateToken from '../utils/generateToken.util.js'
import sendVerificationEmail from '../utils/sendVerificationEmail.util.js'
import sendWelcomeEmail from '../utils/sendWelcomeEmail.util.js'
import sendResetPasswordEmail from '../utils/sendResetPasswordEmail.js'
import sendResetSuccessfulEmail from '../utils/sendResetSuccessfulEmail.js'

const SERVER_URL = process.env.SERVER_URL

export const register = async (req, res) => {
  const { email, password, name } = req.body
  try {
    if (!email || !password || !name) {
      throw new Error('All fields are required')
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString()
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    })
    await user.save()
    generateToken(res, user._id)
    sendVerificationEmail(user.email, verificationToken)
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const verifyEmail = async (req, res) => {
  const { code } = req.body
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code',
      })
    }
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined
    await user.save()
    sendWelcomeEmail(user.email, user.name)
    res.status(200).json({
      success: false,
      message: 'Email verified successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const logout = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'User logged out' })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' })
    }
    generateToken(res, user._id)
    user.lastLogin = new Date()
    await user.save()
    res.status(201).json({
      success: true,
      message: 'User logged in successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'Invalid not found' })
    }
    const resetToken = crypto.randomBytes(20).toString('hex')
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000
    user.resetPasswordToken = resetToken
    user.resetPasswordExpiresAt = resetTokenExpiresAt
    await user.save()
    sendResetPasswordEmail(
      user.email,
      `${SERVER_URL}/reset-password/${resetToken}`
    )
    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email',
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    })
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'Invalid or expired reset token' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpiresAt = undefined
    await user.save()
    await sendResetSuccessfulEmail(user.email)
    res
      .status(200)
      .json({ success: true, message: 'Password reset successful' })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}
