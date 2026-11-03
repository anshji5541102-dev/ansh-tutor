"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StudyHeader from "@/components/study/StudyHeader";
import StudySidebar from "@/components/study/StudySidebar";
import { ArrowLeft, Calendar } from "lucide-react";

interface BatchItem {
  id: string;
  title: string;
  category: "enrolled" | "all";
  bannerImg?: string;
  bannerBg: string;
  bannerTextColor: string;
  bannerLabel: string;
  avatarSrc?: string;
  facultyName: string;
  language: string;
  startDate: string;
  endDate: string;
  whatsAppMsg: string;
}

const defaultBatches: BatchItem[] = [];

function MyBatchesContent() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"enrolled" | "all">("enrolled");
  const [batches, setBatches] = useState<BatchItem[]>([]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("ansh_purchases") || "[]");
        if (Array.isArray(stored) && stored.length > 0) {
          const mapped: BatchItem[] = stored.map((p) => ({
            id: p.id,
            title: p.title,
            category: "enrolled",
            bannerBg: p.bannerBg || "bg-[#EAE5FC]",
            bannerTextColor: p.bannerTextColor || "text-[#5A4BDA]",
            bannerLabel: p.bannerLabel || `${p.title.toUpperCase()}\nENROLLED`,
            avatarSrc: p.avatarSrc || "/batches/user_avatar.png",
            facultyName: p.avatarAlt || "Faculty",
            language: "Hinglish",
            startDate: p.orderDate || "Ongoing",
            endDate: p.validTill || "Jun 30, 2030",
            whatsAppMsg: `Hello Ansh Tutor, I have a question about ${p.title}.`,
          }));
          setBatches(mapped);
          return;
        }
      } catch {}
      setBatches([]);
    }
  }, []);

  const filteredBatches =
    selectedTab === "all"
      ? batches
      : batches.filter((b) => b.category === "enrolled");

  const handleWhatsAppClick = (msg: string) => {
    const url = `https://wa.me/917525009428?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

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
          {/* Subheader: <- Back (Matching Screenshot Exact) */}
          <div className="flex items-center gap-2 pb-3">
            <button
              onClick={() => router.push("/study_v2/study")}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-black transition-colors cursor-pointer"
              aria-label="Back to Study"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
              <span>Back</span>
            </button>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B212D] tracking-tight mt-1 mb-5">
            My Batches
          </h1>

          {/* Segmented Control / Toggle: Enrolled vs All */}
          <div className="bg-[#EAEFF5] p-1 rounded-2xl inline-flex items-center gap-1 mb-6">
            <button
              onClick={() => setSelectedTab("enrolled")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                selectedTab === "enrolled"
                  ? "bg-white text-[#1B212D] shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Enrolled Batches
            </button>
            <button
              onClick={() => setSelectedTab("all")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                selectedTab === "all"
                  ? "bg-white text-[#1B212D] shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              All Batches
            </button>
          </div>

          {/* Sub-filter / Tabs Bar: 'All' with purple underline */}
          <div className="border-b border-gray-200 mb-6">
            <button className="text-[#5A4BDA] font-bold text-sm border-b-2 border-[#5A4BDA] pb-2 -mb-px inline-block">
              All
            </button>
          </div>

          {/* Batches Grid (Matching screenshot media_1793632776941_34cef2be.png) */}
          {filteredBatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl pb-12">
              {filteredBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between"
                >
                  {/* Top Row: Title + WhatsApp Icon */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4 min-h-[44px]">
                      <h3 className="text-sm sm:text-base font-bold text-[#1B212D] leading-snug line-clamp-2">
                        {batch.title}
                      </h3>

                      {/* WhatsApp Button */}
                      <button
                        onClick={() => handleWhatsAppClick(batch.whatsAppMsg)}
                        title="Chat on WhatsApp"
                        className="text-gray-400 hover:text-emerald-600 transition-colors shrink-0 p-1 rounded-full hover:bg-emerald-50 cursor-pointer"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-current"
                        >
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                      </button>
                    </div>

                    {/* Banner Image / Graphic */}
                    <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden shadow-2xs select-none">
                      {batch.bannerImg ? (
                        <Image
                          src={batch.bannerImg}
                          alt={batch.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className={`w-full h-full ${batch.bannerBg} flex flex-col items-center justify-between p-3 relative`}
                        >
                          <div
                            className={`text-xs font-extrabold ${batch.bannerTextColor} uppercase tracking-wider text-center leading-tight whitespace-pre-line z-10 pt-1`}
                          >
                            {batch.bannerLabel}
                          </div>

                          <div className="relative w-20 h-20 -mb-2 z-10">
                            <Image
                              src={batch.avatarSrc || "/batches/user_avatar.png"}
                              alt={batch.facultyName}
                              fill
                              className="object-cover rounded-full border-2 border-white/60 shadow-xs"
                            />
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                        </div>
                      )}

                      {/* Hinglish Badge at bottom-left */}
                      <div className="absolute bottom-2.5 left-2.5 z-20">
                        <span className="px-2 py-0.5 rounded-[4px] bg-white/90 backdrop-blur-xs text-[10px] font-bold text-gray-700 shadow-2xs">
                          {batch.language}
                        </span>
                      </div>
                    </div>

                    {/* Timeline row */}
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 font-medium mt-3 mb-4">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>
                        Starts on {batch.startDate} | Ends on {batch.endDate}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Action Button: Let's Study */}
                  <Link
                    href="/study_v2/study/all-classes"
                    className="w-full py-2.5 sm:py-3 bg-[#5A4BDA] hover:bg-[#4939C8] active:bg-[#3E2FB8] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs text-center block"
                  >
                    Let's Study
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-xs my-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 text-[#5A4BDA] flex items-center justify-center mx-auto text-2xl font-bold">
                🎓
              </div>
              <h3 className="text-lg font-bold text-gray-900">No Enrolled Batches Yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                You haven&apos;t enrolled in any batches yet. Head over to the Batches section to explore and enroll in an academic program.
              </p>
              <button
                onClick={() => router.push("/study_v2/batches")}
                className="px-6 py-2.5 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Explore Batches
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function MyBatchesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Batches...
        </div>
      }
    >
      <MyBatchesContent />
    </Suspense>
  );
}
