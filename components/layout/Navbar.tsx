'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  User as UserIcon,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { user, profile, openLoginModal, logout } = useAuth()
  const [coursesOpen, setCoursesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const courses = [
    { name: 'Class 6th to 10th (Foundation)', desc: 'CBSE, ICSE & Olympiads', badge: 'Popular' },
    { name: 'IIT-JEE (Main & Advanced)', desc: 'Class 11, 12 & Droppers', badge: 'Top Rated' },
    { name: 'NEET UG Medical', desc: 'Target 700+ Score in NEET', badge: 'High Yield' },
    { name: 'Commerce & CUET', desc: 'Accounts, Economics, BST', badge: 'Trending' },
    { name: 'Coding & Tech Skills', desc: 'Python, Web Dev & AI', badge: 'New' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo & All Courses Dropdown */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/" className="flex items-center group">
              <div className="relative h-12 w-48 sm:w-56 transition-transform duration-200 group-hover:scale-[1.02]">
                <Image
                  src="/logo-transparent.png"
                  alt="Ansh Tutor"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* "All Courses" Button - matching PW screenshot */}
            <div className="relative">
              <button
                onClick={() => setCoursesOpen(!coursesOpen)}
                onBlur={() => setTimeout(() => setCoursesOpen(false), 200)}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#5a4bda] border border-[#5a4bda]/40 rounded-xl hover:border-[#5a4bda] hover:bg-[#5a4bda]/5 transition-all cursor-pointer"
              >
                <span>All Courses</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    coursesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {coursesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in duration-150">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1.5">
                    Target Courses
                  </div>
                  {courses.map((c, i) => (
                    <Link
                      key={i}
                      href="/book"
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div>
                        <div className="text-sm font-bold text-gray-900 group-hover:text-[#5a4bda]">
                          {c.name}
                        </div>
                        <div className="text-xs text-gray-400">{c.desc}</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-[#5a4bda] rounded-md">
                        {c.badge}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Links - matching PW screenshot */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-gray-700">
            <Link
              href="#centres"
              className="hover:text-[#5a4bda] transition-colors flex items-center gap-1.5"
            >
              <span>Vidyapeeth</span>
              <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-red-100 text-red-600 rounded-md animate-pulse">
                Offline
              </span>
            </Link>
            <Link href="/courses" className="hover:text-[#5a4bda] transition-colors">
              AT Skills
            </Link>
            <Link href="/store" className="hover:text-[#5a4bda] transition-colors">
              AT Store
            </Link>
            <Link href="/classes" className="hover:text-[#5a4bda] transition-colors">
              Class 1st - 8th
            </Link>
            <Link
              href="/power-batch"
              className="hover:text-[#5a4bda] transition-colors flex items-center gap-1 text-[#5a4bda]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Power Batch</span>
            </Link>
            <Link href="/test-series" className="hover:text-[#5a4bda] transition-colors">
              Test Series
            </Link>
          </nav>

          {/* Right: Login/Register Button or User Profile */}
          <div className="flex items-center gap-3">
            {user || profile ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/study_v2/batches"
                  className="flex items-center gap-2 bg-[#F4F6FB] hover:bg-gray-100 border border-gray-200 text-gray-900 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-full bg-[#5a4bda] text-white flex items-center justify-center text-xs font-black">
                    {profile?.name ? profile.name[0].toUpperCase() : 'U'}
                  </div>
                  <span>Study Batches</span>
                </Link>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="group relative overflow-hidden bg-[#1A1D24] hover:bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />
                <span className="relative z-10">Login/Register</span>
              </button>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-black rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3">
          <Link
            href="#centres"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800"
          >
            Vidyapeeth (Offline Centres)
          </Link>
          <Link
            href="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800"
          >
            AT Skills
          </Link>
          <Link
            href="/store"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800"
          >
            AT Store
          </Link>
          <Link
            href="/classes"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800"
          >
            Class 1st - 8th
          </Link>
          <Link
            href="/power-batch"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#5a4bda]"
          >
            Power Batch 🔥
          </Link>
          <Link
            href="/test-series"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800"
          >
            Test Series
          </Link>

          <div className="pt-3 border-t border-gray-100">
            {user || profile ? (
              <div className="flex items-center justify-between">
                <Link
                  href="/study_v2/batches"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bold text-sm text-[#5a4bda]"
                >
                  Go to Study Batches &rarr;
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="text-xs font-semibold text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  openLoginModal()
                }}
                className="w-full bg-[#1A1D24] text-white py-2.5 rounded-xl text-sm font-bold shadow-sm"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
