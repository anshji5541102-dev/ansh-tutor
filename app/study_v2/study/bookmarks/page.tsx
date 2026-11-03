"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StudyHeader from "@/components/study/StudyHeader";
import StudySidebar from "@/components/study/StudySidebar";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Trash2,
  Check,
  ExternalLink,
  BookOpen,
} from "lucide-react";

interface BookmarkedQuestion {
  id: number;
  questionNumber: number;
  testId: string;
  testTitle: string;
  subject: string;
  text: string;
  options: { key: string; text: string }[];
  correctOptionKey: string;
  explanation: string;
  bookmarkedAt?: string;
}

const defaultSampleBookmarks: BookmarkedQuestion[] = [
  {
    id: 1,
    questionNumber: 1,
    testId: "jee-adv-2026-p1",
    testTitle: "JEE Advanced 2026 Paper 1",
    subject: "Physics",
    text: "A vernier caliper has 20 divisions on the vernier scale which coincide with 19 divisions on the main scale. The least count of the instrument is (1 main scale division = 1 mm):",
    options: [
      { key: "A", text: "0.1 mm" },
      { key: "B", text: "0.05 mm" },
      { key: "C", text: "0.01 mm" },
      { key: "D", text: "0.005 mm" },
    ],
    correctOptionKey: "B",
    explanation:
      "Least Count = 1 MSD - 1 VSD. Given 20 VSD = 19 MSD => 1 VSD = (19/20) MSD = 0.95 mm. LC = 1 mm - 0.95 mm = 0.05 mm.",
    bookmarkedAt: "02 Nov 2026",
  },
  {
    id: 11,
    questionNumber: 11,
    testId: "permutations-and-combinations",
    testTitle: "Permutations & Combinations DPP",
    subject: "Mathematics",
    text: "The number of non-negative integer solutions to the equation x₁ + x₂ + x₃ + x₄ = 12 is:",
    options: [
      { key: "A", text: "455" },
      { key: "B", text: "364" },
      { key: "C", text: "220" },
      { key: "D", text: "495" },
    ],
    correctOptionKey: "A",
    explanation:
      "The formula for non-negative integer solutions to x₁ + x₂ + ... + xᵣ = n is C(n + r - 1, r - 1). Here n = 12, r = 4. Number of solutions = C(12 + 4 - 1, 4 - 1) = C(15, 3) = (15 × 14 × 13) / (3 × 2 × 1) = 455.",
    bookmarkedAt: "02 Nov 2026",
  },
];

function BookmarksContent() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkedQuestion[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("All");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("ansh_bookmarked_questions");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBookmarks(parsed);
            return;
          }
        }
        // If empty, initialize with high-yield default sample questions
        setBookmarks(defaultSampleBookmarks);
        localStorage.setItem(
          "ansh_bookmarked_questions",
          JSON.stringify(defaultSampleBookmarks)
        );
      } catch {
        setBookmarks(defaultSampleBookmarks);
      }
    }
  }, []);

  const handleRemove = (id: number, testId: string) => {
    const updated = bookmarks.filter(
      (b) => !(b.id === id && b.testId === testId)
    );
    setBookmarks(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("ansh_bookmarked_questions", JSON.stringify(updated));
    }
  };

  const filtered = bookmarks.filter((b) => {
    if (selectedSubject === "All") return true;
    return b.subject.toLowerCase() === selectedSubject.toLowerCase();
  });

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
          {/* Subheader: <- Bookmarks */}
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#E5E7EB] max-w-5xl">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/study_v2/study")}
                className="p-1.5 -ml-1.5 rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Back to Study"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.4]" />
              </button>
              <div>
                <h1 className="text-xl sm:text-[22px] font-bold text-[#1B212D] tracking-tight">
                  Bookmarks
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Saved tricky questions from tests &amp; DPPs for quick revision
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-full text-xs font-bold">
              <Bookmark className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
              <span>{bookmarks.length} Saved</span>
            </div>
          </div>

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-2 mb-6 max-w-5xl overflow-x-auto pb-1">
            {["All", "Physics", "Chemistry", "Mathematics"].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedSubject === sub
                    ? "bg-[#5A4BDA] text-white shadow-xs"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Bookmarked Questions List */}
          {filtered.length > 0 ? (
            <div className="space-y-6 max-w-5xl pb-16">
              {filtered.map((item, idx) => (
                <div
                  key={`${item.testId}-${item.id}`}
                  className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs hover:border-gray-300 transition-all space-y-4"
                >
                  {/* Top Row: Subject Badge, Test Name, Date, Remove button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#EDE9FE] text-[#5A4BDA]">
                        {item.subject}
                      </span>
                      <span className="text-xs font-bold text-gray-800">
                        Question #{item.questionNumber}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 font-medium">
                        {item.testTitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <Link
                        href={`/study_v2/test/${item.testId}/solutions`}
                        className="text-xs font-bold text-[#5A4BDA] hover:underline flex items-center gap-1"
                      >
                        <span>View Solution</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleRemove(item.id, item.testId)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50 cursor-pointer"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Question Statement */}
                  <div className="text-sm sm:text-base text-gray-900 font-medium leading-relaxed">
                    {item.text}
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {item.options.map((opt) => {
                      const isCorrect = opt.key === item.correctOptionKey;
                      return (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between ${
                            isCorrect
                              ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                              : "bg-gray-50/70 border-gray-200 text-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                isCorrect
                                  ? "bg-emerald-600 text-white"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {opt.key}
                            </span>
                            <span>{opt.text}</span>
                          </div>

                          {isCorrect && (
                            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              Correct
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Step-by-Step Detailed Solution Box */}
                  <div className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-200 mt-2 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#5A4BDA]">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Step-by-Step Explanation</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-mono whitespace-pre-wrap">
                      {item.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto my-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1B212D]">
                No bookmarks found
              </h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                You can bookmark any question directly while reviewing solutions
                after attempting DPPs or Tests.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function BookmarksPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Bookmarks...
        </div>
      }
    >
      <BookmarksContent />
    </Suspense>
  );
}
