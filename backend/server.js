import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'

import connectDB from './config/database.config.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.get('/', () => console.log('Server is ready!'))

app.listen(PORT, () => {
  connectDB()
  console.log(`Server started on port ${PORT}`)
})
