'use client'

import React from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Video,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function CounselingBannerSection() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-indigo-50/30 to-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="relative rounded-3xl bg-gradient-to-br from-[#17183B] via-[#222557] to-[#12142E] text-white p-7 sm:p-12 lg:p-16 shadow-2xl overflow-hidden border border-indigo-900/40">
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#5a4bda]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-[350px] h-[350px] bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Heading & Features */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/15 backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>Free Offline Demo Class &amp; 1:1 Counseling</span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2]">
                  Experience Real Classroom Teaching{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200">
                    Before Enrolling
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed max-w-xl">
                  Visit our flagship <strong className="text-white">Rajajipuram Campus, Lucknow</strong> for an interactive 1-day offline demo class or book a 1-on-1 personal academic counseling session with Ansh Sir directly.
                </p>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold text-gray-200">Rajajipuram Hub</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl">
                    <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-xs font-semibold text-gray-200">Classes 1st to 8th</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs font-semibold text-gray-200">100% Free Slot</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Booking Card */}
              <div className="lg:col-span-5 bg-white text-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5 border border-gray-100">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5a4bda]">
                      Instant Slot Reservation
                    </span>
                    <h3 className="text-lg font-extrabold text-gray-950">
                      Book Your Free Session
                    </h3>
                  </div>
                  <span className="text-xs font-black uppercase px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg">
                    ₹0 Free
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Choose Offline Lucknow Campus or Online Google Meet</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Select preferred Morning, Afternoon, or Evening slot</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant WhatsApp confirmation &amp; mentor assignment</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/book"
                    className="w-full group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#5a4bda] hover:bg-[#4a3bc7] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#5a4bda]/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                  >
                    <span>Open Booking Form</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <p className="text-[11px] text-gray-400 text-center mt-2">
                    Takes only 30 seconds &bull; Helpline: +91 75250 09428
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
