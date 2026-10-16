/**
 * Helper to construct standard API responses across the server controllers
 */
const sendResponse = (res, statusCode, success, message, data = null, extra = {}) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    timestamp: new Date().toISOString(),
    ...extra
  })
}

module.exports = { sendResponse }
