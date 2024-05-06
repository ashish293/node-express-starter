import { config } from "dotenv"
import { TryCatch } from "./error.js"
import { ErrorHandler } from "../utils/utility.js"

config()
const isAuthorized = TryCatch((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new ErrorHandler(401, "Unauthorized"));
  const bearer = token.split(" ")[1];
  const decoded = jwt.verify(bearer, process.env.JWT_SECRET);
  if (!decoded) return next(new ErrorHandler(401, "Unauthorized"));
  req.userId = decoded.id;
  next();
})

export { isAuthorized }