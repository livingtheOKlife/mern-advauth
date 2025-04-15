import express from 'express'

import {
  register,
  verifyEmail,
  logout,
  login,
  forgotPassword,
} from '../controllers/auth.controllers.js'

const router = express.Router()

router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/logout', logout)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)

export default router
