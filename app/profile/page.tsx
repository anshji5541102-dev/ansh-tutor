"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import StudyHeader from "@/components/study/StudyHeader";
import {
  User,
  ShoppingBag,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  CreditCard,
  BookOpen,
  LogOut,
  Edit2,
  ShieldCheck,
  Save,
  X,
  Check,
} from "lucide-react";

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile, setProfile, selectedClass, setSelectedClass, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const initialTab = searchParams.get("tab") === "purchases" ? "purchases" : "profile";
  const [activeTab, setActiveTab] = useState<"profile" | "purchases">(initialTab);

  // Form State for editing profile details
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: profile?.name || user?.displayName || "Abhinav Srivastava",
    phone: profile?.phone || user?.phoneNumber || "+91 75250 09428",
    email: profile?.email || user?.email || "student@anshtutor.com",
    class: selectedClass || "Class 8",
    board: "CBSE",
    city: "Lucknow",
    state: "Uttar Pradesh",
    campus: "Rajajipuram Campus, Lucknow",
  });

  // Load any previously persisted custom profile from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ansh_user_profile");
        if (saved) {
          const parsed = JSON.parse(saved);
          setFormData((prev) => ({
            ...prev,
            ...parsed,
          }));
        }
      } catch {}
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Save to localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ansh_user_profile", JSON.stringify(formData));
      } catch {}
    }

    // 2. Update AuthContext profile & selectedClass
    if (setProfile) {
      setProfile({
        id: profile?.id || "student-1",
        firebase_uid: user?.uid || "mock-uid",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: "student",
        class: formData.class,
      });
    }

    if (setSelectedClass && formData.class) {
      setSelectedClass(formData.class);
    }

    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const purchases = [
    {
      id: "INV-2026-84920",
      batchName: "Ansh Foundation Master Batch 2027 (Class 8)",
      category: "Foundation & Olympiads",
      purchasedDate: "5th Oct'26",
      validTill: "31st Mar'27",
      amountPaid: "₹1,499",
      originalPrice: "₹3,000",
      discount: "50% OFF (Gyan Utsav Offer)",
      status: "Active",
      paymentMode: "Online (UPI / Razorpay)",
      branch: "Rajajipuram Campus, Lucknow",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. FIXED TOP HEADER */}
      <StudyHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. MAIN PROFILE CONTAINER */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button + Title */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/study_v2/study")}
              className="p-2 -ml-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Back to Study"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Account Center
            </h1>
          </div>

          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Profile details updated successfully!</span>
            </div>
            <button
              onClick={() => setSaveSuccess(false)}
              className="text-emerald-700 hover:text-emerald-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Mini Card: User Summary & Navigation Tabs (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* User Profile Avatar Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center space-y-3 shadow-2xs">
              <div className="w-20 h-20 rounded-full border-2 border-[#5A4BDA] overflow-hidden mx-auto bg-purple-50 shadow-sm relative">
                <Image
                  src="/batches/user_avatar.png"
                  alt={formData.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">{formData.name}</h3>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                  {formData.class} &bull; {formData.board}
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold mt-2 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Enrolled Student</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs (My Profile / My Purchases) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-2 space-y-1 shadow-2xs">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-[#EDE9FE] text-[#5A4BDA]"
                    : "text-gray-700 hover:bg-gray-50 font-medium"
                }`}
              >
                <User className="w-4 h-4 stroke-[2]" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("purchases")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "purchases"
                    ? "bg-[#EDE9FE] text-[#5A4BDA]"
                    : "text-gray-700 hover:bg-gray-50 font-medium"
                }`}
              >
                <ShoppingBag className="w-4 h-4 stroke-[2]" />
                <span>My Purchases</span>
              </button>
            </div>
          </div>

          {/* Right Main Content (8 cols) */}
          <div className="lg:col-span-8">
            {/* TAB 1: MY PROFILE */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                      Personal Information
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Your registered academic identity and communication details
                    </p>
                  </div>

                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F0EEFF] hover:bg-[#E5E0FF] text-[#5A4BDA] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Details</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>

                {!isEditing ? (
                  /* Read-Only Display Mode */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 space-y-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        Full Name
                      </span>
                      <p className="font-bold text-gray-900">{formData.name}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 space-y-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        Mobile / WhatsApp
                      </span>
                      <p className="font-bold text-gray-900">{formData.phone}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 space-y-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        Email Address
                      </span>
                      <p className="font-bold text-gray-900">{formData.email}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 space-y-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        Current Class &amp; Board
                      </span>
                      <p className="font-bold text-gray-900">
                        {formData.class} &bull; {formData.board}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 space-y-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        City &amp; State
                      </span>
                      <p className="font-bold text-gray-900">
                        {formData.city}, {formData.state}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 space-y-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        Assigned Campus
                      </span>
                      <p className="font-bold text-gray-900">{formData.campus}</p>
                    </div>
                  </div>
                ) : (
                  /* Interactive Edit Mode Form */
                  <form onSubmit={handleSaveChanges} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#5A4BDA] focus:ring-1 focus:ring-[#5A4BDA] outline-none"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">
                          Mobile / WhatsApp *
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#5A4BDA] focus:ring-1 focus:ring-[#5A4BDA] outline-none"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#5A4BDA] focus:ring-1 focus:ring-[#5A4BDA] outline-none"
                        />
                      </div>

                      {/* Class */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">
                          Target Class *
                        </label>
                        <select
                          name="class"
                          value={formData.class}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#5A4BDA] focus:ring-1 focus:ring-[#5A4BDA] outline-none"
                        >
                          <option value="Class 6">Class 6th</option>
                          <option value="Class 7">Class 7th</option>
                          <option value="Class 8">Class 8th</option>
                          <option value="Class 9">Class 9th</option>
                          <option value="Class 10">Class 10th</option>
                          <option value="Class 11 - JEE">Class 11 (JEE Main & Adv)</option>
                          <option value="Class 11 - NEET">Class 11 (NEET UG)</option>
                          <option value="Class 12 - JEE">Class 12 (JEE Main & Adv)</option>
                          <option value="Class 12 - NEET">Class 12 (NEET UG)</option>
                        </select>
                      </div>

                      {/* Board */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">
                          Education Board *
                        </label>
                        <select
                          name="board"
                          value={formData.board}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#5A4BDA] focus:ring-1 focus:ring-[#5A4BDA] outline-none"
                        >
                          <option value="CBSE">CBSE Board</option>
                          <option value="ICSE">ICSE / ISC Board</option>
                          <option value="UP Board">UP State Board</option>
                          <option value="Other Board">Other State Board</option>
                        </select>
                      </div>

                      {/* City */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#5A4BDA] focus:ring-1 focus:ring-[#5A4BDA] outline-none"
                        />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-5 py-2 text-xs font-bold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 text-xs font-bold text-white bg-[#5A4BDA] hover:bg-[#4D3DC5] rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </form>
                )}

                <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#5A4BDA]" />
                    <span>Protected by Ansh Tutor Student Privacy Protocol</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MY PURCHASES */}
            {activeTab === "purchases" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                      Enrolled Batches
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      View your active courses and subscription details
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-[#5A4BDA] border border-purple-100">
                    1 Active Purchase
                  </span>
                </div>

                {purchases.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 space-y-5 shadow-2xs hover:border-[#5A4BDA] transition-colors"
                  >
                    {/* Top Row: Batch Name & Status Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EDE9FE] text-[#5A4BDA]">
                            {item.category}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">
                            {item.id}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">
                          {item.batchName}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{item.status}</span>
                        </span>
                      </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-gray-400 block mb-0.5">Purchased On</span>
                        <strong className="text-gray-800">{item.purchasedDate}</strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-0.5">Valid Till</span>
                        <strong className="text-gray-800">{item.validTill}</strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-0.5">Amount Paid</span>
                        <strong className="text-emerald-600 font-bold text-sm">
                          {item.amountPaid}
                        </strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-0.5">Payment Mode</span>
                        <strong className="text-gray-800">{item.paymentMode}</strong>
                      </div>
                    </div>

                    {/* Offline Centre */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-100 text-xs">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-[#5A4BDA] shrink-0" />
                        <span>Offline Branch: <strong>{item.branch}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Account Center...
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
