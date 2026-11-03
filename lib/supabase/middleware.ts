import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Let client-side Auth handle session and allow profile view
  return NextResponse.next()
}
