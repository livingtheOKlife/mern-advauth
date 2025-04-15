import express from 'express'

import {
  register,
  verifyEmail,
  logout,
  login,
} from '../controllers/auth.controllers.js'

const router = express.Router()

router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/logout', logout)
router.post('/login', login)

export default router
