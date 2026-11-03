"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import StudyHeader from "@/components/study/StudyHeader";
import StudySidebar from "@/components/study/StudySidebar";
import { purchasesList, PurchaseItem } from "@/lib/purchase-data";
import { ArrowLeft, ChevronRight } from "lucide-react";

function MyPurchasesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("ansh_purchases") || "[]");
        setPurchases(stored);
      } catch {
        setPurchases([]);
      }
    }
  }, []);

  // If search param like ?view=order_detail_... is present, route to [orderId]
  React.useEffect(() => {
    const view = searchParams.get("view");
    if (view && view.startsWith("order_detail_")) {
      const orderId = view.replace("order_detail_", "");
      router.push(`/study_v2/my-purchase/${orderId}`);
    }
  }, [searchParams, router]);

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
        <main className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 bg-[#F8F9FB]">
          {/* Subheader: <- My Purchases (Matching Screenshot Exact) */}
          <div className="flex items-center gap-3 pb-5 mb-6 border-b border-[#E5E7EB]">
            <button
              onClick={() => router.push("/study_v2/study")}
              className="p-1.5 -ml-1.5 rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Back to Study"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.4]" />
            </button>
            <h1 className="text-xl sm:text-[22px] font-bold text-[#1B212D] tracking-tight">
              My Purchases
            </h1>
          </div>

          {/* Cards List (Matching screenshot media_1793627254187_e2791c65.png) */}
          <div className="space-y-5 max-w-5xl">
            {purchases.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-xs my-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 text-[#5A4BDA] flex items-center justify-center mx-auto text-2xl font-bold">
                  🧾
                </div>
                <h3 className="text-lg font-bold text-gray-900">No Purchases Recorded Yet</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  When you enroll in an academic batch or pay via Pay Later, your invoice and batch access will appear here automatically.
                </p>
                <button
                  onClick={() => router.push("/study_v2/batches")}
                  className="px-6 py-2.5 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Explore Batches
                </button>
              </div>
            ) : (
              purchases.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/study_v2/my-purchase/${item.id}`)}
                className="bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-gray-300 transition-all cursor-pointer group flex items-center justify-between gap-5"
              >
                {/* Left Side: Thumbnail Banner + Content Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 min-w-0">
                  {/* Thumbnail Banner with Educator Graphic */}
                  <div
                    className={`w-full sm:w-56 h-28 sm:h-32 rounded-xl ${item.bannerBg} relative overflow-hidden flex flex-col items-center justify-between p-3 shrink-0 select-none shadow-2xs`}
                  >
                    {/* Header Label Typography */}
                    <div
                      className={`text-[10px] sm:text-[11px] font-extrabold ${item.bannerTextColor} uppercase tracking-wider text-center leading-tight whitespace-pre-line z-10 pt-1`}
                    >
                      {item.bannerLabel}
                    </div>

                    {/* Faculty photo / avatar */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 -mb-2 z-10">
                      <Image
                        src={item.avatarSrc || "/batches/user_avatar.png"}
                        alt={item.avatarAlt}
                        fill
                        className="object-cover rounded-full border-2 border-white/60 shadow-xs"
                      />
                    </div>

                    {/* Background subtle radial glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Middle Details: SUCCESS badge, Title, Date & Price */}
                  <div className="space-y-1.5 min-w-0">
                    <span className="inline-block px-2.5 py-0.5 rounded-[4px] bg-[#ECFDF5] text-[#059669] text-[11px] font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>

                    <h3 className="text-base sm:text-lg font-bold text-[#1B212D] group-hover:text-[#5A4BDA] transition-colors tracking-tight line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      {item.dateAndPrice}
                    </p>
                  </div>
                </div>

                {/* Right Side: Chevron Right Icon */}
                <div className="shrink-0 pl-2">
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 transition-colors" />
                </div>
              </div>
            )))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function MyPurchasesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Purchases...
        </div>
      }
    >
      <MyPurchasesContent />
    </Suspense>
  );
}
