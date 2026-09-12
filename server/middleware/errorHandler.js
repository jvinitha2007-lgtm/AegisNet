export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  
  res.status(status).json({
    success: false,
    status,
    message,
  })
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
