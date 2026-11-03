import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Admin client to bypass RLS for user syncing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
  try {
    const { firebaseUid, phoneNumber, name, role = 'student' } = await request.json()

    if (!firebaseUid || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing firebaseUid or phoneNumber' },
        { status: 400 }
      )
    }

    // 1. Check if profile already exists with this phone or firebaseUid
    const { data: existingProfile, error: fetchError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .or(`firebase_uid.eq.${firebaseUid},phone.eq.${phoneNumber}`)
      .maybeSingle()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Fetch profile error:', fetchError)
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    let profile = existingProfile

    // 2. If profile doesn't exist, create it
    if (!profile) {
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

      if (insertError) {
        console.error('Insert profile error:', insertError)
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }

      profile = newProfile
    } else if (!profile.firebase_uid) {
      // Update firebase_uid if phone matched
      const { data: updatedProfile } = await supabaseAdmin
        .from('profiles')
        .update({ firebase_uid: firebaseUid, ...(name ? { name } : {}) })
        .eq('id', profile.id)
        .select()
        .single()

      if (updatedProfile) profile = updatedProfile
    } else if (name && profile.name !== name) {
      // Update name if provided
      const { data: updatedProfile } = await supabaseAdmin
        .from('profiles')
        .update({ name })
        .eq('id', profile.id)
        .select()
        .single()

      if (updatedProfile) profile = updatedProfile
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
