import User from '../models/User.js'
import { hashPassword, comparePassword } from '../utils/password.js'
import { generateToken } from '../utils/jwt.js'
import { validateEmail, validatePassword, validateUsername } from '../utils/validators.js'

export const register = async (req, res) => {
  try {
    const { name, username, email, password, confirmPassword } = req.body

    if (!name || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      })
    }

    if (!validateUsername(username)) {
      return res.status(400).json({
        success: false,
        message: 'Username must be 3-20 characters (alphanumeric and underscore only)',
      })
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      })
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email or username already exists',
      })
    }

    const hashedPassword = await hashPassword(password)

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    const token = generateToken(newUser._id)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body

    if (!emailOrUsername || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email/Username and password are required',
      })
    }

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/username or password',
      })
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/username or password',
      })
    }

    user.lastLogin = new Date()
    await user.save()

    const token = generateToken(user._id)

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    })
  }
}

export const logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful',
  })
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    // In production, send email with reset link
    res.json({
      success: true,
      message: 'Password reset link sent to your email',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Password reset failed',
      error: error.message,
    })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password and confirmation are required',
      })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      })
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      })
    }

    // In production, verify token and reset password
    res.json({
      success: true,
      message: 'Password reset successful',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Password reset failed',
      error: error.message,
    })
  }
}
