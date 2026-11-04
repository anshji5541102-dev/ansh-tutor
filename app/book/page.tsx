'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  CheckCircle2,
  Phone,
  Sparkles,
  User,
  GraduationCap,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Building2,
  MessageCircle,
} from 'lucide-react'

export default function BookSessionPage() {
  const [sessionMode, setSessionMode] = useState<'offline' | 'online'>('offline')
  const [studentName, setStudentName] = useState('')
  const [parentName, setParentName] = useState('')
  const [phone, setPhone] = useState('')
  const [studentClass, setStudentClass] = useState('Class 8')
  const [bookingDate, setBookingDate] = useState('')
  const [minDate, setMinDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('10:00 AM – 12:00 PM (Morning)')
  const [subjectConcern, setSubjectConcern] = useState('Complete School Syllabus')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [submittedBooking, setSubmittedBooking] = useState<any | null>(null)

  React.useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setMinDate(today)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setBookingDate(tomorrow.toISOString().split('T')[0])
  }, [])

  const classesList = [
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
  ]

  const timeSlots = [
    '10:00 AM – 12:00 PM (Morning)',
    '02:00 PM – 04:00 PM (Afternoon)',
    '05:00 PM – 07:30 PM (Evening)',
  ]

  const subjects = [
    'Complete School Syllabus',
    'Mathematics Concept Drill',
    'Science & Physics/Chemistry Basics',
    'English Grammar & Communication',
    'Olympiad & Competitive Foundation',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentName.trim() || !parentName.trim() || phone.replace(/\D/g, '').length !== 10) {
      alert('Please fill all required fields with a valid 10-digit mobile number.')
      return
    }

    setLoading(true)

    const bookingRecord = {
      id: `AT-BOOK-${Math.floor(10000 + Math.random() * 90000)}`,
      sessionMode,
      studentName: studentName.trim(),
      parentName: parentName.trim(),
      phone: phone.trim(),
      studentClass,
      bookingDate,
      timeSlot,
      subjectConcern,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage for Admin Console Sync
    try {
      const existing = JSON.parse(localStorage.getItem('ansh_counseling_bookings') || '[]')
      const updated = [bookingRecord, ...existing]
      localStorage.setItem('ansh_counseling_bookings', JSON.stringify(updated))
    } catch {
      // ignore storage error
    }

    setTimeout(() => {
      setSubmittedBooking(bookingRecord)
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] text-gray-900 selection:bg-[#5a4bda] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Breadcrumb & Badge */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-[#5a4bda] text-xs font-bold border border-purple-100">
            <Sparkles className="w-4 h-4 text-[#5a4bda]" />
            <span>100% Free Academic Guidance • ₹0 Fee</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight">
            Book 1-Day Free Offline Demo &amp;{' '}
            <span className="text-[#5a4bda]">1:1 Counselor Slot</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience our interactive digital classrooms at Rajajipuram Campus, Lucknow with a free 1-day offline demo or schedule a 1-on-1 academic counseling session with senior educators.
          </p>

          {/* 4 Feature Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-semibold text-gray-700">
            <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#5a4bda] shrink-0" />
              <span>Offline Campus Tour</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified Faculty</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Classes 1st to 8th</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Instant Confirmation</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOOKING FORM OR CONFIRMATION                             */}
        {/* ======================================================== */}
        {submittedBooking ? (
          <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-10 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Booking Confirmed
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-2">
                Your Slot Has Been Reserved!
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Booking Reference ID:{' '}
                <strong className="text-gray-900 font-mono">{submittedBooking.id}</strong>
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 text-left border border-gray-200 text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Student Name:</span>
                <span className="font-bold text-gray-900">{submittedBooking.studentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Parent / Contact:</span>
                <span className="font-bold text-gray-900">{submittedBooking.parentName} ({submittedBooking.phone})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Class:</span>
                <span className="font-bold text-[#5a4bda]">{submittedBooking.studentClass}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Session Mode:</span>
                <span className="font-bold text-gray-900 uppercase">
                  {submittedBooking.sessionMode === 'offline' ? '🏛️ Offline Campus Visit (Rajajipuram)' : '💻 Online 1:1 Video Session'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Date &amp; Slot:</span>
                <span className="font-bold text-gray-900">{submittedBooking.bookingDate} • {submittedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Main Focus:</span>
                <span className="font-semibold text-gray-800">{submittedBooking.subjectConcern}</span>
              </div>
            </div>

            {/* Offline Campus Location */}
            {submittedBooking.sessionMode === 'offline' && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 text-left flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Campus Address for Visit:</strong>
                  <span>Ansh Tutor Vidyapeeth, Block-B, Rajajipuram, Lucknow, Uttar Pradesh-226017</span>
                </div>
              </div>
            )}

            {/* WhatsApp Confirmation Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/917525009428?text=${encodeURIComponent(
                  `Hello Ansh Tutor! I have booked an academic session.\nBooking ID: ${submittedBooking.id}\nStudent: ${submittedBooking.studentName} (${submittedBooking.studentClass})\nMode: ${submittedBooking.sessionMode}\nDate: ${submittedBooking.bookingDate} (${submittedBooking.timeSlot})\nPlease confirm my slot.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp Instantly</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmittedBooking(null)}
                className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-sm transition-colors"
              >
                Book Another Slot
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-gray-200/90 shadow-xl p-6 sm:p-10 space-y-8"
          >
            {/* Step 1: Mode Selector (Offline vs Online) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                1. Select Session Mode
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSessionMode('offline')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                    sessionMode === 'offline'
                      ? 'border-[#5a4bda] bg-indigo-50/40 ring-2 ring-[#5a4bda]/20 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      sessionMode === 'offline' ? 'bg-[#5a4bda] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm sm:text-base text-gray-900 flex items-center gap-2">
                      <span>Offline 1-Day Demo &amp; Campus Visit</span>
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-600">
                        Recommended
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Rajajipuram Campus, Lucknow • 1-Day Free Classroom Demo, in-person counseling &amp; smart board tour.
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSessionMode('online')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                    sessionMode === 'online'
                      ? 'border-[#5a4bda] bg-indigo-50/40 ring-2 ring-[#5a4bda]/20 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      sessionMode === 'online' ? 'bg-[#5a4bda] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm sm:text-base text-gray-900">
                      Online 1:1 Video Session
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Interactive Live consultation via Zoom or Google Meet from the comfort of your home.
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Student & Parent Details */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                2. Student &amp; Contact Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Aryan Sharma"
                    className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:bg-white focus:border-[#5a4bda] focus:ring-2 focus:ring-[#5a4bda]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:bg-white focus:border-[#5a4bda] focus:ring-2 focus:ring-[#5a4bda]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number (for SMS &amp; Slot) *</label>
                  <div className="flex items-center h-11 border border-gray-200 rounded-xl bg-gray-50 focus-within:bg-white focus-within:border-[#5a4bda] focus-within:ring-2 focus-within:ring-[#5a4bda]/20 overflow-hidden transition-all">
                    <span className="px-3 text-xs font-bold text-gray-600 bg-gray-100 border-r border-gray-200 h-full flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit number"
                      className="w-full h-full px-3 text-sm text-gray-900 outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Class & Focus Area */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                3. Student Class (Classes 1st to 8th)
              </label>

              {/* Class Pill Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-4">
                {classesList.map((cls) => {
                  const isSelected = studentClass === cls
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setStudentClass(cls)}
                      className={`h-11 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#5a4bda] text-white border-[#5a4bda] shadow-sm shadow-[#5a4bda]/20'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {cls}
                    </button>
                  )
                })}
              </div>

              {/* Subject Concern */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Area of Guidance</label>
                <select
                  value={subjectConcern}
                  onChange={(e) => setSubjectConcern(e.target.value)}
                  className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:bg-white focus:border-[#5a4bda] transition-all cursor-pointer"
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 4: Schedule Date & Slot */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                4. Preferred Date &amp; Time Slot
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Select Date</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={minDate || undefined}
                    className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:bg-white focus:border-[#5a4bda] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Select Time Window</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:bg-white focus:border-[#5a4bda] transition-all cursor-pointer"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Optional Specific Notes */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Any Specific Questions / Weak Areas? (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Student needs extra help in Math word problems and geometry; want to understand offline batch timings."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:bg-white focus:border-[#5a4bda] transition-all resize-none"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-13 rounded-xl bg-[#5a4bda] hover:bg-[#4a3bc7] text-white font-bold text-base shadow-lg shadow-[#5a4bda]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                {loading ? (
                  <span>Reserving Slot...</span>
                ) : (
                  <>
                    <span>Confirm Free Slot Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-2.5">
                Zero fees required • You will receive slot confirmation &amp; mentor details on WhatsApp / Call.
              </p>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  )
}
