import { config } from "dotenv";
import { connect } from "mongoose";
import jwt from "jsonwebtoken";
config();

const dbConnect = async () => {
  try {
    await connect(process.env.MONGO_URI, { dbName: "chat-app" });
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed");
    console.log(error);
  }
};

const sendToken = (user, statusCode, res, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return res.status(statusCode).json({
    success: true,
    userId: user._id,
    name: user.name,
    email: user.email,
    message,
    token,
  });
};
export { dbConnect, sendToken };
