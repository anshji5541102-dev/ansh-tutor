'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import StudyHeader from '@/components/study/StudyHeader'
import StudySidebar from '@/components/study/StudySidebar'
import {
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Calendar,
  LogOut,
  Building2,
  Menu,
  X,
  Search,
  BookMarked,
} from 'lucide-react'

export default function StudyHomePage() {
  const router = useRouter()
  const { user, profile, selectedClass, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [batchDrawerOpen, setBatchDrawerOpen] = useState(false)
  
  // Batches state matching exact screenshot
  const [selectedBatch, setSelectedBatch] = useState('Half Yearly Marathon Class 8')
  const [tempSelectedBatch, setTempSelectedBatch] = useState('Half Yearly Marathon Class 8')
  const [drawerSearch, setDrawerSearch] = useState('')
  const [starredBatches, setStarredBatches] = useState<string[]>([])
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const userName = profile?.name || user?.displayName || 'Student'

  const allBatches = [
    {
      id: 'half-yearly',
      title: 'Half Yearly Marathon Class 8',
    },
    {
      id: 'booster-course',
      title: 'Booster-Course Grade 8',
    },
    {
      id: 'samridhi-sharma',
      title: 'Samridhi Sharma - Class 8th (2027)',
    },
  ]

  const toggleStar = (batchTitle: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (starredBatches.includes(batchTitle)) {
      setStarredBatches(starredBatches.filter((b) => b !== batchTitle))
    } else {
      setStarredBatches([...starredBatches, batchTitle])
    }
  }

  const handleOpenDrawer = () => {
    setTempSelectedBatch(selectedBatch)
    setDrawerSearch('')
    setBatchDrawerOpen(true)
  }

  const handleApplyBatch = () => {
    setSelectedBatch(tempSelectedBatch)
    setBatchDrawerOpen(false)
  }

  const filteredBatches = allBatches.filter((b) =>
    b.title.toLowerCase().includes(drawerSearch.toLowerCase())
  )

  const starredList = allBatches.filter((b) => starredBatches.includes(b.title))

  // Display title in hero banner with exact truncation if long
  const displayHeroTitle = () => {
    if (selectedBatch === 'Half Yearly Marathon Class 8') {
      return 'Half Yearly Ma...'
    }
    if (selectedBatch.length > 18) {
      return selectedBatch.substring(0, 16) + '...'
    }
    return selectedBatch
  }

  // Batch Offerings section: only All Classes (Digital Books & My Doubts removed as instructed)
  const batchOfferings = [
    {
      id: 'classes',
      title: 'All Classes',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" stroke="none">
            <rect x="2" y="3" width="20" height="14" rx="2" fill="currentColor" fillOpacity="0.25" />
            <path d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5z" fill="currentColor" />
            <polygon points="10,8 16,11 10,14" fill="#FFFFFF" />
            <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      ),
      action: () => router.push('/study_v2/study/all-classes'),
    },
  ]

  // 3 Cards under My Study Zone in 1 line: My Batches, My History, Bookmarks
  const studyZoneCards = [
    {
      id: 'my-batches',
      title: 'My Batches',
      desc: 'View list of batches in which you are enrolled',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#4F46E5] fill-none stroke-current stroke-2">
          <rect x="2" y="3" width="20" height="13" rx="2" />
          <line x1="8" y1="20" x2="16" y2="20" />
          <line x1="12" y1="16" x2="12" y2="20" />
          <path d="M6 8l6-3 6 3-6 3-6-3z" fill="currentColor" fillOpacity="0.2" />
          <path d="M8 9.5v2.5c0 1.5 2 2.5 4 2.5s4-1 4-2.5v-2.5" />
        </svg>
      ),
      onClick: () => router.push('/study_v2/study/my-batches'),
    },
    {
      id: 'history',
      title: 'My History',
      desc: 'View your recent learning and watched classes',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#64748B] fill-none stroke-current stroke-2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <polyline points="3 3 3 8 8 8" />
          <polyline points="12 7 12 12 15 15" />
        </svg>
      ),
      onClick: () => router.push('/study_v2/study/recent-learning'),
    },
    {
      id: 'bookmarks',
      title: 'Bookmarks',
      desc: 'View the list of your saved questions & formulas',
      hasChevron: true,
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#64748B] fill-none stroke-current stroke-2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      ),
      onClick: () => router.push('/study_v2/study/bookmarks'),
    },
  ]

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. TOP HEADER (Ansh Tutor Brand Bar) */}
      <StudyHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. BODY LAYOUT: WIDER SIDEBAR + GENEROUS SPACIOUS CONTENT */}
      <div className="flex flex-1 overflow-hidden relative">
        <StudySidebar
          activeTab="study"
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* ======================================================== */}
        {/* RIGHT MAIN CONTENT AREA (Generous, Fresh, Spacious)      */}
        {/* ======================================================== */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 bg-white">
          
          {/* Subheader: "Study" (Left) & Stats / Rewards Capsules (Right) */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-8">
            <h2 className="text-[17px] font-bold text-[#1B212D] tracking-tight">
              Study
            </h2>

            {/* Top Reward/Streak Badges matching PW Screenshot 1 */}
            <div className="flex items-center gap-4 sm:gap-6 select-none">
              
              {/* 1. Gift Icon */}
              <button
                onClick={() => setActiveModal('Daily Rewards & Mystery Box')}
                className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
                title="Rewards"
              >
                <div className="w-6 h-6 flex items-center justify-center text-[#F59E0B] text-xl">
                  🎁
                </div>
              </button>

              {/* 2. Streak Flame: (🔥) 0 */}
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <span className="text-base">🔥</span>
                <span>0</span>
              </div>

              {/* 3. XP Badge: (XP) 0 */}
              <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                <span className="px-2 py-0.5 rounded-[5px] bg-[#E0E7FF] text-[#4F46E5] text-[11px] font-black">
                  XP
                </span>
                <span>0</span>
              </div>

              {/* 4. Wallet Coin: (₹) 0 */}
              <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                <div className="w-5 h-5 rounded-full bg-[#F59E0B] text-white flex items-center justify-center text-[11px]">
                  ₹
                </div>
                <span>0</span>
              </div>

              {/* 5. Notification Bell with dot */}
              <button
                onClick={() => setActiveModal('Notifications: All caught up!')}
                className="relative text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                title="Notifications"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
              </button>

            </div>
          </div>

          <div className="space-y-10">
            
            {/* ======================================================== */}
            {/* 1. DARK HERO BANNER ("YOUR BATCH")                       */}
            {/* ======================================================== */}
            <div className="relative rounded-[22px] bg-[#1E232E] text-white p-7 sm:p-9 overflow-hidden shadow-lg min-h-[150px] flex items-center justify-between">
              {/* Subtle ambient lighting */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(ellipse at 85% 25%, rgba(255,255,255,0.25) 0%, transparent 60%), radial-gradient(ellipse at 15% 75%, rgba(90,75,218,0.35) 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="text-[12px] font-bold text-[#94A3B8] tracking-widest uppercase mb-2">
                  YOUR BATCH
                </div>
                
                {/* Click to open Slide-Over Drawer */}
                <button
                  onClick={handleOpenDrawer}
                  className="flex items-center gap-3 text-2xl sm:text-[30px] font-extrabold text-white hover:text-gray-200 transition-colors cursor-pointer group text-left"
                >
                  <span>{displayHeroTitle()}</span>
                  <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
                </button>
              </div>

              {/* Right Three Dots Options */}
              <button
                onClick={handleOpenDrawer}
                className="p-3 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                title="Switch or view batch"
              >
                <MoreVertical className="w-6 h-6" />
              </button>
            </div>

            {/* ======================================================== */}
            {/* 2. SECTION: "Batch Offerings" (Compact, restrained width) */}
            {/* ======================================================== */}
            <div>
              <h3 className="text-[19px] sm:text-[21px] font-bold text-[#1B212D] tracking-tight mb-3.5">
                Batch Offerings
              </h3>

              <div className="flex">
                {batchOfferings.map((item) => (
                  <div
                    key={item.id}
                    onClick={item.action}
                    className="w-full sm:w-[310px] max-w-[310px] bg-white rounded-[16px] border border-[#E5E7EB] px-5 py-3.5 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-gray-300 transition-colors cursor-pointer group h-[76px] sm:h-[80px]"
                  >
                    <div className="flex items-center gap-3.5">
                      {item.icon}
                      <span className="font-bold text-[15px] sm:text-[16px] text-[#1B212D] group-hover:text-[#5A4BDA] transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* ======================================================== */}
            {/* 3. SECTION: "Upcoming Events (0)"                        */}
            {/* ======================================================== */}
            <div>
              <h3 className="text-[21px] sm:text-[23px] font-bold text-[#1B212D] tracking-tight mb-4">
                Upcoming Events (0)
              </h3>

              {/* Empty state banner */}
              <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-[18px] px-7 py-5 flex items-center gap-4 h-[84px]">
                <Calendar className="w-6 h-6 text-gray-500 shrink-0" />
                <span className="text-[15px] font-medium text-gray-700">
                  Today's live events have ended
                </span>
              </div>

              {/* View Weekly Schedule button (Routes to /study_v2/study/weekly-schedule) */}
              <div className="flex justify-center mt-7 mb-4">
                <button
                  onClick={() => router.push('/study_v2/study/weekly-schedule')}
                  className="border border-[#5A4BDA] hover:bg-[#5A4BDA]/5 text-[#5A4BDA] font-semibold text-sm sm:text-[15px] px-8 py-3.5 rounded-xl transition-colors cursor-pointer"
                >
                  View Weekly Schedule
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* 4. SECTION: "My Study Zone" (From Image 2 attached)      */}
            {/* ======================================================== */}
            <div className="pt-2">
              <h3 className="text-[23px] sm:text-[25px] font-bold text-[#1B212D] tracking-tight mb-5">
                My Study Zone
              </h3>

              {/* 3 cards in 1 line: My Batches, My History, Bookmarks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {studyZoneCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={card.onClick}
                    className="bg-white rounded-[20px] border border-[#E5E7EB] p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-gray-300 transition-colors cursor-pointer group flex flex-col justify-between min-h-[155px]"
                  >
                    <div>
                      {/* Top Icon & Optional Chevron */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 flex items-center justify-start">
                          {card.icon}
                        </div>
                        {card.hasChevron && (
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors" />
                        )}
                      </div>

                      {/* Card Title */}
                      <h4 className="text-[18px] font-bold text-[#1B212D] group-hover:text-[#5A4BDA] transition-colors leading-snug">
                        {card.title}
                      </h4>

                      {/* Card Description */}
                      <p className="text-[13px] text-[#6B7280] mt-1.5 line-clamp-1 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>

      </div>

      {/* ======================================================== */}
      {/* 5. SLIDE-OVER DRAWER ("Select your batch") - EXACT PW UI  */}
      {/* ======================================================== */}
      {batchDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <div
            onClick={() => setBatchDrawerOpen(false)}
            className="absolute inset-0 bg-black/55 backdrop-blur-xs animate-backdrop-fade cursor-pointer"
          />

          {/* Right Drawer Panel matching drawer_full_ref.png */}
          <div className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[350px] md:w-[370px] bg-white shadow-2xl flex flex-col justify-between animate-drawer-slide">
            
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
              <h3 className="text-[17px] font-bold text-[#1B212D] tracking-tight">
                Select your batch
              </h3>
              <button
                onClick={() => setBatchDrawerOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                aria-label="Close batch drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              
              {/* Search for your batches input */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={drawerSearch}
                  onChange={(e) => setDrawerSearch(e.target.value)}
                  placeholder="Search for your batches"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#D1D5DB] rounded-[6px] text-[13px] text-gray-900 placeholder:text-[#9CA3AF] outline-none focus:border-[#5A4BDA] transition-colors"
                />
              </div>

              {/* Starred Batches (0) */}
              <div>
                <div className="text-[13px] font-bold text-[#1B212D] mb-2">
                  Starred Batches ({starredList.length})
                </div>

                {starredList.length === 0 ? (
                  <div className="bg-[#F8F9FA] rounded-[6px] py-3 px-3 text-center">
                    <p className="text-[12px] text-[#6B7280]">
                      Tap the &ldquo;&#9734;&rdquo; icon on any batch to bookmark it
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {starredList.map((batch) => {
                      const isSelected = tempSelectedBatch === batch.title
                      return (
                        <div
                          key={batch.id}
                          onClick={() => setTempSelectedBatch(batch.title)}
                          className={`px-3 py-2.5 rounded-[6px] transition-colors cursor-pointer flex items-center justify-between ${
                            isSelected ? 'bg-[#EDE9FE]' : 'bg-white hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            <button
                              onClick={(e) => toggleStar(batch.title, e)}
                              className="text-amber-400 p-0.5 cursor-pointer text-base leading-none"
                              title="Unstar batch"
                            >
                              ★
                            </button>
                            <span className="text-[13px] font-medium text-[#1B212D] truncate">
                              {batch.title}
                            </span>
                          </div>

                          <div className="shrink-0 ml-2">
                            {isSelected ? (
                              <div className="w-4 h-4 rounded-full border-2 border-[#5A4BDA] flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-[#5A4BDA]" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-gray-300" />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Enrolled Batches */}
              <div>
                <div className="text-[13px] font-bold text-[#1B212D] mb-2">
                  All Batches ({filteredBatches.length})
                </div>

                <div className="space-y-1 border-t border-gray-100 pt-1">
                  {filteredBatches.map((batch) => {
                    const isSelected = tempSelectedBatch === batch.title
                    const isStarred = starredBatches.includes(batch.title)

                    return (
                      <div
                        key={batch.id}
                        onClick={() => setTempSelectedBatch(batch.title)}
                        className={`px-3 py-2.5 rounded-[6px] transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#EDE9FE]'
                            : 'bg-white hover:bg-gray-50 border-b border-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <button
                            onClick={(e) => toggleStar(batch.title, e)}
                            className={`p-0.5 cursor-pointer text-base leading-none transition-colors ${
                              isStarred
                                ? 'text-amber-400'
                                : 'text-gray-400 hover:text-amber-400'
                            }`}
                            title={isStarred ? 'Unstar batch' : 'Star batch'}
                          >
                            {isStarred ? '★' : '☆'}
                          </button>
                          <span className="text-[13px] font-medium text-[#1B212D] truncate">
                            {batch.title}
                          </span>
                        </div>

                        {/* Exact PW Radio Button */}
                        <div className="shrink-0 ml-2">
                          {isSelected ? (
                            <div className="w-4 h-4 rounded-full border-2 border-[#5A4BDA] flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-[#5A4BDA]" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-gray-300" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Drawer Bottom Actions: Continue Button */}
            <div className="px-5 pb-5 pt-3 bg-white border-t border-gray-100">
              <button
                onClick={handleApplyBatch}
                className="w-full py-2.5 bg-[#1B212D] hover:bg-black text-white text-[13px] font-bold rounded-[6px] shadow-sm transition-colors cursor-pointer"
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Interactive Feature Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-backdrop-fade">
          <div className="relative w-[480px] max-w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-7 animate-dialog-enter">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#5A4BDA] flex items-center justify-center">
                <BookMarked className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{activeModal}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Feature loaded and synced with your Ansh Tutor student profile. Interactive modules are ready for live classroom learning and revision.
              </p>
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-lg bg-[#1B212D] text-white text-xs font-semibold hover:bg-black transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
