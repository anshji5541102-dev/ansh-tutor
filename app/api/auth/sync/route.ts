import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Admin client to bypass RLS for user syncing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bwieermnbwiwbyavpmeb.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aWVlcm1uYndpd2J5YXZwbWViIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzM0NTE4OCwiZXhwIjoyMTA4OTIxMTg4fQ.qjj_1xG3bDEYYk4aAsFE7pmEB0QeP7q-YFvvQVW26jo'
const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
})

export async function POST(request: Request) {
  try {
    const { firebaseUid, phoneNumber, name, role = 'student' } = await request.json()

    if (!firebaseUid || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing firebaseUid or phoneNumber' },
        { status: 400 }
      )
    }

    const cleanDigits = phoneNumber.replace(/\D/g, '').slice(-10)
    let profile = {
      id: `usr_${cleanDigits}`,
      firebase_uid: firebaseUid,
      phone: phoneNumber,
      name: name || (cleanDigits === '7525009428' ? 'Super Admin' : 'Student'),
      role: cleanDigits === '7525009428' ? 'admin' : role,
    }

    try {
      if (supabaseUrl && !supabaseUrl.includes('placeholder')) {
        // 1. Check if profile already exists with this phone or firebaseUid
        const { data: existingProfile } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .or(`firebase_uid.eq.${firebaseUid},phone.eq.${phoneNumber}`)
          .maybeSingle()

        if (!existingProfile) {
          const { data: newProfile, error: insertError } = await supabaseAdmin
            .from('profiles')
            .insert({
              firebase_uid: firebaseUid,
              phone: phoneNumber,
              name: name || null,
              role: role,
            })
            .select()
            .single()

          if (!insertError && newProfile) {
            profile = newProfile
          }
        } else {
          profile = existingProfile
          const updates: Record<string, any> = {}
          if (!profile.firebase_uid) updates.firebase_uid = firebaseUid
          if (name && profile.name !== name) updates.name = name

          if (Object.keys(updates).length > 0) {
            const { data: updatedProfile } = await supabaseAdmin
              .from('profiles')
              .update(updates)
              .eq('id', profile.id)
              .select()
              .single()

            if (updatedProfile) profile = updatedProfile
          }
        }
      }
    } catch (syncErr) {
      console.warn('Sync profile Supabase notice:', syncErr)
    }

    const response = NextResponse.json({
      success: true,
      profile,
    })

    // Store user ID in an HTTP-only cookie for server middleware
    response.cookies.set('user_profile_id', profile.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    return response
  } catch (err: any) {
    console.error('Auth sync exception:', err)
    return NextResponse.json(
      { error: err?.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
