import Threat from '../models/Threat.js'
import Alert from '../models/Alert.js'
import Device from '../models/Device.js'

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.userId

    const threats = await Threat.find({ userId })
    const alerts = await Alert.find({ userId })
    const devices = await Device.find({ userId })

    // Threat trends (mock data)
    const threatTrends = [
      { date: 'Mon', low: 4, medium: 8, high: 12, critical: 2 },
      { date: 'Tue', low: 3, medium: 7, high: 10, critical: 3 },
      { date: 'Wed', low: 5, medium: 9, high: 14, critical: 4 },
      { date: 'Thu', low: 4, medium: 8, high: 11, critical: 2 },
      { date: 'Fri', low: 6, medium: 10, high: 15, critical: 5 },
      { date: 'Sat', low: 3, medium: 6, high: 8, critical: 1 },
      { date: 'Sun', low: 2, medium: 5, high: 7, critical: 2 },
    ]

    // Network usage (mock data)
    const networkUsage = [
      { hour: '00:00', upload: 45, download: 120 },
      { hour: '04:00', upload: 35, download: 90 },
      { hour: '08:00', upload: 120, download: 280 },
      { hour: '12:00', upload: 200, download: 420 },
      { hour: '16:00', upload: 180, download: 380 },
      { hour: '20:00', upload: 150, download: 310 },
      { hour: '23:59', upload: 70, download: 160 },
    ]

    // Device activity (mock data)
    const deviceActivity = [
      { name: 'Laptop', active: 23 },
      { name: 'Mobile', active: 18 },
      { name: 'Desktop', active: 21 },
      { name: 'Server', active: 24 },
      { name: 'Router', active: 22 },
    ]

    // Alert frequency (mock data)
    const alertFrequency = [
      { day: 'Monday', count: 12 },
      { day: 'Tuesday', count: 15 },
      { day: 'Wednesday', count: 18 },
      { day: 'Thursday', count: 14 },
      { day: 'Friday', count: 16 },
      { day: 'Saturday', count: 8 },
      { day: 'Sunday', count: 10 },
    ]

    // Security score history
    const securityScoreHistory = [
      { date: 'Day 1', score: 88 },
      { date: 'Day 2', score: 89 },
      { date: 'Day 3', score: 87 },
      { date: 'Day 4', score: 91 },
      { date: 'Day 5', score: 92 },
      { date: 'Day 6', score: 93 },
      { date: 'Day 7', score: 94 },
    ]

    // Threat severity distribution
    const threatSeverity = [
      { name: 'Low', value: threats.filter(t => t.severity === 'Low').length },
      { name: 'Medium', value: threats.filter(t => t.severity === 'Medium').length },
      { name: 'High', value: threats.filter(t => t.severity === 'High').length },
      { name: 'Critical', value: threats.filter(t => t.severity === 'Critical').length },
    ]

    res.json({
      success: true,
      data: {
        threatTrends,
        networkUsage,
        deviceActivity,
        alertFrequency,
        securityScoreHistory,
        threatSeverity,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message,
    })
  }
}
