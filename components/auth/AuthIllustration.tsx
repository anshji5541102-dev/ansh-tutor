'use client'

import React from 'react'

interface AuthIllustrationProps {
  step: 'phone' | 'otp' | 'name'
}

export default function AuthIllustration({ step }: AuthIllustrationProps) {
  const isOtp = step === 'otp'
  const badgeFill = isOtp ? '#DCFCE7' : '#FFF7C3'

  return (
    <div className="relative w-32 h-32 sm:w-34 sm:h-34 mx-auto flex items-center justify-center">
      <svg
        viewBox="0 0 140 140"
        className="w-full h-full drop-shadow-xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* PW Exact 10-Petal Symmetrical Scalloped Flower Badge */}
        <path
          d="M 55.63 25.78 A 17.5 17.5 0 0 1 84.37 25.78 A 17.5 17.5 0 0 1 107.62 42.67 A 17.5 17.5 0 0 1 116.50 70.00 A 17.5 17.5 0 0 1 107.62 97.33 A 17.5 17.5 0 0 1 84.37 114.22 A 17.5 17.5 0 0 1 55.63 114.22 A 17.5 17.5 0 0 1 32.38 97.33 A 17.5 17.5 0 0 1 23.50 70.00 A 17.5 17.5 0 0 1 32.38 42.67 A 17.5 17.5 0 0 1 55.63 25.78 Z"
          fill={badgeFill}
          stroke="#1E293B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Smartphone Body */}
        <rect
          x="48"
          y="36"
          width="44"
          height="68"
          rx="7"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="2.2"
        />

        {/* Phone Top Speaker Line */}
        <line
          x1="63"
          y1="42"
          x2="77"
          y2="42"
          stroke="#1E293B"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Brand Monogram in Center: Owl Book Logo (No Text) */}
        <circle
          cx="70"
          cy="64"
          r="14"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="1.8"
        />
        <image
          href="/owl-logo.png"
          x="57.5"
          y="51.5"
          width="25"
          height="25"
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Phone Bottom Bars / Buttons */}
        {!isOtp ? (
          <>
            {/* Step 1: Yellow & Orange Input Bars */}
            <rect
              x="57"
              y="83"
              width="26"
              height="4"
              rx="2"
              fill="#FBBF24"
            />
            <rect
              x="57"
              y="89"
              width="26"
              height="4"
              rx="2"
              fill="#F97316"
            />
          </>
        ) : (
          <>
            {/* Step 2: Orange Message Speech Bubble with Dots popping out top */}
            <g className="animate-bounce" style={{ animationDuration: '2s' }}>
              <path
                d="M66 23
                   H94
                   C97 23 99 25 99 28
                   V40
                   C99 43 97 45 94 45
                   H75
                   L69 51
                   V45
                   H66
                   C63 45 61 43 61 40
                   V28
                   C61 25 63 23 66 23 Z"
                fill="#F97316"
                stroke="#1E293B"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Three dots in speech bubble */}
              <circle cx="73" cy="34" r="1.8" fill="#FFFFFF" />
              <circle cx="80" cy="34" r="1.8" fill="#FFFFFF" />
              <circle cx="87" cy="34" r="1.8" fill="#FFFFFF" />
            </g>

            {/* Small home bar at bottom */}
            <line
              x1="64"
              y1="92"
              x2="76"
              y2="92"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </div>
  )
}
