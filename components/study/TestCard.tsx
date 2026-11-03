"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Star } from "lucide-react";

export interface TestCardProps {
  id: string;
  title: string;
  questionsCount?: number;
  totalMarks?: number;
  duration?: string;
  isAttempted?: boolean;
}

export default function TestCard({
  id,
  title,
  questionsCount = 25,
  totalMarks = 100,
  isAttempted: propAttempted = false,
}: TestCardProps) {
  const [attempted, setAttempted] = useState(propAttempted);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ansh_attempted_tests");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed[id]) {
            setAttempted(true);
          }
        }
      } catch {}
    }
  }, [id]);

  return (
    <div className="w-[300px] sm:w-[320px] bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between shrink-0">
      <div>
        {/* Title (Difficulty removed as requested) */}
        <h3 className="text-lg sm:text-[21px] font-bold text-gray-900 tracking-tight line-clamp-1">
          {title}
        </h3>

        {/* Meta: Questions & Marks */}
        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mt-2">
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-gray-500 stroke-[1.8]" />
            <span>{questionsCount} Questions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-gray-500 stroke-[1.8]" />
            <span>{totalMarks} Marks</span>
          </div>
        </div>
      </div>

      {/* Button: "View Result" if attempted, else "Attempt Now" */}
      <div className="pt-6">
        <Link
          href={
            attempted
              ? `/study_v2/test/${id}/result`
              : `/study_v2/test/${id}/instructions`
          }
          className="w-full py-3 rounded-xl bg-[#F0EEFF] hover:bg-[#E5E0FF] text-[#5A4BDA] font-bold text-sm sm:text-[15px] flex items-center justify-center transition-colors cursor-pointer text-center select-none"
        >
          {attempted ? "View Result" : "Attempt Now"}
        </Link>
      </div>
    </div>
  );
}
