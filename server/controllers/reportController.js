import Report from '../models/Report.js'

export const getReports = async (req, res) => {
  try {
    const userId = req.user.userId
    const reports = await Report.find({ userId }).sort({ createdAt: -1 })

    res.json({
      success: true,
      reports,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports',
      error: error.message,
    })
  }
}

export const generateReport = async (req, res) => {
  try {
    const { title, type } = req.body

    if (!title || !type) {
      return res.status(400).json({
        success: false,
        message: 'Title and type are required',
      })
    }

    const reportContent = `Report generated for ${type} on ${new Date().toLocaleDateString()}`

    const report = new Report({
      title,
      type,
      content: reportContent,
      summary: `${type} Report Summary`,
      userId: req.user.userId,
    })

    await report.save()

    res.status(201).json({
      success: true,
      message: 'Report generated successfully',
      report,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate report',
      error: error.message,
    })
  }
}
