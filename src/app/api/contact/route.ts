import { NextResponse } from 'next/server'

interface ContactPayload {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}

export async function POST(req: Request) {
  try {
    const body: ContactPayload = await req.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // TODO: integrate with email service (Resend, SendGrid, etc.)
    // For now, log and return success
    console.log('[Contact form]', { ...body, timestamp: new Date().toISOString() })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
