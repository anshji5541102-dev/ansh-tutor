'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import StudyHeader from '@/components/study/StudyHeader'
import StudySidebar from '@/components/study/StudySidebar'
import {
  Search,
  ChevronRight,
  LogOut,
  Building2,
  Menu,
  X,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

export default function StudyBatchesPage() {
  const router = useRouter()
  const { user, profile, selectedClass, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('batches')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const userName = profile?.name || user?.displayName || 'Student'
  const [batchesList, setBatchesList] = useState<any[]>([])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("ansh_admin_batches") || "[]")
        setBatchesList(Array.isArray(stored) ? stored : [])
      } catch {
        setBatchesList([])
      }
    }
  }, [])

  const filteredBatches = batchesList.filter((b) =>
    (b.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. TOP HEADER */}
      <StudyHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. BODY LAYOUT: WIDER SIDEBAR + BATCHES CONTENT */}
      <div className="flex flex-1 overflow-hidden relative">
        <StudySidebar
          activeTab="batches"
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* ======================================================== */}
        {/* RIGHT MAIN CONTENT AREA                                  */}
        {/* ======================================================== */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-10 lg:px-14 py-4 sm:py-7 bg-white">
          
          {/* Subheader: "Batches" (Left) & Search Bar + ₹0 Coin Capsule (Right) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E5E7EB] gap-3 sm:gap-0">
            <h2 className="text-[15px] font-semibold text-[#1B212D]">
              Batches
            </h2>

            <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              {/* Search Bar matching PW UI */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search for "batches"'
                  className="w-full pl-8 pr-3 py-1.5 h-9 bg-white border border-[#D1D5DB] rounded-[5px] text-xs sm:text-[13px] text-[#1B212D] placeholder:text-[#9CA3AF] outline-none focus:border-gray-500 transition-colors"
                />
              </div>

              {/* Wallet Coin Capsule: (₹) 0 */}
              <div className="flex items-center gap-1.5 px-3 py-1 h-9 bg-white border border-[#F5C242] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)] shrink-0 select-none">
                <div className="w-4 h-4 rounded-full bg-[#F59E0B] text-white font-bold flex items-center justify-center text-[10px]">
                  ₹
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-[#1B212D]">0</span>
              </div>
            </div>
          </div>

          {/* Section: "Popular Courses" Heading */}
          <div className="mt-5 mb-4">
            <h3 className="text-2xl sm:text-[24px] font-bold text-[#1B212D] tracking-tight">
              Popular Courses
            </h3>
          </div>

          {/* Dynamic Batches List (Populated via Admin Portal) */}
          {filteredBatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 pb-12">
              {filteredBatches.map((batchItem) => (
                <div
                  key={batchItem.id}
                  className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-gray-300 transition-colors overflow-hidden flex flex-col justify-between group"
                >
                  {/* 1. Top Banner Graphic */}
                  <div className="relative w-full aspect-[2.08/1] bg-gray-50 overflow-hidden rounded-t-[13px]">
                    <Image
                      src={batchItem.bannerImg || '/batches/banner_umang_term2.png'}
                      alt={batchItem.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  {/* 2. Card Content Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category Tag + Language Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-[#FF621F]">
                          {batchItem.tag || batchItem.grade || 'Academic'}
                        </span>
                        <span className="px-2 py-[2.5px] rounded-[3px] text-[10px] font-semibold text-[#4B5565] border border-[#CFD4DC] uppercase tracking-wide bg-white leading-none">
                          {batchItem.language || 'HINGLISH'}
                        </span>
                      </div>

                      {/* Batch Title */}
                      <h4 className="text-[16px] font-bold text-[#1B212D] mt-1.5 line-clamp-1 tracking-tight leading-snug">
                        {batchItem.title}
                      </h4>

                      {/* Metadata Line 1: Grade */}
                      <div className="flex items-center gap-1.5 text-[12.5px] text-[#4B5565] mt-2">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#6B7280] fill-none stroke-current stroke-2 shrink-0">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
                        </svg>
                        <span>{batchItem.grade || 'All Classes'}</span>
                      </div>

                      {/* Metadata Line 2: Status & Started Date */}
                      <div className="flex items-center gap-1.5 text-[12.5px] text-[#4B5565] mt-1">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
                        <span className="font-medium text-[#1B212D]">
                          Active
                        </span>
                        <span className="text-gray-300 mx-1">|</span>
                        <span>Valid till: <strong className="text-gray-800">{batchItem.validityDate || '31 Mar 2027'}</strong></span>
                      </div>
                    </div>

                    {/* Pricing + Action Buttons */}
                    <div className="pt-3 mt-3 flex items-center justify-between border-t border-gray-100">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[18px] font-bold text-[#1B212D]">
                            ₹{batchItem.price || '1,799'}
                          </span>
                          {batchItem.originalPrice && (
                            <span className="text-[12px] text-[#9CA3AF] font-normal line-through">
                              ₹{batchItem.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            router.push(
                              `/study_v2/payment?title=${encodeURIComponent(
                                batchItem.title
                              )}&price=${batchItem.price || 1799}&originalPrice=${batchItem.originalPrice || 3000}`
                            )
                          }
                          className="bg-[#1B212D] hover:bg-black text-white px-4 py-2 rounded-[6px] text-xs sm:text-[13px] font-semibold shadow-2xs transition-colors cursor-pointer"
                        >
                          Buy Now
                        </button>
                        <button
                          onClick={() =>
                            router.push(
                              `/study_v2/payment?title=${encodeURIComponent(
                                batchItem.title
                              )}&price=${batchItem.price || 1799}&originalPrice=${batchItem.originalPrice || 3000}`
                            )
                          }
                          className="w-[34px] h-[34px] border border-[#D0D5DD] hover:border-gray-400 hover:bg-gray-50 rounded-[6px] flex items-center justify-center text-[#1B212D] transition-colors cursor-pointer"
                          title="View details"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-xs my-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl font-bold">
                📚
              </div>
              <h3 className="text-lg font-bold text-gray-900">No Batches Published Yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Academic batches are currently being scheduled. Check back shortly or contact our counseling team for upcoming program announcements.
              </p>
              <a
                href="https://wa.me/917525009428?text=Hello%20Ansh%20Tutor,%20I%20want%20to%20know%20about%20upcoming%20academic%20batches."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Chat on WhatsApp
              </a>
            </div>
          )}

        </main>

      </div>

    </div>
  )
}
