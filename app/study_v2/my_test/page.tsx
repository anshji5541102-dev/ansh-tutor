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
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false)

  const attemptedTest = {
    title: 'All India Foundation Mock Test #1 (Science & Maths)',
    category: 'Class 8th Foundation',
    mode: 'Online CBT',
    attemptedDate: '28th Oct 2026, 11:30 AM',
    score: '88',
    totalScore: '100',
    percentage: '88%',
    rank: 'AIR 14',
    totalStudents: '2,450',
    accuracy: '94%',
    timeTaken: '52 mins',
    status: 'Completed',
  }

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
                  Attempted (1)
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
                  Upcoming (3)
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
              <div className="mt-7 space-y-4">
                
                {/* Attempted Test Card */}
                <div className="p-6 rounded-[16px] border border-gray-200 bg-white hover:border-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all">
                  
                  {/* Top Badge & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-[4px] bg-purple-50 text-[#5A4BDA] text-xs font-bold uppercase tracking-wide">
                        {attemptedTest.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-[4px] bg-gray-100 text-gray-700 text-xs font-semibold">
                        {attemptedTest.mode}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {attemptedTest.status}
                    </span>
                  </div>

                  {/* Title & Date */}
                  <h4 className="text-lg font-bold text-gray-900 tracking-tight leading-snug">
                    {attemptedTest.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {attemptedTest.attemptedDate}
                  </p>

                  {/* Performance Metrics Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5 p-4 rounded-xl bg-gray-50/80 border border-gray-100">
                    <div>
                      <p className="text-[11px] text-gray-400 font-semibold uppercase">Score</p>
                      <p className="text-base font-extrabold text-gray-900 mt-0.5">
                        {attemptedTest.score} <span className="text-xs text-gray-400 font-normal">/ {attemptedTest.totalScore}</span>
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-gray-400 font-semibold uppercase">Rank</p>
                      <p className="text-base font-extrabold text-[#5A4BDA] mt-0.5 flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        {attemptedTest.rank}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-gray-400 font-semibold uppercase">Accuracy</p>
                      <p className="text-base font-extrabold text-emerald-600 mt-0.5 flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {attemptedTest.accuracy}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-gray-400 font-semibold uppercase">Time Taken</p>
                      <p className="text-base font-extrabold text-gray-700 mt-0.5 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {attemptedTest.timeTaken}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setAnalysisModalOpen(true)}
                      className="px-5 py-2.5 bg-[#1B212D] hover:bg-black text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      View Detailed Analysis
                    </button>
                    <button
                      onClick={() => setAnalysisModalOpen(true)}
                      className="px-5 py-2.5 border border-[#5A4BDA] hover:bg-[#5A4BDA]/5 text-[#5A4BDA] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      View Solutions &amp; Answers
                    </button>
                  </div>

                </div>

              </div>
            )}

            {activeSubTab === 'upcoming' && (
              <div className="mt-7">
                <h3 className="text-base font-bold text-gray-900 mb-4">Upcoming Scheduled Tests</h3>
                <TestCarousel
                  tests={[
                    { id: 'vectors', title: 'Vectors', questionsCount: 25, totalMarks: 100 },
                    { id: 'quadratic-equations', title: 'Quadratic Equations', questionsCount: 25, totalMarks: 100 },
                    { id: 'determinants', title: 'Determinants', questionsCount: 25, totalMarks: 100 },
                  ]}
                />
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

      {/* Analysis Preview Modal */}
      {analysisModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-[520px] max-w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-7 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setAnalysisModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#5A4BDA] flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Score Analysis &amp; Solutions
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                You scored 88/100 in Foundation Mock Test #1. Physics: 30/30, Chemistry: 28/30, Mathematics: 30/40. Detailed question-by-question step explanations are ready.
              </p>
              <button
                onClick={() => setAnalysisModalOpen(false)}
                className="w-full py-2.5 rounded-lg bg-[#1B212D] text-white text-xs font-semibold hover:bg-black transition-colors"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
