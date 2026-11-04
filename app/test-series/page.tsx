'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  FileCheck,
  Sparkles,
  Clock,
  Award,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Brain,
  BarChart3,
  Calendar,
} from 'lucide-react'

export default function TestSeriesPage() {
  const [selectedGrade, setSelectedGrade] = useState('Class 8')

  const testPacks = [
    {
      id: 'ts-class-8',
      title: 'Class 8th All-India Academic CBT & School Test Series',
      grade: 'Class 8',
      totalTests: '36 Tests (24 Chapter-wise + 12 Full Mocks)',
      duration: '90 Mins / Test',
      marks: '100 Marks',
      syllabus: 'Complete CBSE, ICSE & Olympiad Syllabus',
      features: ['Instant AI Rank Prediction', 'Question-by-Question Detailed Video Solutions', 'Weakness Diagnostic Analytics'],
      badge: 'Active Series',
    },
    {
      id: 'ts-class-7',
      title: 'Class 7th Sankalp Diagnostic & Mock Assessment Series',
      grade: 'Class 7',
      totalTests: '30 Tests (20 Chapter-wise + 10 Full Mocks)',
      duration: '75 Mins / Test',
      marks: '80 Marks',
      syllabus: 'Math, Science & English Full Curriculum',
      features: ['Real Exam CBT Interface Simulation', 'Time Management Speed Tracker', 'Parent Analytics Report Card'],
      badge: 'Active Series',
    },
    {
      id: 'ts-class-6',
      title: 'Class 6th Prarambh Middle School Test Series',
      grade: 'Class 6',
      totalTests: '24 Tests (16 Chapter-wise + 8 Full Mocks)',
      duration: '60 Mins / Test',
      marks: '60 Marks',
      syllabus: 'Foundational Math, Science & Logical Reasoning',
      features: ['Gentle conceptual grading', 'Step-by-step doubt clearing desk', 'Unlimited practice re-attempts'],
      badge: 'Active Series',
    },
    {
      id: 'ts-class-1-5',
      title: 'Primary School Mind-Drill & Tables Quiz Series (Class 1-5)',
      grade: 'Class 1-5',
      totalTests: '20 Fun Interactive Quizzes',
      duration: '30 Mins / Quiz',
      marks: '40 Marks',
      syllabus: 'Mental Math Tables, Phonics, Spelling & Environmental Science',
      features: ['Fun gamified visual format', 'Stars & badges reward system', 'Confidence building with zero stress'],
      badge: 'Junior Series',
    },
  ]

  const stats = [
    { number: '15,000+', label: 'Mock Tests Attempted' },
    { number: '98.4%', label: 'Exam Accuracy Improvement' },
    { number: '100%', label: 'Detailed Step-by-Step Solutions' },
    { number: '₹0 Fee', label: 'Included Free with All Batches' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] text-gray-900 selection:bg-[#5a4bda] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-[#5a4bda] text-xs font-bold border border-purple-100">
            <FileCheck className="w-4 h-4 text-[#5a4bda]" />
            <span>All-India Academic Examination System • Classes 1st to 8th</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
            Academic Mock Tests &amp;{' '}
            <span className="text-[#5a4bda]">Olympiad CBT Series</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Eliminate exam hall anxiety and silly mistakes. Practice with standardized chapter-wise tests and full length mock papers designed to simulate real school finals and national Olympiads.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#5a4bda]">{s.number}</div>
              <div className="text-xs text-gray-500 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Test Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testPacks.map((pack) => (
            <div
              key={pack.id}
              className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#5a4bda] uppercase tracking-wider">{pack.grade}</span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {pack.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-950 group-hover:text-[#5a4bda] transition-colors leading-snug">
                  {pack.title}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-2xl border border-gray-200/60 font-semibold">
                  <div><strong>Total:</strong> {pack.totalTests}</div>
                  <div><strong>Duration:</strong> {pack.duration}</div>
                  <div><strong>Marks:</strong> {pack.marks}</div>
                  <div><strong>Format:</strong> Online CBT &amp; OMR</div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  {pack.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    Free With Batch
                  </span>
                </div>

                <Link
                  href="/study_v2/test-series"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#5a4bda] hover:bg-[#4a3bc7] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  <span>Start Mock Test</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Offline OMR Testing Desk */}
        <div className="rounded-3xl bg-gradient-to-r from-[#17183B] to-[#25225E] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Offline Test Halls</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">Physical Sunday OMR Tests at Rajajipuram Campus</h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Experience the authentic board exam hall atmosphere with physical question papers, official OMR answer sheets, and invigilator supervision every 14 days.
            </p>
          </div>
          <Link
            href="/book"
            className="px-6 py-3.5 bg-white text-[#17183B] hover:bg-gray-100 font-extrabold rounded-xl text-sm transition-all whitespace-nowrap shadow-lg"
          >
            Register for Offline Sunday Test &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
