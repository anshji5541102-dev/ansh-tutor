import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Award } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] text-gray-900 selection:bg-[#5a4bda] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl p-6 sm:p-12 space-y-8">
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#5a4bda] text-xs font-bold border border-indigo-100">
              <Award className="w-4 h-4" />
              <span>Terms of Service</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-950">
              Terms &amp; Academic Conditions
            </h1>
            <p className="text-xs text-gray-400">Last updated: November 2026 • Ansh Tutor</p>
          </div>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">1. Educational Services</h2>
              <p>
                Ansh Tutor provides academic coaching, live classes, recorded lectures, study modules, and test series for students in Classes 1st through 8th across CBSE, ICSE, and state boards. Services are available both online via web/app and offline at our Rajajipuram Campus in Lucknow.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">2. Batch Validity &amp; Course Access</h2>
              <p>
                Every academic batch is assigned a validity period (e.g. Session 2026-27 or till 31 March 2027). Upon expiry of the validity date, access to live lectures and test series associated with that batch automatically concludes unless renewed or extended by the administration.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">3. 7-Day Pay Later Policy</h2>
              <p>
                Under our transparent 7-day Pay Later scheme, students receive immediate full batch access for 7 days. Parents are requested to settle course dues on or before the 7th day. Accounts with unresolved dues beyond this grace period may face temporary access pause until clearance.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">4. Code of Conduct</h2>
              <p>
                Students and parents agree to maintain respect towards faculty and fellow learners in both digital live chats and physical classroom sessions at Lucknow campus.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
