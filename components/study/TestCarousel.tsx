"use client";

import React, { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import TestCard, { TestCardProps } from "./TestCard";

interface TestCarouselProps {
  tests: TestCardProps[];
}

export default function TestCarousel({ tests }: TestCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group w-full">
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {tests.map((test) => (
          <TestCard key={test.id} {...test} />
        ))}
      </div>

      {/* Right Scroll Arrow (Matching Screenshot) */}
      {tests.length > 2 && (
        <button
          onClick={scrollRight}
          className="w-10 h-10 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-50 cursor-pointer absolute -right-3 top-1/2 -translate-y-1/2 z-10 transition-colors"
          aria-label="Scroll next"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
