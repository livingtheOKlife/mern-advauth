import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/database.config.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.get('/', () => console.log('Server is ready!'))

app.listen(PORT, () => {
  connectDB()
  console.log(`Server started on port ${PORT}`)
})
