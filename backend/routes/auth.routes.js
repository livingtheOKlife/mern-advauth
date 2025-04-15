import express from 'express'

import {
  register,
  verifyEmail,
  logout,
  login,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controllers.js'

const router = express.Router()

router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/logout', logout)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

export default router
