'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import {
  ShieldAlert,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'

interface AdminHeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  overdueCount: number
  onNavigateToPayLater?: () => void
}

export default function AdminHeader({
  mobileMenuOpen,
  setMobileMenuOpen,
  overdueCount,
  onNavigateToPayLater,
}: AdminHeaderProps) {
  const router = useRouter()
  const { logout } = useAuth()

  const handleAdminLogout = async () => {
    try {
      await logout()
      router.push('/')
      router.refresh()
    } catch {
      router.push('/')
    }
  }

  return (
    <header className="h-14 bg-[#1B212D] text-white flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40 border-b border-[#2A3140] select-none">
      {/* LEFT: Mobile Toggle + Brand Logo + Admin Console Badge */}
      <div className="flex items-center gap-3 sm:gap-5">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1 text-gray-300 hover:text-white rounded focus:outline-none cursor-pointer"
          aria-label="Toggle admin menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 shrink-0">
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
        </div>

        {/* Exclusive Admin Console Badge (Replaces Student Class Pill) */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#282F3E] text-white text-xs font-semibold border border-gray-700/60">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#A5B4FC] font-bold">Admin Console</span>
          <span className="text-gray-400 text-[10px]">v2.4</span>
        </div>
      </div>

      {/* RIGHT: Overdue Alert Badge + Super Admin Identity + Logout */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Overdue Defaulters Alert */}
        {overdueCount > 0 && (
          <button
            onClick={onNavigateToPayLater}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            title="View Pay Later Defaulters"
          >
            <ShieldAlert className="w-4 h-4 text-red-400 animate-bounce" />
            <span className="hidden sm:inline">{overdueCount} Pay Later Overdue</span>
            <span className="sm:hidden">{overdueCount} Overdue</span>
          </button>
        )}

        {/* Super Admin Identity Pill */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#282F3E] border border-gray-700/60 text-xs">
          <div className="w-6 h-6 rounded-lg bg-[#5A4BDA] flex items-center justify-center text-white shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="text-left hidden md:block">
            <div className="font-bold text-white text-[11px] leading-tight">Super Admin</div>
            <div className="text-[10px] text-gray-400 font-mono">+91 75250 09428</div>
          </div>
        </div>

        {/* Exit to Student View (Optional preview link) */}
        <Link
          href="/study_v2/study"
          target="_blank"
          className="hidden lg:flex items-center gap-1 text-[11px] text-gray-400 hover:text-white font-medium px-2 py-1 transition-colors"
          title="Preview Student Portal in new tab"
        >
          <span>Student App</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleAdminLogout}
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
          title="Logout from Admin"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
