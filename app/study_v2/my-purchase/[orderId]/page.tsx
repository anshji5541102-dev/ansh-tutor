"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import StudyHeader from "@/components/study/StudyHeader";
import StudySidebar from "@/components/study/StudySidebar";
import { purchasesList, PurchaseItem } from "@/lib/purchase-data";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
} from "lucide-react";

function OrderDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const rawId = (params?.orderId as string) || "jee-prep-2027";
  // Match by id or orderId or substring
  const order: PurchaseItem =
    purchasesList.find(
      (p) =>
        p.id === rawId ||
        p.orderId === rawId ||
        rawId.includes(p.orderId) ||
        rawId.includes(p.id)
    ) || purchasesList[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
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
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-6 bg-[#F8F9FB]">
          {/* Subheader: <- Order Details */}
          <div className="flex items-center gap-3 pb-5 mb-6 border-b border-[#E5E7EB] max-w-6xl">
            <button
              onClick={() => router.push("/study_v2/my-purchase")}
              className="p-1.5 -ml-1.5 rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Back to Purchases"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.4]" />
            </button>
            <h1 className="text-xl sm:text-[22px] font-bold text-[#1B212D] tracking-tight">
              Order Details
            </h1>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-20 right-6 z-50 bg-[#1B212D] text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-lg border border-gray-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Main 2-Column Grid matching Screenshot media_1793631690824_657f0f5e.png */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl pb-12">
            {/* LEFT COLUMN: Payment Successful Card + Batch Card */}
            <div className="lg:col-span-8 space-y-6">
              {/* Card 1: Payment Successful Box */}
              <div className="bg-[#F2FBF7] border border-[#B8F0D6] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-2xs">
                {/* Round green checkmark icon with double halo ring */}
                <div className="w-13 h-13 rounded-full bg-[#10B981] flex items-center justify-center text-white ring-8 ring-[#DCFCE7] shadow-sm mb-3">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[#1B212D]">
                  Payment Successful
                </h2>
              </div>

              {/* Card 2: Order Information & Batch Card */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-2xs">
                {/* Order Id & Date Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#F3F4F6] text-xs sm:text-sm">
                  <div className="text-gray-500">
                    Order Id:{" "}
                    <span className="font-bold text-[#1B212D] break-all">
                      {order.orderId}
                    </span>
                  </div>
                  <div className="text-gray-500">
                    Order Date:{" "}
                    <span className="font-bold text-[#1B212D]">
                      {order.orderDate}
                    </span>
                  </div>
                </div>

                {/* Batch Item Details Row */}
                <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-gray-100">
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Batch Thumbnail */}
                    <div
                      className={`w-28 sm:w-36 h-20 sm:h-24 rounded-xl ${order.bannerBg} flex flex-col items-center justify-between p-2 relative overflow-hidden shrink-0 select-none shadow-2xs`}
                    >
                      <div
                        className={`text-[9px] sm:text-[10px] font-extrabold ${order.bannerTextColor} uppercase tracking-wider text-center leading-tight whitespace-pre-line pt-0.5`}
                      >
                        {order.bannerLabel}
                      </div>
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 -mb-1">
                        <Image
                          src={order.avatarSrc || "/batches/user_avatar.png"}
                          alt={order.avatarAlt}
                          fill
                          className="object-cover rounded-full border border-white/60 shadow-xs"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                    </div>

                    {/* Batch Title, Price & Status */}
                    <div className="space-y-1.5 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-[#1B212D] tracking-tight leading-snug line-clamp-2">
                        {order.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">
                        Price:{" "}
                        <span
                          className={
                            order.price === "Free"
                              ? "text-[#059669] font-bold"
                              : "text-[#1B212D] font-bold"
                          }
                        >
                          {order.price}
                        </span>
                      </p>
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Go to Batch Action Button */}
                  <div className="shrink-0 self-start sm:self-center">
                    <Link
                      href="/study_v2/study"
                      className="inline-block px-6 py-2.5 bg-[#F0EEFF] text-[#5A4BDA] hover:bg-[#E5E0FF] text-xs sm:text-sm font-bold rounded-xl transition-colors text-center"
                    >
                      Go to Batch
                    </Link>
                  </div>
                </div>

                {/* Valid Till Container */}
                <div className="bg-[#F8F9FB] rounded-xl p-4 mt-5 border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium">Valid Till:</p>
                  <p className="text-sm font-bold text-[#1B212D] mt-0.5">
                    {order.validTill}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Payment Details + Need Help */}
            <div className="lg:col-span-4 space-y-6">
              {/* Card 1: Payment Details */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-2xs">
                <h3 className="text-base font-bold text-[#1B212D] mb-4">
                  Payment Details
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Price (1 items)</span>
                    <span className="font-medium text-[#1B212D]">
                      {order.originalPrice || order.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="font-medium text-[#1B212D]">
                      {order.discount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span className="font-medium text-[#1B212D]">
                      {order.deliveryCharges}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Coupon Disc.</span>
                    <span className="font-medium text-[#1B212D]">
                      {order.couponDisc}
                    </span>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-3 my-2 flex items-center justify-between text-sm sm:text-base font-bold text-[#1B212D]">
                    <span>Total Amount</span>
                    <span>{order.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Need help? */}
              <div className="bg-[#F0F7FF] border border-[#DCEBFF] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[160px] shadow-2xs">
                <div className="relative z-10">
                  <h3 className="text-base font-bold text-[#1B212D]">
                    Need help?
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-[190px]">
                    Get in touch with us for support.
                  </p>
                </div>

                <div className="relative z-10 mt-5">
                  <Link
                    href="/study_v2/help_support"
                    className="inline-block px-4 py-2.5 bg-[#1B212D] hover:bg-black text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Chat with us
                  </Link>
                </div>

                {/* Customer Support Representative Illustration on Right (Matching Screenshot) */}
                <div className="absolute right-3 bottom-0 w-28 h-28 pointer-events-none select-none opacity-95">
                  <svg
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    {/* Speech bubble 1 */}
                    <rect
                      x="70"
                      y="14"
                      width="38"
                      height="18"
                      rx="6"
                      fill="#FEE2E2"
                    />
                    <circle cx="80" cy="23" r="2" fill="#EF4444" />
                    <circle cx="89" cy="23" r="2" fill="#EF4444" />
                    <circle cx="98" cy="23" r="2" fill="#EF4444" />
                    <path
                      d="M78 32 L82 32 L78 36 Z"
                      fill="#FEE2E2"
                    />

                    {/* Small avatar bubble */}
                    <circle cx="46" cy="30" r="10" fill="#E2E8F0" />
                    <circle cx="46" cy="28" r="4" fill="#64748B" />
                    <path
                      d="M39 38 C39 34 43 33 46 33 C49 33 53 34 53 38 Z"
                      fill="#64748B"
                    />

                    {/* Customer Support Agent Body */}
                    {/* Hair */}
                    <path
                      d="M72 45 C72 35 96 35 96 45 C96 55 94 65 74 65 C72 65 72 55 72 45 Z"
                      fill="#1E293B"
                    />
                    {/* Face */}
                    <circle cx="84" cy="50" r="11" fill="#FCD34D" />
                    {/* Headset */}
                    <path
                      d="M75 49 C75 42 93 42 93 49"
                      stroke="#0F172A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <rect
                      x="73"
                      y="47"
                      width="3.5"
                      height="6"
                      rx="1.5"
                      fill="#0F172A"
                    />
                    <rect
                      x="91.5"
                      y="47"
                      width="3.5"
                      height="6"
                      rx="1.5"
                      fill="#0F172A"
                    />
                    {/* Mic */}
                    <path
                      d="M75 51 C75 56 80 57 82 57"
                      stroke="#0F172A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="83" cy="57" r="1.5" fill="#EF4444" />
                    {/* Torso / Orange Shirt */}
                    <path
                      d="M68 85 C68 67 100 67 100 85 L100 110 L68 110 Z"
                      fill="#F97316"
                    />
                    {/* Collar */}
                    <path
                      d="M80 67 L84 75 L88 67 Z"
                      fill="#FCD34D"
                    />
                    {/* Laptop on desk */}
                    <rect
                      x="58"
                      y="94"
                      width="36"
                      height="20"
                      rx="2"
                      fill="#94A3B8"
                    />
                    <path
                      d="M52 114 L100 114 L96 117 L56 117 Z"
                      fill="#CBD5E1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function OrderDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Order Details...
        </div>
      }
    >
      <OrderDetailsContent />
    </Suspense>
  );
}
