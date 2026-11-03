'use client'

import React from 'react'
import LoginModal from '@/components/auth/LoginModal'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F3F6FD] via-[#F6F8FE] to-white flex flex-col justify-between relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header with Brand Logo */}
      <header className="p-6 sm:px-12 flex items-center justify-between z-10">
        <a href="/" className="inline-block transition-transform hover:scale-[1.02]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-transparent.png"
            alt="Ansh Tutor"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </a>

        <a
          href="/"
          className="text-sm font-semibold text-gray-600 hover:text-[#5a4bda] transition-colors"
        >
          &larr; Back to Home
        </a>
      </header>

      {/* Centered Login Modal View */}
      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <LoginModal
          isOpen={true}
          onClose={() => router.push('/')}
          redirectAfterLogin="/study_v2/batches"
        />
      </div>

      {/* Subtle footer */}
      <footer className="p-6 text-center text-xs text-gray-500 z-10">
        &copy; 2026 Ansh Tutor Education Technologies Pvt. Ltd. All rights reserved.
      </footer>
    </main>
  )
}
