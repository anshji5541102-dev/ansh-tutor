import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ShieldCheck } from 'lucide-react'

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] text-gray-900 selection:bg-[#5a4bda] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl p-6 sm:p-12 space-y-8">
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#5a4bda] text-xs font-bold border border-indigo-100">
              <ShieldCheck className="w-4 h-4" />
              <span>Transparent Fee Guarantee</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-950">
              Fee Clearance &amp; Refund Policy
            </h1>
            <p className="text-xs text-gray-400">Last updated: November 2026 • Ansh Tutor</p>
          </div>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">1. 100% Free Trial Before Paying</h2>
              <p>
                We believe no parent should ever pay without being 100% satisfied with our teaching quality. That is why every student is entitled to a <strong>1-Day Free Offline Demo</strong> at Rajajipuram Campus or a <strong>7-Day Pay Later Trial</strong> before committing fees.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">2. Cancellation Within the 7-Day Window</h2>
              <p>
                If a student opts out of the batch during the active 7-day trial period, zero cancellation fees apply. Access is cleanly closed without any penalties or hidden charges.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">3. Physical Books &amp; Study Modules</h2>
              <p>
                Printed study modules dispatched to your address are non-refundable once delivered, unless received in a damaged condition, in which case a free replacement pack is immediately sent.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">4. Processing Time &amp; Accounts Desk</h2>
              <p>
                Approved fee adjustments or refunds are processed via UPI / original payment mode within 5 to 7 working days. For billing questions, reach out directly to Ansh Sir at{' '}
                <a href="tel:7525009428" className="text-[#5a4bda] font-bold hover:underline">
                  +91 75250 09428
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
