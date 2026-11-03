'use client'

import React, { useState, useEffect } from 'react'
import StudyHeader from '@/components/study/StudyHeader'
import StudySidebar from '@/components/study/StudySidebar'
import { useAuth } from '@/context/AuthContext'
import {
  MessageCircle,
  PhoneCall,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
} from 'lucide-react'

interface SupportTicket {
  ticketId: string
  name: string
  phone: string
  email?: string
  category: string
  message: string
  priority: string
  status: string
  branch: string
  createdAt: string
  estimatedResponse: string
}

export default function HelpSupportPage() {
  const { user, profile } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Form fields
  const [studentName, setStudentName] = useState('')
  const [studentPhone, setStudentPhone] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [queryCategory, setQueryCategory] = useState('Batch Access & Live Classes')
  const [priority, setPriority] = useState('High')
  const [queryText, setQueryText] = useState('')

  // State management
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [latestTicket, setLatestTicket] = useState<SupportTicket | null>(null)
  const [recentTickets, setRecentTickets] = useState<SupportTicket[]>([])
  const [copiedId, setCopiedId] = useState(false)

  // Auto-populate student info from AuthContext
  useEffect(() => {
    if (profile?.name || user?.displayName) {
      setStudentName(profile?.name || user?.displayName || '')
    }
    if (profile?.phone || user?.phoneNumber) {
      const ph = (profile?.phone || user?.phoneNumber || '').replace(/^\+91/, '')
      setStudentPhone(ph)
    }
    if (profile?.email || user?.email) {
      setStudentEmail(profile?.email || user?.email || '')
    }
  }, [profile, user])

  // Load recent tickets from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ansh_support_tickets_v1')
      if (stored) {
        setRecentTickets(JSON.parse(stored))
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    // Validation
    if (!studentName.trim()) {
      setFormError('Please enter your full name')
      return
    }

    const cleanPhone = studentPhone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number')
      return
    }

    if (queryText.trim().length < 5) {
      setFormError('Please describe your query in at least 5 characters')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/support/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: studentName.trim(),
          phone: cleanPhone,
          email: studentEmail.trim() || undefined,
          category: queryCategory,
          message: queryText.trim(),
          priority,
          studentId: profile?.id || user?.uid || null,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit support request. Please try again.')
      }

      const newTicket: SupportTicket = data.ticket
      setLatestTicket(newTicket)

      // Save to local storage for quick tracking
      const updatedList = [newTicket, ...recentTickets.slice(0, 4)]
      setRecentTickets(updatedList)
      try {
        localStorage.setItem('ansh_support_tickets_v1', JSON.stringify(updatedList))
      } catch (err) {
        // ignore storage errors
      }

      // Reset form message
      setQueryText('')
    } catch (err: any) {
      setFormError(err.message || 'Network error. Please try again or WhatsApp us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyTicket = (ticketId: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(ticketId)
      setCopiedId(true)
      setTimeout(() => setCopiedId(false), 2000)
    }
  }

  const handleResetForm = () => {
    setLatestTicket(null)
    setFormError(null)
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. TOP HEADER */}
      <StudyHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. BODY: STILL SIDEBAR ON LEFT + SCROLLABLE CONTENT ON RIGHT */}
      <div className="flex flex-1 overflow-hidden relative">
        <StudySidebar
          activeTab="help-support"
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* RIGHT MAIN CONTENT (Scrolls smoothly while left sidebar stays completely still) */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 bg-white">
          
          {/* Subheader: "Help & Support" (Left) & XP 0 (Right) */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-8">
            <div>
              <h2 className="text-[17px] font-bold text-[#1B212D] tracking-tight">
                Help &amp; Support
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                24x7 Student Care &bull; Ansh Tutor &bull; Rajajipuram Campus, Lucknow
              </p>
            </div>

            {/* XP 0 Badge */}
            <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 select-none">
              <span className="px-2 py-0.5 rounded-[5px] bg-[#E0E7FF] text-[#4F46E5] text-[11px] font-black">
                XP
              </span>
              <span>0</span>
            </div>
          </div>

          <div className="space-y-8 max-w-5xl">
            
            {/* 3 Quick Contact Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/917525009428"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-[18px] border border-[#E5E7EB] bg-white hover:border-emerald-400 transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h4 className="text-[16px] font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  WhatsApp Support
                </h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Chat directly with academic coordinators &amp; mentors on WhatsApp.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-3">
                  +91 75250 09428 &bull; Chat Now &rarr;
                </span>
              </a>

              {/* Helpline Call Card */}
              <a
                href="tel:+917525009428"
                className="p-6 rounded-[18px] border border-[#E5E7EB] bg-white hover:border-[#5A4BDA] transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#5A4BDA] flex items-center justify-center mb-4">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h4 className="text-[16px] font-bold text-gray-900 group-hover:text-[#5A4BDA] transition-colors">
                  Student Helpline
                </h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Direct student counseling &amp; academic assistance hotline.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5A4BDA] mt-3">
                  +91 75250 09428 &bull; Call Now
                </span>
              </a>

              {/* Email Support Card */}
              <a
                href="mailto:support@anshtutor.gleeze.com"
                className="p-6 rounded-[18px] border border-[#E5E7EB] bg-white hover:border-blue-400 transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="text-[16px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Support Email
                </h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Official inquiries, batch transfers, admissions &amp; parent feedback.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 mt-3 truncate">
                  support@anshtutor.gleeze.com &rarr;
                </span>
              </a>

            </div>

            {/* Offline Campus Desk Banner: ONLY ONE BRANCH IN LUCKNOW (Rajajipuram) */}
            <div className="p-6 rounded-[18px] bg-[#F8F9FB] border border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100/70 text-[#5A4BDA] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-gray-900">
                      Rajajipuram Campus, Lucknow
                    </h4>
                    <span className="text-[10px] font-bold bg-[#EDE9FE] text-[#5A4BDA] px-2 py-0.5 rounded-full">
                      Exclusive Lucknow Branch
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Block-B, Rajajipuram, Lucknow, Uttar Pradesh &ndash; 226017
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200 shrink-0">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Desk Timings: 8:30 AM &ndash; 7:30 PM</span>
              </div>
            </div>

            {/* Main Support & Query Section (Efficient Form + SLA Info) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Academic Care Info (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="p-6 rounded-[18px] border border-[#E5E7EB] bg-white space-y-4">
                  <div className="flex items-center gap-2.5 text-[#5A4BDA]">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <h3 className="text-[16px] font-bold text-[#1B212D]">
                      Student Priority Guarantee
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    At Ansh Tutor, our academic faculty and student coordinators are dedicated to prompt, high-accuracy resolutions.
                  </p>

                  <div className="space-y-3 pt-2 text-xs text-gray-700">
                    <div className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A4BDA] mt-1.5 shrink-0" />
                      <span><strong>Fast SLA:</strong> All support tickets are acknowledged and resolved within 2 business hours.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A4BDA] mt-1.5 shrink-0" />
                      <span><strong>Direct WhatsApp Connect:</strong> Instant chat on +91 75250 09428 for live study assistance.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A4BDA] mt-1.5 shrink-0" />
                      <span><strong>Offline Walk-In:</strong> Visit our Rajajipuram Campus for 1-on-1 counseling and material collection.</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-[18px] bg-gradient-to-br from-[#EDE9FE] to-white border border-[#DDD6FE] flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#5A4BDA] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1B212D]">Instant Academic Doubts?</h4>
                    <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                      Use the &quot;My Doubts&quot; room in the Study section for real-time subject problem solving.
                    </p>
                  </div>
                </div>

                {/* Recent Submitted Tickets List */}
                {recentTickets.length > 0 && (
                  <div className="p-5 rounded-[18px] border border-[#E5E7EB] bg-white space-y-3">
                    <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Your Recent Queries
                    </h4>
                    <div className="space-y-2.5">
                      {recentTickets.map((t, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900">#{t.ticketId}</span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                {t.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-0.5 truncate max-w-[200px]">
                              {t.category}
                            </p>
                          </div>
                          <a
                            href={`https://wa.me/917525009428?text=${encodeURIComponent(
                              `Hello Ansh Tutor, following up on Support Ticket #${t.ticketId} (${t.category}).`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 shrink-0"
                          >
                            <span>WhatsApp</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Submit a Support Request (7 cols) */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-[18px] border border-[#E5E7EB] p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">
                        Submit a Support Request
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Guaranteed response within 2 business hours from Rajajipuram Desk.
                      </p>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active SLA
                    </span>
                  </div>

                  {/* SUCCESS STATE */}
                  {latestTicket ? (
                    <div className="py-8 text-center space-y-5">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                          Support Request Successfully Logged
                        </span>
                        <h4 className="text-xl font-extrabold text-gray-900">
                          Ticket #{latestTicket.ticketId}
                        </h4>
                        <p className="text-xs text-gray-500 max-w-sm mx-auto">
                          Our student guidance team has been notified. You can track this query or connect immediately on WhatsApp.
                        </p>
                      </div>

                      {/* Ticket Details Box */}
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-left text-xs max-w-md mx-auto space-y-2">
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Student Name:</span>
                          <span className="font-semibold text-gray-900">{latestTicket.name}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Contact Number:</span>
                          <span className="font-semibold text-gray-900">+91 {latestTicket.phone}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-gray-500">Category:</span>
                          <span className="font-semibold text-gray-900">{latestTicket.category}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Center Branch:</span>
                          <span className="font-semibold text-[#5A4BDA]">{latestTicket.branch}</span>
                        </div>
                      </div>

                      {/* Immediate Escalation Action Buttons */}
                      <div className="space-y-3 pt-2 max-w-md mx-auto">
                        <a
                          href={`https://wa.me/917525009428?text=${encodeURIComponent(
                            `Hello Ansh Tutor Academic Support,\nI have submitted Support Ticket #${latestTicket.ticketId}.\nCategory: ${latestTicket.category}\nQuery: ${latestTicket.message}\nPlease assist me.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Chat with Mentor on WhatsApp (+91 75250 09428)</span>
                        </a>

                        <div className="grid grid-cols-2 gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleCopyTicket(latestTicket.ticketId)}
                            className="py-2.5 px-3 rounded-lg border border-gray-300 hover:bg-gray-100 text-xs font-semibold text-gray-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            {copiedId ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600 font-bold">Copied ID!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-gray-500" />
                                <span>Copy Ticket ID</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={handleResetForm}
                            className="py-2.5 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                            <span>Submit Another</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* FORM STATE */
                    <form onSubmit={handleSubmitTicket} className="space-y-4">
                      
                      {/* Error Alert */}
                      {formError && (
                        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                          <span>{formError}</span>
                        </div>
                      )}

                      {/* Name & Phone in 2 columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                            Your Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="Student / Parent Name"
                            required
                            className="w-full h-11 px-3.5 border border-gray-300 rounded-lg text-xs text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#5A4BDA] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                            WhatsApp / Mobile No. <span className="text-red-500">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <span className="absolute left-3 text-xs font-semibold text-gray-500 select-none">
                              +91
                            </span>
                            <input
                              type="tel"
                              value={studentPhone}
                              onChange={(e) => setStudentPhone(e.target.value)}
                              placeholder="7525009428"
                              maxLength={10}
                              required
                              className="w-full h-11 pl-11 pr-3.5 border border-gray-300 rounded-lg text-xs text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#5A4BDA] transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Category & Urgency */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                            Query Category <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={queryCategory}
                            onChange={(e) => setQueryCategory(e.target.value)}
                            className="w-full h-11 px-3.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-800 bg-white outline-none focus:border-[#5A4BDA] cursor-pointer"
                          >
                            <option>Batch Access &amp; Live Classes</option>
                            <option>24x7 Doubt Solving Room</option>
                            <option>Test Series &amp; Solutions</option>
                            <option>Fee Payment / Orders</option>
                            <option>Rajajipuram Offline Campus Admission</option>
                            <option>General Academic Counseling</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                            Priority Level
                          </label>
                          <div className="flex items-center gap-2 h-11">
                            <button
                              type="button"
                              onClick={() => setPriority('Standard')}
                              className={`flex-1 h-full rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                priority === 'Standard'
                                  ? 'bg-gray-100 border-gray-400 text-gray-900'
                                  : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              Standard
                            </button>
                            <button
                              type="button"
                              onClick={() => setPriority('High')}
                              className={`flex-1 h-full rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                                priority === 'High'
                                  ? 'bg-[#EDE9FE] border-[#5A4BDA] text-[#5A4BDA]'
                                  : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              <span>Urgent</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Query Description */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Describe your issue / inquiry <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[11px] text-gray-400">
                            {queryText.length} characters
                          </span>
                        </div>
                        <textarea
                          rows={4}
                          value={queryText}
                          onChange={(e) => setQueryText(e.target.value)}
                          placeholder="Please provide details about your question, batch name, or technical issue..."
                          required
                          className="w-full p-3.5 border border-gray-300 rounded-lg text-xs text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#5A4BDA] resize-none leading-relaxed transition-colors"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3.5 rounded-lg bg-[#1B212D] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Submitting Ticket to Rajajipuram Desk...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Support Ticket</span>
                          </>
                        )}
                      </button>

                      {/* Note */}
                      <p className="text-[11px] text-center text-gray-400">
                        Rajajipuram Campus Helpline: <strong className="text-gray-600">+91 75250 09428</strong> &bull; <strong className="text-gray-600">support@anshtutor.gleeze.com</strong>
                      </p>
                    </form>
                  )}

                </div>
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  )
}
