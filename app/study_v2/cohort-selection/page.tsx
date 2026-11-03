'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import {
  GraduationCap,
  BookOpen,
} from 'lucide-react'

export default function CohortSelectionPage() {
  const router = useRouter()
  const { selectedClass, setSelectedClass } = useAuth()

  // Exactly Classes 1 to 8 in clean rectangular tiles matching Screenshot 2 style
  const classesList = [
    {
      name: 'Class 1',
      bg: 'bg-[#EBF3FE]',
      border: 'border-[#D2E3FC]',
      hover: 'hover:border-[#2563EB]',
      iconBg: 'bg-[#D2E3FC]',
      iconColor: 'text-[#1D4ED8]',
    },
    {
      name: 'Class 2',
      bg: 'bg-[#EAF8ED]',
      border: 'border-[#C6F0D0]',
      hover: 'hover:border-[#16A34A]',
      iconBg: 'bg-[#C6F0D0]',
      iconColor: 'text-[#15803D]',
    },
    {
      name: 'Class 3',
      bg: 'bg-[#FEF8E3]',
      border: 'border-[#FDEAA8]',
      hover: 'hover:border-[#D97706]',
      iconBg: 'bg-[#FDEAA8]',
      iconColor: 'text-[#B45309]',
    },
    {
      name: 'Class 4',
      bg: 'bg-[#FDF0EB]',
      border: 'border-[#FCD3C1]',
      hover: 'hover:border-[#EA580C]',
      iconBg: 'bg-[#FCD3C1]',
      iconColor: 'text-[#C2410C]',
    },
    {
      name: 'Class 5',
      bg: 'bg-[#F3E8FF]',
      border: 'border-[#E9D5FF]',
      hover: 'hover:border-[#7C3AED]',
      iconBg: 'bg-[#E9D5FF]',
      iconColor: 'text-[#6D28D9]',
    },
    {
      name: 'Class 6',
      bg: 'bg-[#E0E7FF]',
      border: 'border-[#C7D2FE]',
      hover: 'hover:border-[#4F46E5]',
      iconBg: 'bg-[#C7D2FE]',
      iconColor: 'text-[#4338CA]',
    },
    {
      name: 'Class 7',
      bg: 'bg-[#CFFAFE]',
      border: 'border-[#A5F3FC]',
      hover: 'hover:border-[#0891B2]',
      iconBg: 'bg-[#A5F3FC]',
      iconColor: 'text-[#0E7490]',
    },
    {
      name: 'Class 8',
      bg: 'bg-[#EDE9FE]',
      border: 'border-[#DDD6FE]',
      hover: 'hover:border-[#5A4BDA]',
      iconBg: 'bg-[#DDD6FE]',
      iconColor: 'text-[#5A4BDA]',
    },
  ]

  const handleSelectClass = (className: string) => {
    setSelectedClass(className)
    router.push('/study_v2/batches')
  }

  return (
    <div className="min-h-screen bg-[#FBFBFC] flex flex-col font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      
      {/* 1. TOP HEADER (Matching Screenshot 2 Header) */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 sm:px-12 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        
        {/* Left: Ansh Tutor Brand Monogram */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center p-1 shadow-xs">
            <Image
              src="/owl-logo.png"
              alt="Ansh Tutor Logo"
              width={26}
              height={26}
              className="object-contain"
            />
          </div>
          <span className="font-extrabold text-gray-900 text-[18px] tracking-tight">
            Ansh Tutor
          </span>
        </Link>

        {/* Center: Title "Select your Class" */}
        <h1 className="text-[17px] sm:text-[19px] font-bold text-gray-900 tracking-tight text-center">
          Select your Class
        </h1>

        {/* Right empty spacer for symmetry */}
        <div className="w-24 hidden sm:block" />

      </header>

      {/* 2. MAIN BODY (Only rectangular class tiles) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-10 sm:py-14">
        
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-[19px] sm:text-[21px] font-bold text-gray-900 tracking-tight">
            Select your Class
          </h2>
        </div>

        {/* RECTANGULAR TILES GRID: 4 columns x 2 rows matching Screenshot 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {classesList.map((cls) => {
            const isSelected = selectedClass === cls.name
            return (
              <button
                key={cls.name}
                type="button"
                onClick={() => handleSelectClass(cls.name)}
                className={`w-full h-[68px] px-5 rounded-2xl border ${cls.bg} ${cls.border} ${cls.hover} transition-colors flex items-center gap-3.5 cursor-pointer text-left ${
                  isSelected ? 'ring-2 ring-[#5A4BDA]' : ''
                }`}
              >
                {/* Left Mini Icon Badge */}
                <div
                  className={`w-10 h-10 rounded-xl ${cls.iconBg} ${cls.iconColor} flex items-center justify-center shrink-0 font-extrabold text-sm`}
                >
                  <GraduationCap className="w-5 h-5 stroke-[2.2]" />
                </div>

                {/* Class Name (That's it, no extra terms) */}
                <span className="font-bold text-[16px] sm:text-[17px] text-gray-900 tracking-tight">
                  {cls.name}
                </span>
              </button>
            )
          })}
        </div>

      </main>

    </div>
  )
}
