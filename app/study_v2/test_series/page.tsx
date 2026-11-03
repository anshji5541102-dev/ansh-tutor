'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import StudyHeader from '@/components/study/StudyHeader'
import StudySidebar from '@/components/study/StudySidebar'
import TestCarousel from '@/components/study/TestCarousel'
import {
  Search,
  ChevronDown,
  SlidersHorizontal,
} from 'lucide-react'

export default function TestSeriesPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedMode, setSelectedMode] = useState('All')
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)
  const [modeDropdownOpen, setModeDropdownOpen] = useState(false)

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. TOP HEADER */}
      <StudyHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. BODY: WIDER SIDEBAR + TEST SERIES CONTENT */}
      <div className="flex flex-1 overflow-hidden relative">
        <StudySidebar
          activeTab="test-series"
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* RIGHT MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 bg-white">
          
          {/* Subheader: "Test Series" (Left) & XP 0 (Right) */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-6">
            <h2 className="text-[17px] font-bold text-[#1B212D] tracking-tight">
              Test Series
            </h2>

            {/* XP 0 Badge */}
            <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 select-none">
              <span className="px-2 py-0.5 rounded-[5px] bg-[#E0E7FF] text-[#4F46E5] text-[11px] font-black">
                XP
              </span>
              <span>0</span>
            </div>
          </div>

          {/* Main White Card matching Screenshot */}
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 sm:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.04)] min-h-[420px]">
            
            {/* Row 1: Search Box & My Tests Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              
              {/* Search input with icon on the right */}
              <div className="relative flex-1 max-w-[620px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Here (Min. 3 characters required)"
                  className="w-full h-11 pl-4 pr-11 bg-white border border-[#D1D5DB] rounded-[8px] text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#5A4BDA] transition-colors"
                />
                <Search className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* My Tests Button (Links to /study_v2/my_test) */}
              <Link
                href="/study_v2/my_test"
                className="h-11 px-6 rounded-[8px] border border-[#5A4BDA] hover:bg-[#5A4BDA]/5 text-[#5A4BDA] text-sm font-semibold flex items-center justify-center transition-colors shrink-0"
              >
                My Tests
              </Link>
            </div>

            {/* Row 2: "Recommended" and Filter Pills */}
            <div className="mt-8 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#1B212D] tracking-tight">
                Recommended (5)
              </h3>

              {/* Filter Pills */}
              <div className="flex items-center gap-2.5 flex-wrap">
                
                {/* Type Filter */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setTypeDropdownOpen(!typeDropdownOpen)
                      setModeDropdownOpen(false)
                    }}
                    className="border border-[#D1D5DB] hover:border-gray-400 bg-white rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Type: {selectedType}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>

                  {typeDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20 text-xs">
                      {['All', 'Full Syllabus', 'Chapter Test', 'Mock Test'].map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setSelectedType(t)
                            setTypeDropdownOpen(false)
                          }}
                          className="w-full text-left px-3.5 py-1.5 hover:bg-gray-50 font-medium text-gray-700 hover:text-[#5A4BDA] transition-colors"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mode Filter */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setModeDropdownOpen(!modeDropdownOpen)
                      setTypeDropdownOpen(false)
                    }}
                    className="border border-[#D1D5DB] hover:border-gray-400 bg-white rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Mode: {selectedMode}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>

                  {modeDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20 text-xs">
                      {['All', 'Online CBT', 'Offline Centre'].map((m) => (
                        <button
                          key={m}
                          onClick={() => {
                            setSelectedMode(m)
                            setModeDropdownOpen(false)
                          }}
                          className="w-full text-left px-3.5 py-1.5 hover:bg-gray-50 font-medium text-gray-700"
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filters Pill */}
                <button
                  onClick={() => {
                    setSelectedType('All')
                    setSelectedMode('All')
                  }}
                  className="border border-[#D1D5DB] hover:border-gray-400 bg-white rounded-[8px] px-3.5 py-1.5 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-gray-600" />
                  <span>Reset</span>
                </button>

              </div>

            </div>

            {/* Test Cards Carousel (Matching screenshot media_1793621854968_1e708a4f.png and media_1793622276774_c4536252.png) */}
            <div className="mt-6">
              <TestCarousel
                tests={[
                  { id: 'permutations-and-combinations', title: 'Permutations and Combinations', questionsCount: 25, totalMarks: 100 },
                  { id: 'relations-and-functions', title: 'Relations and Functions', questionsCount: 25, totalMarks: 100 },
                  { id: 'vectors', title: 'Vectors', questionsCount: 25, totalMarks: 100 },
                  { id: 'quadratic-equations', title: 'Quadratic Equations', questionsCount: 25, totalMarks: 100 },
                  { id: 'determinants', title: 'Determinants', questionsCount: 25, totalMarks: 100 },
                ]}
              />
            </div>

            {/* Full Syllabus Tests Section */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <h4 className="text-base font-bold text-gray-900 mb-4">
                Full Syllabus Mock Tests
              </h4>
              <TestCarousel
                tests={[
                  { id: 'all-india-mock-1', title: 'All India Foundation Mock Test #1', questionsCount: 25, totalMarks: 100 },
                  { id: 'all-india-mock-2', title: 'All India Foundation Mock Test #2', questionsCount: 25, totalMarks: 100 },
                  { id: 'term-1-exam-drill', title: 'Term 1 Mega Revision Test', questionsCount: 25, totalMarks: 100 },
                ]}
              />
            </div>

          </div>

        </main>
      </div>
    </div>
  )
}
