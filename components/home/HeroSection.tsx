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
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => {
                    if (user) {
                      router.push('/study_v2/batches')
                    } else {
                      openLoginModal()
                    }
                  }}
                  className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-[#5a4bda] hover:bg-[#4a3bc7] rounded-xl shadow-lg shadow-[#5a4bda]/25 hover:shadow-xl hover:shadow-[#5a4bda]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 overflow-hidden cursor-pointer animate-pulse-ring"
                >
                  {/* Continuous ambient shimmer shine */}
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 animate-shimmer pointer-events-none" />
                  <span className="relative z-10">Explore Batches</span>
                </button>

                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-[#5a4bda] bg-white hover:bg-indigo-50/50 border-2 border-[#5a4bda]/40 hover:border-[#5a4bda] rounded-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all text-center"
                >
                  <span>Book Free Demo / Counselor</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 rounded">
                    Free
                  </span>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Two Dashed Orbits with Uncropped Top & Curved Bottom Figures */}
          <div className="lg:col-span-7 flex justify-center items-center relative py-4">
            <ScrollReveal animation="fade-left" duration={900} className="w-full flex justify-center">
              <div className="relative w-full max-w-[680px] h-[390px] sm:h-[350px]">
                
                {/* ======================================================== */}
                {/* UP: Ansh Sir (Left) + His Answer Bubble Right Next to Him */}
                {/* ======================================================== */}
                <div className="absolute top-2 left-2 xs:left-4 sm:top-1/2 sm:-translate-y-1/2 sm:left-14 z-10 w-36 h-36 xs:w-40 xs:h-40 sm:w-56 sm:h-56 flex items-end justify-center">
                  
                  {/* Rotating Dashed Orbit Ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#5a4bda]/40 animate-[spin_40s_linear_infinite] pointer-events-none">
                    {/* Cyan Planetary Dot at 10 o'clock */}
                    <div className="absolute top-4 left-4 sm:top-5 sm:left-5 w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#00C2FF] shadow-sm shadow-cyan-300 animate-pulse" />
                    {/* Orange Planetary Dot at 6 o'clock */}
                    <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-[#FF7A00] shadow-sm shadow-orange-300 animate-pulse" />
                  </div>

                  {/* Soft ambient aura with pulse */}
                  <div className="absolute w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-200/40 to-blue-100/50 blur-md pointer-events-none -z-10 animate-pulse-glow" />

                  {/* Prominent floating Ansh Sir figure */}
                  <div className="relative w-[95px] h-[135px] xs:w-[105px] xs:h-[145px] sm:w-[135px] sm:h-[185px] flex items-end justify-center z-10 transition-transform duration-300 hover:scale-105 animate-float-bob">
                    <Image
                      src="/tutor-ansh.png"
                      alt="Ansh Sir - Lead Educator"
                      fill
                      className="object-contain object-bottom drop-shadow-xl"
                      priority
                    />
                  </div>

                </div>

                {/* DIALOGUE 2: Sir's Answer (Right next to Ansh Sir's circle) */}
                <div className="absolute top-7 xs:top-8 left-[148px] xs:left-[172px] sm:top-36 sm:left-[32%] z-30 animate-fly-drop-2">
                  <div className="relative bg-[#12153B] text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-2xl text-[10.5px] xs:text-[11px] sm:text-xs font-normal max-w-[165px] sm:max-w-[170px] leading-snug border border-indigo-900/60 animate-float-bubble hover:scale-105 transition-transform cursor-default">
                    <span>
                      AT is where students<br />
                      learn with love and<br />
                      can grow with guidance
                    </span>
                    {/* Pointer on left side pointing towards Ansh Sir */}
                    <div className="absolute top-3.5 sm:top-4 -left-1.5 w-3 h-3 bg-[#12153B] transform rotate-45" />
                  </div>
                </div>

                {/* ======================================================== */}
                {/* DOWN: Student Question Bubble (Left) + Student Circle (Right) */}
                {/* ======================================================== */}
                <div className="absolute bottom-2 right-2 xs:right-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:right-12 z-10 w-36 h-36 xs:w-40 xs:h-40 sm:w-56 sm:h-56 flex items-end justify-center">
                  
                  {/* Rotating Dashed Orbit Ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#5a4bda]/40 animate-[spin_35s_linear_infinite_reverse] pointer-events-none">
                    {/* Blue Planetary Dot */}
                    <div className="absolute top-3.5 left-6 sm:top-4 sm:left-8 w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-[#0085FF] shadow-sm shadow-blue-300 animate-pulse" />
                    {/* Pink Dot */}
                    <div className="absolute top-1/2 -right-1 sm:-right-1.5 -translate-y-1/2 w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#FF3366] shadow-sm shadow-pink-300" />
                    {/* Orange Dot */}
                    <div className="absolute bottom-4 right-6 sm:bottom-5 sm:right-8 w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-[#FF8A00] shadow-sm shadow-orange-300" />
                  </div>

                  {/* Soft ambient aura with pulse */}
                  <div className="absolute w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-pink-200/40 to-purple-100/50 blur-md pointer-events-none -z-10 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

                  {/* Student: Facing Inward, Screen facing her, smooth bottom curve with prominent float */}
                  <div className="relative w-[105px] h-[125px] xs:w-[115px] xs:h-[135px] sm:w-[155px] sm:h-[175px] flex items-end justify-center z-10 transition-transform duration-300 hover:scale-105 animate-float-bob-reverse">
                    <Image
                      src="/student-new.png"
                      alt="Student Learning"
                      fill
                      className="object-contain object-bottom drop-shadow-lg"
                      priority
                    />
                  </div>

                </div>

                {/* DIALOGUE 1: Student Question (Right next to Student's circle) */}
                <div className="absolute bottom-14 right-[148px] xs:right-[172px] sm:top-4 sm:bottom-auto sm:right-24 z-30 animate-fly-drop-1">
                  <div className="relative bg-white text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-xl border border-gray-100 text-[11px] xs:text-xs sm:text-[13px] font-semibold tracking-tight whitespace-nowrap animate-float-bubble hover:scale-105 transition-transform cursor-default">
                    <span>Ansh Sir, What is AT?</span>
                    {/* Mobile pointer: points right towards student */}
                    <div className="sm:hidden absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-gray-100 transform rotate-45" />
                    {/* Desktop pointer: points down-right towards student head */}
                    <div className="hidden sm:block absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45" />
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
