'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Code,
  Calculator,
  Languages,
  FlaskConical,
  BrainCircuit,
  PenTool,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Award,
  Video,
} from 'lucide-react'

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const skillsCourses = [
    {
      id: 'vedic-math',
      title: 'Vedic Math & Speed Calculation',
      category: 'Mathematics',
      grades: 'Classes 3rd to 8th',
      duration: '8 Weeks • 24 Live Sessions',
      instructor: 'Vedic Math Master Faculty',
      desc: 'Master lightning-fast mental arithmetic, squares, cubes, and division tricks without pen & paper.',
      highlights: ['Calculate 10x faster than traditional methods', 'Overcome math phobia completely', 'Certificate of Completion'],
      icon: <Calculator className="w-6 h-6 text-indigo-600" />,
      badge: 'Bestseller',
      price: 'Included Free with Batch Enrollment',
    },
    {
      id: 'kids-coding',
      title: 'Coding & Logic Building for Kids',
      category: 'Coding & Tech',
      grades: 'Classes 4th to 8th',
      duration: '10 Weeks • 30 Hands-on Labs',
      instructor: 'Tech & AI Educator',
      desc: 'Learn visual programming with Scratch, algorithmic problem solving, and building your first playable game.',
      highlights: ['Block coding to Python transition', 'Build 5 real games & animations', 'Computational thinking badge'],
      icon: <Code className="w-6 h-6 text-emerald-600" />,
      badge: 'Trending',
      price: 'Included Free with Batch Enrollment',
    },
    {
      id: 'spoken-english',
      title: 'Spoken English & Stage Confidence',
      category: 'Communication',
      grades: 'Classes 1st to 8th',
      duration: '6 Weeks • 18 Interactive Sessions',
      instructor: 'Senior Language Trainer',
      desc: 'Overcome hesitation and speak fluent, grammatically sound English in school presentations and daily life.',
      highlights: ['Public speaking & debate drills', 'Pronunciation & vocabulary mastery', 'Weekly 1:1 speaking practice'],
      icon: <Languages className="w-6 h-6 text-pink-600" />,
      badge: 'Top Rated',
      price: 'Included Free with Batch Enrollment',
    },
    {
      id: 'science-experiments',
      title: 'Practical Science & DIY Robotics',
      category: 'Science',
      grades: 'Classes 5th to 8th',
      duration: '8 Weeks • 16 Hands-on Labs',
      instructor: 'Science Lab Demonstrator',
      desc: 'Learn physics and chemistry concepts by doing real hands-on experiments, circuit building, and optics models.',
      highlights: ['Smart classroom live demonstration', 'Safety-tested DIY projects at home', 'Concept clarity for school exams'],
      icon: <FlaskConical className="w-6 h-6 text-amber-600" />,
      badge: 'Interactive',
      price: 'Included Free with Batch Enrollment',
    },
    {
      id: 'olympiad-reasoning',
      title: 'Olympiad Mental Ability & Reasoning',
      category: 'Competitive',
      grades: 'Classes 6th to 8th',
      duration: '12 Weeks • 36 Rigorous Sessions',
      instructor: 'Olympiad Ranker Mentor',
      desc: 'Specialized preparation for IMO, NSO, NTSE, and Vidyarthi Vigyan Manthan competitive examinations.',
      highlights: ['Chapter-wise PYQs from last 10 years', 'Pattern recognition & logical puzzles', 'National rank prediction test series'],
      icon: <BrainCircuit className="w-6 h-6 text-purple-600" />,
      badge: 'High Yield',
      price: 'Included Free with Batch Enrollment',
    },
    {
      id: 'handwriting-writing',
      title: 'Speed Handwriting & Creative Writing',
      category: 'Creative',
      grades: 'Classes 1st to 6th',
      duration: '4 Weeks • 12 Practice Labs',
      instructor: 'Calligraphy & Writing Specialist',
      desc: 'Transform messy handwriting into neat, legible cursive script while building creative essay writing skills.',
      highlights: ['Correct pen grip & posture training', 'Speed writing for school exam halls', 'Storytelling & paragraph drafting'],
      icon: <PenTool className="w-6 h-6 text-cyan-600" />,
      badge: 'Foundational',
      price: 'Included Free with Batch Enrollment',
    },
  ]

  const categories = ['All', 'Mathematics', 'Coding & Tech', 'Communication', 'Science', 'Competitive']

  const filtered = activeCategory === 'All'
    ? skillsCourses
    : skillsCourses.filter((c) => c.category === activeCategory)

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] text-gray-900 selection:bg-[#5a4bda] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-[#5a4bda] text-xs font-bold border border-indigo-100">
            <Sparkles className="w-4 h-4 text-[#5a4bda]" />
            <span>Ansh Tutor Skills Academy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
            21st Century Skills &amp;{' '}
            <span className="text-[#5a4bda]">Olympiad Preparation</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Go beyond regular school textbooks. Equip your child with Vedic Mathematics, coding, public speaking, and competitive aptitude designed for early school achievers.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1B212D] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between p-6 sm:p-7 space-y-5 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    {course.icon}
                  </div>
                  <span className="text-[11px] font-black uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {course.badge}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-[#5a4bda] uppercase tracking-wider">{course.grades}</span>
                  <h3 className="text-lg font-bold text-gray-950 mt-1 group-hover:text-[#5a4bda] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {course.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  {course.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Fee Status</div>
                  <div className="text-xs font-extrabold text-emerald-700">{course.price}</div>
                </div>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#5a4bda] hover:bg-[#4a3bc7] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  <span>Register Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Offline Hub Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#17183B] to-[#2E2864] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Physical Skill Workshops</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">Join Our Weekend Workshops at Lucknow Campus</h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Every Saturday &amp; Sunday, our Rajajipuram campus hosts practical robotics, Vedic math tournaments, and creative writing clinics for enrolled students.
            </p>
          </div>
          <Link
            href="/book"
            className="px-6 py-3.5 bg-white text-[#17183B] hover:bg-gray-100 font-extrabold rounded-xl text-sm transition-all whitespace-nowrap shadow-lg"
          >
            Book Weekend Workshop Slot &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
