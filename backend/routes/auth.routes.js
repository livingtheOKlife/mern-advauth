import express from 'express'

import {
  logout,
  register,
  verifyEmail,
} from '../controllers/auth.controllers.js'

const router = express.Router()

router.post('/register', register)
router.post('/logout', logout)
router.post('/verify-email', verifyEmail)

export default router
