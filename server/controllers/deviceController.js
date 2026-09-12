import Device from '../models/Device.js'
import { validateIpAddress } from '../utils/validators.js'

export const getDevices = async (req, res) => {
  try {
    const userId = req.user.userId
    const devices = await Device.find({ userId }).sort({ createdAt: -1 })

    res.json({
      success: true,
      devices,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch devices',
      error: error.message,
    })
  }
}

export const createDevice = async (req, res) => {
  try {
    const { name, type, ipAddress, operatingSystem } = req.body

    if (!name || !type || !ipAddress || !operatingSystem) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    if (!validateIpAddress(ipAddress)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid IP address format',
      })
    }

    const device = new Device({
      name,
      type,
      ipAddress,
      operatingSystem,
      userId: req.user.userId,
    })

    await device.save()

    res.status(201).json({
      success: true,
      message: 'Device created successfully',
      device,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create device',
      error: error.message,
    })
  }
}

export const updateDevice = async (req, res) => {
  try {
    const { id } = req.params
    const { name, type, ipAddress, operatingSystem, status } = req.body

    const device = await Device.findById(id)

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found',
      })
    }

    if (device.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    if (name) device.name = name
    if (type) device.type = type
    if (ipAddress) device.ipAddress = ipAddress
    if (operatingSystem) device.operatingSystem = operatingSystem
    if (status) device.status = status
    device.lastActive = new Date()

    await device.save()

    res.json({
      success: true,
      message: 'Device updated successfully',
      device,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update device',
      error: error.message,
    })
  }
}

export const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params

    const device = await Device.findById(id)

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found',
      })
    }

    if (device.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    await Device.findByIdAndDelete(id)

    res.json({
      success: true,
      message: 'Device deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete device',
      error: error.message,
    })
  }
}
