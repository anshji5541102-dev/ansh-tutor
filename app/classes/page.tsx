'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  Award,
  Video,
  Building2,
  Calendar,
} from 'lucide-react'

export default function ClassesPage() {
  const [selectedGrade, setSelectedGrade] = useState('Class 8')

  const classesInfo = [
    {
      grade: 'Class 8',
      batch: 'Umang Batch 2026-27',
      tagline: 'CBSE, ICSE & Olympiad Advanced Foundation',
      subjects: ['Advanced Mathematics', 'Physics & Chemistry', 'Biology & EVS', 'English Grammar & Writing', 'Logical Reasoning & NTSE'],
      hours: '6 Days/Week • 2.5 Hrs/Day',
      mode: 'Offline (Rajajipuram Lucknow) & Online Live',
      highlight: 'Special focus on Board Foundation & School Top 1% rank drill.',
      badge: 'Popular',
    },
    {
      grade: 'Class 7',
      batch: 'Sankalp Batch 2026-27',
      tagline: 'Conceptual Clarity & Speed Building',
      subjects: ['Core Mathematics', 'General Science', 'English Communication', 'Social Studies Drill', 'Mental Ability'],
      hours: '6 Days/Week • 2 Hrs/Day',
      mode: 'Offline & Online Live',
      highlight: 'Daily doubt counters and weekly CBT test series.',
      badge: 'Top Rated',
    },
    {
      grade: 'Class 6',
      batch: 'Prarambh Batch 2026-27',
      tagline: 'Middle School Bridge & Olympiad Starter',
      subjects: ['Basic & Applied Math', 'Foundational Science', 'English & Hindi', 'Critical Thinking Drills'],
      hours: '5 Days/Week • 2 Hrs/Day',
      mode: 'Offline & Online Live',
      highlight: 'Smooth transition from Primary to Middle school syllabus.',
      badge: 'High Yield',
    },
    {
      grade: 'Class 5',
      batch: 'Class 5th Academic Batch',
      tagline: 'Primary Mastery & Mental Math Foundation',
      subjects: ['Mental Math & Tables', 'EVS & Basic Science', 'English Reading & Vocabulary', 'Hindi Vyakaran'],
      hours: '5 Days/Week • 1.5 Hrs/Day',
      mode: 'Offline & Online Live',
      highlight: 'Visual 4K smart board animations and daily interactive quizzes.',
      badge: 'Core',
    },
    {
      grade: 'Class 4',
      batch: 'Class 4th Academic Batch',
      tagline: 'Interactive Thinking & School Curriculum',
      subjects: ['Mathematics & Geometry', 'Science Explorers', 'English Stories & Grammar', 'Hindi'],
      hours: '5 Days/Week • 1.5 Hrs/Day',
      mode: 'Offline & Online Live',
      highlight: 'Fun gamified homework sheets and personalized teacher attention.',
      badge: 'Active',
    },
    {
      grade: 'Class 3',
      batch: 'Class 3rd Academic Batch',
      tagline: 'Fundamental Math & Reading Fluency',
      subjects: ['Arithmetic Practice', 'Environmental Studies', 'English Phonics & Sentences', 'Hindi'],
      hours: '5 Days/Week • 1.5 Hrs/Day',
      mode: 'Offline & Online Live',
      highlight: 'Gentle, deeply caring teaching style with parent progress reports.',
      badge: 'Active',
    },
    {
      grade: 'Class 2',
      batch: 'Class 2nd Academic Batch',
      tagline: 'Early Childhood Brain Development',
      subjects: ['Number Sense & Addition/Subtraction', 'Basic English Reading', 'Hindi Alphabets & Words', 'Drawing & General Knowledge'],
      hours: '5 Days/Week • 1 Hour/Day',
      mode: 'Offline & Online Live',
      highlight: 'Activity-based learning without academic pressure.',
      badge: 'Junior',
    },
    {
      grade: 'Class 1',
      batch: 'Class 1st Academic Batch',
      tagline: 'Strong Roots in Alphabets & Numbers',
      subjects: ['Foundational Numbers & Counting', 'English Phonics', 'Hindi Varnamala', 'Storytelling & Moral Science'],
      hours: '5 Days/Week • 1 Hour/Day',
      mode: 'Offline & Online Live',
      highlight: 'Safe, warm, and highly engaging classroom environment.',
      badge: 'Junior',
    },
  ]

  const activeData = classesInfo.find((c) => c.grade === selectedGrade) || classesInfo[0]

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] text-gray-900 selection:bg-[#5a4bda] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-[#5a4bda] text-xs font-bold border border-purple-100">
            <Sparkles className="w-4 h-4 text-[#5a4bda]" />
            <span>Comprehensive School Education • Classes 1st to 8th</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
            Tailored Learning for{' '}
            <span className="text-[#5a4bda]">Every Single Grade</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            From foundational arithmetic and phonics in Class 1 to advanced board &amp; Olympiad mastery in Class 8, discover the right curriculum for your child.
          </p>
        </div>

        {/* Grade Selector Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {classesInfo.map((item) => (
            <button
              key={item.grade}
              onClick={() => setSelectedGrade(item.grade)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                selectedGrade === item.grade
                  ? 'bg-[#5a4bda] text-white shadow-lg shadow-[#5a4bda]/30 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span>{item.grade}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-black uppercase ${
                selectedGrade === item.grade ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {item.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Active Class Highlight Card */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#5a4bda] text-xs font-bold border border-indigo-100">
                <GraduationCap className="w-4 h-4" />
                <span>{activeData.batch}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                {activeData.grade}: {activeData.tagline}
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                {activeData.highlight} Available at our digital smart classrooms at <strong className="text-gray-900">Rajajipuram Campus, Lucknow</strong> as well as interactive live online classes.
              </p>

              {/* Subjects Covered */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Subjects Covered:</div>
                <div className="flex flex-wrap gap-2">
                  {activeData.subjects.map((sub, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{sub}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-600 font-semibold">
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200/70">
                  <Clock className="w-4 h-4 text-[#5a4bda]" />
                  <span>{activeData.hours}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200/70">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>{activeData.mode}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/study_v2/cohort-selection"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#5a4bda] hover:bg-[#4a3bc7] text-white font-bold text-sm shadow-lg shadow-[#5a4bda]/25 transition-all"
                >
                  <span>Enroll in {activeData.grade} Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border-2 border-[#5a4bda] text-[#5a4bda] hover:bg-indigo-50 font-bold text-sm transition-all"
                >
                  <span>Book Free Offline Demo</span>
                </Link>
              </div>
            </div>

            {/* Right Card Feature Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#17183B] to-[#2B2D68] text-white p-7 sm:p-9 rounded-2xl shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="text-xl font-bold text-amber-400">Everything Included</div>
                <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full text-gray-300 font-semibold">Session 2026-27</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Daily live / in-person classes by experienced faculty</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Complete recorded lecture library with unlimited revisions</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Daily Practice Problems (DPP) with step-by-step solutions</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Printed modules &amp; formula booklets delivered to your desk</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Weekly academic counseling &amp; parent progress desk</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-white/10 text-center">
                <a
                  href="tel:7525009428"
                  className="text-xs text-amber-300 hover:underline font-bold"
                >
                  Direct Academic Helpline: +91 75250 09428
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* All Classes Grid */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Explore All 8 Academic Batches</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Select your child&apos;s grade to begin their study journey</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {classesInfo.map((c) => (
              <div
                key={c.grade}
                className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs hover:shadow-md hover:border-[#5a4bda]/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#5a4bda] uppercase tracking-wider">{c.grade}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Admissions Open
                    </span>
                  </div>
                  <h4 className="font-extrabold text-gray-900 group-hover:text-[#5a4bda] transition-colors">
                    {c.batch}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {c.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href="/study_v2/cohort-selection"
                    className="text-xs font-bold text-[#5a4bda] hover:underline flex items-center gap-1"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/book"
                    className="text-[11px] font-bold text-gray-600 hover:text-gray-900"
                  >
                    Book Demo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
