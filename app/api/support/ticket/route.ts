import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      phone,
      email,
      category = 'General Query',
      message,
      priority = 'Standard',
      studentId,
    } = body

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Student name is required' },
        { status: 400 }
      )
    }

    const cleanPhone = (phone || '').replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: 'A valid 10-digit mobile number is required' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Please enter at least 5 characters describing your query' },
        { status: 400 }
      )
    }

    // Generate Ticket Reference Code (AT-XXXXXX)
    const randomCode = Math.floor(100000 + Math.random() * 900000)
    const ticketId = `AT-${randomCode}`
    const createdAt = new Date().toISOString()

    // Structured ticket payload
    const ticketRecord = {
      ticketId,
      studentId: studentId || null,
      name: name.trim(),
      phone: cleanPhone,
      email: (email || '').trim() || null,
      category,
      message: message.trim(),
      priority,
      status: 'In Review',
      branch: 'Rajajipuram Campus, Lucknow',
      createdAt,
      estimatedResponse: 'Within 2 hours',
    }

    // Log ticket for operations / backend
    console.log('[SUPPORT TICKET CREATED]', JSON.stringify(ticketRecord, null, 2))

    // Pre-composed WhatsApp escalation URL for instant support connect
    const waText = encodeURIComponent(
      `Hello Ansh Tutor Academic Support,\nI have submitted Support Ticket #${ticketId}.\nName: ${name.trim()}\nCategory: ${category}\nQuery: ${message.trim()}\nPlease assist me at the earliest.`
    )
    const whatsappLink = `https://wa.me/917525009428?text=${waText}`

    return NextResponse.json(
      {
        success: true,
        message: 'Support ticket submitted successfully',
        ticket: ticketRecord,
        whatsappLink,
        helpline: '7525009428',
        supportEmail: 'support@anshtutor.gleeze.com',
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('[SUPPORT TICKET API ERROR]', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error while creating support ticket' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'Ansh Tutor Support Desk API',
    branch: 'Rajajipuram Campus, Lucknow (Only branch)',
    helpline: '7525009428',
    whatsapp: '7525009428',
    supportEmail: 'support@anshtutor.gleeze.com',
    status: 'Operational',
  })
}
