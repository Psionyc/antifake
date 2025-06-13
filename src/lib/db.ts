import mongoose from 'mongoose'

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/antifake'

let cached = (global as any).mongoose
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: 'antifake' }).then(m => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}

const newsSchema = new mongoose.Schema({
  source: String,
  score: Number,
  text: String,
}, { timestamps: true })

export const News = mongoose.models.News || mongoose.model('News', newsSchema)
