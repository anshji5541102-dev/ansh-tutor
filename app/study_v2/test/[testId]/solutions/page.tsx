"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  X,
  BookOpen,
  Bookmark,
} from "lucide-react";
import { defaultQuestions, QuestionItem } from "@/lib/test-data";

function TestSolutionsContent() {
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

  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [userStatuses, setUserStatuses] = useState<Record<number, string>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("ansh_bookmarked_questions");
        if (raw) {
          const list = JSON.parse(raw);
          if (Array.isArray(list)) {
            setBookmarkedIds(
              list
                .filter((item: any) => item.testId === testId)
                .map((item: any) => item.questionNumber || item.id)
            );
          }
        }
      } catch (e) {}
    }
  }, [testId]);

  const toggleBookmark = (q: QuestionItem) => {
    if (typeof window === "undefined") return;
    try {
      let saved = JSON.parse(
        localStorage.getItem("ansh_bookmarked_questions") || "[]"
      );
      if (!Array.isArray(saved)) saved = [];
      const exists = saved.some(
        (item: any) => item.id === q.id && item.testId === testId
      );
      if (exists) {
        saved = saved.filter(
          (item: any) => !(item.id === q.id && item.testId === testId)
        );
        setBookmarkedIds((prev) => prev.filter((num) => num !== q.questionNumber));
      } else {
        saved.push({
          id: q.id,
          questionNumber: q.questionNumber,
          testId: testId,
          testTitle: currentTestTitle,
          subject: q.subject,
          text: q.text,
          options: q.options,
          correctOptionKey: q.correctOptionKey,
          explanation: q.explanation,
          bookmarkedAt: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        });
        setBookmarkedIds((prev) => [...prev, q.questionNumber]);
      }
      localStorage.setItem("ansh_bookmarked_questions", JSON.stringify(saved));
    } catch (e) {}
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ansh_attempted_tests");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed[testId]) {
            const data = parsed[testId];
            if (data.answers) {
              setUserAnswers(data.answers);
            }
            if (data.questionStatuses) {
              setUserStatuses(data.questionStatuses);
            }
          }
        }
      } catch {}
    }
  }, [testId]);

  // Combine questions with actual user choices
  const solutionsList = defaultQuestions.map((q) => {
    const userChoice = userAnswers[q.id] || null;
    let status: "correct" | "incorrect" | "skipped" = "skipped";
    if (userChoice) {
      status = userChoice === q.correctOptionKey ? "correct" : "incorrect";
    }
    const isReview =
      userStatuses[q.id] === "marked" ||
      userStatuses[q.id] === "answered-marked";

    return {
      ...q,
      userSelectedKey: userChoice,
      status,
      isReview,
    };
  });

  const currentQ = solutionsList[currentIdx] || solutionsList[0];

  // Dynamic status counts based on student's actual responses
  const correctCount = solutionsList.filter((q) => q.status === "correct").length;
  const incorrectCount = solutionsList.filter((q) => q.status === "incorrect").length;
  const skippedCount = solutionsList.filter((q) => q.status === "skipped").length;
  const reviewCount = solutionsList.filter((q) => q.isReview).length;

  const renderPaletteButton = (q: typeof solutionsList[0]) => {
    const isCurrent = currentIdx === q.id - 1;

    let shapeClass = "w-8 h-8 flex items-center justify-center font-bold text-xs ";
    let content = <span>{q.questionNumber}</span>;

    if (q.status === "correct") {
      shapeClass += "bg-[#00BA66] text-white rounded-t-lg rounded-b-sm";
    } else if (q.status === "incorrect") {
      shapeClass += "bg-[#E02424] text-white rounded-t-sm rounded-b-lg";
    } else {
      shapeClass += "bg-[#F3F4F6] text-gray-700 border border-gray-300 rounded-[3px]";
    }

    // Indicator for review
    if (q.isReview) {
      shapeClass += " relative";
      content = (
        <>
          <span>{q.questionNumber}</span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#4338CA] border-2 border-white rounded-full" />
        </>
      );
    }

    if (isCurrent) {
      shapeClass += " ring-2 ring-blue-600 ring-offset-1";
    }

    return (
      <button
        key={q.id}
        onClick={() => setCurrentIdx(q.id - 1)}
        className={`${shapeClass} transition-none cursor-pointer select-none`}
      >
        {content}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans select-none">
      {/* 1. TOP HEADER (Exact match with CBT exam header) */}
      <header className="h-14 border-b border-gray-200 bg-white px-4 md:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs font-semibold">Candidate Name:</span>
            <span className="text-[#0084FF] font-bold text-sm">Abhinav Srivastava</span>
          </div>
          <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs font-semibold">Test Name:</span>
            <span className="text-gray-900 font-bold text-sm">{currentTestTitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Solutions Mode</span>
          </div>

          <Link
            href={`/study_v2/test/${testId}/result`}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-[4px] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
            <span>Back to Result</span>
          </Link>
        </div>
      </header>

      {/* 2. SECTION SUB-BAR */}
      <div className="h-10 bg-[#F9FAFB] border-b border-gray-200 px-4 md:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-white border border-gray-300 text-gray-800 text-xs font-bold px-3 py-1 rounded-[3px] flex items-center gap-2 shadow-sm">
            <span>Maths</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>

        {/* Current question status badge */}
        <div className="flex items-center gap-3 text-xs">
          {currentQ.status === "correct" && (
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3 stroke-[3]" /> Correct (+4 Marks)
            </span>
          )}
          {currentQ.status === "incorrect" && (
            <span className="bg-red-100 text-red-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <X className="w-3 h-3 stroke-[3]" /> Incorrect (-1 Mark)
            </span>
          )}
          {currentQ.status === "skipped" && (
            <span className="bg-gray-100 text-gray-700 font-bold px-2.5 py-0.5 rounded-full">
              Skipped (0 Marks)
            </span>
          )}

          {currentQ.isReview && (
            <span className="bg-indigo-100 text-[#4338CA] font-bold px-2.5 py-0.5 rounded-full">
              Marked for Review
            </span>
          )}

          <span className="text-gray-300">|</span>
          <span className="text-gray-600">Marks for correct: <strong className="text-emerald-600">4</strong></span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-600">Negative Marks: <strong className="text-red-500">1</strong></span>
        </div>
      </div>

      {/* 3. MAIN BODY (Question & Detailed Solution + Question Palette) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT / CENTER: QUESTION, OPTIONS & DETAILED STEP-BY-STEP SOLUTION */}
        <div className="flex-1 flex flex-col bg-white overflow-y-auto border-r border-gray-200">
          <div className="p-4 md:p-6 flex-1 flex flex-col space-y-6">
            {/* Question Header with Bookmark Option */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="font-bold text-gray-800 text-base">
                Question No. {currentQ.questionNumber}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleBookmark(currentQ)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    bookmarkedIds.includes(currentQ.questionNumber)
                      ? "bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                  title="Bookmark this question"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      bookmarkedIds.includes(currentQ.questionNumber)
                        ? "fill-amber-600 text-amber-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span>
                    {bookmarkedIds.includes(currentQ.questionNumber)
                      ? "Bookmarked"
                      : "Bookmark"}
                  </span>
                </button>
                <div className="text-xs text-gray-500 font-semibold hidden sm:block">
                  <span>Single Choice</span>
                </div>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-gray-900 text-sm md:text-base leading-relaxed font-normal">
              {currentQ.text}
            </div>

            {/* Options with Correct / User Answer Indicators */}
            <div className="space-y-3 max-w-2xl">
              {currentQ.options.map((opt) => {
                const isCorrect = opt.key === currentQ.correctOptionKey;
                const isUserSelected = opt.key === currentQ.userSelectedKey;

                let cardStyle = "border-gray-200 bg-white text-gray-800";
                let badge = null;

                if (isCorrect && isUserSelected) {
                  cardStyle = "border-[#00BA66] bg-[#F0FDF4] text-emerald-950 font-medium";
                  badge = (
                    <span className="ml-auto px-2 py-0.5 text-[11px] font-bold rounded bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" /> Your Answer &amp; Correct Answer
                    </span>
                  );
                } else if (isCorrect) {
                  cardStyle = "border-[#00BA66] bg-[#F0FDF4] text-emerald-950 font-medium";
                  badge = (
                    <span className="ml-auto px-2 py-0.5 text-[11px] font-bold rounded bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" /> Correct Answer
                    </span>
                  );
                } else if (isUserSelected && !isCorrect) {
                  cardStyle = "border-red-400 bg-red-50 text-red-950 font-medium";
                  badge = (
                    <span className="ml-auto px-2 py-0.5 text-[11px] font-bold rounded bg-red-100 text-red-800 flex items-center gap-1 shrink-0">
                      <X className="w-3 h-3 stroke-[3]" /> Your Answer (Incorrect)
                    </span>
                  );
                }

                return (
                  <div
                    key={opt.key}
                    className={`flex items-start gap-3 p-3.5 rounded border transition-none ${cardStyle}`}
                  >
                    <div className="flex items-start gap-2 flex-1">
                      <span className="font-bold text-sm">{opt.key}.</span>
                      <span className="text-sm leading-snug">{opt.text}</span>
                    </div>
                    {badge}
                  </div>
                );
              })}
            </div>

            {/* DETAILED SOLUTION CONTAINER */}
            <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-xl p-5 sm:p-6 space-y-4 max-w-3xl mt-4">
              <div className="flex items-center gap-2 text-[#6B21A8] font-bold text-sm">
                <BookOpen className="w-4 h-4 text-[#7E22CE]" />
                <span>Detailed Solution &amp; Explanation</span>
              </div>

              {/* Steps */}
              <div className="space-y-2.5 text-xs sm:text-sm text-gray-800 leading-relaxed font-normal">
                {currentQ.explanation.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#7E22CE] font-bold">&bull;</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Core Concept */}
              <div className="pt-3 border-t border-[#E9D5FF] text-xs sm:text-sm">
                <span className="font-bold text-[#6B21A8]">Key Concept: </span>
                <span className="text-gray-700">{currentQ.explanation.concept}</span>
              </div>

              {/* Final Conclusion */}
              <div className="p-3 bg-white/80 rounded-lg border border-[#D8B4FE] text-xs sm:text-sm font-semibold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{currentQ.explanation.conclusion}</span>
              </div>
            </div>
          </div>

          {/* 4. BOTTOM ACTION TOOLBAR */}
          <div className="border-t border-gray-200 bg-white p-3 md:px-6 flex items-center justify-between shrink-0">
            <div className="text-xs font-semibold text-gray-500">
              Question <span className="text-gray-900 font-bold">{currentIdx + 1}</span> of {solutionsList.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-bold text-xs uppercase px-5 py-2.5 rounded-[4px] cursor-pointer"
              >
                &lt; PREVIOUS
              </button>

              <button
                onClick={() => setCurrentIdx((prev) => Math.min(solutionsList.length - 1, prev + 1))}
                disabled={currentIdx === solutionsList.length - 1}
                className="bg-[#00BA66] hover:bg-[#00A358] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase px-6 py-2.5 rounded-[4px] shadow-sm cursor-pointer"
              >
                NEXT &gt;
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: QUESTION PALETTE SIDEBAR */}
        <div className="w-full lg:w-80 bg-[#FAFAFA] border-t lg:border-t-0 border-gray-200 flex flex-col shrink-0">
          {/* User Profile Mini Banner */}
          <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0084FF] font-bold flex items-center justify-center text-sm">
              AS
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Abhinav Srivastava</div>
              <div className="text-[11px] text-gray-500">Student ID: AT-2026-9428</div>
            </div>
          </div>

          {/* Solutions Legend */}
          <div className="p-3 border-b border-gray-200 bg-white grid grid-cols-2 gap-2 text-[11px] text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#00BA66] text-white rounded-t-md rounded-b-xs flex items-center justify-center font-bold text-[10px]">
                {correctCount}
              </div>
              <span>Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#E02424] text-white rounded-t-xs rounded-b-md flex items-center justify-center font-bold text-[10px]">
                {incorrectCount}
              </div>
              <span>Incorrect</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#F3F4F6] text-gray-700 border border-gray-300 rounded-[3px] flex items-center justify-center font-bold text-[10px]">
                {skippedCount}
              </div>
              <span>Skipped</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#4338CA] text-white rounded-full flex items-center justify-center font-bold text-[10px]">
                {reviewCount}
              </div>
              <span>Reviewed</span>
            </div>
          </div>

          {/* Section Indicator */}
          <div className="px-4 py-2.5 bg-[#EEF2F6] font-bold text-xs text-gray-700 flex items-center justify-between">
            <span>SECTION : Maths</span>
          </div>

          {/* 25 Questions Grid */}
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="text-xs font-semibold text-gray-600 mb-3">Jump to Question Solution</div>
            <div className="grid grid-cols-5 gap-2.5">
              {solutionsList.map((q) => renderPaletteButton(q))}
            </div>
          </div>

          {/* Back to Result Button */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <Link
              href={`/study_v2/test/${testId}/result`}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-[4px] flex items-center justify-center gap-1.5 transition-colors text-center"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Result Summary</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestSolutionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Solutions View...
        </div>
      }
    >
      <TestSolutionsContent />
    </Suspense>
  );
}
