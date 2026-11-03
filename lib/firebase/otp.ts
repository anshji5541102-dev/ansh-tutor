'use client'

import { auth } from './config'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  User,
} from 'firebase/auth'

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier
    confirmationResult?: ConfirmationResult
  }
}

export async function setupRecaptcha(containerId: string = 'recaptcha-container') {
  if (typeof window === 'undefined') return null

  // Clean up any existing verifier instance before creating a new one
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear()
    } catch {
      // Ignore cleanup error
    }
    window.recaptchaVerifier = undefined
  }

  const container = document.getElementById(containerId)
  if (!container) {
    throw new Error(`reCAPTCHA container #${containerId} not found in DOM`)
  }

  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved automatically
    },
    'expired-callback': () => {
      // reCAPTCHA expired, will re-verify on next submit
    },
  })

  await window.recaptchaVerifier.render()
  return window.recaptchaVerifier
}

export async function sendOtp(
  rawPhoneNumber: string,
  containerId: string = 'recaptcha-container'
): Promise<ConfirmationResult> {
  // Format to E.164: +91XXXXXXXXXX
  const digits = rawPhoneNumber.replace(/\D/g, '')
  const formattedNumber = digits.length === 10 ? `+91${digits}` : rawPhoneNumber.startsWith('+') ? rawPhoneNumber : `+${digits}`

  const verifier = await setupRecaptcha(containerId)
  if (!verifier) throw new Error('Failed to initialize verification system')

  try {
    const result = await signInWithPhoneNumber(auth, formattedNumber, verifier)
    window.confirmationResult = result
    return result
  } catch (error: any) {
    // If verifier failed, clear it so next attempt starts fresh
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear()
      } catch {
        // ignore
      }
      window.recaptchaVerifier = undefined
    }
    throw error
  }
}

export async function verifyOtpAndSync(
  otp: string,
  extraData?: { name?: string; role?: 'student' | 'tutor' | 'admin' }
) {
  if (!window.confirmationResult) {
    throw new Error('No active OTP session found. Please request a new OTP.')
  }

  const credential = await window.confirmationResult.confirm(otp)
  const firebaseUser: User = credential.user

  // Sync user profile to Supabase database & establish session cookie
  const res = await fetch('/api/auth/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firebaseUid: firebaseUser.uid,
      phoneNumber: firebaseUser.phoneNumber,
      name: extraData?.name,
      role: extraData?.role || 'student',
    }),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || 'Failed to sync user session with database.')
  }

  return {
    firebaseUser,
    profile: data.profile,
  }
}
