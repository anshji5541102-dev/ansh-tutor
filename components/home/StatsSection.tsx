'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'

function JackpotCounter({
  targetNumber,
  suffix = '+',
  prefix = '',
  duration = 2000,
}: {
  targetNumber: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const [displayNumber, setDisplayNumber] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.25 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const start = 0
    const end = targetNumber
    const totalFrames = Math.min(60, Math.floor(duration / 16))
    let currentFrame = 0

    const counter = setInterval(() => {
      currentFrame++
      const progress = currentFrame / totalFrames
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentVal = Math.round(start + (end - start) * easeOut)

      setDisplayNumber(currentVal)

      if (currentFrame >= totalFrames) {
        setDisplayNumber(end)
        clearInterval(counter)
      }
    }, 16)

    return () => clearInterval(counter)
  }, [hasStarted, targetNumber, duration])

  return (
    <div ref={elementRef} className="tabular-nums font-black tracking-tight inline-flex items-baseline">
      <span>{prefix}</span>
      <span>{displayNumber.toLocaleString()}</span>
      <span>{suffix}</span>
    </div>
  )
}

export default function StatsSection() {
  const statCards = [
    {
      id: 1,
      targetNumber: 15,
      suffix: ' Million+',
      label: 'Happy Students',
      bg: 'bg-[#FFF8EE]',
      iconPath: '/stat-icon-1.png',
      iconWidth: 80,
      iconHeight: 95,
    },
    {
      id: 2,
      targetNumber: 24000,
      suffix: '+',
      label: 'Mock Tests',
      bg: 'bg-[#FDF0F2]',
      iconPath: '/stat-icon-2.png',
      iconWidth: 100,
      iconHeight: 100,
    },
    {
      id: 3,
      targetNumber: 14000,
      suffix: '+',
      label: 'Video Lectures',
      bg: 'bg-[#EBF9FC]',
      iconPath: '/stat-icon-3.png',
      iconWidth: 105,
      iconHeight: 105,
    },
    {
      id: 4,
      targetNumber: 80000,
      suffix: '+',
      label: 'Practice Papers',
      bg: 'bg-[#F2EEFF]',
      iconPath: '/stat-icon-4.png',
      iconWidth: 100,
      iconHeight: 100,
    },
  ]

  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Scroll Reveal */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-4xl mx-auto space-y-2.5">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-950 tracking-tight">
              A Platform Trusted by Students Worldwide
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal">
              Don&apos;t Just Take Our Word for It. Delve into the Numbers and Witness the Excellence for Yourself!
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Pastel Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:mt-14">
          {statCards.map((card, idx) => (
            <ScrollReveal key={card.id} animation="fade-up" delay={idx * 130} duration={650}>
              <div
                className={`group relative ${card.bg} rounded-3xl p-6 h-[220px] sm:h-[240px] flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2.5 hover:ring-4 hover:ring-[#5a4bda]/15 cursor-pointer`}
              >
                {/* Stat Text: Perfectly Centered by default, slides UP on hover */}
                <div className="flex flex-col items-center justify-center transition-all duration-300 ease-out transform group-hover:-translate-y-7 z-10">
                  <div className="text-3xl sm:text-[38px] font-black text-gray-950 tracking-tight leading-tight group-hover:scale-105 transition-transform duration-300">
                    <JackpotCounter targetNumber={card.targetNumber} suffix={card.suffix} />
                  </div>
                  <div className="text-sm sm:text-base text-gray-700 font-semibold mt-1.5 group-hover:text-[#5a4bda] transition-colors">
                    {card.label}
                  </div>
                </div>

                {/* Exact Original Illustration: Slides Up from bottom on hover */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end justify-center transition-all duration-300 ease-out transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none">
                  <Image
                    src={card.iconPath}
                    alt={card.label}
                    width={card.iconWidth}
                    height={card.iconHeight}
                    className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Bottom accent hover indicator */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#5a4bda] rounded-full transition-all duration-300 group-hover:w-20" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Purple 'Get Started' Button with Shimmer & Beacon Ring */}
        <ScrollReveal animation="fade-up" delay={300} duration={700}>
          <div className="mt-12 text-center">
            <Link
              href="/login"
              className="group relative inline-flex items-center justify-center px-11 py-3.5 text-base font-bold text-white bg-[#5a4bda] hover:bg-[#4a3bc7] rounded-xl shadow-lg shadow-[#5a4bda]/25 hover:shadow-xl hover:shadow-[#5a4bda]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 overflow-hidden cursor-pointer animate-pulse-ring"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 animate-shimmer pointer-events-none" />
              <span className="relative z-10">Get Started</span>
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
