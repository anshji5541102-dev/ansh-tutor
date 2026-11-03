'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import StudyHeader from '@/components/study/StudyHeader'
import StudySidebar from '@/components/study/StudySidebar'
import TestCarousel from '@/components/study/TestCarousel'
import {
  Search,
  CheckCircle2,
  Trophy,
  Target,
  Clock,
  ChevronRight,
  X,
  FileText,
} from 'lucide-react'

export default function MyTestPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubTab, setActiveSubTab] = useState<'attempted' | 'upcoming' | 'missed'>('attempted')
  const [searchQuery, setSearchQuery] = useState('')
  const [attemptedList, setAttemptedList] = useState<any[]>([])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("ansh_test_attempts") || "[]")
        setAttemptedList(Array.isArray(stored) ? stored : [])
      } catch {
        setAttemptedList([])
      }
    }
  }, [])

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. TOP HEADER */}
      <StudyHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. BODY: WIDER SIDEBAR + MY TEST CONTENT */}
      <div className="flex flex-1 overflow-hidden relative">
        <StudySidebar
          activeTab="my-test"
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* RIGHT MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 bg-white">
          
          {/* Subheader: "My Tests" (Left) & XP 0 (Right) */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-6">
            <h2 className="text-[17px] font-bold text-[#1B212D] tracking-tight">
              My Tests
            </h2>

            {/* XP 0 Badge */}
            <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 select-none">
              <span className="px-2 py-0.5 rounded-[5px] bg-[#E0E7FF] text-[#4F46E5] text-[11px] font-black">
                XP
              </span>
              <span>0</span>
            </div>
          </div>

          {/* Main White Card Container */}
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 sm:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.04)] min-h-[460px]">
            
            {/* Tabs Row: Attempted (1) | Upcoming (0) | Missed (0) */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 flex-wrap gap-4">
              <div className="flex items-center gap-8">
                <button
                  onClick={() => setActiveSubTab('attempted')}
                  className={`pb-3 text-sm sm:text-[15px] font-bold transition-all relative cursor-pointer ${
                    activeSubTab === 'attempted'
                      ? 'text-[#5A4BDA]'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Attempted ({attemptedList.length})
                  {activeSubTab === 'attempted' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5A4BDA] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveSubTab('upcoming')}
                  className={`pb-3 text-sm sm:text-[15px] font-bold transition-all relative cursor-pointer ${
                    activeSubTab === 'upcoming'
                      ? 'text-[#5A4BDA]'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Upcoming (0)
                  {activeSubTab === 'upcoming' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5A4BDA] rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveSubTab('missed')}
                  className={`pb-3 text-sm sm:text-[15px] font-bold transition-all relative cursor-pointer ${
                    activeSubTab === 'missed'
                      ? 'text-[#5A4BDA]'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Missed (0)
                  {activeSubTab === 'missed' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5A4BDA] rounded-full" />
                  )}
                </button>
              </div>

              {/* Link back to Test Series */}
              <Link
                href="/study_v2/test_series"
                className="text-xs font-semibold text-[#5A4BDA] hover:underline"
              >
                &larr; Browse All Test Series
              </Link>
            </div>

            {/* Content for Attempted Tests */}
            {activeSubTab === 'attempted' && (
              <div className="mt-7">
                {attemptedList.length === 0 ? (
                  <div className="text-center py-14 space-y-4 max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#5A4BDA] flex items-center justify-center mx-auto text-2xl font-bold">
                      📝
                    </div>
                    <h4 className="text-base font-bold text-gray-900">No Tests Attempted Yet</h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">
                      When you attempt a CBT Mock Test or chapter assessment, your scorecards, accuracy analysis, and rankings will appear here.
                    </p>
                    <Link
                      href="/study_v2/test_series"
                      className="inline-block px-5 py-2.5 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold text-xs rounded-xl transition-colors"
                    >
                      Browse Test Series
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {attemptedList.map((testItem, idx) => (
                      <div key={idx} className="p-6 rounded-[16px] border border-gray-200 bg-white hover:border-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded-[4px] bg-purple-50 text-[#5A4BDA] text-xs font-bold uppercase tracking-wide">
                            {testItem.category || "CBT Drill"}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Completed
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 tracking-tight leading-snug">
                          {testItem.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {testItem.attemptedDate || "Recently Attempted"}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5 p-4 rounded-xl bg-gray-50/80 border border-gray-100">
                          <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase">Score</p>
                            <p className="text-base font-extrabold text-gray-900 mt-0.5">
                              {testItem.score} <span className="text-xs text-gray-400 font-normal">/ {testItem.totalScore || 100}</span>
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase">Rank</p>
                            <p className="text-base font-extrabold text-[#5A4BDA] mt-0.5 flex items-center gap-1">
                              <Trophy className="w-4 h-4 text-amber-500" />
                              {testItem.rank || "Top 10%"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase">Accuracy</p>
                            <p className="text-base font-extrabold text-emerald-600 mt-0.5 flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {testItem.accuracy || "90%"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase">Time Taken</p>
                            <p className="text-base font-extrabold text-gray-700 mt-0.5 flex items-center gap-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              {testItem.timeTaken || "45 mins"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSubTab === 'upcoming' && (
              <div className="mt-7 text-center py-12 text-xs text-gray-400">
                No upcoming scheduled tests right now.
              </div>
            )}

            {activeSubTab === 'missed' && (
              <div className="py-20 text-center text-gray-400">
                <p className="text-sm font-semibold">Great job! You have not missed any tests.</p>
              </div>
            )}

          </div>

        </main>
      </div>

    </div>
  )
}
