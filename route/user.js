import { Router } from 'express'
import { getUserProfile, signin, signup } from '../controller/user.js'
import { isAuthorized } from '../middleware/auth.js'
const userRouter = Router()

userRouter
  .post('/signup', signup)
  .post('/signin', signin)
  .use(isAuthorized)
  .get('/profile/:username', getUserProfile)

export default userRouter