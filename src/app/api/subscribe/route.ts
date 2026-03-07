import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Simple email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()
    const timestamp = new Date().toISOString()

    // Check if already subscribed
    const exists = await redis.sismember('newsletter:emails', normalizedEmail)
    if (exists) {
      return NextResponse.json(
        { error: 'Cette adresse est déjà inscrite' },
        { status: 409 }
      )
    }

    // Add to set and store metadata
    await Promise.all([
      redis.sadd('newsletter:emails', normalizedEmail),
      redis.hset(`newsletter:meta:${normalizedEmail}`, {
        subscribedAt: timestamp,
        source: 'website',
      }),
      redis.incr('newsletter:count'),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// GET endpoint to check subscriber count (for admin)
export async function GET() {
  try {
    const count = await redis.scard('newsletter:emails')
    return NextResponse.json({ count })
  } catch (error) {
    console.error('Count error:', error)
    return NextResponse.json({ count: 0 })
  }
}
