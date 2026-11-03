"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StudyHeader from "@/components/study/StudyHeader";
import StudySidebar from "@/components/study/StudySidebar";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  Video,
  User,
  Calendar as CalendarIcon,
  Radio,
  CheckCircle2,
} from "lucide-react";

interface ScheduledClass {
  id: string;
  subject: string;
  title: string;
  educator: string;
  time: string;
  duration: string;
  isLiveNow?: boolean;
  chapter: string;
}

// Mock scheduled classes by day in Nov 2026
const scheduledClassesData: Record<number, ScheduledClass[]> = {
  2: [
    {
      id: "live-math-1",
      subject: "Mathematics",
      chapter: "Quadratic Equations",
      title: "Live Problem Solving & Doubt Clearing Drill",
      educator: "Anurag Sir",
      time: "05:00 PM - 06:30 PM",
      duration: "90 Mins",
      isLiveNow: true,
    },
    {
      id: "live-sci-1",
      subject: "Science",
      chapter: "Force & Pressure",
      title: "Concepts & NCERT Exemplar Numericals",
      educator: "Pooja Ma'am",
      time: "07:00 PM - 08:15 PM",
      duration: "75 Mins",
      isLiveNow: false,
    },
  ],
  3: [
    {
      id: "live-eng-1",
      subject: "English",
      chapter: "Active & Passive Voice",
      title: "Master Grammar & Reading Comprehension Drill",
      educator: "Rashmi Ma'am",
      time: "04:30 PM - 05:45 PM",
      duration: "75 Mins",
      isLiveNow: false,
    },
  ],
  4: [
    {
      id: "live-math-2",
      subject: "Mathematics",
      chapter: "Understanding Quadrilaterals",
      title: "Geometric Properties & Proofs in 3D",
      educator: "Anurag Sir",
      time: "05:00 PM - 06:30 PM",
      duration: "90 Mins",
      isLiveNow: false,
    },
  ],
  6: [
    {
      id: "live-sci-2",
      subject: "Science",
      chapter: "Chemical Effects of Electric Current",
      title: "Electroplating & Electrolytes Live Lab",
      educator: "Pooja Ma'am",
      time: "06:00 PM - 07:30 PM",
      duration: "90 Mins",
      isLiveNow: false,
    },
  ],
};

