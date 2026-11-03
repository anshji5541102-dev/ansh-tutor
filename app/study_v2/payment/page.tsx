"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Tag,
  ShieldCheck,
  QrCode,
  Clock,
  Sparkles,
  ChevronRight,
  X,
  CreditCard,
  Lock,
  Wallet,
  Calendar,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  User,
  ShieldAlert,
  Copy,
  ExternalLink,
} from "lucide-react";

interface Coupon {
  code: string;
  discountType: "flat" | "percent";
  discountValue: number;
  description: string;
}

const availableCoupons: Coupon[] = [
  {
    code: "ANSH100",
    discountType: "flat",
    discountValue: 100,
    description: "Flat ₹100 instant discount on all foundation courses",
  },
  {
    code: "FESTIVE20",
    discountType: "percent",
    discountValue: 20,
    description: "20% festive discount on total order",
  },
  {
    code: "TOPPER300",
    discountType: "flat",
    discountValue: 300,
    description: "Special ₹300 scholarship rebate for batch enrollments",
  },
];

function PaymentFlowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Query parameter overrides
  const batchTitle =
    searchParams.get("title") || "Umang Term II 2027 (Class 8)";
  const rawBasePrice = parseInt(searchParams.get("price") || "1799", 10);
  const rawOriginalPrice = parseInt(
    searchParams.get("originalPrice") || "3000",
    10
  );

  // Steps: 'summary' (Screenshot 1) vs 'gateway' (Screenshot 2)
  const initialStep =
    searchParams.get("step") === "gateway" ? "gateway" : "summary";
  const [currentStep, setCurrentStep] = useState<"summary" | "gateway">(
    initialStep
  );

  // Coupon States
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  // Gateway States (Strictly UPI QR and Pay Later)
  const [selectedMethod, setSelectedMethod] = useState<"upi" | "paylater">(
    "upi"
  );
  const [countdownSeconds, setCountdownSeconds] = useState(597); // 09:57 in seconds
  const [payLaterName, setPayLaterName] = useState("");
  const [payLaterPhone, setPayLaterPhone] = useState("");
  const [payLaterEmail, setPayLaterEmail] = useState("");
  const [payLaterAddress, setPayLaterAddress] = useState("");
  const [payLaterError, setPayLaterError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isPayLaterSuccess, setIsPayLaterSuccess] = useState(false);
  const adminUpiId = process.env.NEXT_PUBLIC_ADMIN_UPI_ID || "7525009428@paytm";

  // Timer countdown
  useEffect(() => {
    if (currentStep !== "gateway") return;
    const interval = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentStep]);

  // Pricing calculations
  const originalPrice = rawOriginalPrice;
  const standardDiscount = originalPrice - rawBasePrice; // e.g. 3000 - 1799 = 1201

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "flat") {
      couponDiscount = appliedCoupon.discountValue;
    } else {
      couponDiscount = Math.round((rawBasePrice * appliedCoupon.discountValue) / 100);
    }
  }

  const finalAmount = Math.max(0, rawBasePrice - couponDiscount);

  // Format MM:SS
  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError(null);
    setCouponSuccess(null);

    if (!code) {
      setCouponError("Please enter a valid coupon code");
      return;
    }

    const match = availableCoupons.find((c) => c.code === code);
    if (match) {
      setAppliedCoupon(match);
      setCouponInput(match.code);
      const savedAmount =
        match.discountType === "flat"
          ? match.discountValue
          : Math.round((rawBasePrice * match.discountValue) / 100);
      setCouponSuccess(`Coupon '${match.code}' applied! You saved ₹${savedAmount}`);
    } else {
      setCouponError("Invalid coupon code. Try 'ANSH100' or 'FESTIVE20'");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponSuccess(null);
    setCouponError(null);
  };

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Save purchase into localStorage
      if (typeof window !== "undefined") {
        try {
          const newPurchase = {
            id: "umang-term-2-2027",
            orderId: `6ae86d63eb2b936e29d${Math.floor(1000 + Math.random() * 9000)}`,
            orderDate: new Date().toLocaleDateString("en-IN", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
            badge: "SUCCESS",
            title: batchTitle,
            dateAndPrice: `${new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
            })}'26 • ₹${finalAmount}`,
            price: `₹ ${finalAmount}`,
            originalPrice: `₹ ${originalPrice}`,
            discount: `₹ ${standardDiscount + couponDiscount}`,
            deliveryCharges: "₹ 0",
            couponDisc: `₹ ${couponDiscount}`,
            totalAmount: `₹ ${finalAmount}`,
            validTill: "Jun 30, 2030",
            bannerBg: "bg-[#EAE5FC]",
            bannerTextColor: "text-[#5A4BDA]",
            bannerLabel: `${batchTitle.toUpperCase()}\nENROLLED`,
            avatarSrc: "/batches/user_avatar.png",
            avatarAlt: "Faculty",
          };
          const existing = JSON.parse(
            localStorage.getItem("ansh_purchases") || "[]"
          );
          localStorage.setItem(
            "ansh_purchases",
            JSON.stringify([newPurchase, ...existing])
          );
        } catch {}
      }

      setIsProcessing(false);
      setIsPayLaterSuccess(false);
      setShowSuccessModal(true);
    }, 400);
  };

  const handlePayLaterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayLaterError(null);

    if (!payLaterPhone.trim() || payLaterPhone.trim().length < 10) {
      setPayLaterError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!payLaterEmail.trim() || !payLaterEmail.includes("@")) {
      setPayLaterError("Please enter a valid email address.");
      return;
    }
    if (!payLaterAddress.trim() || payLaterAddress.trim().length < 8) {
      setPayLaterError("Please enter your complete address.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const dueDateObj = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const dueDateStr = dueDateObj.toLocaleDateString("en-IN", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      if (typeof window !== "undefined") {
        try {
          const newOrder = {
            id: `paylater-${Date.now()}`,
            orderId: `PL-${Math.floor(100000 + Math.random() * 900000)}`,
            orderDate: new Date().toLocaleDateString("en-IN", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
            dueDate: dueDateStr,
            badge: "SUCCESS",
            title: batchTitle,
            dateAndPrice: `Due by ${dueDateStr} • ₹${finalAmount}`,
            price: `₹ ${finalAmount}`,
            originalPrice: `₹ ${originalPrice}`,
            discount: `₹ ${standardDiscount + couponDiscount}`,
            deliveryCharges: "₹ 0",
            couponDisc: `₹ ${couponDiscount}`,
            totalAmount: `₹ ${finalAmount}`,
            validTill: "Jun 30, 2030",
            paymentMode: "7-Day Pay Later (Post-Paid)",
            studentName: payLaterName,
            phone: payLaterPhone,
            email: payLaterEmail,
            address: payLaterAddress,
            isBlocked: false,
            bannerBg: "bg-[#EAE5FC]",
            bannerTextColor: "text-[#5A4BDA]",
            bannerLabel: `${batchTitle.toUpperCase()}\nENROLLED (PAY LATER)`,
            avatarSrc: "/batches/user_avatar.png",
            avatarAlt: "Faculty",
          };

          const existing = JSON.parse(
            localStorage.getItem("ansh_purchases") || "[]"
          );
          localStorage.setItem(
            "ansh_purchases",
            JSON.stringify([newOrder, ...existing])
          );

          // Queue for admin portal management
          const payLaterQueue = JSON.parse(
            localStorage.getItem("ansh_pay_later_queue") || "[]"
          );
          localStorage.setItem(
            "ansh_pay_later_queue",
            JSON.stringify([newOrder, ...payLaterQueue])
          );
        } catch {}
      }

      setIsProcessing(false);
      setIsPayLaterSuccess(true);
      setShowSuccessModal(true);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. TOP HEADER (Dark Branded Bar) */}
      <header className="h-14 bg-[#1B212D] text-white px-5 sm:px-10 flex items-center justify-between shrink-0 shadow-sm z-30">
        <div className="flex items-center gap-4">
          <Link
            href="/study_v2/study"
            className="flex items-center gap-2 text-white font-extrabold tracking-tight text-base sm:text-lg"
          >
            <div className="w-8 h-8 rounded-full bg-[#5A4BDA] flex items-center justify-center font-black text-sm">
              AT
            </div>
            <span>Ansh Tutor</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline font-semibold">100% Safe &amp; Secure Payment</span>
        </div>
      </header>

      {/* ======================================================== */}
      {/* SCREEN 1: ORDER SUMMARY (Matching media_1793634387222)   */}
      {/* ======================================================== */}
      {currentStep === "summary" && (
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8">
          {/* Back Button: <- GO BACK */}
          <div className="mb-4">
            <button
              onClick={() => router.push("/study_v2/batches")}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-black uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>GO BACK</span>
            </button>
          </div>

          {/* Heading: Order Summary */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B212D] tracking-tight mb-6">
            Order Summary
          </h1>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* LEFT COLUMN: Items in Cart */}
            <div className="lg:col-span-7 space-y-6">
              {/* Items in Cart Card */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-2xs">
                <div className="text-sm font-bold text-[#1B212D] mb-4">
                  Items in Cart
                </div>

                {/* Batch Item Row (NO infinity pro, NO regular plan tag) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 pb-2">
                  {/* Thumbnail */}
                  <div className="w-full sm:w-36 h-24 rounded-xl bg-gradient-to-br from-[#EDE9FE] to-[#DDD6FE] p-2 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-2xs select-none">
                    <span className="text-[9px] font-black uppercase text-[#5A4BDA] tracking-wider">
                      ANSH LIVE
                    </span>
                    <div className="relative w-12 h-12 self-center -mb-1">
                      <Image
                        src="/batches/user_avatar.png"
                        alt="Batch Faculty"
                        fill
                        className="object-cover rounded-full border border-white"
                      />
                    </div>
                  </div>

                  {/* Details & Pricing */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-[#1B212D] leading-snug tracking-tight">
                      {batchTitle}
                    </h3>

                    <div className="flex items-baseline gap-2 pt-0.5">
                      <span className="text-lg sm:text-xl font-bold text-[#1B212D]">
                        ₹ {rawBasePrice}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-400 line-through font-normal">
                        ₹ {originalPrice}
                      </span>
                      <span className="text-xs font-bold text-emerald-600">
                        {Math.round(
                          ((originalPrice - rawBasePrice) / originalPrice) * 100
                        )}
                        % OFF
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 font-medium">
                      Live interactive sessions + DPPs + 24/7 Doubt Engine
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Capsule: You are buying (1) items */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center font-bold text-[#5A4BDA] text-xs shrink-0">
                    1x
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">You are buying (1) items</p>
                    <p className="text-xs font-bold text-gray-900 truncate">
                      {batchTitle}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#1B212D] shrink-0">
                  ₹ {finalAmount}
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Apply Code/Coupon & Payment Summary */}
            <div className="lg:col-span-5 space-y-5">
              {/* 1. APPLY CODE / COUPON CARD */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1B212D]">
                  <Tag className="w-4 h-4 text-[#5A4BDA]" />
                  <span>Apply Code / Coupon</span>
                </div>

                {/* Input & Apply Button */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value.toUpperCase());
                      setCouponError(null);
                    }}
                    placeholder="Enter Coupon Code"
                    className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold tracking-wider text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#5A4BDA] transition-colors"
                  />

                  {appliedCoupon ? (
                    <button
                      onClick={handleRemoveCoupon}
                      className="px-4 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApplyCoupon()}
                      disabled={!couponInput.trim()}
                      className="px-5 py-2.5 bg-[#5A4BDA] hover:bg-[#4939C8] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-2xs"
                    >
                      APPLY
                    </button>
                  )}
                </div>

                {/* Coupon Feedback Messages */}
                {couponSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-in fade-in">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{couponSuccess}</span>
                  </div>
                )}
                {couponError && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{couponError}</span>
                  </div>
                )}

                {/* Quick Coupon Suggestions */}
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Available Coupons
                  </span>
                  <div className="space-y-1.5">
                    {availableCoupons.map((c) => (
                      <div
                        key={c.code}
                        onClick={() => handleApplyCoupon(c.code)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                          appliedCoupon?.code === c.code
                            ? "bg-purple-50 border-[#5A4BDA] text-[#5A4BDA]"
                            : "bg-gray-50/70 border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <div>
                          <span className="font-extrabold tracking-wide uppercase block">
                            {c.code}
                          </span>
                          <span className="text-[11px] text-gray-500">
                            {c.description}
                          </span>
                        </div>
                        <span className="font-bold text-xs text-[#5A4BDA] hover:underline shrink-0 ml-2">
                          {appliedCoupon?.code === c.code ? "Applied" : "Apply"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. PAYMENT SUMMARY CARD */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-[#1B212D]">
                  Payment Summary
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Price (1 items)</span>
                    <span className="font-semibold text-gray-900">
                      ₹ {originalPrice}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="font-semibold text-emerald-600">
                      - ₹ {standardDiscount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span className="font-semibold text-gray-900">₹ 0</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Coupon Disc.</span>
                    <span
                      className={`font-semibold ${
                        couponDiscount > 0 ? "text-emerald-600" : "text-gray-900"
                      }`}
                    >
                      - ₹ {couponDiscount}
                    </span>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-3 my-2 flex items-center justify-between text-base font-extrabold text-[#1B212D]">
                    <span>Total Amount</span>
                    <span>₹ {finalAmount}</span>
                  </div>
                </div>

                {/* PROCEED TO BUY BUTTON */}
                <button
                  onClick={() => setCurrentStep("gateway")}
                  className="w-full py-3.5 bg-[#5A4BDA] hover:bg-[#4939C8] active:bg-[#3E2FB8] text-white font-extrabold text-sm rounded-xl transition-colors shadow-xs text-center cursor-pointer tracking-wide uppercase"
                >
                  PROCEED TO BUY
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ======================================================== */}
      {/* SCREEN 2: PAYMENT GATEWAY (Matching media_1793634418987)  */}
      {/* Strictly: 1) UPI QR  2) Pay Later                         */}
      {/* ======================================================== */}
      {currentStep === "gateway" && (
        <main className="flex-1 flex flex-col items-center justify-center py-6 px-4 sm:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md w-full max-w-4xl overflow-hidden flex flex-col min-h-[520px]">
            {/* Top Gateway Sub-header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep("summary")}
                  className="text-gray-500 hover:text-black font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
                  <span>Order Summary</span>
                </button>
              </div>

              <div className="text-center sm:text-center font-medium text-gray-600 truncate max-w-md">
                Purchased Order:{" "}
                <strong className="text-gray-900 font-bold">{batchTitle}</strong>
              </div>

              <div className="text-right font-extrabold text-[#1B212D] text-base">
                Amount <span className="text-[#5A4BDA]">₹{finalAmount}</span>
              </div>
            </div>

            {/* Gateway Body */}
            <div className="flex-1 flex flex-col md:flex-row">
              {/* LEFT COLUMN: Payment Methods Menu (Strictly 2 Methods) */}
              <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-gray-200 bg-[#FAFAFA]/70 p-4 space-y-2 shrink-0">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Payment Methods
                </div>

                {/* Method 1: Pay Via UPI */}
                <button
                  onClick={() => setSelectedMethod("upi")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-3 transition-all cursor-pointer ${
                    selectedMethod === "upi"
                      ? "bg-white text-[#5A4BDA] shadow-xs border-l-4 border-[#5A4BDA]"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                  }`}
                >
                  <QrCode className="w-4 h-4 text-[#5A4BDA] shrink-0" />
                  <span>Pay Via UPI</span>
                </button>

                {/* Method 2: Pay Later */}
                <button
                  onClick={() => setSelectedMethod("paylater")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-3 transition-all cursor-pointer ${
                    selectedMethod === "paylater"
                      ? "bg-white text-[#5A4BDA] shadow-xs border-l-4 border-[#5A4BDA]"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                  }`}
                >
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pay Later</span>
                </button>
              </div>

              {/* RIGHT CONTENT AREA */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between items-center text-center">
                {/* ================= METHOD 1: UPI QR ================= */}
                {selectedMethod === "upi" && (
                  <div className="w-full max-w-md flex flex-col items-center space-y-4 my-auto">
                    <div>
                      <h3 className="text-lg font-extrabold text-[#1B212D]">
                        Scan QR and Pay
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                        Scan the QR from your mobile using any UPI app such as
                        PhonePe, Google Pay, Paytm, CRED, Amazon Pay, BHIM etc.
                      </p>
                    </div>

                    {/* Supported Apps Pills */}
                    <div className="flex items-center justify-center gap-2 flex-wrap py-1">
                      {["PhonePe", "GPay", "Paytm", "BHIM", "CRED"].map(
                        (app) => (
                          <span
                            key={app}
                            className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold border border-gray-200"
                          >
                            {app}
                          </span>
                        )
                      )}
                      <span className="text-[10px] text-gray-400 font-medium">
                        &amp; more
                      </span>
                    </div>

                    {/* Real Scanable UPI QR Container */}
                    <div className="relative p-2.5 bg-white border-2 border-gray-900 rounded-2xl shadow-sm">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                          `upi://pay?pa=${adminUpiId}&pn=Ansh%20Tutor&am=${finalAmount}&cu=INR&tn=Batch%20Enrollment`
                        )}`}
                        alt="Scan to Pay via Paytm / UPI"
                        className="w-48 h-48 sm:w-52 sm:h-52 rounded-xl"
                      />
                    </div>

                    {/* Copyable UPI ID pill */}
                    <div className="flex items-center justify-between gap-2 px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl w-full max-w-sm text-xs">
                      <span className="text-gray-500 font-medium">Paytm / UPI ID:</span>
                      <span className="font-bold text-gray-900 font-mono select-all">
                        {adminUpiId}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof navigator !== "undefined") {
                            navigator.clipboard.writeText(adminUpiId);
                            setCopiedUpi(true);
                            setTimeout(() => setCopiedUpi(false), 2000);
                          }
                        }}
                        className="p-1 text-[#5A4BDA] hover:bg-purple-50 rounded font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedUpi ? (
                          <span className="text-emerald-600 font-bold text-[11px]">Copied!</span>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Mobile 1-Tap Pay Direct Button */}
                    <a
                      href={`upi://pay?pa=${adminUpiId}&pn=Ansh%20Tutor&am=${finalAmount}&cu=INR&tn=Batch%20Enrollment`}
                      className="sm:hidden w-full max-w-sm py-2.5 bg-[#002E6E] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-[#002250] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Tap to Pay with Paytm / UPI App</span>
                    </a>

                    {/* Countdown Progress Line */}
                    <div className="w-56 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#5A4BDA] transition-all"
                        style={{ width: `${(countdownSeconds / 600) * 100}%` }}
                      />
                    </div>

                    <div className="text-xs text-gray-500 font-medium">
                      Payment session valid for:{" "}
                      <strong className="text-gray-900 font-mono">
                        {formatCountdown(countdownSeconds)}
                      </strong>
                    </div>

                    {/* Direct 1-Click Access After Payment */}
                    <button
                      onClick={handlePaymentSuccess}
                      disabled={isProcessing}
                      className="w-full max-w-sm py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-1"
                    >
                      {isProcessing ? (
                        <span>Activating Your Batch Access...</span>
                      ) : (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Payment Done? Open Batch &amp; Start Learning</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* ================= METHOD 2: PAY LATER (7-Day Credit) ================= */}
                {selectedMethod === "paylater" && (
                  <form
                    onSubmit={handlePayLaterSubmit}
                    className="w-full max-w-md flex flex-col space-y-3.5 my-auto text-left"
                  >
                    <div>
                      <h3 className="text-lg font-extrabold text-[#1B212D]">
                        7-Day Pay Later Enrollment
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Start your classes instantly today and clear dues within 7 days.
                      </p>
                    </div>

                    {/* 7-Day Policy Notice Box */}
                    <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>7 Days Clearance Authority</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        Payment must be cleared within <strong>7 days</strong>. If payment is not received within this period, the administrator reserves full authority to block batch access until payment is completed.
                      </p>
                    </div>

                    {/* Error message */}
                    {payLaterError && (
                      <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{payLaterError}</span>
                      </div>
                    )}

                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span>Student Full Name</span>
                      </label>
                      <input
                        type="text"
                        value={payLaterName}
                        onChange={(e) => setPayLaterName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 outline-none focus:border-[#5A4BDA] transition-colors"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>Phone Number (Active for Verification)</span>
                      </label>
                      <input
                        type="tel"
                        value={payLaterPhone}
                        onChange={(e) => setPayLaterPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 outline-none focus:border-[#5A4BDA] transition-colors"
                        required
                      />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        value={payLaterEmail}
                        onChange={(e) => setPayLaterEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 outline-none focus:border-[#5A4BDA] transition-colors"
                        required
                      />
                    </div>

                    {/* Postal Address */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>Complete Address &amp; City</span>
                      </label>
                      <textarea
                        rows={2}
                        value={payLaterAddress}
                        onChange={(e) => setPayLaterAddress(e.target.value)}
                        placeholder="House / Flat No., Colony, City, State, PIN"
                        className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 outline-none focus:border-[#5A4BDA] transition-colors resize-none"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3 bg-[#5A4BDA] hover:bg-[#4939C8] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-2xs text-center cursor-pointer mt-1"
                    >
                      {isProcessing
                        ? "Registering 7-Day Pay Later..."
                        : `Confirm & Avail 7-Day Pay Later (₹${finalAmount})`}
                    </button>
                  </form>
                )}

                {/* Juspay Footer Branding (Screenshot exact) */}
                <div className="pt-6 border-t border-gray-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                  <Lock className="w-3 h-3 text-gray-400" />
                  <span>secured by</span>
                  <span className="font-bold text-gray-700 uppercase tracking-wider text-[11px]">
                    JUSPAY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 4. ENROLLMENT SUCCESS MODAL (Exact match to PhysicsWallah screenshot) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl w-full max-w-sm sm:max-w-md p-8 sm:p-10 text-center shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200 flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={() => router.push("/study_v2/study/my-batches")}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Circular Green Checkmark Badge */}
            <div className="w-16 h-16 rounded-full bg-[#16A34A] flex items-center justify-center mb-5 shadow-lg shadow-green-600/20">
              <Check className="w-9 h-9 text-white stroke-[3.5]" />
            </div>

            {/* Title (Clean, NO 'free' tags anywhere) */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B212D] tracking-tight leading-snug px-2">
              You have successfully enrolled in this batch
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium max-w-xs">
              {isPayLaterSuccess
                ? "7-Day Pay Later activated. You can find this batch on My Batches section."
                : "You can find this batch on My Batches section"}
            </p>

            {/* Big Purple Let's Study Button */}
            <button
              onClick={() => router.push("/study_v2/study/my-batches")}
              className="w-full mt-6 py-3.5 bg-[#5A4BDA] hover:bg-[#4939C8] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer tracking-wide"
            >
              Let&apos;s Study
            </button>

            {/* Bottom Study Illustration (Matching screenshot students studying with books and giant pencil) */}
            <div className="mt-8 -mb-4 w-full flex justify-center select-none pointer-events-none">
              <svg
                viewBox="0 0 340 140"
                className="w-full max-w-[280px] sm:max-w-[320px] h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Soft Sky Blobs */}
                <circle cx="170" cy="95" r="60" fill="#F0F4FF" />
                <circle cx="235" cy="70" r="35" fill="#EEF2FF" />
                <circle cx="95" cy="85" r="35" fill="#FAF5FF" />

                {/* Stack of Books */}
                {/* Book 1 (Bottom Dark Blue) */}
                <rect x="75" y="115" width="150" height="14" rx="3" fill="#3B82F6" />
                <rect x="73" y="117" width="8" height="10" rx="1" fill="#1D4ED8" />
                <rect x="85" y="119" width="138" height="6" fill="#EFF6FF" />

                {/* Book 2 (Middle Gold/Amber) */}
                <rect x="90" y="100" width="130" height="14" rx="3" fill="#F59E0B" />
                <rect x="88" y="102" width="7" height="10" rx="1" fill="#D97706" />
                <rect x="98" y="104" width="120" height="6" fill="#FFFBEB" />
                {/* Bookmark ribbon */}
                <path d="M185 110 L185 126 L190 122 L195 126 L195 110 Z" fill="#EF4444" />

                {/* Book 3 (Top Purple) */}
                <rect x="105" y="85" width="110" height="14" rx="3" fill="#6366F1" />
                <rect x="103" y="87" width="6" height="10" rx="1" fill="#4F46E5" />
                <rect x="112" y="89" width="101" height="6" fill="#EEF2FF" />

                {/* Girl Student Sitting on Books (Left) */}
                <path d="M130 85 L133 67 L145 71 L142 85 Z" fill="#1E293B" />
                <path d="M135 52 L148 55 L145 69 L132 65 Z" fill="#F97316" />
                <circle cx="138" cy="43" r="7" fill="#FDBA74" />
                <path d="M132 39 C132 35 144 35 144 39 C146 44 141 47 137 47 Z" fill="#78350F" />
                <rect x="146" y="58" width="12" height="10" rx="1" fill="#10B981" transform="rotate(15 146 58)" />

                {/* Giant Red Pencil (Right) */}
                <rect x="250" y="45" width="11" height="70" rx="2" fill="#EF4444" />
                <rect x="250" y="40" width="11" height="5" fill="#FCA5A5" />
                <polygon points="250,40 255.5,28 261,40" fill="#FDE047" />
                <polygon points="253.5,32 255.5,28 257.5,32" fill="#1F2937" />

                {/* Boy Student Sitting & Reading (Right) */}
                <rect x="215" y="93" width="13" height="22" rx="2" fill="#2563EB" />
                <path d="M217 115 L210 126 L224 126 L228 115 Z" fill="#1E293B" />
                <circle cx="221" cy="85" r="6" fill="#FDBA74" />
                <path d="M216 83 C216 78 226 78 226 83 C227 86 218 87 216 83 Z" fill="#1F2937" />
                <rect x="206" y="106" width="14" height="10" rx="1" fill="#F59E0B" transform="rotate(-10 206 106)" />

                {/* Sparkles */}
                <path d="M75 50 L77 54 L81 55 L77 57 L75 61 L73 57 L69 55 L73 54 Z" fill="#F59E0B" opacity="0.8" />
                <path d="M280 75 L281 78 L284 79 L281 80 L280 83 L279 80 L276 79 L279 78 Z" fill="#6366F1" opacity="0.8" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Checkout...
        </div>
      }
    >
      <PaymentFlowContent />
    </Suspense>
  );
}
