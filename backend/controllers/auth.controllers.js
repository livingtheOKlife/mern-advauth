import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'

import generateToken from '../utils/generateToken.util.js'
import sendVerificationEmail from '../utils/sendVerificationEmail.util.js'
import sendWelcomeEmail from '../utils/sendWelcomeEmail.util.js'

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
