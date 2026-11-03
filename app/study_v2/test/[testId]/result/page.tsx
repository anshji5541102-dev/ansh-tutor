"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronDown,
  FileText,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  FastForward,
  Target,
  CheckSquare,
  BarChart3,
  RotateCcw,
} from "lucide-react";

function TestResultContent() {
  const router = useRouter();
  const params = useParams();
  const testId = (params?.testId as string) || "permutations-and-combinations";

  const testTitleMap: Record<string, string> = {
    "permutations-and-combinations": "Permutations and Combinations",
    "relations-and-functions": "Relations and Functions",
    vectors: "Vectors",
    "quadratic-equations": "Quadratic Equations",
    determinants: "Determinants",
    matrices: "Matrices",
    "dpp-1": "Relations and Functions (i)",
  };

  const currentTestTitle =
    testTitleMap[testId] ||
    testId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Dynamic or simulated test performance
  const [stats, setStats] = useState({
    score: 4,
    totalScore: 100,
    correct: 1,
    incorrect: 0,
    skipped: 24,
    totalQuestions: 25,
    marksObtained: 4,
    marksLost: 0,
    marksSkipped: 96,
    accuracy: 100,
    completed: 4,
    timeTaken: "00:00:30",
    attemptedDate: "02 Nov 2026",
    attemptNumber: "Attempt 1",
  });

  const [attemptDropdownOpen, setAttemptDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ansh_attempted_tests");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed[testId]) {
            const data = parsed[testId];
            setStats((prev) => ({
              ...prev,
              score: data.score ?? prev.score,
              totalScore: data.totalScore ?? 100,
              correct: data.correct ?? prev.correct,
              incorrect: data.incorrect ?? prev.incorrect,
              skipped: data.skipped ?? prev.skipped,
              marksObtained:
                data.marksObtained ??
                (data.correct !== undefined ? data.correct * 4 : 0),
              marksLost:
                data.marksLost ??
                (data.incorrect !== undefined ? data.incorrect * 1 : 0),
              marksSkipped:
                data.marksSkipped ??
                (data.skipped !== undefined ? data.skipped * 4 : 96),
              accuracy: data.accuracy ?? 0,
              completed: data.completed ?? 0,
              timeTaken: data.timeTaken ?? prev.timeTaken,
              attemptedDate: data.attemptedAt
                ? new Date(data.attemptedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : prev.attemptedDate,
            }));
          }
        }
      } catch {}
    }
  }, [testId]);

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#1B212D] font-sans flex flex-col selection:bg-[#5A4BDA] selection:text-white pb-16">
      {/* 1. TOP SUBHEADER (< Back & XP 0) */}
      <div className="bg-white border-b border-gray-200 px-6 sm:px-12 py-3.5 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={() => router.push("/study_v2/study")}
          className="flex items-center gap-1.5 text-gray-800 hover:text-black font-bold text-sm sm:text-base cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span>Back</span>
        </button>

        {/* XP 0 Badge (Right) */}
        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full select-none">
          <span className="px-1.5 py-0.5 rounded-[4px] bg-[#E0E7FF] text-[#4F46E5] text-[10px] font-black tracking-wider">
            XP
          </span>
          <span className="text-xs font-bold text-gray-800">0</span>
        </div>
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-8 mt-6 space-y-6">
        
        {/* TOP HERO BANNER (Exact match with user screenshot 1) */}
        <div className="bg-[#F6F4FF] border border-[#E9E4FF] rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-2xs">
          
          {/* Subtle decorative background watermark illustration */}
          <div className="absolute right-0 top-0 bottom-0 w-80 opacity-10 pointer-events-none flex items-center justify-end pr-8">
            <svg viewBox="0 0 200 200" className="w-64 h-64 text-[#5A4BDA] fill-current">
              <path d="M40 30h120v10H40zm20 30h80v8H60zm10 28h60v8H70zm-30 40h120v10H40zM30 160h140v8H30z" />
              <circle cx="150" cy="80" r="15" />
              <circle cx="50" cy="110" r="10" />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
            {/* Left Info */}
            <div className="space-y-3">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {currentTestTitle}
              </h1>

              {/* Meta items */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-[13px] text-gray-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-gray-500 stroke-[1.8]" />
                  <span>25 Questions &bull; 100 Marks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500 stroke-[1.8]" />
                  <span>60 mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600 stroke-[1.8]" />
                  <span>Attempted On: {stats.attemptedDate}</span>
                </div>
              </div>

              {/* Action Buttons: Reattempt & View Solutions */}
              <div className="flex items-center gap-3 pt-3">
                <Link
                  href={`/study_v2/test/${testId}/instructions`}
                  className="px-6 py-2.5 rounded-lg border border-[#5A4BDA] bg-white hover:bg-[#5A4BDA]/5 text-[#5A4BDA] text-xs sm:text-sm font-bold flex items-center justify-center transition-colors shadow-2xs"
                >
                  Reattempt
                </Link>
                <Link
                  href={`/study_v2/test/${testId}/solutions`}
                  className="px-6 py-2.5 rounded-lg bg-[#5A4BDA] hover:bg-[#4D3ECB] text-white text-xs sm:text-sm font-bold flex items-center justify-center transition-colors shadow-sm"
                >
                  View Solutions
                </Link>
              </div>
            </div>

            {/* Right: Attempt Dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setAttemptDropdownOpen(!attemptDropdownOpen)}
                className="bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-3 shadow-2xs cursor-pointer min-w-[130px] justify-between"
              >
                <span>{stats.attemptNumber}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {attemptDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-20 text-xs font-semibold text-gray-700">
                  <button
                    onClick={() => {
                      setStats((prev) => ({ ...prev, attemptNumber: "Attempt 1" }));
                      setAttemptDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[#5A4BDA]"
                  >
                    Attempt 1
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. RESULT SUMMARY CARD (Screenshot 1) */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-[17px] font-bold text-gray-900 tracking-tight">
            Result Summary
          </h2>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold tracking-wider text-gray-500 uppercase mb-1">
                SCORE
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0084FF] tracking-tight">
                {stats.score}
                <span className="text-xl sm:text-2xl text-gray-800 font-bold">/{stats.totalScore}</span>
              </div>
            </div>

            {/* Right: Visual Bar Chart Graphic (Matching Screenshot 1) */}
            <div className="w-24 sm:w-28 h-16 flex items-end justify-between gap-1.5 relative select-none">
              <div className="w-3.5 bg-[#4AD4D8] rounded-t-sm h-10" />
              <div className="w-3.5 bg-[#6CD089] rounded-t-sm h-14" />
              <div className="w-3.5 bg-[#FAB74B] rounded-t-sm h-8" />
              <div className="w-3.5 bg-[#F67171] rounded-t-sm h-12" />

              {/* Connecting line / trendline dots overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 -mt-2" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 -mt-7" />
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1" />
                <span className="w-2 h-2 rounded-full bg-red-500 -mt-4" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. YOUR PROGRESS SECTION (Exact match with user screenshot 2) */}
        <div className="bg-[#F8F9FB] border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
          
          <h3 className="text-center font-bold text-base sm:text-lg text-gray-900 tracking-tight">
            Your Progress
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Box 1: Correct */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
                  <span>Correct</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">
                  {stats.correct}/{stats.totalQuestions}
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Marks Obtained</span>
                <span className="text-emerald-600 font-bold">+{stats.marksObtained}</span>
              </div>
            </div>

            {/* Box 2: Incorrect */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800">
                  <XCircle className="w-4 h-4 text-red-500 stroke-[2.5]" />
                  <span>Incorrect</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">
                  {stats.incorrect}/{stats.totalQuestions}
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Marks Lost</span>
                <span className="text-red-500 font-bold">{stats.marksLost}</span>
              </div>
            </div>

            {/* Box 3: Skipped */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800">
                  <FastForward className="w-4 h-4 text-blue-500 stroke-[2.5]" />
                  <span>Skipped</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">
                  {stats.skipped}/{stats.totalQuestions}
                </div>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0084FF] h-full rounded-full"
                  style={{ width: `${(stats.skipped / stats.totalQuestions) * 100}%` }}
                />
              </div>
              <div className="pt-1 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Marks Skipped</span>
                <span className="text-gray-700 font-bold">{stats.marksSkipped}</span>
              </div>
            </div>

            {/* Box 4: Accuracy */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800">
                  <Target className="w-4 h-4 text-blue-500 stroke-[2.5]" />
                  <span>Accuracy</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">
                  {stats.accuracy}%
                </div>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0084FF] h-full rounded-full"
                  style={{ width: `${stats.accuracy}%` }}
                />
              </div>
            </div>

            {/* Box 5: Completed */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800">
                  <CheckSquare className="w-4 h-4 text-purple-500 stroke-[2.5]" />
                  <span>Completed</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">
                  {stats.completed}%
                </div>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0084FF] h-full rounded-full"
                  style={{ width: `${stats.completed}%` }}
                />
              </div>
            </div>

            {/* Box 6: Time Taken */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800">
                  <Clock className="w-4 h-4 text-amber-500 stroke-[2.5]" />
                  <span>Time Taken</span>
                </div>
                <div className="text-sm sm:text-base font-mono font-bold text-gray-900">
                  {stats.timeTaken}
                </div>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full w-1/12" />
              </div>
            </div>

          </div>
        </div>

        {/* 5. SECTION WISE PERFORMANCE TABLE (Exact match with user screenshot 2) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-5 shadow-2xs">
          
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base sm:text-[17px] text-gray-900 tracking-tight">
              Section Wise Performance
            </h3>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F0F7FF] text-gray-700 font-bold border-b border-gray-200">
                  <th className="py-3 px-4 sm:px-6">Section</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Score</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Correct</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Incorrect</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Skipped</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Accuracy</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Time Taken</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">Maths</td>
                  <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-[#0084FF]">{stats.score}</td>
                  <td className="py-3.5 px-3 sm:px-4 text-center text-emerald-600 font-bold">{stats.correct}</td>
                  <td className="py-3.5 px-3 sm:px-4 text-center text-red-500 font-bold">{stats.incorrect}</td>
                  <td className="py-3.5 px-3 sm:px-4 text-center text-gray-600 font-bold">{stats.skipped}</td>
                  <td className="py-3.5 px-3 sm:px-4 text-center font-bold">{stats.accuracy}%</td>
                  <td className="py-3.5 px-4 sm:px-6 text-right font-mono text-gray-700">{stats.timeTaken}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function TestResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Result Summary...
        </div>
      }
    >
      <TestResultContent />
    </Suspense>
  );
}
