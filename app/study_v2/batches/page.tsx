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
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const userName = profile?.name || user?.displayName || 'Student'

  // Single Sample Paid Course dynamically reflecting selected class
  const sampleCourse = {
    id: 1,
    bannerImg: '/batches/banner_umang_term2.png',
    tag: selectedClass || 'Class 8',
    tagColor: 'text-[#FF621F]',
    language: 'HINGLISH',
    title: `Ansh Master Batch 2027 (${selectedClass || 'Class 8'})`,
    grade: selectedClass || 'Class 8',
    status: 'Ongoing',
    startedDate: "5th Oct'26",
    price: '₹1,499',
    originalPrice: '₹3,000',
    discount: '50% OFF',
    ctaText: 'Buy Now',
    isFree: false,
    offerBanner: {
      badge: 'Gyan Utsav',
      text: 'Limited time offer valid till 1st Nov',
    },
  }

  const isCourseVisible = sampleCourse.title
    .toLowerCase()
    .includes(searchQuery.toLowerCase())

  const handleTestPurchase = () => {
    setPaymentSuccess(true)
    setTimeout(() => {
      setCheckoutModalOpen(false)
      setPaymentSuccess(false)
    }, 2200)
  }

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
        <main className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-5 sm:py-7 bg-white">
          
          {/* Subheader: "Batches" (Left) & Search Bar + ₹0 Coin Capsule (Right) */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <h2 className="text-[15px] font-semibold text-[#1B212D]">
              Batches
            </h2>

            <div className="flex items-center gap-3">
              {/* Search Bar matching PW UI */}
              <div className="relative w-52 sm:w-64">
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

          {/* Single Sample Paid Course for Testing */}
          {isCourseVisible ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 pb-12">
              <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-gray-300 transition-colors overflow-hidden flex flex-col justify-between group">
                
                {/* 1. Top Banner Graphic */}
                <div className="relative w-full aspect-[2.08/1] bg-gray-50 overflow-hidden rounded-t-[13px]">
                  <Image
                    src={sampleCourse.bannerImg}
                    alt={sampleCourse.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>

                {/* 2. Card Content Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Tag + Language Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[13px] font-semibold ${sampleCourse.tagColor}`}>
                        {sampleCourse.tag}
                      </span>
                      <span className="px-2 py-[2.5px] rounded-[3px] text-[10px] font-semibold text-[#4B5565] border border-[#CFD4DC] uppercase tracking-wide bg-white leading-none">
                        {sampleCourse.language}
                      </span>
                    </div>

                    {/* Batch Title */}
                    <h4 className="text-[16px] font-bold text-[#1B212D] mt-1.5 line-clamp-1 tracking-tight leading-snug">
                      {sampleCourse.title}
                    </h4>

                    {/* Metadata Line 1: Grade */}
                    <div className="flex items-center gap-1.5 text-[12.5px] text-[#4B5565] mt-2">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#6B7280] fill-none stroke-current stroke-2 shrink-0">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
                      </svg>
                      <span>{sampleCourse.grade}</span>
                    </div>

                    {/* Metadata Line 2: Status & Started Date */}
                    <div className="flex items-center gap-1.5 text-[12.5px] text-[#4B5565] mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#E11D48] shrink-0" />
                      <span className="font-medium text-[#1B212D]">
                        {sampleCourse.status}
                      </span>
                      <span className="text-gray-300 mx-1">|</span>
                      <span>Started on {sampleCourse.startedDate}</span>
                    </div>
                  </div>

                  {/* Pricing + Action Buttons */}
                  <div className="pt-3 mt-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[18px] font-bold text-[#1B212D]">
                          {sampleCourse.price}
                        </span>
                        <span className="text-[12px] text-[#9CA3AF] font-normal line-through">
                          {sampleCourse.originalPrice}
                        </span>
                      </div>
                      <span className="text-[12px] font-bold text-[#16A34A] block mt-0.5 leading-none">
                        {sampleCourse.discount}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          router.push(
                            `/study_v2/payment?title=${encodeURIComponent(
                              sampleCourse.title
                            )}&price=1799&originalPrice=3000`
                          )
                        }
                        className="bg-[#1B212D] hover:bg-black text-white px-4 py-2 rounded-[6px] text-xs sm:text-[13px] font-semibold shadow-2xs transition-colors cursor-pointer"
                      >
                        {sampleCourse.ctaText}
                      </button>
                      <button
                        onClick={() =>
                          router.push(
                            `/study_v2/payment?title=${encodeURIComponent(
                              sampleCourse.title
                            )}&price=1799&originalPrice=3000`
                          )
                        }
                        className="w-[34px] h-[34px] border border-[#D0D5DD] hover:border-gray-400 hover:bg-gray-50 rounded-[6px] flex items-center justify-center text-[#1B212D] transition-colors cursor-pointer"
                        title="View details"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Speech Bubble Offer: Gyan Utsav */}
                  <div className="relative mt-3.5 bg-[#FFF2E8] rounded-[6px] px-2.5 py-1.5 flex items-center gap-2">
                    {/* Upward speech bubble triangle caret */}
                    <div className="absolute -top-1.5 left-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-[#FFF2E8]" />
                    <span className="bg-[#FF621F] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] tracking-wide shrink-0 uppercase leading-none">
                      {sampleCourse.offerBanner.badge}
                    </span>
                    <span className="text-[11px] font-medium text-[#1B212D] truncate">
                      {sampleCourse.offerBanner.text}
                    </span>
                  </div>

                </div>

              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-gray-500">
              <p className="text-base font-medium">No courses found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs text-[#5A4BDA] font-semibold hover:underline"
              >
                Clear search filter
              </button>
            </div>
          )}

        </main>

      </div>

      {/* ======================================================== */}
      {/* 3. TEST CHECKOUT MODAL (For testing course purchase)    */}
      {/* ======================================================== */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-backdrop-fade">
          <div className="relative w-[480px] max-w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-7 animate-dialog-enter">
            <button
              onClick={() => {
                setCheckoutModalOpen(false)
                setPaymentSuccess(false)
              }}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {paymentSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Enrolled Successfully!
                </h3>
                <p className="text-xs text-gray-600 max-w-xs mx-auto">
                  You now have complete access to {sampleCourse.title}. Classes will commence as per schedule.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#FF621F] uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Test Mode Checkout</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                  {sampleCourse.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Full Course Access &bull; Daily Live Classes &bull; Tests & Notes
                </p>

                <div className="my-5 p-4 rounded-xl bg-gray-50 border border-gray-200/80 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Batch Fee:</span>
                    <span className="line-through">{sampleCourse.originalPrice}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Special Discount ({sampleCourse.discount}):</span>
                    <span>-₹1,501</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-extrabold text-gray-900">
                    <span>Total Amount:</span>
                    <span className="text-[#1B212D] text-base">{sampleCourse.price}</span>
                  </div>
                </div>

                <button
                  onClick={handleTestPurchase}
                  className="w-full py-3 rounded-lg bg-[#1B212D] hover:bg-black text-white text-sm font-bold shadow-md transition-colors cursor-pointer"
                >
                  Pay {sampleCourse.price} (Complete Test Enrollment)
                </button>
                <p className="text-[11px] text-gray-400 text-center mt-2.5">
                  Sandbox Testing Mode &bull; No actual credit card charge
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
