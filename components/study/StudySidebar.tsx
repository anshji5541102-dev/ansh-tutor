'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import {
  Building2,
  Headphones,
  BookOpen,
} from 'lucide-react'

interface StudySidebarProps {
  activeTab: 'study' | 'library' | 'batches' | 'test-series' | 'my-test' | 'help-support'
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function StudySidebar({
  activeTab,
  mobileMenuOpen,
  setMobileMenuOpen,
}: StudySidebarProps) {
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 top-14 bg-black/40 backdrop-blur-xs z-25 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container: Wider width (w-[195px]), taller rows (h-[48px]), larger icons & fonts */}
      {/* Kept 100% still (pinned/sticky) when right-side main content is scrolled */}
      <aside
        className={`${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 fixed md:sticky top-14 bottom-0 left-0 z-30 w-[195px] h-[calc(100vh-3.5rem)] bg-white border-r border-[#E5E7EB] overflow-y-auto shrink-0 flex flex-col justify-between select-none shadow-[4px_0_14px_rgba(0,0,0,0.06),1px_0_3px_rgba(0,0,0,0.04)]`}
      >
        <div className="w-full">
          
          {/* 1. LEARN ONLINE */}
          <div className="pt-6 pb-2">
            <div className="text-[11.5px] font-bold text-[#8E95A5] tracking-wider px-5 pb-2.5 uppercase select-none">
              LEARN ONLINE
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/study_v2/study"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 text-[15px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'study'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'study' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-5 h-5 shrink-0 stroke-current fill-none stroke-2 ${
                      activeTab === 'study' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  >
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span>Study</span>
                </Link>
              </li>

              {/* Library (Added under LEARN ONLINE as requested) */}
              <li>
                <Link
                  href="/study_v2/library"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 text-[15px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'library'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'library' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <BookOpen
                    className={`w-5 h-5 shrink-0 stroke-[1.8] ${
                      activeTab === 'library' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  />
                  <span>Library</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. STUDY PACKS (Scholarship removed as requested) */}
          <div className="pt-5 pb-2">
            <div className="text-[11.5px] font-bold text-[#8E95A5] tracking-wider px-5 pb-2.5 uppercase select-none">
              STUDY PACKS
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/study_v2/batches"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 text-[15px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'batches'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'batches' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-5 h-5 shrink-0 fill-none stroke-current stroke-2 ${
                      activeTab === 'batches' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <span>Batches</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/study_v2/test_series"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 text-[15px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'test-series'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'test-series' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-5 h-5 shrink-0 fill-none stroke-current stroke-2 ${
                      activeTab === 'test-series' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" />
                  </svg>
                  <span>Test Series</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/study_v2/my_test"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 text-[15px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'my-test'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'my-test' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-5 h-5 shrink-0 fill-none stroke-current stroke-2 ${
                      activeTab === 'my-test' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <polyline points="9 15 11 17 15 13" />
                  </svg>
                  <span>My Test</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. OFFLINE */}
          <div className="pt-5 pb-2">
            <div className="text-[11.5px] font-bold text-[#8E95A5] tracking-wider px-5 pb-2.5 uppercase select-none">
              OFFLINE
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/#centres"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-4 px-5 py-3.5 text-[15px] font-medium text-[#2B313F] hover:bg-gray-50 transition-colors"
                >
                  <Building2 className="w-5 h-5 shrink-0 text-[#4B5565]" />
                  <span>PW Centres</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. MORE */}
          <div className="pt-5 pb-2">
            <div className="text-[11.5px] font-bold text-[#8E95A5] tracking-wider px-5 pb-2.5 uppercase select-none">
              MORE
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/study_v2/help_support"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 text-[15px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'help-support'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'help-support' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <Headphones className={`w-5 h-5 shrink-0 ${
                    activeTab === 'help-support' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                  }`} />
                  <span>Help &amp; Support</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-20 backdrop-blur-xs"
        />
      )}
    </>
  )
}
