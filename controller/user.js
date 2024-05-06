import bcrypt from "bcrypt"
import User from "../model/user.js"
import { sendToken } from "../utils/features.js"
import { TryCatch } from "../middleware/error.js"

const signup = TryCatch(async (req, res) => {
  const { name, email, password } = req.body
  console.log(req.body);
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400).json({ error: 'User already exists' })
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(hashedPassword);
  const user = await User.create({ name, email, password: hashedPassword })

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  })
})

const signin = TryCatch(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400).json({ error: 'User not found' })
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    res.status(400).json({ error: 'Invalid credentials' })
  }
  sendToken(user, 200, res, 'User signed in')
})

const getUserProfile = TryCatch(async (req, res) => {
  const username = req.params.username
  console.log(username);
  const users = await User.find({ username })
  res.json(users)
})

export { signup, signin, getUserProfile }