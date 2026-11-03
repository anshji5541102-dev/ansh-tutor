'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { X, ChevronDown, Pencil, ShieldAlert, Loader2 } from 'lucide-react'
import AuthIllustration from './AuthIllustration'
import { sendOtp, verifyOtpAndSync } from '@/lib/firebase/otp'
import { useAuth } from '@/context/AuthContext'

interface LoginModalProps {
  isOpen?: boolean
  onClose?: () => void
  redirectAfterLogin?: string
}

export default function LoginModal({
  isOpen: propIsOpen,
  onClose: propOnClose,
  redirectAfterLogin = '/study_v2/batches',
}: LoginModalProps) {
  const router = useRouter()
  const { isLoginModalOpen, closeLoginModal, setProfile } = useAuth()

  // Support both direct props and context control
  const isOpen = propIsOpen !== undefined ? propIsOpen : isLoginModalOpen
  const handleClose = propOnClose || closeLoginModal

  const [step, setStep] = useState<'phone' | 'otp' | 'name'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [studentNameInput, setStudentNameInput] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timer, setTimer] = useState(30)
  const [resendAvailable, setResendAvailable] = useState(false)

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([])

  // Reset state whenever modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setStep('phone')
      setPhoneNumber('')
      setStudentNameInput('')
      setOtp(['', '', '', '', '', ''])
      setSessionId(null)
      setError(null)
      setLoading(false)
      setTimer(30)
      setResendAvailable(false)
    }
  }, [isOpen])

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setResendAvailable(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [step, timer])

  // Handle phone submission & send OTP via server route (bypasses Firebase billing requirement)
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (phoneNumber.length !== 10) return

    setLoading(true)
    setError(null)
    setOtp(['', '', '', '', '', '']) // Clear OTP boxes whenever OTP is sent or resent

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP')
      }

      setSessionId(data.sessionId || null)

      setStep('otp')
      setTimer(30)
      setResendAvailable(false)

      setTimeout(() => {
        otpInputsRef.current[0]?.focus()
      }, 100)
    } catch (err: any) {
      console.error('Send OTP error:', err)
      setError(err?.message || 'Failed to send OTP. Please check your number.')
    } finally {
      setLoading(false)
    }
  }

  // Handle OTP digit entry
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)

    // Clear error
    if (error) setError(null)

    // Auto-focus next box
    if (digit && index < 5) {
      otpInputsRef.current[index + 1]?.focus()
    }

    // Auto-submit when all 6 digits are entered
    if (digit && index === 5 && newOtp.every((d) => d !== '')) {
      handleVerifyOtp(newOtp.join(''))
    }
  }

  // Handle backspace navigation in OTP boxes
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus()
    }
  }

  // Handle paste in OTP boxes
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pastedData) return

    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    if (pastedData.length === 6) {
      otpInputsRef.current[5]?.focus()
      handleVerifyOtp(pastedData)
    } else {
      otpInputsRef.current[pastedData.length]?.focus()
    }
  }

  // Handle OTP Verification & Supabase Sync via server route
  const handleVerifyOtp = async (otpCode?: string) => {
    const code = otpCode || otp.join('')
    if (code.length !== 6) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          otp: code,
          sessionId,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Invalid OTP code')
      }

      const userProfile = data.profile
      setProfile(userProfile)

      // Direct Admin Access for Official Phone: +91 75250 09428
      const cleanDigits = phoneNumber.replace(/\D/g, '')
      if (cleanDigits.endsWith('7525009428') || userProfile?.role === 'admin') {
        handleClose()
        router.push('/admin')
        router.refresh()
        return
      }

      // Check if new user or has no name yet (Screenshot 1: Enter your name)
      const hasName =
        userProfile?.name &&
        userProfile.name.trim() !== '' &&
        userProfile.name !== 'Student' &&
        userProfile.name !== 'New Student'

      if (!hasName) {
        setStep('name')
        setLoading(false)
        return
      }

      handleClose()
      router.push('/study_v2/cohort-selection')
      router.refresh()
    } catch (err: any) {
      console.error('Verify OTP error:', err)
      setError(err?.message || 'Verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Save Name for New User (Screenshot 1 -> Screenshot 2)
  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentNameInput.trim()) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          firebaseUid: sessionId || `user-${phoneNumber}`,
          name: studentNameInput.trim(),
        }),
      })

      const data = await res.json()
      if (data.profile) {
        setProfile(data.profile)
      } else {
        setProfile({
          id: 'local-' + Date.now(),
          firebase_uid: 'uid-' + phoneNumber,
          phone: phoneNumber,
          name: studentNameInput.trim(),
          email: null,
          role: 'student',
        })
      }

      handleClose()
      const cleanDigits = phoneNumber.replace(/\D/g, '')
      if (cleanDigits.endsWith('7525009428')) {
        router.push('/admin')
      } else {
        // Directly opens Screenshot 2: Select your class
        router.push('/study_v2/cohort-selection')
      }
    } catch (err: any) {
      console.error('Save name error:', err)
      const cleanDigits = phoneNumber.replace(/\D/g, '')
      setProfile({
        id: 'local-' + Date.now(),
        firebase_uid: 'uid-' + phoneNumber,
        phone: phoneNumber,
        name: studentNameInput.trim(),
        email: null,
        role: cleanDigits.endsWith('7525009428') ? 'admin' : 'student',
      })
      handleClose()
      if (cleanDigits.endsWith('7525009428')) {
        router.push('/admin')
      } else {
        router.push('/study_v2/cohort-selection')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const isPhoneValid = phoneNumber.length === 10
  const isOtpComplete = otp.every((d) => d !== '')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-backdrop-fade">
      {/* Invisible reCAPTCHA container required by Firebase Phone Auth */}
      <div id="recaptcha-container" />

      {/* Main Dialog Card - Exact PW Specifications: width 560px, max-w 100%, height 696px, rounded 24px */}
      <div className="relative w-[560px] max-w-full h-[696px] max-h-[96vh] bg-white rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col justify-between animate-dialog-enter">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer z-20"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Top & Form Section with exact 32px padding between shape and content */}
        <div className="pt-10 px-8 sm:px-12 flex flex-col flex-1">
          {/* Top Scalloped Phone Badge Illustration */}
          <div className="flex justify-center shrink-0">
            <AuthIllustration step={step} />
          </div>

          {/* EXACT 32px PADDING BETWEEN SHAPE AND CONTENT */}
          <div className="h-8 shrink-0" style={{ height: '32px' }} />

          {/* ======================================================== */}
          {/* STEP 3: ENTER YOUR NAME (Matching Screenshot 1)          */}
          {/* ======================================================== */}
          {step === 'name' ? (
            <form onSubmit={handleSaveName} className="space-y-5 flex-1 flex flex-col justify-start">
              <h3 className="text-xl sm:text-[22px] font-bold text-gray-900 tracking-tight leading-snug">
                Enter your name
              </h3>

              <div>
                <input
                  type="text"
                  autoFocus
                  value={studentNameInput}
                  onChange={(e) => setStudentNameInput(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full h-12 px-4 text-sm sm:text-base font-medium text-gray-900 border border-gray-300 focus:border-[#5A4BDA] rounded-xl outline-none focus:ring-2 focus:ring-[#5A4BDA]/20 transition-all bg-white shadow-2xs"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium leading-relaxed">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!studentNameInput.trim() || loading}
                  className={`w-full h-12 px-6 rounded-xl font-semibold text-sm text-white transition-all flex items-center justify-center gap-2 ${
                    studentNameInput.trim() && !loading
                      ? 'bg-[#1B212D] hover:bg-black shadow-md cursor-pointer active:scale-[0.99]'
                      : 'bg-[#8F95A3] cursor-not-allowed opacity-90'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Name...</span>
                    </>
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </div>
            </form>
          ) : step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-5 flex-1 flex flex-col">
              {/* Title with yellow pill - Exactly 1 neat line */}
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-[20px] font-bold text-gray-900 tracking-tight leading-snug whitespace-nowrap">
                  Please enter your Mobile Number
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-black tracking-widest select-none shrink-0">
                  •••
                </span>
              </div>

              {/* Phone Input with Country Code - Sleek & Compact with PW border */}
              <div>
                <div className="flex items-center h-12 border border-[#5a4bda] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#5a4bda]/20 transition-all bg-white shadow-2xs">
                  {/* Compact IN +91 that never breaks or wraps */}
                  <div className="flex items-center gap-1.5 px-3.5 h-full bg-transparent text-gray-700 text-sm font-semibold select-none whitespace-nowrap shrink-0">
                    <span>IN +91</span>
                    <span className="text-[9px] text-gray-500">▼</span>
                  </div>
                  {/* Thin vertical separator */}
                  <div className="h-5 w-px bg-gray-200 shrink-0" />
                  <input
                    type="tel"
                    maxLength={10}
                    autoFocus
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="E.g 9877654335"
                    className="w-full h-full px-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none bg-transparent"
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2 font-normal">
                  Enter a 10-digit mobile number
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium leading-relaxed">
                  {error}
                </div>
              )}

              {/* Get OTP Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!isPhoneValid || loading}
                  className={`w-full h-12 px-6 rounded-xl font-semibold text-sm text-white transition-all flex items-center justify-center gap-2 ${
                    isPhoneValid && !loading
                      ? 'bg-[#5a4bda] hover:bg-[#4a3bc7] shadow-md shadow-[#5a4bda]/20 cursor-pointer active:scale-[0.99]'
                      : 'bg-[#8F95A3] cursor-not-allowed opacity-90'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <span>Get OTP</span>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* ======================================================== */
            /* STEP 2: OTP INPUT                                        */
            /* ======================================================== */
            <div className="space-y-4 flex-1 flex flex-col">
              {/* Title with green pill */}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-[20px] font-bold text-gray-900 tracking-tight leading-snug">
                    Enter OTP
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-black tracking-widest select-none shrink-0">
                    ***
                  </span>
                </div>

                {/* Sent to phone number with edit pencil */}
                <div className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 font-medium">
                  <span>6 digit code sent to <strong className="text-gray-900">+91 {phoneNumber}</strong></span>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('phone')
                      setOtp(['', '', '', '', '', ''])
                      setError(null)
                    }}
                    className="p-1 text-[#5a4bda] hover:text-[#4a3bc7] rounded hover:bg-indigo-50 transition-colors cursor-pointer"
                    title="Change phone number"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[11px] text-gray-400 mt-0.5">
                  Your code is verified automatically once all 6 digits are entered.
                </p>
              </div>

              {/* 6 Square OTP Boxes */}
              <div className="flex justify-between gap-2 sm:gap-2.5 pt-1">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpInputsRef.current[index] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold text-gray-900 rounded-xl border border-gray-300 focus:border-[#5a4bda] focus:ring-2 focus:ring-[#5a4bda]/20 outline-none transition-all shadow-2xs bg-white"
                  />
                ))}
              </div>

              {/* Countdown Timer or Resend Link */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <span className="font-semibold text-gray-600">
                  {timer > 0 ? (
                    `00:${timer.toString().padStart(2, '0')}`
                  ) : (
                    <span className="text-gray-400">Code expired</span>
                  )}
                </span>

                {resendAvailable ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOtp(['', '', '', '', '', ''])
                      setError(null)
                      handleSendOtp()
                      setTimeout(() => {
                        otpInputsRef.current[0]?.focus()
                      }, 100)
                    }}
                    className="text-[#5a4bda] hover:text-[#4a3bc7] font-semibold hover:underline cursor-pointer"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span className="text-gray-400 font-medium">Resend OTP in 00:{timer.toString().padStart(2, '0')}</span>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium leading-relaxed">
                  {error}
                </div>
              )}

              {/* Verify & Proceed Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleVerifyOtp()}
                  disabled={!isOtpComplete || loading}
                  className={`w-full h-12 px-6 rounded-xl font-semibold text-sm text-white transition-all flex items-center justify-center gap-2 ${
                    isOtpComplete && !loading
                      ? 'bg-[#5a4bda] hover:bg-[#4a3bc7] shadow-md shadow-[#5a4bda]/20 cursor-pointer active:scale-[0.99]'
                      : 'bg-[#8F95A3] cursor-not-allowed opacity-90'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying &amp; Syncing...</span>
                    </>
                  ) : (
                    <span>Verify &amp; Proceed</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer Section: Distinct Blue Strip + White Legal Strip exactly matching PW */}
        <div className="mt-auto shrink-0">
          {/* Blue Security Strip */}
          <div className="bg-[#EDF5FF] border-t border-blue-100/60 py-3.5 px-6 flex items-center justify-center gap-2 text-xs text-blue-950 font-medium text-center">
            <ShieldAlert className="w-4 h-4 text-[#0085FF] shrink-0" />
            <span>Never share your login details on unauthorised apps or websites</span>
          </div>

          {/* White Bottom Terms Strip with rounded bottom corners */}
          <div className="bg-white py-3.5 px-6 text-center rounded-b-[24px]">
            <p className="text-[11px] text-gray-500">
              By continuing you agree to our{' '}
              <Link href="/terms" className="text-gray-900 font-semibold underline hover:text-[#5a4bda]">
                Terms of use
              </Link>{' '}
              &amp;{' '}
              <Link href="/privacy" className="text-gray-900 font-semibold underline hover:text-[#5a4bda]">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
