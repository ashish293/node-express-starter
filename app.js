import { config } from 'dotenv'
import express from 'express'
import { dbConnect } from './utils/features.js'
import userRouter from './route/user.js'
import { errorMiddleware } from './middleware/error.js'

config()
const port = process.env.PORT || 3000
const app = express()
app.use(express.json())


dbConnect()
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
app.use('/api/user', userRouter)
app.use(errorMiddleware)