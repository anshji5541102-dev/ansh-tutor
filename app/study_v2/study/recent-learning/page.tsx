"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import StudyHeader from "@/components/study/StudyHeader";
import StudySidebar from "@/components/study/StudySidebar";
import {
  ArrowLeft,
  Play,
  RotateCcw,
  FileText,
  Eye,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

interface VideoHistoryItem {
  id: string;
  subject: string;
  faculty: string;
  title: string;
  duration: string;
  watchedDuration?: string;
  isCompleted: boolean;
  thumbnail: string;
}

interface PracticeHistoryItem {
  id: string;
  type: "TEST" | "DPP";
  date: string;
  title: string;
  marks: string;
  xp: string;
  testId: string;
}

const mockVideoHistory: VideoHistoryItem[] = [];

const mockPracticeHistory: PracticeHistoryItem[] = [];

function RecentLearningContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const initialTab = (searchParams.get("tab") as "videos" | "practice") || "videos";
  const [activeTab, setActiveTab] = useState<"videos" | "practice">(initialTab);
  const [selectedBatch, setSelectedBatch] = useState("All Batches");
  const [batchDropdownOpen, setBatchDropdownOpen] = useState(false);

  const handleTabChange = (tab: "videos" | "practice") => {
    setActiveTab(tab);
    router.replace(`/study_v2/study/recent-learning?tab=${tab}`);
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. TOP HEADER */}
      <StudyHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. BODY LAYOUT: PINNED SIDEBAR + MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden relative">
        <StudySidebar
          activeTab="study"
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-6 bg-[#F8F9FB]">
          {/* Subheader: <- My History */}
          <div className="flex items-center gap-3 pb-5 mb-4 border-b border-[#E5E7EB] max-w-6xl">
            <button
              onClick={() => router.push("/study_v2/study")}
              className="p-1.5 -ml-1.5 rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Back to Study"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.4]" />
            </button>
            <h1 className="text-xl sm:text-[22px] font-bold text-[#1B212D] tracking-tight">
              My History
            </h1>
          </div>

          {/* Main Container with Left Vertical Tabs + Right Content Area */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 shadow-2xs max-w-6xl min-h-[560px] flex flex-col md:flex-row gap-6">
            {/* Left Vertical Tab Menu (Videos | Practice) */}
            <div className="w-full md:w-52 shrink-0 space-y-2 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-4">
              <button
                onClick={() => handleTabChange("videos")}
                className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
                  activeTab === "videos"
                    ? "bg-[#F0F7FF] text-[#1B212D] border-l-4 border-[#5A4BDA] shadow-2xs"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span>Videos</span>
              </button>

              <button
                onClick={() => handleTabChange("practice")}
                className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
                  activeTab === "practice"
                    ? "bg-[#F0F7FF] text-[#1B212D] border-l-4 border-[#5A4BDA] shadow-2xs"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span>Practice</span>
              </button>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 min-w-0">
              {/* Batch Filter Dropdown */}
              <div className="flex justify-start sm:justify-start mb-6 relative">
                <button
                  onClick={() => setBatchDropdownOpen(!batchDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700 shadow-2xs transition-colors cursor-pointer"
                >
                  <span>{selectedBatch}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {batchDropdownOpen && (
                  <div className="absolute top-10 left-0 z-30 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 animate-in fade-in">
                    {["All Batches", "JEE Prep 2027", "Class 8 Foundation"].map(
                      (b) => (
                        <button
                          key={b}
                          onClick={() => {
                            setSelectedBatch(b);
                            setBatchDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors ${
                            selectedBatch === b
                              ? "text-[#5A4BDA] font-bold bg-[#F0EEFF]"
                              : "text-gray-700"
                          }`}
                        >
                          {b}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Group Section Heading */}
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                TODAY
              </div>

              {/* TAB 1: VIDEOS */}
              {activeTab === "videos" && (
                <div className="space-y-4">
                  {mockVideoHistory.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-xs my-6 space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#5A4BDA] flex items-center justify-center mx-auto text-2xl font-bold">
                        📺
                      </div>
                      <h4 className="text-base font-bold text-gray-900">No Video Lectures Watched Yet</h4>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        When you start watching live or recorded lectures, your progress and history will be saved here automatically.
                      </p>
                    </div>
                  ) : (
                    mockVideoHistory.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-2xs hover:border-gray-300 transition-all flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Left Subtle Green Indicator if Completed */}
                      {item.isCompleted && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10B981]" />
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-4 min-w-0">
                          {/* Faculty / Video Thumbnail with Play Button */}
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-[#E0E7FF] border border-gray-200 shadow-2xs flex items-center justify-center select-none">
                            <Image
                              src={item.thumbnail}
                              alt={item.faculty}
                              fill
                              className="object-cover"
                            />
                            {/* Red Play Badge */}
                            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow-sm">
                              <Play className="w-3 h-3 fill-current ml-0.5" />
                            </div>
                          </div>

                          {/* Video Info */}
                          <div className="space-y-1 min-w-0">
                            <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                              Lecture • {item.subject} By {item.faculty}
                            </p>
                            <h3 className="text-sm sm:text-base font-bold text-[#1B212D] leading-snug tracking-tight line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-xs text-gray-400 font-medium">
                              {item.watchedDuration || item.duration}
                            </p>
                          </div>
                        </div>

                        {/* Top-Right Status Icon */}
                        {item.isCompleted && (
                          <div className="shrink-0 self-start">
                            <CheckCircle2 className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Bottom Action Buttons: Watch Again (if completed) or Resume (if in progress) + Notes */}
                      <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                        {item.isCompleted ? (
                          /* Completed Video: Watch Again with replay icon */
                          <button
                            onClick={() => router.push("/study_v2/watch")}
                            className="flex items-center gap-2 px-5 py-2 bg-[#F1F3F6] hover:bg-gray-200 text-[#1B212D] font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-2xs"
                          >
                            <RotateCcw className="w-4 h-4 stroke-[2.4]" />
                            <span>Watch Again</span>
                          </button>
                        ) : (
                          /* In Progress Video: Resume with play icon */
                          <button
                            onClick={() => router.push("/study_v2/watch")}
                            className="flex items-center gap-2 px-5 py-2 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-2xs"
                          >
                            <Play className="w-4 h-4 fill-current stroke-[2.4]" />
                            <span>Resume</span>
                          </button>
                        )}

                        <button
                          onClick={() => router.push("/study_v2/pdf-viewer")}
                          className="flex items-center gap-2 px-4 py-2 bg-[#F8F9FA] hover:bg-gray-100 text-gray-700 font-semibold text-xs sm:text-sm rounded-xl border border-gray-200 transition-colors cursor-pointer"
                        >
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span>Notes &amp; more</span>
                        </button>
                      </div>
                    </div>
                  )))}
                </div>
              )}

              {/* TAB 2: PRACTICE (DPPs, Tests & Test Series - Strictly NO Syllabus Option) */}
              {activeTab === "practice" && (
                <div className="space-y-4">
                  {mockPracticeHistory.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-xs my-6 space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#5A4BDA] flex items-center justify-center mx-auto text-2xl font-bold">
                        🎯
                      </div>
                      <h4 className="text-base font-bold text-gray-900">No Practice Tests Attempted</h4>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        Take mock tests or DPP drills from your batches to build and view your practice record here.
                      </p>
                    </div>
                  ) : (
                    mockPracticeHistory.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-2xs hover:border-gray-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Left: Soft Pink Badge + Test / DPP Details */}
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Pink OBJ Badge */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FFE4E6] border border-[#FECDD3] flex flex-col items-center justify-center p-1 shrink-0 select-none shadow-2xs">
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#E11D48] bg-white/80 px-1.5 py-0.5 rounded-full mb-0.5">
                            OBJ
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-[#BE123C] tracking-wide">
                            {item.type}
                          </span>
                        </div>

                        {/* Title, Date & Marks */}
                        <div className="space-y-1 min-w-0">
                          <p className="text-[11px] sm:text-xs text-gray-400 font-medium">
                            {item.type === "TEST" ? "Test" : "DPP"} • {item.date}
                          </p>
                          <h3 className="text-sm sm:text-base font-bold text-[#1B212D] leading-snug tracking-tight line-clamp-1">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                            <span>{item.marks}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-[#5A4BDA] font-semibold">
                              <span className="w-3.5 h-3.5 rounded-full bg-blue-100 text-[#5A4BDA] inline-flex items-center justify-center text-[9px] font-bold">
                                ◆
                              </span>
                              {item.xp} XP
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: ONLY 'View Analysis' (Syllabus option strictly removed) */}
                      <div className="shrink-0 self-start sm:self-center">
                        <Link
                          href={`/study_v2/test/${item.testId}/result`}
                          className="flex items-center gap-2 px-5 py-2.5 bg-[#F1F3F6] hover:bg-gray-200 text-[#1B212D] font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-2xs"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                          <span>View Analysis</span>
                        </Link>
                      </div>
                    </div>
                  )))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function RecentLearningPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Learning History...
        </div>
      }
    >
      <RecentLearningContent />
    </Suspense>
  );
}
