import Device from '../models/Device.js'
import Threat from '../models/Threat.js'
import Alert from '../models/Alert.js'

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.userId

    const devicesCount = await Device.countDocuments({ userId })
    const threatsCount = await Threat.countDocuments({ userId, status: { $ne: 'Resolved' } })
    const alertsCount = await Alert.countDocuments({ userId, status: 'Unread' })

    const securityScore = 94

    const recentThreats = await Threat.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)

    const networkActivity = {
      upload: Math.floor(Math.random() * 100) + 50,
      download: Math.floor(Math.random() * 200) + 100,
      latency: Math.floor(Math.random() * 50) + 10,
    }

    res.json({
      success: true,
      data: {
        stats: {
          connectedDevices: devicesCount,
          threatsDetected: threatsCount,
          activeAlerts: alertsCount,
          securityScore,
        },
        securityStatus: {
          firewall: 'Active',
          antivirus: 'Active',
          networkMonitoring: 'Active',
          intrusionDetection: 'Active',
        },
        networkActivity,
        recentThreats,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error.message,
    })
  }
}
