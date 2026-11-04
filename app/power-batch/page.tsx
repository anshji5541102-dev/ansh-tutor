'use client'

import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Flame,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Clock,
  BookOpenCheck,
  Video,
  Building2,
} from 'lucide-react'

export default function PowerBatchPage() {
  const highlights = [
    {
      title: 'Top 1% Ranker Curriculum',
      desc: 'High-rigor syllabus designed to push ambitious students from 80% to 95%+ in school finals and top national percentiles in Olympiads.',
      icon: <Award className="w-5 h-5 text-amber-500" />,
    },
    {
      title: 'Direct Mentorship Under Ansh Sir',
      desc: 'Weekly 1:1 review sessions where every student’s error log, calculation speed, and conceptual gaps are personally audited.',
      icon: <Users className="w-5 h-5 text-[#5a4bda]" />,
    },
    {
      title: 'Daily Practice Drill (DPP-X)',
      desc: '30 advanced multi-concept questions every single day with detailed video step-by-step derivations and trick solutions.',
      icon: <BookOpenCheck className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: 'Full CBT & Physical Mock Hall Testing',
      desc: 'Simulated computer-based and offline OMR exams held every alternate Sunday to eradicate exam fear and silly mistakes.',
      icon: <Clock className="w-5 h-5 text-pink-600" />,
    },
  ]

  const cohorts = [
    {
      grade: 'Class 8th Power Batch',
      target: 'Target 2026-27 School Boards & Olympiad Ranks',
      seats: 'Only 35 Seats Per Batch',
      status: 'Admissions Open',
      features: ['Advanced Science & Math', 'IMO/NSO Olympiad Level 2 Modules', '1:1 Doubt Desk Access'],
    },
    {
      grade: 'Class 7th Power Batch',
      target: 'Foundational Mastery & Speed Excellence',
      seats: 'Only 30 Seats Per Batch',
      status: 'Admissions Open',
      features: ['Speed Math & Vedic Arithmetic', 'Conceptual Physics/Chemistry', 'Bi-weekly Rank Tests'],
    },
    {
      grade: 'Class 6th Power Batch',
      target: 'Middle School Bridge & Talent Search',
      seats: 'Only 25 Seats Per Batch',
      status: 'Admissions Open',
      features: ['Science & Math Problem Solving', 'Mental Ability Drills', 'Parent Progress Desk'],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] text-gray-900 selection:bg-[#5a4bda] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#12142B] via-[#1B1D40] to-[#25225E] text-white p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden mb-16 border border-indigo-900/40">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5a4bda]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-red-400 text-red-400 animate-pulse" />
              <span>Flagship High-Performance Program • Session 2026-27</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Ansh Tutor{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-amber-300">
                Power Batch 🔥
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
              An exclusive, limited-seat accelerator program for Classes 6th, 7th &amp; 8th students who want nothing less than 95%+ school scores, top Olympiad ranks, and unshakeable confidence in Science &amp; Mathematics.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/study_v2/cohort-selection"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-500/25 transition-all"
              >
                <span>Enroll in Power Batch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-xs transition-all"
              >
                <span>Book 1:1 Counseling with Ansh Sir</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
              Why Power Batch Produces Top Rankers
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              A scientifically engineered study routine blending concept drilling with speed coaching
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all space-y-3"
              >
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  {h.icon}
                </div>
                <h3 className="font-bold text-base text-gray-950">{h.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cohorts Available */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-950">
              Active Power Batch Cohorts (Classes 6th - 8th)
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Batch strength strictly capped to guarantee personal mentorship</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cohorts.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-gray-200/90 shadow-md p-7 flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-red-400 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                  Fast Filling
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-extrabold text-gray-950">{c.grade}</h4>
                    <p className="text-xs text-gray-500 mt-1">{c.target}</p>
                  </div>

                  <div className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl inline-block">
                    {c.seats}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    {c.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href="/study_v2/cohort-selection"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#5a4bda] hover:bg-[#4a3bc7] text-white font-bold text-xs shadow-md transition-all"
                  >
                    <span>Secure Seat in Batch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offline Rajajipuram Campus Access */}
        <div className="rounded-3xl bg-white border border-gray-200/90 p-8 sm:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <Building2 className="w-4 h-4" />
              <span>Rajajipuram Campus, Lucknow</span>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-950">Want to attend Power Batch offline?</h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
              Power Batch lectures and physical test halls are conducted daily at our flagship Rajajipuram centre. Book an offline diagnostic test today.
            </p>
          </div>

          <Link
            href="/book"
            className="px-6 py-3.5 bg-[#17183B] hover:bg-black text-white font-bold rounded-xl text-sm transition-all whitespace-nowrap shadow-md"
          >
            Book Free Campus Visit &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
