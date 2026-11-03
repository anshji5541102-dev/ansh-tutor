"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  X,
  Clock,
  HelpCircle
} from "lucide-react";
import { defaultQuestions, QuestionItem } from "@/lib/test-data";

type QuestionStatus = "not-visited" | "not-answered" | "answered" | "marked" | "answered-marked";

function TestPlayerContent() {
  const router = useRouter();
  const params = useParams();
  const testId = (params?.testId as string) || "dpp-1";

  const testTitleMap: Record<string, string> = {
    vectors: "Vectors",
    "quadratic-equations": "Quadratic Equations",
    determinants: "Determinants",
    "relations-and-functions": "Relations and Functions",
    "permutations-and-combinations": "Permutations and Combinations",
    matrices: "Matrices",
    "dpp-1": "Relations and Functions (i)",
  };
  const currentTestTitle =
    testTitleMap[testId] ||
    testId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const questions: QuestionItem[] = defaultQuestions;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [questionStatuses, setQuestionStatuses] = useState<Record<number, QuestionStatus>>({
    1: "not-answered",
    ...Object.fromEntries(Array.from({ length: 24 }, (_, i) => [i + 2, "not-visited" as QuestionStatus])),
  });

  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Request fullscreen on mount
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        }
      } catch (err) {
        console.log("Auto fullscreen request:", err);
      }
      setHasStarted(true);
    };

    enterFullscreen();

    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      if (!isNowFullscreen && hasStarted) {
        setShowExitWarning(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [hasStarted]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const currentQ = questions[currentIdx];

  const handleSelectOption = (key: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: key,
    }));
  };

  const handleClear = () => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: "not-answered",
    }));
  };

  const moveToQuestion = (nextIdx: number) => {
    if (nextIdx < 0 || nextIdx >= questions.length) return;
    
    // update status of next question if it was not-visited
    const nextQId = questions[nextIdx].id;
    setQuestionStatuses((prev) => {
      if (prev[nextQId] === "not-visited") {
        return { ...prev, [nextQId]: "not-answered" };
      }
      return prev;
    });

    setCurrentIdx(nextIdx);
  };

  const handleSaveAndNext = () => {
    const hasAnswer = !!selectedAnswers[currentQ.id];
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: hasAnswer ? "answered" : "not-answered",
    }));

    if (currentIdx < questions.length - 1) {
      moveToQuestion(currentIdx + 1);
    }
  };

  const handleSaveAndMarkForReview = () => {
    const hasAnswer = !!selectedAnswers[currentQ.id];
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: hasAnswer ? "answered-marked" : "marked",
    }));

    if (currentIdx < questions.length - 1) {
      moveToQuestion(currentIdx + 1);
    }
  };

  const handleMarkForReviewAndNext = () => {
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: "marked",
    }));

    if (currentIdx < questions.length - 1) {
      moveToQuestion(currentIdx + 1);
    }
  };

  // Status counts for Palette & Summary
  const statusCounts = {
    answered: Object.values(questionStatuses).filter((s) => s === "answered").length,
    notAnswered: Object.values(questionStatuses).filter((s) => s === "not-answered").length,
    notVisited: Object.values(questionStatuses).filter((s) => s === "not-visited").length,
    marked: Object.values(questionStatuses).filter((s) => s === "marked").length,
    answeredMarked: Object.values(questionStatuses).filter((s) => s === "answered-marked").length,
  };

  const handleReturnToFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (err) {
      console.log(err);
    }
    setShowExitWarning(false);
  };

  const handleLeaveTest = () => {
    setShowExitWarning(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    router.push("/study_v2/study");
  };

  // Shape rendering helper for Palette
  const renderPaletteButton = (q: QuestionItem) => {
    const status = questionStatuses[q.id];
    const isCurrent = currentIdx === q.id - 1;

    let shapeClass = "w-8 h-8 flex items-center justify-center font-bold text-xs ";
    let content = <span>{q.questionNumber}</span>;

    if (status === "answered") {
      shapeClass += "bg-[#00BA66] text-white rounded-t-lg rounded-b-sm";
    } else if (status === "not-answered") {
      shapeClass += "bg-[#E02424] text-white rounded-t-sm rounded-b-lg";
    } else if (status === "marked") {
      shapeClass += "bg-[#4338CA] text-white rounded-full";
    } else if (status === "answered-marked") {
      shapeClass += "bg-[#4338CA] text-white rounded-full relative";
      content = (
        <>
          <span>{q.questionNumber}</span>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#00BA66] border-2 border-white rounded-full" />
        </>
      );
    } else {
      shapeClass += "bg-[#F3F4F6] text-gray-700 border border-gray-300 rounded-[3px]";
    }

    if (isCurrent) {
      shapeClass += " ring-2 ring-blue-600 ring-offset-1";
    }

    return (
      <button
        key={q.id}
        onClick={() => moveToQuestion(q.id - 1)}
        className={`${shapeClass} transition-none cursor-pointer select-none`}
      >
        {content}
      </button>
    );
  };

  // Final Submit Handler with precise evaluation
  const handleFinalSubmit = () => {
    setShowSummaryModal(false);

    // Precise evaluation against correctOptionKey
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    const questionResults = questions.map((q) => {
      const userChoice = selectedAnswers[q.id] || null;
      let qStatus: "correct" | "incorrect" | "skipped" = "skipped";

      if (userChoice) {
        if (userChoice === q.correctOptionKey) {
          qStatus = "correct";
          correctCount++;
        } else {
          qStatus = "incorrect";
          incorrectCount++;
        }
      } else {
        skippedCount++;
      }

      return {
        id: q.id,
        questionNumber: q.questionNumber,
        userSelectedKey: userChoice,
        correctOptionKey: q.correctOptionKey,
        status: qStatus,
        isMarkedForReview:
          questionStatuses[q.id] === "marked" ||
          questionStatuses[q.id] === "answered-marked",
      };
    });

    const marksObtained = correctCount * 4;
    const marksLost = incorrectCount * 1;
    const marksSkipped = skippedCount * 4;
    const totalScore = Math.max(0, marksObtained - marksLost);
    const accuracy =
      correctCount + incorrectCount > 0
        ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
        : 0;
    const completedPercent = Math.round(
      ((correctCount + incorrectCount) / questions.length) * 100
    );

    // Calculate elapsed time
    const elapsedSeconds = Math.max(1, 15 * 60 - timeLeft);
    const hrs = Math.floor(elapsedSeconds / 3600);
    const mins = Math.floor((elapsedSeconds % 3600) / 60);
    const secs = elapsedSeconds % 60;
    const timeTakenStr = `${String(hrs).padStart(2, "0")}:${String(
      mins
    ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    if (typeof window !== "undefined") {
      try {
        const saved = JSON.parse(
          localStorage.getItem("ansh_attempted_tests") || "{}"
        );
        saved[testId] = {
          attemptedAt: new Date().toISOString(),
          testTitle: currentTestTitle,
          totalQuestions: questions.length,
          score: totalScore,
          totalScore: 100,
          correct: correctCount,
          incorrect: incorrectCount,
          skipped: skippedCount,
          marksObtained,
          marksLost,
          marksSkipped,
          accuracy,
          completed: completedPercent,
          timeTaken: timeTakenStr,
          answers: selectedAnswers,
          questionStatuses,
          questionResults,
        };
        localStorage.setItem("ansh_attempted_tests", JSON.stringify(saved));
      } catch (err) {
        console.error("Failed to save test result:", err);
      }
    }

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    router.push(`/study_v2/test/${testId}/result`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans select-none">
      {/* 1. TOP HEADER (Exact Screenshot 1 & 2) */}
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
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs font-semibold hidden md:inline">Remaining Time:</span>
            <div className="bg-[#0084FF] text-white font-mono font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          </div>

          <button
            onClick={() => setShowInstructionsModal(true)}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-[4px] flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5 text-gray-500" />
            <span>View Instructions</span>
          </button>
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

        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span>Marks for correct answer: <strong className="text-emerald-600">4</strong></span>
          <span className="text-gray-300">|</span>
          <span>Negative Marks: <strong className="text-red-500">1</strong></span>
        </div>
      </div>

      {/* 3. MAIN BODY (Question Area + Question Palette) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT / CENTER: QUESTION AND OPTIONS */}
        <div className="flex-1 flex flex-col bg-white overflow-y-auto border-r border-gray-200">
          <div className="p-4 md:p-6 flex-1 flex flex-col">
            {/* Question Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <span className="font-bold text-gray-800 text-base">
                Question No. {currentQ.questionNumber}
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">Single Choice</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-gray-900 text-sm md:text-base leading-relaxed mb-6 font-normal">
              {currentQ.text}
            </div>

            {/* Options */}
            <div className="space-y-3 max-w-2xl">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.key;
                return (
                  <label
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-none ${
                      isSelected
                        ? "border-[#0084FF] bg-[#F0F7FF]"
                        : "border-gray-200 hover:bg-gray-50 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question_${currentQ.id}`}
                      checked={isSelected}
                      onChange={() => handleSelectOption(opt.key)}
                      className="mt-1 w-4 h-4 text-[#0084FF] border-gray-300 focus:ring-0 cursor-pointer"
                    />
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 text-sm">{opt.key}.</span>
                      <span className="text-gray-800 text-sm leading-snug">{opt.text}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 4. BOTTOM ACTION TOOLBAR */}
          <div className="border-t border-gray-200 bg-white p-3 md:px-6 flex flex-col gap-2 shrink-0">
            {/* Top row actions */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleSaveAndNext}
                  className="bg-[#00BA66] hover:bg-[#00A358] text-white font-bold text-xs uppercase px-5 py-2.5 rounded-[4px] shadow-sm cursor-pointer"
                >
                  SAVE & NEXT
                </button>
                <button
                  onClick={handleClear}
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase px-4 py-2.5 rounded-[4px] cursor-pointer"
                >
                  CLEAR
                </button>
                <button
                  onClick={handleSaveAndMarkForReview}
                  className="bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-[4px] shadow-sm cursor-pointer"
                >
                  SAVE & MARK FOR REVIEW
                </button>
                <button
                  onClick={handleMarkForReviewAndNext}
                  className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-[4px] shadow-sm cursor-pointer"
                >
                  MARK FOR REVIEW & NEXT
                </button>
              </div>

              {/* Navigation Back & Next */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => moveToQuestion(currentIdx - 1)}
                  disabled={currentIdx === 0}
                  className="border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-bold text-xs uppercase px-4 py-2 rounded-[4px] cursor-pointer"
                >
                  &lt; BACK
                </button>
                <button
                  onClick={() => moveToQuestion(currentIdx + 1)}
                  disabled={currentIdx === questions.length - 1}
                  className="border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-bold text-xs uppercase px-4 py-2 rounded-[4px] cursor-pointer"
                >
                  NEXT &gt;
                </button>
              </div>
            </div>

            {/* Bottom submit row */}
            <div className="flex items-center justify-end pt-1">
              <button
                onClick={() => setShowSummaryModal(true)}
                className="bg-[#00BA66] hover:bg-[#00A358] text-white font-bold text-xs uppercase px-8 py-2 rounded-[4px] shadow-sm cursor-pointer"
              >
                SUBMIT
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

          {/* Legend / Status Badges */}
          <div className="p-3 border-b border-gray-200 bg-white grid grid-cols-2 gap-2 text-[11px] text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#00BA66] text-white rounded-t-md rounded-b-xs flex items-center justify-center font-bold text-[10px]">
                {statusCounts.answered}
              </div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#E02424] text-white rounded-t-xs rounded-b-md flex items-center justify-center font-bold text-[10px]">
                {statusCounts.notAnswered}
              </div>
              <span>Not Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#F3F4F6] text-gray-700 border border-gray-300 rounded-[3px] flex items-center justify-center font-bold text-[10px]">
                {statusCounts.notVisited}
              </div>
              <span>Not Visited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#4338CA] text-white rounded-full flex items-center justify-center font-bold text-[10px]">
                {statusCounts.marked}
              </div>
              <span>Mark for review</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 pt-1 border-t border-gray-100">
              <div className="w-6 h-6 bg-[#4338CA] text-white rounded-full relative flex items-center justify-center font-bold text-[10px] shrink-0">
                {statusCounts.answeredMarked}
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-[#00BA66] border-2 border-white rounded-full" />
              </div>
              <span className="text-[10px] leading-tight text-gray-600">
                Answered & Marked for Revision (will be considered for evaluation)
              </span>
            </div>
          </div>

          {/* Section Indicator */}
          <div className="px-4 py-2.5 bg-[#EEF2F6] font-bold text-xs text-gray-700 flex items-center justify-between">
            <span>SECTION : Maths</span>
          </div>

          {/* 25 Questions Grid */}
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="text-xs font-semibold text-gray-600 mb-3">Choose a Question</div>
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q) => renderPaletteButton(q))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. FULLSCREEN EXIT WARNING MODAL */}
      {showExitWarning && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-base text-gray-900">Warning</h3>
              <button
                onClick={() => setShowExitWarning(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 text-center">
              <p className="text-gray-800 text-sm font-semibold mb-2">
                Exiting full-screen mode during the test isn&apos;t allowed.
              </p>
              <p className="text-gray-600 text-xs">
                Are you sure you want to leave the test?
              </p>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={handleLeaveTest}
                className="px-5 py-2 text-xs font-bold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                Leave Test
              </button>
              <button
                onClick={handleReturnToFullscreen}
                className="px-6 py-2 text-xs font-bold text-white bg-[#5A4BDA] hover:bg-[#4E3FC8] rounded-md shadow-sm cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. TEST SUMMARY MODAL */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-base text-gray-900">Test Summary</h3>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 text-center">
                  <div className="text-xl font-bold text-gray-900">{questions.length}</div>
                  <div className="text-[11px] text-gray-500 font-medium">Total Question</div>
                </div>

                <div className="border border-emerald-200 rounded-lg p-3 bg-emerald-50 text-center">
                  <div className="text-xl font-bold text-[#00BA66]">{statusCounts.answered}</div>
                  <div className="text-[11px] text-gray-600 font-medium">Answered</div>
                </div>

                <div className="border border-red-200 rounded-lg p-3 bg-red-50 text-center">
                  <div className="text-xl font-bold text-[#E02424]">{statusCounts.notAnswered}</div>
                  <div className="text-[11px] text-gray-600 font-medium">Not Answered</div>
                </div>

                <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 text-center">
                  <div className="text-xl font-bold text-gray-600">{statusCounts.notVisited}</div>
                  <div className="text-[11px] text-gray-500 font-medium">Not Visited</div>
                </div>

                <div className="border border-indigo-200 rounded-lg p-3 bg-indigo-50 text-center">
                  <div className="text-xl font-bold text-[#4338CA]">{statusCounts.marked}</div>
                  <div className="text-[11px] text-gray-600 font-medium">Mark for review</div>
                </div>

                <div className="border border-purple-200 rounded-lg p-3 bg-purple-50 text-center">
                  <div className="text-xl font-bold text-[#4338CA]">{statusCounts.answeredMarked}</div>
                  <div className="text-[10px] text-gray-600 font-medium leading-tight">
                    Answered & Marked for Revision
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs font-semibold text-gray-800">
                  Are you sure you want to submit the test?
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  You won&apos;t be able to change your answers after final submission.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="px-5 py-2 text-xs font-bold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                Resume
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-6 py-2 text-xs font-bold text-white bg-[#5A4BDA] hover:bg-[#4E3FC8] rounded-md shadow-sm cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. VIEW INSTRUCTIONS MODAL */}
      {showInstructionsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-base text-gray-900">General Instructions</h3>
              <button
                onClick={() => setShowInstructionsModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-800">
                Please read the following instructions carefully:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Total duration of this test is 15 minutes.</li>
                <li>The clock has been set at the server and the countdown timer at the top displays remaining time.</li>
                <li>There are 25 questions in this test. All questions carry equal marks.</li>
                <li>Each correct answer will be awarded 4 marks. 1 mark will be deducted for each incorrect response.</li>
                <li>Click on &apos;Save & Next&apos; to save your answer and move to the next question.</li>
                <li>Click on &apos;Mark for Review & Next&apos; to save your answer for review.</li>
              </ul>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowInstructionsModal(false)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#0084FF] hover:bg-blue-600 rounded-md cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TestPlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Test Interface...
        </div>
      }
    >
      <TestPlayerContent />
    </Suspense>
  );
}
