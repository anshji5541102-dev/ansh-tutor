import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bwieermnbwiwbyavpmeb.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aWVlcm1uYndpd2J5YXZwbWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzNDUxODgsImV4cCI6MjEwODkyMTE4OH0.ayZivvafcwJUs-DNtusvQ3ZGrX4tNScCWj8npMMw2P0'

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server component — cookies can be set in middleware
          }
        },
      },
    }
  )
}
