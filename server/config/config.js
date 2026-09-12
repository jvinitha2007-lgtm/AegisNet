import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/aegisnet',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10'),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  aiProvider: process.env.AI_PROVIDER || 'demo',
  aiApiKey: process.env.AI_API_KEY || '',
}

export default config
