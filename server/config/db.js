const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/MyPortfolio'
    const conn = await mongoose.connect(MONGO_URI)
    console.log(`✅ MongoDB Connected to: ${conn.connection.host}/${conn.connection.name}`)
    return conn
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message)
    // Non-fatal fallback for static/dev mode
  }
}

module.exports = connectDB
