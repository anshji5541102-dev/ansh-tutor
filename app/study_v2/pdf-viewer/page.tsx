'use client'

import React, { useState, Suspense } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import {
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
} from 'lucide-react'

function PdfViewerContent() {
  const searchParams = useSearchParams()
  const title = searchParams.get('title') || 'Marathon Class Notes'
  const subject = searchParams.get('subject') || 'Mathematics'
  const chapter = searchParams.get('chapter') || 'CH - 01: Half Yearly Marathon'

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3
  const [zoomLevel, setZoomLevel] = useState(100)

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  const handleDownload = () => {
    if (typeof window !== 'undefined') {
      alert(`Downloading ${title.replace(/\s+/g, '_')}.pdf...`)
    }
  }

  return (
    <div className="min-h-screen bg-[#323639] flex flex-col font-sans select-none text-white">
      {/* 1. TOP NATIVE-STYLE PDF TOOLBAR */}
      <header className="sticky top-0 z-50 h-12 bg-[#202124] border-b border-[#3c4043] px-4 flex items-center justify-between text-xs shadow-md">
        
        {/* Left: Document Info */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-black text-[9.5px] uppercase tracking-wider shrink-0">
            PDF
          </span>
          <span className="text-[13px] font-medium text-gray-200 truncate max-w-[220px] sm:max-w-md">
            {title}.pdf
          </span>
        </div>

        {/* Center: Page Controls + Zoom Controls */}
        <div className="flex items-center gap-4 text-gray-300">
          
          {/* Page Counter */}
          <div className="flex items-center gap-1.5 bg-[#2d3034] px-2.5 py-1 rounded-md border border-[#444746]">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-0.5 hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-semibold px-1">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-0.5 hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom Buttons */}
          <div className="hidden sm:flex items-center gap-1 bg-[#2d3034] px-2 py-1 rounded-md border border-[#444746]">
            <button
              onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
              className="p-0.5 hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-semibold w-10 text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
              className="p-0.5 hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Right: Print & Download Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="p-1.5 rounded-md hover:bg-[#3c4043] text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Print Document"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-md bg-[#5A4BDA] hover:bg-[#4a3bc7] text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs">Download</span>
          </button>
        </div>

      </header>

      {/* 2. PDF VIEWER CANVAS */}
      <main className="flex-1 overflow-y-auto py-8 sm:py-12 px-4 flex flex-col items-center gap-8 bg-[#525659]">
        
        {/* PAGE 1 */}
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className="bg-white text-gray-900 shadow-2xl w-full max-w-[760px] min-h-[980px] p-10 sm:p-14 flex flex-col justify-between border border-gray-400 rounded-[2px] transition-transform duration-150"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b-2 border-gray-900 pb-5 mb-8">
              <div className="flex items-center gap-3">
                <Image
                  src="/owl-logo.png"
                  alt="Ansh Tutor"
                  width={36}
                  height={36}
                  className="object-contain"
                />
                <div>
                  <h1 className="text-xl font-extrabold tracking-tight text-gray-950">
                    Ansh Tutor
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">
                    Rajajipuram Campus, Lucknow &bull; Academic Session 2026-27
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded bg-purple-50 text-[#5A4BDA] font-extrabold text-xs">
                  {subject}
                </span>
                <p className="text-[11px] text-gray-400 mt-1">Official Notes Bank</p>
              </div>
            </div>

            {/* Document Title Banner */}
            <div className="bg-gray-50 border-l-4 border-[#5A4BDA] p-4 rounded-r-lg mb-8">
              <h2 className="text-base sm:text-lg font-bold text-gray-950">
                {title}
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                {chapter} &bull; Class 8 Foundation &bull; High-Yield Comprehensive Lecture Notes
              </p>
            </div>

            {/* Structured Page Content */}
            <div className="space-y-6 text-xs sm:text-[13.5px] leading-relaxed text-gray-800">
              <div>
                <h3 className="font-bold text-gray-950 text-sm mb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5A4BDA]" />
                  1. Executive Summary &amp; Learning Objectives
                </h3>
                <p className="text-gray-700 pl-4.5">
                  This master review sheet synthesizes foundational theorems, step-by-step proofs, and algebraic properties taught during classroom lectures. Students must practice deriving results independently before advancing to complex numerical worksheets.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-950 text-sm mb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5A4BDA]" />
                  2. Core High-Yield Formulas &amp; Definitions
                </h3>
                <div className="pl-4.5 grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
                  <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200">
                    <span className="font-bold text-gray-900 text-xs block mb-1">Standard Equation:</span>
                    <code className="text-xs font-mono text-[#5A4BDA] font-bold">ax + b = 0 &rArr; x = -b/a</code>
                  </div>
                  <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200">
                    <span className="font-bold text-gray-900 text-xs block mb-1">Commutative Law:</span>
                    <code className="text-xs font-mono text-[#5A4BDA] font-bold">a + b = b + a &bull; a &times; b = b &times; a</code>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-[13px] leading-relaxed">
                <span className="font-bold block mb-1">💡 Faculty Golden Exam Strategy:</span>
                Always simplify terms on both sides of equal sign prior to transposing variables. Check for extraneous roots by substituting final variable values back into original questions.
              </div>
            </div>
          </div>

          {/* Page Footer */}
          <div className="pt-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
            <span>Ansh Tutor &bull; Block-B, Rajajipuram, Lucknow &bull; Helpline: +91 75250 09428</span>
            <span className="font-bold text-gray-700">Page 1 of {totalPages}</span>
          </div>
        </div>

        {/* PAGE 2 */}
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className="bg-white text-gray-900 shadow-2xl w-full max-w-[760px] min-h-[980px] p-10 sm:p-14 flex flex-col justify-between border border-gray-400 rounded-[2px] transition-transform duration-150"
        >
          <div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6 text-xs text-gray-400">
              <span>Ansh Tutor &bull; {subject} Revision Bank</span>
              <span>Class 8 Foundation</span>
            </div>

            <div className="space-y-6 text-xs sm:text-[13.5px] leading-relaxed text-gray-800">
              <h3 className="font-bold text-gray-950 text-base mb-2">
                3. Solved Exemplar Problems &amp; Shortcut Hacks
              </h3>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <span className="font-bold text-gray-900 block text-xs">Problem Example #01:</span>
                <p className="text-gray-700 font-mono text-xs">
                  Solve: 5(2x - 3) - 3(3x - 7) = 5
                </p>
                <div className="bg-white p-3 rounded border border-gray-200 space-y-1 text-xs">
                  <span className="font-bold text-[#5A4BDA] block">Step-by-Step Working:</span>
                  <p>1. Expand brackets: 10x - 15 - 9x + 21 = 5</p>
                  <p>2. Combine like terms: (10x - 9x) + (-15 + 21) = 5 &rArr; x + 6 = 5</p>
                  <p className="font-bold text-emerald-700">3. Final Solution: x = 5 - 6 = -1 &check;</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <span className="font-bold text-gray-900 block text-xs">Problem Example #02:</span>
                <p className="text-gray-700 font-mono text-xs">
                  Represent 5/8 and -3/4 on the standard real number line.
                </p>
                <p className="text-xs text-gray-600">
                  Convert denominators to common LCM (8): -3/4 = -6/8. Plot points proportionately from the origin 0.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
            <span>Ansh Tutor &bull; Rajajipuram Campus</span>
            <span className="font-bold text-gray-700">Page 2 of {totalPages}</span>
          </div>
        </div>

      </main>
    </div>
  )
}

export default function PdfViewerPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-[#323639] flex items-center justify-center text-white text-sm font-semibold">
          Loading Document...
        </div>
      }
    >
      <PdfViewerContent />
    </Suspense>
  )
}
