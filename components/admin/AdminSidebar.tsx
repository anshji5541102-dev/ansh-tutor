'use client'

import React from 'react'
import {
  LayoutDashboard,
  ShieldAlert,
  GraduationCap,
  FolderPlus,
  Radio,
  FileCheck,
  BookOpen,
  Users,
  Bell,
  Headphones,
} from 'lucide-react'

export type AdminTab =
  | 'overview'
  | 'paylater'
  | 'batches'
  | 'batch-content'
  | 'live'
  | 'tests'
  | 'library'
  | 'students'
  | 'announcements'
  | 'helpdesk'

interface AdminSidebarProps {
  activeTab: AdminTab
  setActiveTab: (tab: AdminTab) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  overdueCount: number
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  overdueCount,
}: AdminSidebarProps) {
  const handleNav = (tab: AdminTab) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 z-20 bg-black/40 backdrop-blur-2xs"
        />
      )}

      {/* Sidebar Container: Pinned, exact same formatting/styling as StudySidebar */}
      <aside
        className={`${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 fixed md:sticky top-14 bottom-0 left-0 z-30 w-[220px] h-[calc(100vh-3.5rem)] bg-white border-r border-[#E5E7EB] overflow-y-auto shrink-0 flex flex-col justify-between select-none shadow-[4px_0_14px_rgba(0,0,0,0.06),1px_0_3px_rgba(0,0,0,0.04)]`}
      >
        <div className="w-full">
          {/* 1. CORE MANAGEMENT */}
          <div className="pt-5 pb-1">
            <div className="text-[11px] font-bold text-[#8E95A5] tracking-wider px-5 pb-2 uppercase select-none">
              CORE MANAGEMENT
            </div>
            <ul className="space-y-0.5">
              <li>
                <button
                  onClick={() => handleNav('overview')}
                  className={`w-full flex items-center gap-3.5 px-5 py-2.5 text-[14px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'overview'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'overview' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <LayoutDashboard
                    className={`w-4.5 h-4.5 shrink-0 stroke-[1.8] ${
                      activeTab === 'overview' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  />
                  <span>Overview</span>
                </button>
              </li>

              {/* Pay Later Authority with Defaulter Alert Badge */}
              <li>
                <button
                  onClick={() => handleNav('paylater')}
                  className={`w-full flex items-center justify-between px-5 py-2.5 text-[14px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'paylater'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'paylater' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <div className="flex items-center gap-3.5">
                    <ShieldAlert
                      className={`w-4.5 h-4.5 shrink-0 stroke-[1.8] ${
                        activeTab === 'paylater' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                      }`}
                    />
                    <span>Pay Later</span>
                  </div>

                  {overdueCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-extrabold animate-pulse">
                      {overdueCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>

          {/* 2. ACADEMIC & CONTENT CONTROLS */}
          <div className="pt-4 pb-1">
            <div className="text-[11px] font-bold text-[#8E95A5] tracking-wider px-5 pb-2 uppercase select-none">
              ACADEMIC CONTROLS
            </div>
            <ul className="space-y-0.5">
              <li>
                <button
                  onClick={() => handleNav('batches')}
                  className={`w-full flex items-center gap-3.5 px-5 py-2.5 text-[14px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'batches'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'batches' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <GraduationCap
                    className={`w-4.5 h-4.5 shrink-0 stroke-[1.8] ${
                      activeTab === 'batches' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  />
                  <span>Batches</span>
                </button>
              </li>

              {/* BATCH CONTENT: Videos, Notes, DPPs */}
              <li>
                <button
                  onClick={() => handleNav('batch-content')}
                  className={`w-full flex items-center gap-3.5 px-5 py-2.5 text-[14px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'batch-content'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'batch-content' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <FolderPlus
                    className={`w-4.5 h-4.5 shrink-0 stroke-[1.8] ${
                      activeTab === 'batch-content' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  />
                  <div className="flex flex-col text-left">
                    <span className="leading-tight">Batch Content</span>
                    <span className="text-[10px] text-gray-400 font-normal">Videos, Notes, DPPs</span>
                  </div>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNav('live')}
                  className={`w-full flex items-center gap-3.5 px-5 py-2.5 text-[14px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'live'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'live' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <Radio
                    className={`w-4.5 h-4.5 shrink-0 stroke-[1.8] ${
                      activeTab === 'live' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  />
                  <span>Live Studio</span>
                </button>
              </li>

              {/* TEST SERIES & CBT */}
              <li>
                <button
                  onClick={() => handleNav('tests')}
                  className={`w-full flex items-center gap-3.5 px-5 py-2.5 text-[14px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'tests'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'tests' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <FileCheck
                    className={`w-4.5 h-4.5 shrink-0 stroke-[1.8] ${
                      activeTab === 'tests' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  />
                  <span>Test Series</span>
                </button>
              </li>

              {/* DIGITAL LIBRARY */}
              <li>
                <button
                  onClick={() => handleNav('library')}
                  className={`w-full flex items-center gap-3.5 px-5 py-2.5 text-[14px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'library'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'library' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <BookOpen
                    className={`w-4.5 h-4.5 shrink-0 stroke-[1.8] ${
                      activeTab === 'library' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  />
                  <span>Library</span>
                </button>
              </li>
            </ul>
          </div>

          {/* 3. STUDENT ADMINISTRATION */}
          <div className="pt-4 pb-1">
            <div className="text-[11px] font-bold text-[#8E95A5] tracking-wider px-5 pb-2 uppercase select-none">
              ADMINISTRATION
            </div>
            <ul className="space-y-0.5">
              <li>
                <button
                  onClick={() => handleNav('students')}
                  className={`w-full flex items-center gap-3.5 px-5 py-2.5 text-[14px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'students'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'students' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <Users
                    className={`w-4.5 h-4.5 shrink-0 stroke-[1.8] ${
                      activeTab === 'students' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  />
                  <span>Students</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNav('announcements')}
                  className={`w-full flex items-center gap-3.5 px-5 py-2.5 text-[14px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'announcements'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'announcements' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <Bell
                    className={`w-4.5 h-4.5 shrink-0 stroke-[1.8] ${
                      activeTab === 'announcements' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  />
                  <span>Announcements</span>
                </button>
              </li>

              {/* HELPDESK & SUPPORT */}
              <li>
                <button
                  onClick={() => handleNav('helpdesk')}
                  className={`w-full flex items-center gap-3.5 px-5 py-2.5 text-[14px] transition-colors cursor-pointer text-left relative ${
                    activeTab === 'helpdesk'
                      ? 'bg-[#EDE9FE] text-[#5A4BDA] font-semibold'
                      : 'text-[#2B313F] hover:bg-gray-50 font-medium'
                  }`}
                >
                  {activeTab === 'helpdesk' && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5A4BDA]" />
                  )}
                  <Headphones
                    className={`w-4.5 h-4.5 shrink-0 stroke-[1.8] ${
                      activeTab === 'helpdesk' ? 'text-[#5A4BDA]' : 'text-[#4B5565]'
                    }`}
                  />
                  <span>Helpdesk</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM: Admin Identity & Status */}
        <div className="p-4 border-t border-[#E5E7EB] bg-gray-50/60 text-xs">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold text-[11px] text-gray-800">Admin Session Active</span>
          </div>
          <div className="text-[10px] text-gray-500 font-mono">
            +91 75250 09428
          </div>
        </div>
      </aside>
    </>
  )
}
