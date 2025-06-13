import { NextRequest, NextResponse } from 'next/server'
import { connectDB, News } from '@/lib/db'

export async function POST(req: NextRequest) {
  await connectDB()
  const { source, score, text } = await req.json()
  try {
    const doc = await News.create({ source, score, text })
    return NextResponse.json({ id: doc.id })
  } catch (err: any) {
    console.error('save error', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET() {
  await connectDB()
  const records = await News.aggregate([
    { $group: { _id: '$source', avgScore: { $avg: '$score' }, count: { $sum: 1 } } },
    { $project: { _id: 0, source: '$_id', avgScore: 1, count: 1 } },
    { $sort: { avgScore: -1 } },
  ])
  return NextResponse.json(records)
}
