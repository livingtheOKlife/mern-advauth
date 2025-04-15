import express from 'express'

import {
  register,
  verifyEmail,
  logout,
  login,
  forgotPassword,
  resetPassword,
  checkAuth,
} from '../controllers/auth.controllers.js'

import verifyToken from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/logout', logout)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.get('/check-auth', verifyToken, checkAuth)

export default router