function WeeklyScheduleContent() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(2); // Nov 2, 2026
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);

  // Month navigation
  const [currentMonth, setCurrentMonth] = useState("November 2026");

  // November 2026 Calendar layout (Nov 1 is Sunday, so Monday starts at day 2)
  // Days: M (2, 9, 16, 23, 30), T (3, 10, 17, 24), W (4, 11, 18, 25), T (5, 12, 19, 26), F (6, 13, 20, 27), S (7, 14, 21, 28), S (1, 8, 15, 22, 29)
  // Grid layout with 7 columns (Mon to Sun)
  const calendarCells = [
    // Week 1 (Oct 26-31 empty or 1 on Sunday)
    null, null, null, null, null, null, 1,
    2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29,
    30, null, null, null, null, null, null,
  ];

  const subjectsList = ["All", "Mathematics", "Science", "English", "SST", "Hindi"];

  const currentClasses = (scheduledClassesData[selectedDay] || []).filter((cls) => {
    if (selectedSubject === "All") return true;
    return cls.subject.toLowerCase() === selectedSubject.toLowerCase();
  });

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. TOP HEADER */}
      <StudyHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. BODY LAYOUT */}
      <div className="flex flex-1 overflow-hidden relative">
        <StudySidebar
          activeTab="study"
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 bg-[#F8F9FA]">
          {/* Subheader: < Back button (left) and XP 0 (right) */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-6">
            <button
              onClick={() => router.push("/study_v2/study")}
              className="flex items-center gap-1.5 text-gray-800 hover:text-black font-bold text-sm sm:text-base cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              <span>Back</span>
            </button>

            {/* Right Rewards Badges */}
            <div className="flex items-center gap-4 select-none">
              <span className="text-xl">🎁</span>
              <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
                <span className="px-1.5 py-0.5 rounded-[4px] bg-[#E0E7FF] text-[#4F46E5] text-[10px] font-black tracking-wider">
                  XP
                </span>
                <span className="text-xs font-bold text-gray-800">0</span>
              </div>
            </div>
          </div>

          {/* TWO COLUMN GRID: LEFT SCHEDULE CONTAINER & RIGHT CALENDAR CONTAINER */}
          <div className="flex flex-col lg:flex-row items-start gap-6">
            
            {/* ======================================================== */}
            {/* LEFT: WEEKLY SCHEDULE CARD (Matching Screenshot)         */}
            {/* ======================================================== */}
            <div className="flex-1 w-full bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] min-h-[460px] flex flex-col">
              
              {/* Header Row: Title & Subject Dropdown Filter */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1B212D] tracking-tight">
                  Weekly Schedule
                </h2>

                {/* Subject Filter Dropdown (Matching Screenshot) */}
                <div className="relative">
                  <button
                    onClick={() => setSubjectDropdownOpen(!subjectDropdownOpen)}
                    className="border border-gray-300 hover:border-gray-400 bg-white rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{selectedSubject === "All" ? "Subjects" : selectedSubject}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>

                  {subjectDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20 text-xs">
                      {subjectsList.map((subj) => (
                        <button
                          key={subj}
                          onClick={() => {
                            setSelectedSubject(subj);
                            setSubjectDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 font-medium transition-colors ${
                            selectedSubject === subj
                              ? "bg-purple-50 text-[#5A4BDA] font-bold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {subj}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Schedule Content */}
              {currentClasses.length === 0 ? (
                /* Empty state: Clock illustration & "No events scheduled for the day!" (Exact Screenshot Match) */
                <div className="my-auto py-12 flex flex-col items-center justify-center text-center">
                  <div className="relative w-36 h-36 mb-6">
                    {/* Flower Petals background */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-200 via-blue-100 to-amber-100 opacity-70 blur-xs" />
                      <div className="absolute w-24 h-12 bg-[#FDE047] rounded-full -rotate-45 -left-1 top-6 opacity-80" />
                      <div className="absolute w-20 h-10 bg-[#38BDF8] rounded-full rotate-45 -right-1 bottom-6 opacity-80" />
                      <div className="absolute w-20 h-10 bg-[#C084FC] rounded-full -rotate-12 -left-2 bottom-4 opacity-80" />
                    </div>

                    {/* Clock Face */}
                    <div className="relative w-28 h-28 mx-auto mt-4 rounded-full bg-white border-4 border-[#38BDF8] shadow-md flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#0284C7] z-10" />
                      {/* Hands */}
                      <div className="absolute w-0.5 h-8 bg-[#0284C7] rounded-full origin-bottom -translate-y-4" />
                      <div className="absolute w-0.5 h-6 bg-red-400 rounded-full origin-bottom rotate-90 -translate-y-3" />
                      {/* Hour dots */}
                      <div className="absolute top-1.5 w-1 h-1 bg-gray-400 rounded-full" />
                      <div className="absolute bottom-1.5 w-1 h-1 bg-gray-400 rounded-full" />
                      <div className="absolute left-1.5 w-1 h-1 bg-gray-400 rounded-full" />
                      <div className="absolute right-1.5 w-1 h-1 bg-gray-400 rounded-full" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1B212D]">
                    No events scheduled
                  </h3>
                  <p className="text-sm font-semibold text-gray-500 mt-0.5">
                    for the day!
                  </p>
                </div>
              ) : (
                /* Scheduled Live Classes List: Rectangular cards stacked vertically */
                <div className="space-y-4 flex-1">
                  <div className="text-xs text-gray-500 font-semibold mb-2">
                    {currentClasses.length} Live Class{currentClasses.length > 1 ? "es" : ""} scheduled for {selectedDay} November 2026:
                  </div>

                  {currentClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className="border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 bg-white shadow-2xs hover:border-gray-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-2">
                        {/* Badges row */}
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-[5px] bg-[#EFF6FF] text-[#2563EB] text-[11px] font-bold uppercase tracking-wider">
                            {cls.subject}
                          </span>

                          {cls.isLiveNow ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 text-[11px] font-bold flex items-center gap-1.5 border border-red-200 animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                              LIVE NOW
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold flex items-center gap-1 border border-amber-200">
                              <Clock className="w-3 h-3 text-amber-600" />
                              UPCOMING
                            </span>
                          )}
                        </div>

                        {/* Title & Chapter */}
                        <div>
                          <div className="text-xs text-gray-500 font-semibold">
                            Chapter: {cls.chapter}
                          </div>
                          <h4 className="text-[16px] sm:text-[17px] font-bold text-[#1B212D] tracking-tight mt-0.5">
                            {cls.title}
                          </h4>
                        </div>

                        {/* Educator & Timing */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium pt-1">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-gray-400 stroke-[1.8]" />
                            <span>Faculty: <strong>{cls.educator}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400 stroke-[1.8]" />
                            <span>{cls.time} ({cls.duration})</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0 pt-2 sm:pt-0">
                        {cls.isLiveNow ? (
                          <button
                            onClick={() =>
                              router.push(
                                `/study_v2/live?title=${encodeURIComponent(
                                  cls.title
                                )}&subject=${encodeURIComponent(
                                  cls.subject
                                )}&faculty=${encodeURIComponent(
                                  cls.educator
                                )}`
                              )
                            }
                            className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                          >
                            <Radio className="w-4 h-4 animate-pulse" />
                            <span>Join Live Class</span>
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              router.push(
                                `/study_v2/watch?title=${encodeURIComponent(
                                  cls.title
                                )}&subject=${encodeURIComponent(
                                  cls.subject
                                )}&returnUrl=/study_v2/study/weekly-schedule`
                              )
                            }
                            className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-[#F0EEFF] hover:bg-[#E5E0FF] text-[#5A4BDA] font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
                          >
                            Set Reminder / Details
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ======================================================== */}
            {/* RIGHT: INTERACTIVE CALENDAR (Exact Match Screenshot)     */}
            {/* ======================================================== */}
            <div className="w-full lg:w-[360px] bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] shrink-0">
              
              {/* Month Header with Navigation Chevrons */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-base sm:text-lg text-[#1B212D]">
                  {currentMonth}
                </span>

                <div className="flex items-center gap-2 text-gray-500">
                  <button
                    onClick={() => {}}
                    className="p-1 hover:text-black cursor-pointer rounded-md hover:bg-gray-100"
                    title="Previous Month"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    onClick={() => {}}
                    className="p-1 hover:text-black cursor-pointer rounded-md hover:bg-gray-100"
                    title="Next Month"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Day Initials: M T W T F S S */}
              <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 mb-3">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>

              {/* Day Numbers Grid */}
              <div className="grid grid-cols-7 gap-y-2.5 gap-x-1 text-center text-xs sm:text-sm font-semibold">
                {calendarCells.map((day, idx) => {
                  if (day === null) {
                    return <div key={idx} className="h-9 w-9" />;
                  }

                  const isSelected = selectedDay === day;
                  const hasClasses = !!scheduledClassesData[day]?.length;

                  return (
                    <div key={idx} className="flex flex-col items-center justify-center">
                      <button
                        onClick={() => setSelectedDay(day)}
                        className={`h-9 w-9 rounded-full flex items-center justify-center transition-colors cursor-pointer select-none text-xs sm:text-[13px] ${
                          isSelected
                            ? "bg-[#4F46E5] text-white font-bold shadow-sm"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        {day}
                      </button>

                      {/* Small indicator dot if day has scheduled classes and not selected */}
                      {hasClasses && !isSelected && (
                        <div className="w-1 h-1 bg-[#4F46E5] rounded-full mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default function WeeklySchedulePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Schedule...
        </div>
      }
    >
      <WeeklyScheduleContent />
    </Suspense>
  );
}
