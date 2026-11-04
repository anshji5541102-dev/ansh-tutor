import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ShieldCheck } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] text-gray-900 selection:bg-[#5a4bda] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl p-6 sm:p-12 space-y-8">
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#5a4bda] text-xs font-bold border border-indigo-100">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Privacy Policy</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-950">
              Privacy &amp; Data Protection Policy
            </h1>
            <p className="text-xs text-gray-400">Last updated: November 2026 • Ansh Tutor Education Technologies</p>
          </div>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">1. Information We Collect</h2>
              <p>
                We collect personal information such as student name, parent/guardian name, phone number, academic grade (Classes 1st to 8th), and address solely to deliver educational lectures, conduct mock tests, coordinate offline campus sessions at Rajajipuram Campus, Lucknow, and provide parent mentorship updates.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">2. Usage of Phone Numbers &amp; WhatsApp Alerts</h2>
              <p>
                Your phone number is utilized strictly for OTP login authentication, class schedule alerts, homework DPP reminders, attendance updates, and 1:1 academic counseling via WhatsApp or phone call. We strictly do not sell, rent, or lease parent phone numbers to third-party telemarketers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">3. Child &amp; Student Data Protection</h2>
              <p>
                Protecting young learners is our highest priority. All student records, test marks, and lecture viewing histories are secured with industry-standard encryption. Classroom interactions and doubt sessions are continuously monitored to ensure a safe, nurturing learning environment.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">4. Contact &amp; Grievances</h2>
              <p>
                For data privacy inquiries, contact our data protection desk at{' '}
                <a href="mailto:support@anshtutor.gleeze.com" className="text-[#5a4bda] font-bold hover:underline">
                  support@anshtutor.gleeze.com
                </a>{' '}
                or reach our Lucknow headquarters at Block-B, Rajajipuram, Lucknow, UP-226017.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
