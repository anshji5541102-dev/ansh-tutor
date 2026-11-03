'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function HeroSection() {
  const router = useRouter()
  const { user, openLoginModal } = useAuth()
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F6FD] via-[#F6F8FE] to-white pt-10 pb-20 lg:pt-14 lg:pb-28">
      {/* Ambient lighting with gentle floating glow */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-200/25 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-100/35 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Heading, Subtitle & Get Started CTA with Scroll Reveal */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <ScrollReveal animation="fade-right" duration={800}>
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-gray-950 tracking-tight leading-[1.15]">
                Bharat&apos;s{' '}
                <span className="text-[#5a4bda] bg-clip-text text-transparent bg-gradient-to-r from-[#5a4bda] via-[#705df5] to-[#5a4bda] bg-[length:200%_auto] hover:bg-right transition-all duration-500">
                  Trusted &amp;
                  <br />
                  Affordable
                </span>
                <br />
                Educational Platform
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={150} duration={800}>
              <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-lg">
                Unlock your potential by signing up with Ansh Tutor&mdash;
                <br />
                The most affordable learning solution
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={250} duration={800}>
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (user) {
                      router.push('/study_v2/batches')
                    } else {
                      openLoginModal()
                    }
                  }}
                  className="group relative inline-flex items-center justify-center px-9 py-3.5 text-base font-bold text-white bg-[#5a4bda] hover:bg-[#4a3bc7] rounded-xl shadow-lg shadow-[#5a4bda]/25 hover:shadow-xl hover:shadow-[#5a4bda]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 overflow-hidden cursor-pointer animate-pulse-ring"
                >
                  {/* Continuous ambient shimmer shine */}
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 animate-shimmer pointer-events-none" />
                  <span className="relative z-10">Get Started</span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Two Dashed Orbits with Uncropped Top & Curved Bottom Figures */}
          <div className="lg:col-span-7 flex justify-center items-center relative py-4">
            <ScrollReveal animation="fade-left" duration={900} className="w-full flex justify-center">
              <div className="relative w-full max-w-[680px] h-[300px] sm:h-[350px] scale-[0.82] xs:scale-[0.92] sm:scale-100 origin-center transition-transform">
                
                {/* ======================================================== */}
                {/* LEFT: Ansh Sir (Fit Inside Orbit, Curved Bottom, Full Head) */}
                {/* ======================================================== */}
                <div className="absolute left-6 sm:left-14 top-1/2 -translate-y-1/2 z-10 w-48 h-48 sm:w-56 sm:h-56 flex items-end justify-center">
                  
                  {/* Rotating Dashed Orbit Ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#5a4bda]/40 animate-[spin_40s_linear_infinite] pointer-events-none">
                    {/* Cyan Planetary Dot at 10 o'clock */}
                    <div className="absolute top-5 left-5 w-3.5 h-3.5 rounded-full bg-[#00C2FF] shadow-sm shadow-cyan-300 animate-pulse" />
                    {/* Orange Planetary Dot at 6 o'clock */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FF7A00] shadow-sm shadow-orange-300 animate-pulse" />
                  </div>

                  {/* Soft ambient aura with pulse */}
                  <div className="absolute w-40 h-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-200/40 to-blue-100/50 blur-md pointer-events-none -z-10 animate-pulse-glow" />

                  {/* Prominent floating Ansh Sir figure */}
                  <div className="relative w-[115px] h-[160px] sm:w-[135px] sm:h-[185px] flex items-end justify-center z-10 transition-transform duration-300 hover:scale-105 animate-float-bob">
                    <Image
                      src="/tutor-ansh.png"
                      alt="Ansh Sir - Lead Educator"
                      fill
                      className="object-contain object-bottom drop-shadow-xl"
                      priority
                    />
                  </div>

                </div>

                {/* ======================================================== */}
                {/* RIGHT: Student (Inward Facing, Real Phone Screen, Curved Base) */}
                {/* ======================================================== */}
                <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 z-10 w-48 h-48 sm:w-56 sm:h-56 flex items-end justify-center">
                  
                  {/* Rotating Dashed Orbit Ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#5a4bda]/40 animate-[spin_35s_linear_infinite_reverse] pointer-events-none">
                    {/* Blue Planetary Dot */}
                    <div className="absolute top-4 left-8 w-4 h-4 rounded-full bg-[#0085FF] shadow-sm shadow-blue-300 animate-pulse" />
                    {/* Pink Dot */}
                    <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#FF3366] shadow-sm shadow-pink-300" />
                    {/* Orange Dot */}
                    <div className="absolute bottom-5 right-8 w-4 h-4 rounded-full bg-[#FF8A00] shadow-sm shadow-orange-300" />
                  </div>

                  {/* Soft ambient aura with pulse */}
                  <div className="absolute w-40 h-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-pink-200/40 to-purple-100/50 blur-md pointer-events-none -z-10 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

                  {/* Student: Facing Inward, Screen facing her, smooth bottom curve with prominent float */}
                  <div className="relative w-[130px] h-[145px] sm:w-[155px] sm:h-[175px] flex items-end justify-center z-10 transition-transform duration-300 hover:scale-105 animate-float-bob-reverse">
                    <Image
                      src="/student-new.png"
                      alt="Student Learning"
                      fill
                      className="object-contain object-bottom drop-shadow-lg"
                      priority
                    />
                  </div>

                </div>

                {/* ======================================================== */}
                {/* CONVERSATION BUBBLES: Positioned Cleanly in Center Gap   */}
                {/* ======================================================== */}

                {/* DIALOGUE 1: Student Question (White with border) */}
                <div className="absolute top-2 sm:top-4 right-16 sm:right-24 z-30 animate-fly-drop-1">
                  <div className="relative bg-white text-gray-900 px-4 py-2 rounded-2xl shadow-xl border border-gray-100 text-xs sm:text-[13px] font-semibold tracking-tight whitespace-nowrap animate-float-bubble hover:scale-105 transition-transform cursor-default">
                    <span>Ansh Sir, What is AT?</span>
                    {/* Pointer pointing down-right towards Student's head */}
                    <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45" />
                  </div>
                </div>

                {/* DIALOGUE 2: Sir's Answer (In Open Center Gap, ZERO Overlap with Face or Student) */}
                <div className="absolute top-32 sm:top-36 left-[28%] sm:left-[32%] z-30 animate-fly-drop-2">
                  <div className="relative bg-[#12153B] text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-2xl text-[11px] sm:text-xs font-normal max-w-[155px] sm:max-w-[170px] leading-snug border border-indigo-900/60 animate-float-bubble hover:scale-105 transition-transform cursor-default">
                    <span>
                      AT is where students<br />
                      learn with love and<br />
                      can grow with guidance
                    </span>
                    {/* Pointer on left side pointing towards Ansh Sir */}
                    <div className="absolute top-4 -left-1.5 w-3 h-3 bg-[#12153B] transform rotate-45" />
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}
