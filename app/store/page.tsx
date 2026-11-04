'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  BookOpen,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Download,
  Truck,
  ShieldCheck,
  Star,
  ArrowRight,
  Filter,
} from 'lucide-react'

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const books = [
    {
      id: 'module-class-8',
      title: 'Class 8th All-in-One Comprehensive Master Module',
      grade: 'Class 8',
      category: 'Complete Curriculum',
      pages: '480 Pages',
      rating: 4.9,
      reviews: 312,
      price: '₹599',
      originalPrice: '₹1,299',
      freeForEnrolled: true,
      desc: 'Complete theory, 2,500+ solved & unsolved problems, Olympiad questions, and full mind maps for Math & Science.',
      coverBg: 'from-[#5A4BDA] to-[#7B61FF]',
      badge: 'Bestseller',
    },
    {
      id: 'module-class-7',
      title: 'Class 7th Sankalp Practice & Concept Explorer',
      grade: 'Class 7',
      category: 'Complete Curriculum',
      pages: '420 Pages',
      rating: 4.8,
      reviews: 245,
      price: '₹549',
      originalPrice: '₹1,199',
      freeForEnrolled: true,
      desc: 'Chapter-wise NCERT line-by-line solutions, conceptual diagrams, and weekly test drill papers for Class 7.',
      coverBg: 'from-[#1E40AF] to-[#3B82F6]',
      badge: 'Popular',
    },
    {
      id: 'module-class-6',
      title: 'Class 6th Prarambh Foundation Workbook',
      grade: 'Class 6',
      category: 'Complete Curriculum',
      pages: '380 Pages',
      rating: 4.9,
      reviews: 198,
      price: '₹499',
      originalPrice: '₹999',
      freeForEnrolled: true,
      desc: 'Smooth transition workbook bridging primary school basics to middle school science & arithmetic mastery.',
      coverBg: 'from-[#065F46] to-[#10B981]',
      badge: 'Top Rated',
    },
    {
      id: 'formula-handbook',
      title: 'All-Formula Pocket Master Handbook (Class 1-8)',
      grade: 'Class 1-8',
      category: 'Revision & Handbooks',
      pages: '160 Pages',
      rating: 5.0,
      reviews: 580,
      price: '₹199',
      originalPrice: '₹499',
      freeForEnrolled: true,
      desc: 'Every single formula, definition, unit, and shortcut trick indexed for fast revision before school exams.',
      coverBg: 'from-[#C2410C] to-[#F59E0B]',
      badge: 'Must Have',
    },
    {
      id: 'dpp-compilation',
      title: '1,500 Daily Practice Problems (DPP) Spiral Pack',
      grade: 'Class 6-8',
      category: 'Practice Sheets',
      pages: '320 Sheets',
      rating: 4.8,
      reviews: 167,
      price: '₹399',
      originalPrice: '₹899',
      freeForEnrolled: true,
      desc: 'Printed perforated sheets with answers for daily 20-minute timed home practice drills.',
      coverBg: 'from-[#881337] to-[#F43F5E]',
      badge: 'Practice Pack',
    },
    {
      id: 'junior-foundation',
      title: 'Junior Academic Super-Pack (Classes 1st to 5th)',
      grade: 'Class 1-5',
      category: 'Junior School',
      pages: '350 Pages (Full Color)',
      rating: 4.9,
      reviews: 210,
      price: '₹449',
      originalPrice: '₹899',
      freeForEnrolled: true,
      desc: 'Vibrant illustrated workbook teaching mental math tables, English spelling drills, and environmental science.',
      coverBg: 'from-[#0F172A] to-[#334155]',
      badge: 'Illustrated',
    },
  ]

  const categories = ['All', 'Complete Curriculum', 'Revision & Handbooks', 'Practice Sheets', 'Junior School']

  const filtered = selectedCategory === 'All'
    ? books
    : books.filter((b) => b.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] text-gray-900 selection:bg-[#5a4bda] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
            <span>Ansh Tutor Official Publications • Classes 1st to 8th</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
            Academic Modules &amp;{' '}
            <span className="text-[#5a4bda]">Printed Study Kits</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Authored by senior educators with line-by-line NCERT alignment, comprehensive chapter mind maps, and thousands of practice drills. Free for enrolled batch students.
          </p>

          {/* 3 Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs font-semibold text-gray-700">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs">
              <Truck className="w-4 h-4 text-[#5a4bda]" />
              <span>Pan-India Doorstep Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs">
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Instant Digital PDF in App</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>100% Error-Free Solutions</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1B212D] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between p-6 sm:p-7 space-y-5 group"
            >
              <div className="space-y-4">
                {/* Book Graphic Header */}
                <div className={`w-full h-44 rounded-2xl bg-gradient-to-br ${item.coverBg} text-white p-5 flex flex-col justify-between shadow-md relative overflow-hidden group-hover:scale-[1.01] transition-transform`}>
                  <div className="flex items-center justify-between text-[11px] font-black uppercase">
                    <span className="px-2 py-0.5 bg-white/20 rounded backdrop-blur-xs">{item.grade}</span>
                    <span className="px-2 py-0.5 bg-amber-400 text-gray-950 rounded font-black">{item.badge}</span>
                  </div>

                  <div>
                    <div className="text-xs uppercase font-extrabold tracking-wider text-white/80">{item.pages}</div>
                    <div className="text-base sm:text-lg font-black leading-snug mt-1 text-white">{item.title}</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating}</span>
                    <span className="text-gray-400 font-normal">({item.reviews} verified reviews)</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {item.freeForEnrolled && (
                  <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                    ✓ Free Delivery for Enrolled Batch Students
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black text-gray-950">{item.price}</span>
                    <span className="text-xs text-gray-400 line-through">{item.originalPrice}</span>
                  </div>
                  <span className="text-[10px] text-gray-500">Inclusive of all taxes</span>
                </div>

                <a
                  href={`https://wa.me/917525009428?text=${encodeURIComponent(
                    `Hello Ansh Tutor! I want to order the study module: "${item.title}" (${item.grade}) for delivery.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#5a4bda] hover:bg-[#4a3bc7] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Module</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Offline Pickup at Lucknow Campus */}
        <div className="rounded-3xl bg-white border border-gray-200/90 p-8 sm:p-10 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-950">
              Collect Books Directly from Rajajipuram Campus
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
              Parents and students in Lucknow can pick up printed spiral study packs and formula handbooks directly from our campus student desk between 9:00 AM to 7:00 PM.
            </p>
          </div>
          <Link
            href="/book"
            className="px-6 py-3.5 bg-[#5a4bda] hover:bg-[#4a3bc7] text-white font-bold rounded-xl text-sm transition-all whitespace-nowrap shadow-md"
          >
            Schedule Campus Pickup Slot &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
