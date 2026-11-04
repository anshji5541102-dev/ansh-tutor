'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#F4F6FB] text-gray-800 pt-16 pb-12 border-t border-gray-200/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Helpline Banner Card - Medium Light Tone */}
        <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 mb-16 shadow-lg shadow-indigo-900/5 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#5a4bda] text-xs font-bold border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5 text-[#5a4bda]" />
              <span>Free Academic Counseling</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Confused about your exam strategy?
            </h3>
            <p className="text-sm text-gray-600 max-w-xl">
              Talk directly with Ansh Tutor academic mentors and get a customized 1-year study roadmap for FREE.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:7525009428"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#5a4bda]" />
              <span>Call Helpline: 75250 09428</span>
            </a>
            <Link
              href="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#5a4bda] text-white font-bold text-sm hover:bg-[#4a3bc7] transition-colors shadow-md shadow-[#5a4bda]/25"
            >
              <span>Book Counselor Slot</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-gray-200">
          
          {/* Brand Info with EXACT Original Logo */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <div className="relative h-14 w-60">
                <Image
                  src="/logo-transparent.png"
                  alt="Ansh Tutor"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-sm text-gray-600 leading-relaxed">
              We stand for accessible, high-quality, and deeply caring education for every student in India.
              Empowering learners from Foundation to Competitive exams.
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-700">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Verified Faculty</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs">
                <Award className="w-4 h-4 text-amber-500" />
                <span>ISO 9001:2015</span>
              </div>
            </div>
          </div>

          {/* Academic Batches */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center justify-between">
              <span>Academic Batches (Class 1-8)</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link href="/study_v2/cohort-selection" className="hover:text-[#5a4bda] transition-colors flex items-center justify-between group">
                  <span className="font-semibold text-gray-800 group-hover:text-[#5a4bda]">Class 8th (Umang Batch)</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-[#5a4bda] rounded">Enroll</span>
                </Link>
              </li>
              <li>
                <Link href="/study_v2/cohort-selection" className="hover:text-[#5a4bda] transition-colors flex items-center justify-between group">
                  <span className="font-semibold text-gray-800 group-hover:text-[#5a4bda]">Class 7th (Sankalp Batch)</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-[#5a4bda] rounded">Enroll</span>
                </Link>
              </li>
              <li>
                <Link href="/study_v2/cohort-selection" className="hover:text-[#5a4bda] transition-colors flex items-center justify-between group">
                  <span className="font-semibold text-gray-800 group-hover:text-[#5a4bda]">Class 6th (Prarambh Batch)</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-[#5a4bda] rounded">Enroll</span>
                </Link>
              </li>
              <li>
                <Link href="/study_v2/cohort-selection" className="hover:text-[#5a4bda] transition-colors flex items-center justify-between group">
                  <span className="font-semibold text-gray-800 group-hover:text-[#5a4bda]">Class 5th Academic Batch</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-[#5a4bda] rounded">Enroll</span>
                </Link>
              </li>
              <li>
                <Link href="/study_v2/cohort-selection" className="hover:text-[#5a4bda] transition-colors flex items-center justify-between group">
                  <span className="font-semibold text-gray-800 group-hover:text-[#5a4bda]">Class 4th Academic Batch</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-[#5a4bda] rounded">Enroll</span>
                </Link>
              </li>
              <li>
                <Link href="/study_v2/cohort-selection" className="hover:text-[#5a4bda] transition-colors flex items-center justify-between group">
                  <span className="font-semibold text-gray-800 group-hover:text-[#5a4bda]">Class 3rd Academic Batch</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-[#5a4bda] rounded">Enroll</span>
                </Link>
              </li>
              <li>
                <Link href="/study_v2/cohort-selection" className="hover:text-[#5a4bda] transition-colors flex items-center justify-between group">
                  <span className="font-semibold text-gray-800 group-hover:text-[#5a4bda]">Class 2nd Academic Batch</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-[#5a4bda] rounded">Enroll</span>
                </Link>
              </li>
              <li>
                <Link href="/study_v2/cohort-selection" className="hover:text-[#5a4bda] transition-colors flex items-center justify-between group">
                  <span className="font-semibold text-gray-800 group-hover:text-[#5a4bda]">Class 1st Academic Batch</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-[#5a4bda] rounded">Enroll</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link href="/book" className="text-[#5a4bda] font-bold hover:underline flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Book Offline Demo</span>
                </Link>
              </li>
              <li>
                <Link href="#centres" className="hover:text-[#5a4bda] transition-colors">
                  Vidyapeeth Centres
                </Link>
              </li>
              <li>
                <Link href="/test-series" className="hover:text-[#5a4bda] transition-colors">
                  Test Series
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-[#5a4bda] transition-colors">
                  Study Modules &amp; Books
                </Link>
              </li>
              <li>
                <Link href="/study_v2/batches" className="hover:text-[#5a4bda] transition-colors">
                  Study Batches
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#5a4bda] transition-colors">
                  Login / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Contact &amp; Support
            </h4>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Direct WhatsApp Support:</div>
                  <a
                    href="https://wa.me/917525009428"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 font-bold hover:text-emerald-600 hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>+91 7525009428</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                      Chat Now
                    </span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#5a4bda] shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-gray-500">Email:</div>
                  <a href="mailto:support@anshtutor.gleeze.com" className="text-gray-900 font-medium hover:underline">
                    support@anshtutor.gleeze.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#5a4bda] shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-gray-500">Headquarters:</div>
                  <span className="text-gray-700">
                    Block-B, Rajajipuram, Lucknow, Uttar Pradesh-2260017
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; 2026 Ansh Tutor Education Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="/refunds" className="hover:text-gray-900 transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
