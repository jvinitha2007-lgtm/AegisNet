import Alert from '../models/Alert.js'

export const getAlerts = async (req, res) => {
  try {
    const userId = req.user.userId
    const { status } = req.query

    let filter = { userId }
    if (status) {
      filter.status = status
    }

    const alerts = await Alert.find(filter).sort({ createdAt: -1 })

    res.json({
      success: true,
      alerts,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch alerts',
      error: error.message,
    })
  }
}

export const updateAlert = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const alert = await Alert.findById(id)

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found',
      })
    }

    if (alert.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    if (status) alert.status = status

    await alert.save()

    res.json({
      success: true,
      message: 'Alert updated successfully',
      alert,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update alert',
      error: error.message,
    })
  }
}
