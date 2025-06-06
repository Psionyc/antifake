import { NextRequest, NextResponse } from 'next/server'
import { findCredibleSources } from '@/lib/googleSearch'

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()
    const sources = await findCredibleSources(String(query || ''))
    return NextResponse.json({ sources })
  } catch (err) {
    console.error('search error', err)
    return NextResponse.json({ sources: [] })
  }
}

