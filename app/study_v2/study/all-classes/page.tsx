'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import StudyHeader from '@/components/study/StudyHeader'
import StudySidebar from '@/components/study/StudySidebar'
import {
  ArrowLeft,
  Search,
  ChevronRight,
  BookOpen,
  FileText,
  Sparkles,
} from 'lucide-react'

interface SubjectItem {
  id: string
  code: string
  name: string
  colorBg: string
  colorText: string
  chaptersCount: number
  lecturesCount: number
  dppCount: number
  chapters: string[]
}

export default function AllClassesPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'subjects' | 'resources'>('subjects')
  const [searchQuery, setSearchQuery] = useState('')
  const [subjects, setSubjects] = useState<SubjectItem[]>([])
  const [resourcesList, setResourcesList] = useState<any[]>([])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const purchases = JSON.parse(localStorage.getItem("ansh_purchases") || "[]")
        if (Array.isArray(purchases) && purchases.length > 0) {
          // If student has enrolled batches, provide standard core curriculum subjects
          setSubjects([
            {
              id: 'mathematics',
              code: 'Ma',
              name: 'Mathematics',
              colorBg: 'bg-[#EFF6FF]',
              colorText: 'text-[#2563EB]',
              chaptersCount: 16,
              lecturesCount: 0,
              dppCount: 0,
              chapters: ['Rational Numbers', 'Linear Equations in One Variable', 'Understanding Quadrilaterals', 'Data Handling & Graphs'],
            },
            {
              id: 'science',
              code: 'Sc',
              name: 'Science',
              colorBg: 'bg-[#EFF6FF]',
              colorText: 'text-[#2563EB]',
              chaptersCount: 16,
              lecturesCount: 0,
              dppCount: 0,
              chapters: ['Crop Production & Management', 'Microorganisms: Friend and Foe', 'Coal and Petroleum', 'Combustion and Flame'],
            },
            {
              id: 'english',
              code: 'En',
              name: 'English',
              colorBg: 'bg-[#EFF6FF]',
              colorText: 'text-[#2563EB]',
              chaptersCount: 12,
              lecturesCount: 0,
              dppCount: 0,
              chapters: ['Literature & Comprehension', 'Grammar Mastery & Writing Skills'],
            },
            {
              id: 'sst',
              code: 'Ss',
              name: 'Social Studies (SST)',
              colorBg: 'bg-[#EFF6FF]',
              colorText: 'text-[#2563EB]',
              chaptersCount: 14,
              lecturesCount: 0,
              dppCount: 0,
              chapters: ['History', 'Geography', 'Civics & Political Science'],
            },
            {
              id: 'hindi',
              code: 'Hi',
              name: 'Hindi',
              colorBg: 'bg-[#EFF6FF]',
              colorText: 'text-[#2563EB]',
              chaptersCount: 12,
              lecturesCount: 0,
              dppCount: 0,
              chapters: ['गद्य एवं पद्य खंड', 'व्याकरण एवं लेखन'],
            },
          ])
        } else {
          setSubjects([])
        }
      } catch {
        setSubjects([])
      }
    }
  }, [])

  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.chapters.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. TOP HEADER (Ansh Tutor Brand Bar) */}
      <StudyHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. BODY LAYOUT: STILL SIDEBAR ON LEFT + SCROLLABLE CONTENT ON RIGHT */}
      <div className="flex flex-1 overflow-hidden relative">
        <StudySidebar
          activeTab="batches"
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 bg-white">
          
          {/* Subheader Row: Back button + "All Classes" (Left) & Search + XP (Right) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E5E7EB] gap-4 mb-6">
            
            {/* Left: Back Arrow + All Classes */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/study_v2/study')}
                className="p-1.5 -ml-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Back to Study"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
              <h2 className="text-[19px] font-bold text-[#1B212D] tracking-tight">
                All Classes
              </h2>
            </div>

            {/* Right: Search box + XP Badge */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              {/* Search Bar matching screenshot */}
              <div className="relative flex-1 sm:w-72 md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search for "Notes"'
                  className="w-full h-10 pl-10 pr-3.5 rounded-lg border border-[#D1D5DB] text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#5A4BDA] transition-colors bg-white shadow-2xs"
                />
              </div>

              {/* XP 0 Diamond Badge */}
              <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 select-none shrink-0">
                <div className="w-6 h-6 rounded bg-[#E0E7FF] text-[#4F46E5] flex items-center justify-center text-[10px] font-black transform rotate-45 shadow-2xs">
                  <span className="-rotate-45">XP</span>
                </div>
                <span className="font-bold text-[15px] text-gray-800">0</span>
              </div>
            </div>

          </div>

          {/* TABS ROW: Subjects & Resources matching screenshot */}
          <div className="flex items-center gap-8 border-b border-gray-200 mb-7">
            <button
              onClick={() => setActiveTab('subjects')}
              className={`pb-3 text-sm font-bold relative transition-colors cursor-pointer ${
                activeTab === 'subjects'
                  ? 'text-[#5A4BDA]'
                  : 'text-gray-500 hover:text-gray-800 font-medium'
              }`}
            >
              <span>Subjects</span>
              {activeTab === 'subjects' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5A4BDA] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`pb-3 text-sm font-bold relative transition-colors cursor-pointer ${
                activeTab === 'resources'
                  ? 'text-[#5A4BDA]'
                  : 'text-gray-500 hover:text-gray-800 font-medium'
              }`}
            >
              <span>Resources</span>
              {activeTab === 'resources' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5A4BDA] rounded-full" />
              )}
            </button>
          </div>

          {/* TAB 1: SUBJECTS CONTENT */}
          {activeTab === 'subjects' && (
            <div className="space-y-6">
              {filteredSubjects.length === 0 ? (
                <div className="text-center py-16 space-y-4 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#5A4BDA] flex items-center justify-center mx-auto text-2xl font-bold">
                    📚
                  </div>
                  <h4 className="text-base font-bold text-gray-900">No Enrolled Classes Found</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    You have not enrolled in any batches yet. Explore our batches to get instant access to live lectures, daily practice problems, and study notes.
                  </p>
                  <Link
                    href="/study_v2/batches"
                    className="inline-block px-5 py-2.5 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Explore Batches
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredSubjects.map((subject) => (
                    <div
                      key={subject.id}
                      onClick={() => router.push(`/study_v2/study/all-classes/${subject.id}`)}
                      className="p-4.5 sm:p-5 rounded-[14px] border border-[#E5E7EB] bg-white hover:border-[#5A4BDA] transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      {/* Left: Code badge + Subject Name */}
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-xl ${subject.colorBg} ${subject.colorText} font-bold text-sm flex items-center justify-center shrink-0`}
                        >
                          {subject.code}
                        </div>
                        <span className="text-[15.5px] font-bold text-[#1B212D] truncate group-hover:text-[#5A4BDA] transition-colors">
                          {subject.name}
                        </span>
                      </div>

                      {/* Right: Chevron Arrow */}
                      <div className="flex items-center shrink-0 ml-3">
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#5A4BDA] transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RESOURCES CONTENT */}
          {activeTab === 'resources' && (
            <div className="space-y-4 max-w-4xl">
              {resourcesList.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#5A4BDA] flex items-center justify-center mx-auto text-xl">
                    📁
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">No Resources Uploaded Yet</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    Handouts, syllabus PDFs, and formula cheat-sheets will appear here as soon as published by faculty.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {resourcesList.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-[#5A4BDA] hover:shadow-sm transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{res.title}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{res.type} &bull; {res.size}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`Downloading ${res.title}...`)}
                        className="px-4 py-2 rounded-lg bg-[#1B212D] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Download PDF
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
