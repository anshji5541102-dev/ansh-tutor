import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { localOtpStore } from '../send-otp/route'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { phoneNumber, otp, sessionId } = await request.json()

    if (!phoneNumber || !otp) {
      return NextResponse.json({ error: 'Phone number and OTP are required' }, { status: 400 })
    }

    const digits = phoneNumber.replace(/\D/g, '').slice(-10)
    const formattedPhone = `+91${digits}`
    const twoFactorApiKey = process.env.TWOFACTOR_API_KEY

    let isVerified = false

    // 1. Verify via 2Factor if sessionId exists and not equal to digits
    if (twoFactorApiKey && sessionId && sessionId !== digits) {
      try {
        const verifyUrl = `https://2factor.in/API/V1/${twoFactorApiKey}/SMS/VERIFY/${sessionId}/${otp}`
        const res = await fetch(verifyUrl, { method: 'GET' })
        const data = await res.json()
        if (data.Status === 'Success' && data.Details === 'OTP Matched') {
          isVerified = true
        }
      } catch (e) {
        console.error('2Factor verify error:', e)
      }
    }

    // 2. Check local store (used for Fast2SMS and developer fallback)
    if (!isVerified) {
      const entry = localOtpStore.get(digits)
      if (entry && entry.otp === otp && Date.now() <= entry.expiresAt) {
        isVerified = true
        localOtpStore.delete(digits) // consumed
      } else if (otp === '123456') {
        // Universal developer test code
        isVerified = true
      }
    }

    if (!isVerified) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP. Please enter the correct 6-digit code.' },
        { status: 400 }
      )
    }

    // 3. User is verified! Sync or create profile in Supabase
    const { data: existingProfile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('phone', formattedPhone)
      .maybeSingle()

    let profile = existingProfile
    const isAdminNumber = digits === '7525009428'

    if (!profile) {
      const { data: newProfile, error: insertError } = await supabaseAdmin
        .from('profiles')
        .insert({
          phone: formattedPhone,
          name: isAdminNumber ? 'Super Admin' : 'Student',
          role: isAdminNumber ? 'admin' : 'student',
        })
        .select()
        .single()

      if (insertError) {
        console.error('Insert profile error:', insertError)
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }
      profile = newProfile
    } else if (isAdminNumber && profile.role !== 'admin') {
      await supabaseAdmin.from('profiles').update({ role: 'admin', name: 'Super Admin' }).eq('id', profile.id)
      profile.role = 'admin'
      profile.name = 'Super Admin'
    }

    const response = NextResponse.json({
      success: true,
      profile,
    })

    // Set HTTP-only session cookie
    response.cookies.set('user_profile_id', profile.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    return response
  } catch (error: any) {
    console.error('verify-otp exception:', error)
    return NextResponse.json({ error: error?.message || 'Verification failed' }, { status: 500 })
  }
}
