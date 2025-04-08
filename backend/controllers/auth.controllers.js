import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'

import generateToken from '../utils/generateToken.util.js'

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
