import Threat from '../models/Threat.js'

export const getThreats = async (req, res) => {
  try {
    const userId = req.user.userId
    const { severity } = req.query

    let filter = { userId }
    if (severity && severity !== 'All') {
      filter.severity = severity
    }

    const threats = await Threat.find(filter).sort({ detectedAt: -1 })

    res.json({
      success: true,
      threats,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch threats',
      error: error.message,
    })
  }
}

export const getThreatById = async (req, res) => {
  try {
    const { id } = req.params

    const threat = await Threat.findById(id)

    if (!threat) {
      return res.status(404).json({
        success: false,
        message: 'Threat not found',
      })
    }

    if (threat.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    res.json({
      success: true,
      threat,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch threat',
      error: error.message,
    })
  }
}

export const updateThreat = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const threat = await Threat.findById(id)

    if (!threat) {
      return res.status(404).json({
        success: false,
        message: 'Threat not found',
      })
    }

    if (threat.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    if (status) threat.status = status

    await threat.save()

    res.json({
      success: true,
      message: 'Threat updated successfully',
      threat,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update threat',
      error: error.message,
    })
  }
}
