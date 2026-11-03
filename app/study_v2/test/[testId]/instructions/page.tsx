'use client'

import React, { useState, Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

function TestInstructionsContent() {
  const router = useRouter()
  const params = useParams()
  const testId = (params?.testId as string) || 'dpp-1'

  const [step, setStep] = useState<1 | 2>(1)
  const [language, setLanguage] = useState<'English' | 'Hindi'>('English')
  const [declarationChecked, setDeclarationChecked] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)

  const handleStartTest = () => {
    if (!declarationChecked) return
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {})
      }
    } catch {}
    router.push(`/study_v2/test/${testId}`)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1B212D] font-sans flex flex-col justify-between selection:bg-[#5A4BDA] selection:text-white">
      
      {/* ======================================================== */}
      {/* 1. TOP HEADER: "GENERAL INSTRUCTIONS" (Matching Screenshot 1) */}
      {/* ======================================================== */}
      <header className="h-14 bg-white border-b border-[#E5E7EB] flex items-center justify-center px-6 sticky top-0 z-30 shadow-2xs">
        <h1 className="text-sm sm:text-base font-bold text-[#1B212D] tracking-wider uppercase text-center">
          GENERAL INSTRUCTIONS
        </h1>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN INSTRUCTIONS CONTAINER (Exact PW layout)         */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 md:p-10">
        
        {/* Language Selector Top-Right */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
            <span>View instructions in:</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs font-semibold text-gray-800 hover:border-gray-400 cursor-pointer shadow-2xs"
              >
                <span>{language}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1 text-xs">
                  {(['English', 'Hindi'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => {
                        setLanguage(l)
                        setLangDropdownOpen(false)
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-gray-100 font-medium text-gray-800"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* STEP 1: INITIAL SUMMARY INSTRUCTIONS (Screenshot 1)       */}
        {/* -------------------------------------------------------- */}
        {step === 1 ? (
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-10 shadow-2xs space-y-6">
            <h2 className="text-sm sm:text-[15px] font-bold text-[#1B212D]">
              Please read the instructions carefully
            </h2>

            <ol className="list-decimal list-outside pl-5 space-y-3.5 text-xs sm:text-[13.5px] leading-relaxed text-gray-700">
              <li>
                Total duration of Test is <span className="font-bold text-gray-900">60 min</span>.
              </li>
              <li>
                The test consists of <span className="font-bold text-gray-900">25 questions</span>. The maximum marks are <span className="font-bold text-gray-900">100</span>.
              </li>
              <li>
                There is only one correct response for each objective type question.
              </li>
              <li>
                Each correct answer will give <span className="font-bold text-gray-900">4 marks</span> while <span className="font-bold text-gray-900">1 Mark</span> will be deducted for a wrong response for both the Objective and integer type Questions.
              </li>
            </ol>
          </div>
        ) : (
          /* -------------------------------------------------------- */
          /* STEP 2: TEST DETAILS & REGULATIONS (Screenshots 2 to 5)  */
          /* [EXPLICIT USER RULE: Symbol & color boxes REMOVED]       */
          /* -------------------------------------------------------- */
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-10 shadow-2xs space-y-8 text-xs sm:text-[13.5px] leading-relaxed text-gray-700">
            
            {/* Test Details */}
            <div className="space-y-3">
              <h3 className="font-bold text-[#1B212D] text-sm sm:text-[15px]">
                Test Details
              </h3>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>
                  The clock will be set at the server. The countdown timer in the top left corner of the screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.
                </li>
                <li>
                  The Questions Palette displayed on the right side of screen will show the status of each question during the examination.
                </li>
                <li>
                  You can click on the language dropdown on the top right corner of the question box to change the language during the exam for the entire question paper. On clicking on the button you will get a drop-down to change the question content to the desired language.
                </li>
              </ul>
            </div>

            {/* Navigating to a Question */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-[#1B212D]">
                Navigating to a Question:
              </h4>
              <p className="font-medium text-gray-800">
                1. To answer a question, do the following:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-600">
                <li>
                  Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.
                </li>
                <li>
                  Click on <span className="font-bold text-gray-900">Save &amp; Next</span> to save your answer for the current question and then go to the next question.
                </li>
                <li>
                  Click on <span className="font-bold text-gray-900">Mark for Review &amp; Next</span> to save your answer for the current question, mark it for review, and then go to the next question.
                </li>
              </ul>
            </div>

            {/* Answering a Question */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-[#1B212D]">
                Answering a Question:
              </h4>
              <p className="font-medium text-gray-800">
                1. Procedure for answering a multiple choice type question:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-1.5 text-gray-600">
                <li>To select your answer, click on the button of one of the options.</li>
                <li>To deselect your chosen answer, click on the button of the chosen option again.</li>
                <li>To change your chosen answer, click on the button of another option.</li>
                <li>To save your answer, you MUST click on the <span className="font-bold text-gray-900">Save &amp; Next</span> button.</li>
                <li>To mark the question for review, click on the <span className="font-bold text-gray-900">Mark for Review &amp; Next</span> button.</li>
              </ul>

              <p className="font-medium text-gray-800 pt-2">
                2. Procedure for answering an integer type question:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-1 text-gray-600">
                <li>To enter a numerical answer, use the keyboard to enter the correct integer value in the place designated to enter the answer.</li>
              </ul>

              <p className="pt-2 text-gray-600">
                3. To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.
              </p>
            </div>

            {/* Navigating through sections */}
            <div className="space-y-2">
              <h4 className="font-bold text-[#1B212D]">
                Navigating through sections:
              </h4>
              <ol className="list-decimal list-outside pl-5 space-y-1.5 text-gray-600">
                <li>Sections in this question paper are displayed on the top bar of the screen. Questions in a section can be viewed by clicking on the section name. The section you are currently viewing is highlighted.</li>
                <li>After clicking the <span className="font-bold text-gray-900">Save &amp; Next</span> button on the last question for a section, you will automatically be taken to the first question of the next section.</li>
                <li>You can shuffle between sections and questions anything during the examination as per your convenience only during the time stipulated.</li>
                <li>Candidates can view the corresponding section summary as part of the legend that appears in every section above the question palette.</li>
              </ol>
            </div>

            {/* Default Language Selector + Red Disclaimer matching Screenshot 4 & 5 */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                  Choose your default language
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Language*</span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="border border-gray-300 rounded px-3 py-1.5 text-xs font-semibold bg-white text-gray-800 focus:outline-none focus:border-[#5A4BDA]"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              <p className="text-xs text-red-600 font-medium">
                Please note all questions will appear in your default language. This language can be changed for a particular question later on.
              </p>
            </div>

            {/* Declaration Checkbox matching Screenshot 4 & 5 */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <h5 className="font-bold text-gray-900 text-xs sm:text-sm">
                Declaration:
              </h5>
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={declarationChecked}
                  onChange={(e) => setDeclarationChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#5A4BDA] focus:ring-[#5A4BDA] cursor-pointer shrink-0 accent-[#5A4BDA]"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I have read and understood the instructions. All computer hardware allotted to me are in proper working condition. I declare that I am not in possession of / not wearing / not carrying any prohibited gadget like mobile phone, bluetooth devices etc. / any prohibited material with me into the Examination Hall. I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this Test and/or to disciplinary action, which may include ban from future Tests / Examinations.
                </span>
              </label>
            </div>

          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* 3. BOTTOM NAVIGATION BAR (Matching Screenshots)          */}
      {/* ======================================================== */}
      <footer className="h-16 bg-white border-t border-[#E5E7EB] px-6 sm:px-12 flex items-center justify-between sticky bottom-0 z-30 shadow-md">
        
        {/* Left: Previous Button (Visible in Step 2) */}
        <div>
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#5A4BDA] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              &lt; Previous
            </button>
          )}
        </div>

        {/* Right: Next > (Step 1) OR "I am ready to begin" (Step 2) */}
        <div>
          {step === 1 ? (
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-lg bg-[#5A4BDA] hover:bg-[#4a3bc7] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-sm"
            >
              Next &gt;
            </button>
          ) : (
            <button
              type="button"
              disabled={!declarationChecked}
              onClick={handleStartTest}
              className={`px-6 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-colors shadow-sm ${
                declarationChecked
                  ? 'bg-[#5A4BDA] hover:bg-[#4a3bc7] text-white cursor-pointer'
                  : 'bg-indigo-300 text-white cursor-not-allowed opacity-60'
              }`}
            >
              I am ready to begin
            </button>
          )}
        </div>

      </footer>

    </div>
  )
}

export default function TestInstructionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Instructions...
        </div>
      }
    >
      <TestInstructionsContent />
    </Suspense>
  )
}
