import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
})

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const result = contactSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Stub — configurer avec /contact-setup (Resend + honeypot + rate limiting)
  return NextResponse.json({ ok: true })
}
