'use client'

import React, { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'scale-up'
  delay?: number // ms
  duration?: number // ms
  className?: string
  threshold?: number
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 650,
  className = '',
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (elementRef.current) {
            observer.unobserve(elementRef.current)
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    const el = elementRef.current
    if (el) {
      observer.observe(el)
    }

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [threshold])

  const getInitialStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: 'opacity, transform',
    }

    if (isVisible) {
      return {
        ...base,
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
      }
    }

    switch (animation) {
      case 'fade-up':
        return { ...base, opacity: 0, transform: 'translate3d(0, 36px, 0)' }
      case 'fade-down':
        return { ...base, opacity: 0, transform: 'translate3d(0, -36px, 0)' }
      case 'fade-left':
        return { ...base, opacity: 0, transform: 'translate3d(40px, 0, 0)' }
      case 'fade-right':
        return { ...base, opacity: 0, transform: 'translate3d(-40px, 0, 0)' }
      case 'zoom-in':
      case 'scale-up':
        return { ...base, opacity: 0, transform: 'scale(0.92)' }
      default:
        return { ...base, opacity: 0, transform: 'translate3d(0, 30px, 0)' }
    }
  }

  return (
    <div ref={elementRef} style={getInitialStyle()} className={className}>
      {children}
    </div>
  )
}
