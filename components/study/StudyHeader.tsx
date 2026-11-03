'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import {
  ChevronRight,
  Menu,
  X,
  User,
  ShoppingBag,
  Power,
  Shield,
} from 'lucide-react'

interface StudyHeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function StudyHeader({
  mobileMenuOpen,
  setMobileMenuOpen,
}: StudyHeaderProps) {
  const router = useRouter()
  const { user, profile, selectedClass, logout } = useAuth()
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const userName = profile?.name || user?.displayName || 'Student'

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="h-14 bg-[#1B212D] text-white flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40 border-b border-[#2A3140] select-none">
      
      {/* ============================================================ */}
      {/* LEFT: Logo + "Ansh Tutor" + Category Pill                    */}
      {/* ============================================================ */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1 text-gray-300 hover:text-white rounded focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand: Circular Monogram + Ansh Tutor */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shadow-sm">
            <Image
              src="/owl-logo.png"
              alt="Ansh Tutor Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-extrabold text-white text-[17px] tracking-tight">
            Ansh Tutor
          </span>
        </Link>

        {/* Class Pill: e.g. "Class 8 >" (Foundation removed, opens Select Your Class) */}
        <button
          onClick={() => router.push('/study_v2/cohort-selection')}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#282F3E] hover:bg-[#343D4F] text-white text-xs sm:text-[13px] font-semibold border border-gray-700/60 transition-colors cursor-pointer"
        >
          {/* Magenta round badge with celebration icon matching screenshot */}
          <span className="w-4.5 h-4.5 rounded-full bg-[#EC4899] text-white flex items-center justify-center text-[10px] shadow-2xs">
            🎂
          </span>
          <span className="truncate max-w-[130px] sm:max-w-none">
            {selectedClass}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        </button>

      </div>

      {/* ============================================================ */}
      {/* RIGHT: Profile Dropdown                                      */}
      {/* ============================================================ */}
      <div className="flex items-center gap-4">
        
        {/* User Profile Container with Exact 3-Option Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 text-white hover:text-gray-200 cursor-pointer focus:outline-none"
            aria-expanded={profileDropdownOpen}
            aria-haspopup="true"
          >
            {/* "Hi, Student" text */}
            <span className="text-xs sm:text-[13.5px] font-bold tracking-tight">
              Hi, {userName}
            </span>

            {/* Circular avatar with thin border matching screenshot */}
            <div className="w-8 h-8 rounded-full border border-gray-400 overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
              <Image
                src="/batches/user_avatar.png"
                alt={userName}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Small downward triangle / caret matching screenshot */}
            <span className="text-[10px] text-gray-300 ml-[-2px]">▼</span>
          </button>

          {/* EXACT 3-OPTION DROPDOWN (Clean, simple, no pop animation) */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2.5 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 text-gray-800 z-50 divide-y divide-gray-50">
              
              <div className="py-1">
                {/* 1. My Profile */}
                <Link
                  href="/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full px-4 py-3 text-sm font-semibold text-gray-800 hover:text-[#5A4BDA] hover:bg-gray-50 flex items-center gap-3.5 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-gray-700 stroke-[2]" />
                  <span>My Profile</span>
                </Link>

                {/* 2. My Purchases */}
                <Link
                  href="/study_v2/my-purchase"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full px-4 py-3 text-sm font-semibold text-gray-800 hover:text-[#5A4BDA] hover:bg-gray-50 flex items-center gap-3.5 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-gray-700 stroke-[2]" />
                  <span>My Purchases</span>
                </Link>

                {/* 3. Admin Portal (Direct Switch) */}
                <Link
                  href="/admin"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full px-4 py-3 text-sm font-semibold text-[#5A4BDA] hover:bg-purple-50 flex items-center gap-3.5 transition-colors cursor-pointer border-t border-gray-50"
                >
                  <Shield className="w-4 h-4 text-[#5A4BDA] stroke-[2]" />
                  <span>Admin Portal</span>
                </Link>
              </div>

              {/* 3. Logout */}
              <div className="py-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false)
                    logout()
                    router.push('/')
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-800 hover:text-red-600 hover:bg-red-50 flex items-center gap-3.5 transition-colors cursor-pointer"
                >
                  <Power className="w-4 h-4 text-gray-700 hover:text-red-600 stroke-[2]" />
                  <span>Logout</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  )
}
