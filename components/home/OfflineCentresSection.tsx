'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MapPin,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2,
  BookOpenCheck,
  Headphones,
  ArrowRight,
  Flame,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function OfflineCentresSection() {
  const [selectedHub, setSelectedHub] = useState(0)

  // Only one branch in Lucknow: Rajajipuram
  const lucknowCampuses = [
    {
      name: 'Rajajipuram Campus',
      city: 'Lucknow',
      centres: 1,
      students: '12,500+',
      address: 'Block-B, Rajajipuram, Lucknow, Uttar Pradesh-226017',
      batches: 'Classes 1st to 12th + Foundation Olympiads & Boards',
      highlight: 'Flagship Digital Smart Classrooms, 1:1 Doubt Counters & Dedicated Parent Sync Desk',
      timing: '8:30 AM – 7:30 PM',
    },
  ]

  const offlineFeatures = [
    {
      icon: <Building2 className="w-6 h-6 text-[#5a4bda]" />,
      title: 'Smart Tech Classrooms',
      desc: 'Interactive 4K digital boards, audio-video simulations, and automatic lecture recordings for revision.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-pink-600" />,
      title: '1-on-1 Doubt Counters',
      desc: 'Dedicated physical doubt rooms open 8:00 AM to 8:00 PM with subject mentors to solve every question.',
    },
    {
      icon: <BookOpenCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Noise-Free AC Library',
      desc: 'Individual study carrels with ergonomic seating, Wi-Fi, and complete access to physical module archives.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
      title: 'Parent Mentorship Sync',
      desc: 'Real-time biometric attendance alerts, weekly performance report cards, and monthly 1:1 teacher meetings.',
    },
  ]

  return (
    <section id="centres" className="py-24 bg-gradient-to-b from-white via-indigo-50/20 to-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider border border-red-100 animate-badge-bounce">
              <Flame className="w-4 h-4 fill-red-500 animate-pulse" />
              <span>Ansh Tutor Vidyapeeth (Offline Hubs)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
              Experience the Magic of{' '}
              <span className="text-[#5a4bda] bg-clip-text text-transparent bg-gradient-to-r from-[#5a4bda] via-[#705df5] to-[#5a4bda] bg-[length:200%_auto] hover:bg-right transition-all duration-500">
                Offline Learning
              </span>{' '}
              Near You
            </h2>

            <p className="text-base sm:text-lg text-gray-600 font-normal">
              State-of-the-art offline coaching centres across India offering personal guidance,
              rigorous testing, and India&apos;s most passionate teachers.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Feature Cards with Staggered Scroll Reveal & Hover Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {offlineFeatures.map((feat, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 120} duration={650}>
              <div
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-300 relative overflow-hidden h-full cursor-default hover:border-indigo-100"
              >
                {/* Subtle top gradient line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5a4bda] via-pink-500 to-[#5a4bda] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-50/70 transition-all duration-300">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#5a4bda] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Interactive Lucknow Campus Selector with Scroll Reveal */}
        <ScrollReveal animation="fade-up" delay={200} duration={800}>
          <div className="mt-14 bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            
            {/* Lucknow Hubs Selection Tabs */}
            <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="absolute w-5 h-5 rounded-full bg-emerald-400/40 animate-radar" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#5a4bda]" />
                  LUCKNOW OFFLINE HUBS:
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                {lucknowCampuses.map((camp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedHub(idx)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      selectedHub === idx
                        ? 'bg-[#17183B] text-white shadow-md scale-[1.02]'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span>{camp.name}</span>
                    {selectedHub === idx && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Campus Details */}
            <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Admissions Open for 2026-27 Academic Session &mdash; Lucknow</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Ansh Tutor Vidyapeeth &mdash; {lucknowCampuses[selectedHub].name}
                </h3>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#5a4bda] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">Campus Address:</span>{' '}
                      {lucknowCampuses[selectedHub].address}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">Featured Batches:</span>{' '}
                      {lucknowCampuses[selectedHub].batches}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">Centre USP:</span>{' '}
                      {lucknowCampuses[selectedHub].highlight}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/book"
                    className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#5a4bda] text-white font-bold text-sm shadow-md hover:bg-[#4a3bc7] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 overflow-hidden cursor-pointer animate-pulse-ring"
                  >
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                    <span className="relative z-10">Book Free 1-Day Offline Demo</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#17183B] text-white p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <div className="text-3xl font-black text-amber-400">
                      {lucknowCampuses[selectedHub].centres}
                    </div>
                    <div className="text-xs text-gray-300 font-medium uppercase tracking-wider mt-0.5">
                      Lucknow Campuses
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-cyan-400">
                      {lucknowCampuses[selectedHub].students}
                    </div>
                    <div className="text-xs text-gray-300 font-medium uppercase tracking-wider mt-0.5">
                      Students Enrolled
                    </div>
                  </div>
                </div>

                <ul className="text-xs sm:text-sm text-gray-200 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Free Full Online App &amp; Recorded Lectures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Printed Color Modules &amp; Question Banks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Uniform, Bag, Exam Kit &amp; Student ID</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
