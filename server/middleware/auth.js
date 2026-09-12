import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    })
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token',
      })
    }
    req.user = user
    next()
  })
}
