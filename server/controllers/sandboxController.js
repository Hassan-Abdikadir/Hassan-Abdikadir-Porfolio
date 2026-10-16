const ApiLog = require('../models/ApiLog')
const CodeSubmission = require('../models/CodeSubmission')

// POST /api/v1/sandbox/execute-api
exports.executeApi = async (req, res) => {
  const startTime = Date.now()
  const { endpoint, method = 'GET', payload } = req.body

  if (!endpoint || typeof endpoint !== 'string') {
    return res.status(400).json({ success: false, message: 'Valid API endpoint is required.' })
  }

  const cleanEndpoint = String(endpoint).trim().slice(0, 200)
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE']
  const cleanMethod = allowedMethods.includes(String(method).toUpperCase()) ? String(method).toUpperCase() : 'GET'

  try {
    let mockResponseData = {
      status: '200 OK',
      timestamp: new Date().toISOString(),
      server: 'Hassan-MERN-Core/v2.5',
      environment: 'production',
      payloadReceived: payload || null,
      message: `API Route [${cleanMethod} ${cleanEndpoint}] executed successfully against MongoDB cluster.`
    }

    if (cleanEndpoint === '/api/v1/projects') {
      mockResponseData.count = 4
      mockResponseData.data = ['FullStack Academy', 'Data Analytics Engine', 'Microservices API', 'AI Interviewer']
    } else if (cleanEndpoint === '/api/v1/skills') {
      mockResponseData.mastery = '94.8%'
      mockResponseData.featuredTech = ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Pandas']
    }

    const latencyMs = Math.floor(Math.random() * 25) + 12

    // Save execution log to MongoDB
    const log = await ApiLog.create({
      endpoint: cleanEndpoint,
      method: cleanMethod,
      requestBody: payload || {},
      responseStatus: 200,
      responseData: mockResponseData,
      latencyMs,
      ip: req.ip || '127.0.0.1'
    })

    res.json({
      success: true,
      logId: log._id,
      latencyMs,
      response: mockResponseData
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST /api/v1/sandbox/run-code
exports.runCode = async (req, res) => {
  const startTime = Date.now()
  const { language = 'javascript', code = '' } = req.body

  const allowedLangs = ['javascript', 'python', 'sql']
  const cleanLang = allowedLangs.includes(String(language).toLowerCase()) ? String(language).toLowerCase() : 'javascript'
  const cleanCode = String(code || '').slice(0, 5000)

  try {
    let output = ''
    let status = 'SUCCESS'

    if (language === 'javascript') {
      output = `> Running V8 Engine Node.js v20.x...\n> Output: Code executed cleanly.\n> Result: [ 100, 200, 300, 400 ]\n> State: Memory 14.2MB, Garbage Collection: 0ms`
    } else if (language === 'python') {
      output = `> Executing CPython 3.11 Kernel...\n> DataFrame Summary:\n   rows: 1000 | cols: 5 | mean_accuracy: 98.4%\n> Pandas pipeline execution completed.`
    } else if (language === 'sql') {
      output = `> Executing MongoDB Aggregation Pipeline...\n> Match: { category: "FullStack" }\n> Group: { count: 12, avgUptime: "99.9%" }\n> Query execution time: 4ms`
    }

    const executionTimeMs = Math.floor(Math.random() * 40) + 15

    const submission = await CodeSubmission.create({
      language,
      code,
      output,
      executionTimeMs,
      status
    })

    res.json({
      success: true,
      submissionId: submission._id,
      executionTimeMs,
      output
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/v1/sandbox/logs
exports.getSandboxLogs = async (req, res) => {
  try {
    const apiLogs = await ApiLog.find().sort({ createdAt: -1 }).limit(10)
    const codeLogs = await CodeSubmission.find().sort({ createdAt: -1 }).limit(10)
    res.json({
      success: true,
      apiLogs,
      codeLogs
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
