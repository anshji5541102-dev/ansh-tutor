export interface OtpEntry {
  otp: string
  expiresAt: number
}

// Global in-memory OTP store
const globalForOtp = globalThis as unknown as {
  localOtpStore: Map<string, OtpEntry> | undefined
}

export const localOtpStore =
  globalForOtp.localOtpStore ?? new Map<string, OtpEntry>()

if (process.env.NODE_ENV !== 'production') {
  globalForOtp.localOtpStore = localOtpStore
}
