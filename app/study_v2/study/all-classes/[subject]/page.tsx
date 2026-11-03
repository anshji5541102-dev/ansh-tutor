'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import StudyHeader from '@/components/study/StudyHeader'
import StudySidebar from '@/components/study/StudySidebar'
import {
  ArrowLeft,
  Play,
  FileText,
  Download,
  CheckCircle,
  Check,
  Eye,
  X,
  BookOpen,
  HelpCircle,
  Share2,
  Sparkles,
  Star,
  Clock,
} from 'lucide-react'

// Subject data map
const subjectMeta: Record<string, { title: string; short: string; code: string }> = {
  mathematics: { title: 'Mathematics', short: 'Maths', code: 'Ma' },
  science: { title: 'Science', short: 'Science', code: 'Sc' },
  english: { title: 'English', short: 'English', code: 'En' },
  sst: { title: 'SST', short: 'SST', code: 'Ss' },
  hindi: { title: 'Hindi', short: 'Hindi', code: 'Hi' },
  'most-important': { title: 'Most Important Topics', short: 'Important', code: 'Mo' },
}

function SubjectDetailContent() {
  const router = useRouter()
  const params = useParams()
  const rawSubject = (params?.subject as string) || 'mathematics'
  const subjectKey = rawSubject.toLowerCase()
  const currentSubject = subjectMeta[subjectKey] || {
    title: rawSubject.charAt(0).toUpperCase() + rawSubject.slice(1),
    short: rawSubject.charAt(0).toUpperCase() + rawSubject.slice(1),
    code: rawSubject.slice(0, 2).toUpperCase(),
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState('ch-1')
  const [activeSubTab, setActiveSubTab] = useState<'Lectures' | 'DPPs' | 'Notes'>('Lectures')
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [notesModalOpen, setNotesModalOpen] = useState(false)
  const [attemptedTests, setAttemptedTests] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ansh_attempted_tests')
        if (saved) {
          setAttemptedTests(JSON.parse(saved))
        }
      } catch {}
    }
  }, [])

  // Lecture completion tracking (persisted in localStorage)
  const [completedLectures, setCompletedLectures] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ansh_completed_lectures')
        return saved ? JSON.parse(saved) : {}
      } catch {
        return {}
      }
    }
    return {}
  })

  const lectureKey = `${subjectKey}-${selectedChapter}`
  const isLectureCompleted = !!completedLectures[lectureKey]

  const toggleLectureCompletion = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCompletedLectures((prev) => {
      const updated = { ...prev, [lectureKey]: !prev[lectureKey] }
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('ansh_completed_lectures', JSON.stringify(updated))
        } catch {}
      }
      return updated
    })
  }

  // Chapters list for left sidebar
  const chapters = [
    { id: 'ch-1', code: 'CH - 01', title: 'Half Yearly Marathon' },
    { id: 'ch-2', code: 'CH - 02', title: currentSubject.short === 'Maths' ? 'Rational Numbers' : 'Fundamental Principles' },
    { id: 'ch-3', code: 'CH - 03', title: currentSubject.short === 'Maths' ? 'Linear Equations in One Variable' : 'Core Chapter Concepts' },
    { id: 'ch-4', code: 'CH - 04', title: currentSubject.short === 'Maths' ? 'Understanding Quadrilaterals' : 'Advanced Applications' },
    { id: 'ch-5', code: 'CH - 05', title: currentSubject.short === 'Maths' ? 'Data Handling & Graphs' : 'Exam Revision Drill' },
  ]

  const activeChapterData = chapters.find((c) => c.id === selectedChapter) || chapters[0]

  // Sub-tabs list: All removed as requested. Strictly Lectures, DPPs, Notes.
  const subTabs: Array<'Lectures' | 'DPPs' | 'Notes'> = [
    'Lectures',
    'DPPs',
    'Notes',
  ]

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. TOP HEADER (Ansh Tutor Brand Bar) */}
      <StudyHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. BODY: STILL SIDEBAR ON LEFT + SCROLLABLE CONTENT ON RIGHT */}
      <div className="flex flex-1 overflow-hidden relative">
        <StudySidebar
          activeTab="batches"
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* ======================================================== */}
        {/* RIGHT MAIN CONTENT AREA                                  */}
        {/* ======================================================== */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 bg-white">
          
          {/* Subheader Row: Back button + "All Classes" (Left) & XP 0 (Right) */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-7">
            
            {/* Left: Back Arrow + All Classes */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/study_v2/study/all-classes')}
                className="p-1.5 -ml-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Back to All Classes"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
              <h2 className="text-[19px] font-bold text-[#1B212D] tracking-tight">
                All Classes
              </h2>
            </div>

            {/* Right: XP 0 Diamond Badge matching screenshot */}
            <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 select-none shrink-0">
              <div className="w-6 h-6 rounded bg-[#E0E7FF] text-[#4F46E5] flex items-center justify-center text-[10px] font-black transform rotate-45 shadow-2xs">
                <span className="-rotate-45">XP</span>
              </div>
              <span className="font-bold text-[15px] text-gray-800">0</span>
            </div>

          </div>

          {/* ======================================================== */}
          {/* TWO COLUMN BODY: ALL CHAPTERS (LEFT) + CONTENT (RIGHT)   */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ---------------------------------------------------- */}
            {/* LEFT COLUMN: ALL CHAPTERS PILLS (3.5 cols)           */}
            {/* ---------------------------------------------------- */}
            <div className="lg:col-span-4 xl:col-span-3.5 space-y-3">
              <h3 className="text-xs font-bold text-gray-800 tracking-wider uppercase select-none mb-4">
                ALL CHAPTERS
              </h3>

              <div className="space-y-2">
                {chapters.map((ch) => {
                  const isActive = selectedChapter === ch.id
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setSelectedChapter(ch.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer flex items-center text-sm ${
                        isActive
                          ? 'bg-[#EFF6FF] border-l-[3.5px] border-[#2563EB] text-[#1B212D] font-bold shadow-2xs'
                          : 'bg-white hover:bg-gray-50 text-gray-700 border-l-[3.5px] border-transparent font-medium'
                      }`}
                    >
                      <span
                        className={`text-xs mr-2 font-bold ${
                          isActive ? 'text-[#2563EB]' : 'text-gray-500'
                        }`}
                      >
                        {ch.code}
                      </span>
                      <span className="truncate">{ch.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* RIGHT COLUMN: SUB-TABS + LECTURE CARDS (8.5 cols)    */}
            {/* ---------------------------------------------------- */}
            <div className="lg:col-span-8 xl:col-span-8.5 space-y-6">
              
              {/* Sub-Tabs Row matching screenshot: All, Lectures, DPPs, Notes, DPP PDFs, DPP Videos */}
              <div className="flex items-center gap-6 sm:gap-8 border-b border-gray-200 overflow-x-auto scrollbar-none pb-0.5">
                {subTabs.map((tab) => {
                  const isActive = activeSubTab === tab
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveSubTab(tab)}
                      className={`pb-3 text-sm font-semibold whitespace-nowrap relative transition-colors cursor-pointer ${
                        isActive
                          ? 'text-[#5A4BDA] font-bold'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      <span>{tab}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5A4BDA] rounded-full" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* TAB CONTENT: LECTURES ONLY (All column removed as requested) */}
              {activeSubTab === 'Lectures' && (
                <div className="space-y-4">
                  
                  {/* Exact Lecture Card from Screenshot */}
                  <div className="border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 bg-white shadow-2xs hover:border-gray-300 transition-shadow">
                    
                    {/* Top Row: Thumbnail + Info (Left) and Checkmark (Right) */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-center gap-4">
                        
                        {/* Educator Thumbnail Container */}
                        <div className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-xl bg-[#FCE7E4] relative overflow-hidden flex items-end justify-center shrink-0 shadow-2xs">
                          <Image
                            src="/tutor-ansh.png"
                            alt="Educator"
                            width={75}
                            height={75}
                            className="object-contain object-bottom"
                          />
                          {/* Red Circular Play Badge at bottom-right corner */}
                          <div className="absolute right-1.5 bottom-1.5 w-5 h-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center shadow-xs">
                            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-1">
                          <div className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                            <span>Lecture</span>
                            <span>&bull;</span>
                            <span>9 Sept 2026</span>
                          </div>
                          
                          <h4 className="text-[16px] sm:text-[17px] font-bold text-[#1B212D] tracking-tight">
                            {currentSubject.short} Marathon : One Shot
                          </h4>

                          <div className="text-xs text-gray-500 font-medium">
                            5h:29m
                          </div>
                        </div>

                      </div>

                      {/* Right: Interactive Lecture Completion Checkmark matching PW */}
                      <button
                        type="button"
                        onClick={toggleLectureCompletion}
                        title={isLectureCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
                        aria-label={isLectureCompleted ? 'Mark lecture as incomplete' : 'Mark lecture as completed'}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                          isLectureCompleted
                            ? 'bg-[#10B981] border-2 border-[#10B981] text-white hover:bg-emerald-600'
                            : 'border border-gray-300 text-gray-400 hover:text-emerald-600 hover:border-emerald-500 bg-white'
                        }`}
                      >
                        {isLectureCompleted ? (
                          <Check className="w-4 h-4 text-white stroke-[2.8]" />
                        ) : (
                          <CheckCircle className="w-4 h-4 stroke-[1.8]" />
                        )}
                      </button>

                    </div>

                    {/* Bottom Button Row: "Watch" (Routes to /study_v2/watch) */}
                    <div className="pt-1">
                      <button
                        onClick={() =>
                          router.push(
                            `/study_v2/watch?title=${encodeURIComponent(
                              currentSubject.short + ' Marathon : One Shot'
                            )}&subject=${encodeURIComponent(
                              currentSubject.title
                            )}&returnUrl=${encodeURIComponent(
                              `/study_v2/study/all-classes/${rawSubject}`
                            )}`
                          )
                        }
                        className="py-2.5 px-6 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#1F2937] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-[#1F2937]" />
                        <span>Watch</span>
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB CONTENT: DPPs (Rectangular cards stacked vertically as instructed) */}
              {activeSubTab === 'DPPs' && (
                <div className="space-y-4">
                  <div className="pb-1">
                    <h3 className="text-base font-bold text-gray-900 tracking-tight">
                      Daily Practice Problems ({activeChapterData.title})
                    </h3>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      {
                        id: 'vectors',
                        dppNo: '01',
                        title: 'Vectors : Daily Practice Problems',
                        questionsCount: 25,
                        totalMarks: 100,
                        duration: '45 mins',
                      },
                      {
                        id: 'quadratic-equations',
                        dppNo: '02',
                        title: 'Quadratic Equations : Practice Sheet',
                        questionsCount: 25,
                        totalMarks: 100,
                        duration: '45 mins',
                      },
                      {
                        id: 'determinants',
                        dppNo: '03',
                        title: 'Determinants : Practice Drill',
                        questionsCount: 25,
                        totalMarks: 100,
                        duration: '45 mins',
                      },
                      {
                        id: 'relations-and-functions',
                        dppNo: '04',
                        title: 'Relations and Functions : Core Problems',
                        questionsCount: 25,
                        totalMarks: 100,
                        duration: '45 mins',
                      },
                      {
                        id: 'permutations-and-combinations',
                        dppNo: '05',
                        title: 'Permutations and Combinations : Advance DPP',
                        questionsCount: 25,
                        totalMarks: 100,
                        duration: '45 mins',
                      },
                    ].map((dpp) => {
                      const isAttempted = !!attemptedTests[dpp.id]
                      return (
                        <div
                          key={dpp.id}
                          className="border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 bg-white shadow-2xs hover:border-gray-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-[5px] bg-[#EFF6FF] text-[#2563EB] text-[11px] font-bold uppercase tracking-wider">
                                DPP &bull; {dpp.dppNo}
                              </span>
                              <span className="text-xs text-gray-400">&bull;</span>
                              <span className="text-xs text-gray-500 font-medium">Class 8th Foundation</span>
                            </div>

                            <h4 className="text-[16px] sm:text-[17px] font-bold text-[#1B212D] tracking-tight">
                              {dpp.title}
                            </h4>

                            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium pt-0.5">
                              <div className="flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-gray-400 stroke-[1.8]" />
                                <span>{dpp.questionsCount} Questions</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Star className="w-3.5 h-3.5 text-gray-400 stroke-[1.8]" />
                                <span>{dpp.totalMarks} Marks</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-gray-400 stroke-[1.8]" />
                                <span>{dpp.duration}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Button: View Result if attempted, else Attempt Now */}
                          <div className="shrink-0 pt-2 sm:pt-0">
                            <button
                              onClick={() =>
                                router.push(
                                  isAttempted
                                    ? `/study_v2/test/${dpp.id}/result`
                                    : `/study_v2/test/${dpp.id}/instructions`
                                )
                              }
                              className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-[#F0EEFF] hover:bg-[#E5E0FF] text-[#5A4BDA] font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
                            >
                              {isAttempted ? 'View Result' : 'Attempt Now'}
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* TAB CONTENT: Notes (Exact Layout matching screenshot media_1793617049941_cd6bf141.png) */}
              {activeSubTab === 'Notes' && (
                <div className="space-y-4">
                  <div className="border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 bg-white shadow-2xs hover:border-gray-300 transition-colors">
                    
                    {/* Top Row: Notepad Icon (Left) & Metadata + Title (Right) */}
                    <div className="flex items-start gap-4 mb-4">
                      
                      {/* Pastel Blue Notepad Icon with Pen Nib Badge matching screenshot */}
                      <div className="w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] rounded-2xl bg-[#BAE6FD] relative flex items-center justify-center shrink-0 shadow-2xs">
                        {/* White Lined Notepad */}
                        <div className="w-9 h-10 bg-white rounded-[7px] shadow-2xs p-1.5 flex flex-col justify-between border border-blue-100">
                          <div className="space-y-1 pt-0.5">
                            <div className="h-[2px] w-full bg-blue-200 rounded-full" />
                            <div className="h-[2px] w-full bg-blue-200 rounded-full" />
                            <div className="h-[2px] w-full bg-blue-200 rounded-full" />
                            <div className="h-[2px] w-3/4 bg-blue-200 rounded-full" />
                          </div>
                          <div className="h-[1.5px] w-1/2 bg-blue-100 rounded-full" />
                        </div>

                        {/* Bottom-right circular badge with pen nib icon matching screenshot */}
                        <div className="absolute -right-1 -bottom-1 w-5 h-5 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-xs">
                          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                          </svg>
                        </div>
                      </div>

                      {/* Details: NOTES • 9 Sept + Subject Marathon : Class Notes */}
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                          <span className="uppercase font-semibold tracking-wider text-[11px] text-gray-500">NOTES</span>
                          <span>&bull;</span>
                          <span>9 Sept</span>
                        </div>

                        <h4 className="text-[16px] sm:text-[17px] font-bold text-[#1B212D] tracking-tight">
                          {currentSubject.short} Marathon : Class Notes
                        </h4>
                      </div>

                    </div>

                    {/* Bottom Buttons: "View Note" (Opens PDF in New Tab) and Download Button */}
                    <div className="flex items-center gap-2.5 pt-1">
                      <a
                        href={`/study_v2/pdf-viewer?title=${encodeURIComponent(currentSubject.short + ' Marathon : Class Notes')}&subject=${encodeURIComponent(currentSubject.title)}&chapter=${encodeURIComponent(activeChapterData.code + ': ' + activeChapterData.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-4.5 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#1F2937] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#1F2937]" />
                        <span>View Note</span>
                      </a>

                      <button
                        onClick={() => alert('Downloading official class notes PDF...')}
                        className="py-2 px-3 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#1F2937] flex items-center justify-center transition-colors cursor-pointer"
                        title="Download Note"
                        aria-label="Download Note"
                      >
                        <Download className="w-3.5 h-3.5 text-[#1F2937]" />
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>

          </div>

        </main>
      </div>

      {/* ======================================================== */}
      {/* VIDEO PLAYER MODAL                                       */}
      {/* ======================================================== */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs animate-backdrop-fade">
          <div className="bg-[#111827] text-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-800 animate-dialog-enter">
            
            {/* Modal Top Bar */}
            <div className="p-4 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-[#5A4BDA] text-[11px] font-bold uppercase tracking-wider">
                  Live Lecture
                </span>
                <h3 className="text-sm font-bold text-gray-100 truncate">
                  {currentSubject.short} Marathon : One Shot &mdash; Class 8
                </h3>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Video Screen */}
            <div className="relative aspect-video bg-black flex items-center justify-center group">
              <div className="text-center space-y-3 p-6">
                <div className="w-16 h-16 rounded-full bg-[#5A4BDA] hover:bg-[#4d3ec9] text-white flex items-center justify-center mx-auto shadow-md transition-colors cursor-pointer">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <h4 className="text-base font-bold text-gray-200">
                  {currentSubject.title} One-Shot Marathon
                </h4>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  Presented by Ansh Tutor Faculty &bull; Recorded with Smart Interactive 4K Board
                </p>
              </div>

              {/* Bottom Video Progress Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent flex items-center justify-between text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <Play className="w-4 h-4 fill-current cursor-pointer hover:text-white" />
                  <span>00:14 / 05:29:40</span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="hover:text-white cursor-pointer font-bold">1.0x</button>
                  <button className="hover:text-white cursor-pointer">1080p HD</button>
                </div>
              </div>
            </div>

            {/* Video Footer Actions */}
            <div className="p-4 bg-[#1F2937] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Image
                  src="/owl-logo.png"
                  alt="Ansh Tutor"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <span className="font-semibold text-gray-300">Ansh Tutor &bull; Rajajipuram Campus</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleLectureCompletion}
                  className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isLectureCompleted
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{isLectureCompleted ? 'Completed' : 'Mark Complete'}</span>
                </button>
                <a
                  href={`/study_v2/pdf-viewer?title=${encodeURIComponent(currentSubject.short + ' Marathon : Class Notes')}&subject=${encodeURIComponent(currentSubject.title)}&chapter=${encodeURIComponent(activeChapterData.code + ': ' + activeChapterData.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-colors cursor-pointer"
                >
                  View Lecture Notes
                </a>
                <a
                  href="https://wa.me/917525009428?text=Hello%20Ansh%20Tutor,%20I%20have%20a%20doubt%20in%20the%20Maths%20Marathon%20lecture."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold transition-colors cursor-pointer"
                >
                  Ask Tutor Doubt
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DIRECT PDF VIEWER MODAL (Only one PDF opens directly)    */}
      {/* ======================================================== */}
      {notesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 sm:p-4 backdrop-blur-xs animate-backdrop-fade">
          <div className="bg-[#1E232A] text-white rounded-2xl max-w-4xl w-full h-[90vh] max-h-[820px] flex flex-col shadow-2xl border border-gray-700 overflow-hidden animate-dialog-enter">
            
            {/* 1. PDF Toolbar Header */}
            <div className="px-5 py-3.5 bg-[#181B20] border-b border-gray-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider shrink-0">
                  PDF
                </span>
                <h3 className="text-sm font-semibold text-gray-200 truncate">
                  {currentSubject.short}_Marathon_Class_Notes.pdf
                </h3>
                <span className="text-xs text-gray-400 hidden sm:inline">&bull; 14.8 MB</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => alert(`Downloading ${currentSubject.short}_Marathon_Class_Notes.pdf...`)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#5A4BDA] hover:bg-[#4a3bc7] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button
                  onClick={() => setNotesModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                  aria-label="Close PDF Viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 2. PDF Viewer Canvas Area */}
            <div className="flex-1 bg-[#2C323B] overflow-y-auto p-4 sm:p-8 flex justify-center">
              {/* White A4-Style Paper Page */}
              <div className="bg-white text-gray-900 rounded-sm shadow-2xl w-full max-w-2xl min-h-[700px] p-8 sm:p-12 flex flex-col justify-between border border-gray-300">
                
                {/* Page Header */}
                <div>
                  <div className="flex items-center justify-between border-b-2 border-gray-900 pb-4 mb-6">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src="/owl-logo.png"
                        alt="Ansh Tutor Logo"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                      <div>
                        <h4 className="font-extrabold text-base tracking-tight text-gray-900">
                          Ansh Tutor
                        </h4>
                        <p className="text-[10px] text-gray-500 font-medium">
                          Rajajipuram Campus, Lucknow &bull; Class 8 Foundation
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-purple-50 text-[#5A4BDA] text-[11px] font-bold">
                        {currentSubject.title}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-0.5">Faculty Handwritten Notes</p>
                    </div>
                  </div>

                  {/* Document Title Banner */}
                  <div className="bg-gray-50 border-l-4 border-[#5A4BDA] p-3.5 rounded-r-lg mb-6">
                    <h5 className="font-bold text-sm sm:text-base text-gray-900">
                      {activeChapterData.code}: {activeChapterData.title} &mdash; Marathon Master Notes
                    </h5>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Target Session 2026-27 &bull; Complete Chapter Theoretical Synopsis &amp; High-Yield Formulas
                    </p>
                  </div>

                  {/* Sample Handwritten Notes Page Content */}
                  <div className="space-y-5 text-xs sm:text-[13px] leading-relaxed text-gray-800">
                    <div>
                      <h6 className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#5A4BDA]" />
                        Section 1: Fundamental Concepts &amp; Core Definitions
                      </h6>
                      <p className="text-gray-700 pl-4">
                        All numbers expressible in standard fractional or algebraic representation follow consistent properties under addition, multiplication, and reciprocal operations. Always ensure denominator non-zero conditions are preserved.
                      </p>
                    </div>

                    <div>
                      <h6 className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#5A4BDA]" />
                        Section 2: High-Yield Formula Bank &amp; Shortcut Hacks
                      </h6>
                      <div className="pl-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-2">
                        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                          <span className="font-bold text-gray-900 text-[11px] block">Standard Form Equation:</span>
                          <code className="text-xs font-mono text-[#5A4BDA] font-bold">ax + b = c &rArr; x = (c - b) / a</code>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                          <span className="font-bold text-gray-900 text-[11px] block">Distributive Property:</span>
                          <code className="text-xs font-mono text-[#5A4BDA] font-bold">a &times; (b + c) = (a &times; b) + (a &times; c)</code>
                        </div>
                      </div>
                    </div>

                    {/* Teacher's Golden Rule Box */}
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                      <span className="font-bold block mb-0.5">💡 Faculty Golden Exam Tip:</span>
                      Verify solutions by substituting answers back into original equations before marking final test responses. Eliminates 95% of sign inversion errors.
                    </div>
                  </div>
                </div>

                {/* Page Footer */}
                <div className="pt-6 mt-8 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Ansh Tutor Academic Material &bull; Rajajipuram Campus</span>
                  <span className="font-semibold text-gray-600">Page 1 of 1</span>
                </div>

              </div>
            </div>

            {/* 3. Bottom Toolbar Bar */}
            <div className="px-5 py-2.5 bg-[#181B20] border-t border-gray-800 flex items-center justify-between text-xs text-gray-400 shrink-0">
              <span>Viewing Single PDF Document</span>
              <span>100% Fit Width</span>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default function SubjectDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-white flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-[#5A4BDA] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SubjectDetailContent />
    </Suspense>
  )
}
