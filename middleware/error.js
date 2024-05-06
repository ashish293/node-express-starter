const errorMiddleware = (err, req, res, next) => {
  err.statusCode ||= 500
  err.message ||= 'Internal Server error'

  const response = {
    success: false,
    message: err.message
  }
  console.log(err)
  res.status(err.statusCode).json(response)
}

const TryCatch = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next)
  } catch (error) {
    next(error)
  }
}

export { errorMiddleware, TryCatch }