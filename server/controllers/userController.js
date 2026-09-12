import User from '../models/User.js'
import { hashPassword } from '../utils/password.js'

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        securityScore: user.securityScore,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message,
    })
  }
}

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    if (name) user.name = name
    if (email) user.email = email
    if (password) user.password = await hashPassword(password)

    await user.save()

    res.json({
      success: true,
      message: 'Profile updated successfully',
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
      message: 'Failed to update profile',
      error: error.message,
    })
  }
}
