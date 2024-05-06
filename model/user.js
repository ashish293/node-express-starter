import { Schema, model } from "mongoose";

const user = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
})

const User = model('User', user)
export default User