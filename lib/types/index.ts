export interface Student {
  id: string
  name: string
  email: string
  phone?: string
  avatar_url?: string
  created_at: string
}

export interface Session {
  id: string
  student_id: string
  tutor_id: string
  subject: string
  scheduled_at: string
  duration_minutes: number
  status: 'upcoming' | 'completed' | 'cancelled'
  meeting_url?: string
  notes?: string
}

export interface Tutor {
  id: string
  name: string
  bio?: string
  subjects: string[]
  avatar_url?: string
  rating?: number
  hourly_rate?: number
}

export interface Booking {
  id: string
  student_id: string
  tutor_id: string
  session_date: string
  session_time: string
  subject: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}
