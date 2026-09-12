// Demo AI responses for the Aegis AI assistant
const demoResponses = {
  'critical threats': 'Currently, you have 2 critical threats detected on your network. Both are related to unauthorized access attempts. I recommend immediate investigation and possible device isolation.',
  'devices connected': 'You have 6 devices currently connected to your network: 1 Laptop, 1 Mobile, 1 Desktop, 1 Server, 1 Router, and 1 IoT Device.',
  'security score': 'Your current security score is 94/100, which is excellent! You are doing a great job maintaining your security posture.',
  'recent alerts': 'Your 5 most recent alerts are: Firewall breach attempt, Unusual login detected, Software update required, Network anomaly, and SSL certificate warning.',
  'default': 'I\'m Aegis AI, your security assistant. I can help you with security insights, threat analysis, device monitoring, and recommendations. What would you like to know?',
}

const findMatchingResponse = (userMessage) => {
  const message = userMessage.toLowerCase()
  
  for (const [key, response] of Object.entries(demoResponses)) {
    if (key !== 'default' && message.includes(key)) {
      return response
    }
  }
  
  return demoResponses.default
}

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      })
    }

    // Demo/mock AI response
    const aiResponse = findMatchingResponse(message)

    res.json({
      success: true,
      userMessage: message,
      aiResponse,
      isDemoMode: true,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to process AI request',
      error: error.message,
    })
  }
}
