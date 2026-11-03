'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import StudyHeader from '@/components/study/StudyHeader'
import StudySidebar from '@/components/study/StudySidebar'
import {
  ArrowLeft,
  BookOpen,
  Eye,
  Download,
  X,
  FileText,
} from 'lucide-react'

// Question Bank item interface
interface QuestionBankItem {
  id: string
  title: string
  subject: string
  questionsCount: number
  coverBg: string
  coverAccent: string
  tagColor: string
  fileName: string
  topics: string[]
}

export default function LibraryPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePdfItem, setActivePdfItem] = useState<QuestionBankItem | null>(null)

  // Strictly ONLY ONE section: Question Bank (as requested)
  const questionBanks: QuestionBankItem[] = [
    {
      id: 'qb-maths',
      title: 'Mathematics Chapterwise Question Bank',
      subject: 'Mathematics',
      questionsCount: 250,
      coverBg: 'from-[#1E1B4B] to-[#312E81]',
      coverAccent: '#818CF8',
      tagColor: 'text-[#6366F1]',
      fileName: 'Mathematics_Class8_Question_Bank.pdf',
      topics: ['Rational Numbers', 'Linear Equations', 'Quadrilaterals', 'Data Handling'],
    },
    {
      id: 'qb-science',
      title: 'Science Exemplar & Practice Question Bank',
      subject: 'Science',
      questionsCount: 220,
      coverBg: 'from-[#064E3B] to-[#047857]',
      coverAccent: '#34D399',
      tagColor: 'text-[#10B981]',
      fileName: 'Science_Class8_Question_Bank.pdf',
      topics: ['Crop Production', 'Microorganisms', 'Force & Pressure', 'Sound & Light'],
    },
    {
      id: 'qb-english',
      title: 'English Comprehension & Grammar Bank',
      subject: 'English',
      questionsCount: 180,
      coverBg: 'from-[#701A75] to-[#86198F]',
      coverAccent: '#E879F9',
      tagColor: 'text-[#C026D3]',
      fileName: 'English_Grammar_Question_Bank.pdf',
      topics: ['Reading Comprehension', 'Tenses & Modals', 'Reported Speech', 'Active/Passive'],
    },
    {
      id: 'qb-sst',
      title: 'Social Science Master Question Bank',
      subject: 'Social Science',
      questionsCount: 200,
      coverBg: 'from-[#7C2D12] to-[#9A3412]',
      coverAccent: '#FB923C',
      tagColor: 'text-[#EA580C]',
      fileName: 'SST_Foundation_Question_Bank.pdf',
      topics: ['History: Modern India', 'Geography: Resources', 'Civics: Indian Constitution'],
    },
  ]

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. TOP HEADER (Ansh Tutor Brand Bar) */}
      <StudyHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. BODY LAYOUT: STILL SIDEBAR (LEFT) + SCROLLABLE CONTENT (RIGHT) */}
      <div className="flex flex-1 overflow-hidden relative">
        <StudySidebar
          activeTab="library"
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* ======================================================== */}
        {/* RIGHT MAIN CONTENT AREA                                  */}
        {/* ======================================================== */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 bg-white">
          
          {/* Subheader Row matching screenshot media_1793617959951_025b054b.png */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-8">
            
            {/* Left: Back button + Library */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/study_v2/study')}
                className="p-1.5 -ml-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Back to Study"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
              <h2 className="text-[19px] font-bold text-[#1B212D] tracking-tight">
                Library
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
          {/* ONLY ONE SECTION: "Question Bank" (As explicitly ordered) */}
          {/* ======================================================== */}
          <div className="space-y-5 pb-16">
            
            {/* Section Header: Blue icon + Question Bank matching PW screenshot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded bg-[#0284C7] text-white flex items-center justify-center shadow-xs">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1B212D] tracking-tight">
                  Question Bank
                </h3>
              </div>

              <span className="text-xs font-semibold text-gray-500">
                {questionBanks.length} PDF Modules
              </span>
            </div>

            {/* CARDS GRID matching media_1793617959951_025b054b.png */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {questionBanks.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#E5E7EB] p-4.5 sm:p-5 shadow-2xs hover:border-gray-300 transition-colors flex flex-col justify-between group"
                >
                  
                  {/* Top Row: Cover Booklet (Left) + Details & PDF tag (Right) */}
                  <div className="flex items-start gap-4">
                    
                    {/* Cover Booklet matching screenshot style */}
                    <div className={`w-[84px] h-[106px] rounded-xl bg-gradient-to-b ${item.coverBg} p-2 flex flex-col justify-between shrink-0 shadow-md text-white select-none`}>
                      <div className="flex items-center justify-between">
                        <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center p-0.5">
                          <Image
                            src="/owl-logo.png"
                            alt="Logo"
                            width={12}
                            height={12}
                            className="object-contain"
                          />
                        </div>
                        <span className="text-[8px] font-bold tracking-widest uppercase opacity-80">
                          ANSH
                        </span>
                      </div>

                      <div className="text-center py-1">
                        <span className="text-[10px] font-extrabold uppercase leading-tight block text-amber-300">
                          {item.subject}
                        </span>
                        <span className="text-[7.5px] font-semibold text-gray-200 tracking-wider block mt-0.5">
                          Q-BANK
                        </span>
                      </div>

                      <div className="text-[8px] text-center bg-white/15 rounded py-0.5 font-bold">
                        {item.questionsCount}+ MCQs
                      </div>
                    </div>

                    {/* Right Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[15px] font-bold text-[#1B212D] line-clamp-2 leading-snug tracking-tight">
                        {item.title}
                      </h4>

                      <p className="text-xs text-gray-500 mt-1 font-medium">
                        Question Bank
                      </p>

                      {/* Red PDF Tag matching screenshot */}
                      <div className="mt-2.5">
                        <span className="inline-block px-1.5 py-0.5 rounded-[3px] bg-red-600 text-white text-[9.5px] font-black uppercase tracking-wider leading-none">
                          PDF
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Actions Row matching screenshot */}
                  <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-gray-100">
                    <a
                      href={`/study_v2/pdf-viewer?title=${encodeURIComponent(item.title)}&subject=${encodeURIComponent(item.subject)}&chapter=Question+Bank`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-4 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#1F2937] text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Now</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => alert(`Downloading ${item.fileName}...`)}
                      className="py-2 px-3 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#1F2937] flex items-center justify-center transition-colors cursor-pointer"
                      title="Download PDF"
                      aria-label="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </main>
      </div>

      {/* ======================================================== */}
      {/* DIRECT PDF VIEWER MODAL (Only one PDF opens directly)    */}
      {/* ======================================================== */}
      {activePdfItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 sm:p-4 backdrop-blur-xs animate-backdrop-fade">
          <div className="bg-[#1E232A] text-white rounded-2xl max-w-4xl w-full h-[90vh] max-h-[820px] flex flex-col shadow-2xl border border-gray-700 overflow-hidden animate-dialog-enter">
            
            {/* 1. PDF Toolbar Header */}
            <div className="px-5 py-3.5 bg-[#181B20] border-b border-gray-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider shrink-0">
                  PDF
                </span>
                <h3 className="text-sm font-semibold text-gray-200 truncate">
                  {activePdfItem.fileName}
                </h3>
                <span className="text-xs text-gray-400 hidden sm:inline">&bull; 18.4 MB</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => alert(`Downloading ${activePdfItem.fileName}...`)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#5A4BDA] hover:bg-[#4a3bc7] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button
                  onClick={() => setActivePdfItem(null)}
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
                          Rajajipuram Campus, Lucknow &bull; Academic Year 2026-27
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-blue-50 text-[#0284C7] text-[11px] font-bold">
                        {activePdfItem.subject}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-0.5">Master Question Bank</p>
                    </div>
                  </div>

                  {/* Document Title Banner */}
                  <div className="bg-gray-50 border-l-4 border-[#0284C7] p-3.5 rounded-r-lg mb-6">
                    <h5 className="font-bold text-sm sm:text-base text-gray-900">
                      {activePdfItem.title}
                    </h5>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {activePdfItem.questionsCount} Standardized Problem Sets &bull; Detailed Step-by-Step Solutions &bull; Class 8
                    </p>
                  </div>

                  {/* Sample Question Bank Page Content */}
                  <div className="space-y-5 text-xs sm:text-[13px] leading-relaxed text-gray-800">
                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="font-bold text-gray-900 block mb-1">
                        Q1. Multiple Choice Question (Exemplar Pattern):
                      </span>
                      <p className="text-gray-700">
                        Which of the following operations is commutative for all rational numbers?
                      </p>
                      <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[11.5px]">
                        <span>(A) Subtraction</span>
                        <span className="font-bold text-emerald-700">(B) Addition [Correct]</span>
                        <span>(C) Division</span>
                        <span>(D) None of these</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="font-bold text-gray-900 block mb-1">
                        Q2. Numerical Problem &amp; Step-by-Step Solution:
                      </span>
                      <p className="text-gray-700">
                        Solve for \(x\): \(3(x - 2) + 5 = 2(2x + 1) - 4\)
                      </p>
                      <div className="bg-white p-2.5 rounded border border-gray-200 mt-2 text-xs">
                        <span className="font-bold text-[#5A4BDA] block">Step-by-Step Hint:</span>
                        Expand both sides: \(3x - 6 + 5 = 4x + 2 - 4 \implies 3x - 1 = 4x - 2 \implies x = 1\).
                      </div>
                    </div>

                    {/* Teacher's Exam Tip Box */}
                    <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs">
                      <span className="font-bold block mb-0.5">📘 Faculty Question Bank Advice:</span>
                      Practice solving questions within allocated time bounds (2 mins per MCQ) to build speed and accuracy for school exams and Olympiads.
                    </div>
                  </div>
                </div>

                {/* Page Footer */}
                <div className="pt-6 mt-8 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Ansh Tutor Question Bank &bull; Rajajipuram Campus</span>
                  <span className="font-semibold text-gray-600">Page 1 of 24</span>
                </div>

              </div>
            </div>

            {/* 3. Bottom Toolbar */}
            <div className="px-5 py-2.5 bg-[#181B20] border-t border-gray-800 flex items-center justify-between text-xs text-gray-400 shrink-0">
              <span>Viewing Question Bank PDF</span>
              <span>100% Fit Width</span>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
