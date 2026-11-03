"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar, { AdminTab } from "@/components/admin/AdminSidebar";
import {
  LayoutDashboard,
  ShieldAlert,
  GraduationCap,
  FolderPlus,
  Radio,
  FileCheck,
  BookOpen,
  Users,
  Bell,
  Headphones,
  Plus,
  Lock,
  Unlock,
  CheckCircle2,
  Trash2,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Check,
  AlertTriangle,
  Play,
  Copy,
  Send,
  Search,
  Eye,
  Download,
  Video,
  FileText,
  ExternalLink,
  Layers,
  Clock,
  ArrowRight,
  X,
  Sparkles,
} from "lucide-react";

// ==========================================
// TYPE DEFINITIONS
// ==========================================
interface PayLaterRecord {
  id: string;
  orderId: string;
  orderDate: string;
  dueDate: string;
  studentName: string;
  phone: string;
  email: string;
  address: string;
  batchTitle: string;
  amount: number;
  daysRemaining: number;
  isBlocked: boolean;
  isPaid: boolean;
}

interface BatchRecord {
  id: string;
  title: string;
  grade: string;
  faculty: string;
  targetYear: string;
  validityDate?: string;
  status: "Active" | "Upcoming";
  bannerBg: string;
  bannerTextColor: string;
  bannerLabel: string;
}

// BATCH CONTENT: Recorded Videos, Notes, DPPs
interface LectureRecord {
  id: string;
  batchId: string;
  subject: string;
  chapter: string;
  lectureNumber: string;
  title: string;
  educator: string;
  duration: string;
  videoUrl: string;
  date: string;
}

interface NotesRecord {
  id: string;
  batchId: string;
  subject: string;
  chapter: string;
  title: string;
  fileName: string;
  pages: number;
  date: string;
}

interface DppRecord {
  id: string;
  batchId: string;
  subject: string;
  chapter: string;
  dppNumber: string;
  title: string;
  questionsCount: number;
  totalMarks: number;
  dppFile: string;
  solutionFile: string;
  date: string;
}

// TEST SERIES & CBT
interface TestSeriesRecord {
  id: string;
  title: string;
  type: "FULL_MOCK" | "CHAPTER_TEST" | "DPP_QUIZ";
  subject: string;
  durationMins: number;
  totalMarks: number;
  totalQuestions: number;
  status: "Published" | "Draft";
  scheduledDate: string;
}

// DIGITAL LIBRARY
interface LibraryResourceRecord {
  id: string;
  title: string;
  subject: string;
  category: "Question Bank" | "Formula Sheet" | "NCERT Exemplar" | "PYQs";
  classGrade: string;
  questionsCount: number;
  fileName: string;
  topics: string[];
  coverBg: string;
  coverAccent: string;
}

interface LiveClassRecord {
  id: string;
  title: string;
  subject: string;
  faculty: string;
  batch: string;
  time: string;
  date: string;
  isLive: boolean;
}

interface StudentDirectoryItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  cls: string;
  enrolledBatch: string;
  status: "Active" | "Grace Period" | "Blocked (Unpaid)";
}

interface AnnouncementItem {
  id: string;
  title: string;
  target: string;
  date: string;
  priority: "High" | "Normal";
  content: string;
}

interface SupportTicketItem {
  id: string;
  studentName: string;
  phone: string;
  category: "Academic Doubt" | "Pay Later Issue" | "Batch Access" | "Technical";
  message: string;
  date: string;
  status: "Open" | "Resolved";
}

function AdminPortalContent() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ==========================================
  // 1. PAY LATER QUEUE (Clean initial state, loaded dynamically from localStorage)
  // ==========================================
  const [payLaterList, setPayLaterList] = useState<PayLaterRecord[]>([]);

  // ==========================================
  // 2. BATCHES (Clean initial state)
  // ==========================================
  const [batchesList, setBatchesList] = useState<BatchRecord[]>([]);

  // ==========================================
  // 3. BATCH CONTENT (Recorded Videos, Notes, DPPs)
  // ==========================================
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [contentSubTab, setContentSubTab] = useState<"Lectures" | "Notes" | "DPPs">("Lectures");

  const [lecturesList, setLecturesList] = useState<LectureRecord[]>([]);
  const [notesList, setNotesList] = useState<NotesRecord[]>([]);
  const [dppsList, setDppsList] = useState<DppRecord[]>([]);

  // ==========================================
  // 4. TEST SERIES & CBT TESTS
  // ==========================================
  const [testSeriesList, setTestSeriesList] = useState<TestSeriesRecord[]>([]);

  // ==========================================
  // 5. DIGITAL LIBRARY (Question Banks & Books)
  // ==========================================
  const [libraryList, setLibraryList] = useState<LibraryResourceRecord[]>([]);

  // ==========================================
  // 6. LIVE CLASSES
  // ==========================================
  const [liveList, setLiveList] = useState<LiveClassRecord[]>([]);

  // ==========================================
  // 7. STUDENTS & ANNOUNCEMENTS & TICKETS
  // ==========================================
  const [studentsList, setStudentsList] = useState<StudentDirectoryItem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicketItem[]>([]);

  // ==========================================
  // MODALS STATE
  // ==========================================
  const [addBatchModalOpen, setAddBatchModalOpen] = useState(false);
  const [addLiveModalOpen, setAddLiveModalOpen] = useState(false);
  const [addAnnouncementModalOpen, setAddAnnouncementModalOpen] = useState(false);
  const [selectedEmailNotice, setSelectedEmailNotice] = useState<PayLaterRecord | null>(null);

  // Content Upload Modals
  const [uploadLectureModalOpen, setUploadLectureModalOpen] = useState(false);
  const [uploadNotesModalOpen, setUploadNotesModalOpen] = useState(false);
  const [uploadDppModalOpen, setUploadDppModalOpen] = useState(false);
  const [createTestModalOpen, setCreateTestModalOpen] = useState(false);
  const [uploadLibraryModalOpen, setUploadLibraryModalOpen] = useState(false);

  // Filter & Search states
  const [payLaterFilter, setPayLaterFilter] = useState<"all" | "overdue" | "blocked" | "paid">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Form states for Content Upload
  const [newLecTitle, setNewLecTitle] = useState("");
  const [newLecChapter, setNewLecChapter] = useState("CH - 01 Rational Numbers");
  const [newLecNumber, setNewLecNumber] = useState("Lec 01");
  const [newLecEducator, setNewLecEducator] = useState("");
  const [newLecDuration, setNewLecDuration] = useState("45 mins");
  const [newLecUrl, setNewLecUrl] = useState("");

  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteChapter, setNewNoteChapter] = useState("CH - 01 Rational Numbers");
  const [newNoteFileName, setNewNoteFileName] = useState("Chapter_Notes.pdf");
  const [newNotePages, setNewNotePages] = useState("12");

  const [newDppTitle, setNewDppTitle] = useState("");
  const [newDppChapter, setNewDppChapter] = useState("CH - 01 Rational Numbers");
  const [newDppNumber, setNewDppNumber] = useState("DPP 02");
  const [newDppQuestions, setNewDppQuestions] = useState("15");
  const [newDppMarks, setNewDppMarks] = useState("60");

  const [newTestTitle, setNewTestTitle] = useState("");
  const [newTestType, setNewTestType] = useState<"FULL_MOCK" | "CHAPTER_TEST" | "DPP_QUIZ">("FULL_MOCK");
  const [newTestDuration, setNewTestDuration] = useState("180");
  const [newTestMarks, setNewTestMarks] = useState("100");
  const [newTestQuestions, setNewTestQuestions] = useState("25");

  const [newLibTitle, setNewLibTitle] = useState("");
  const [newLibCategory, setNewLibCategory] = useState<"Question Bank" | "Formula Sheet" | "NCERT Exemplar" | "PYQs">("Question Bank");
  const [newLibSubject, setNewLibSubject] = useState("Mathematics");
  const [newLibQuestions, setNewLibQuestions] = useState("150");
  const [newLibTopics, setNewLibTopics] = useState("Complete Chapter Drill");

  const [newBatchTitle, setNewBatchTitle] = useState("");
  const [newBatchGrade, setNewBatchGrade] = useState("Class 8");
  const [newBatchFaculty, setNewBatchFaculty] = useState("");
  const [newBatchTargetYear, setNewBatchTargetYear] = useState("Session 2026-27");
  const [newBatchValidityDate, setNewBatchValidityDate] = useState("31 March 2027");
  const [counselingBookings, setCounselingBookings] = useState<any[]>([]);

  const [newLiveTitle, setNewLiveTitle] = useState("");
  const [newLiveSubject, setNewLiveSubject] = useState("Physics");
  const [newLiveFaculty, setNewLiveFaculty] = useState("");
  const [newLiveTime, setNewLiveTime] = useState("06:00 PM - 07:30 PM");

  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnTarget, setNewAnnTarget] = useState("All Students");
  const [newAnnContent, setNewAnnContent] = useState("");

  // Sync Pay Later queue from localStorage if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedQueue = localStorage.getItem("ansh_pay_later_queue");
        if (storedQueue) {
          const parsed = JSON.parse(storedQueue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const mapped: PayLaterRecord[] = parsed.map((item: any, i: number) => ({
              id: item.id || `pl-stored-${i}`,
              orderId: item.orderId || `PL-${100000 + i}`,
              orderDate: item.orderDate || "02 Nov 2026",
              dueDate: item.dueDate || "09 Nov 2026",
              studentName: item.studentName || "Registered Student",
              phone: item.phone || "+91 75250 09428",
              email: item.email || "student@anshtutor.com",
              address: item.address || "Lucknow, Uttar Pradesh",
              batchTitle: item.title || "Umang Term II 2027 (Class 8)",
              amount: parseInt(item.totalAmount?.replace(/\D/g, "") || "1799", 10),
              daysRemaining: 6,
              isBlocked: !!item.isBlocked,
              isPaid: !!item.isPaid,
            }));
            setPayLaterList((prev) => {
              const existingIds = new Set(prev.map((p) => p.orderId));
              const newItems = mapped.filter((m) => !existingIds.has(m.orderId));
              return [...newItems, ...prev];
            });
          }
        }
      } catch {}
    }
  }, []);

  const hasMounted = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedBatches = localStorage.getItem("ansh_admin_batches");
        if (storedBatches) setBatchesList(JSON.parse(storedBatches));

        const storedTests = localStorage.getItem("ansh_admin_tests");
        if (storedTests) setTestSeriesList(JSON.parse(storedTests));

        const storedLib = localStorage.getItem("ansh_admin_library");
        if (storedLib) setLibraryList(JSON.parse(storedLib));

        const storedLive = localStorage.getItem("ansh_admin_live");
        if (storedLive) setLiveList(JSON.parse(storedLive));

        const storedAnn = localStorage.getItem("ansh_admin_announcements");
        if (storedAnn) setAnnouncements(JSON.parse(storedAnn));

        const storedLec = localStorage.getItem("ansh_admin_lectures");
        if (storedLec) setLecturesList(JSON.parse(storedLec));

        const storedDpp = localStorage.getItem("ansh_admin_dpps");
        if (storedDpp) setDppsList(JSON.parse(storedDpp));

        const storedNotes = localStorage.getItem("ansh_admin_notes");
        if (storedNotes) setNotesList(JSON.parse(storedNotes));

        const storedBookings = localStorage.getItem("ansh_counseling_bookings");
        if (storedBookings) setCounselingBookings(JSON.parse(storedBookings));
      } catch {}
      hasMounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (hasMounted.current && typeof window !== "undefined") {
      localStorage.setItem("ansh_admin_batches", JSON.stringify(batchesList));
    }
  }, [batchesList]);

  useEffect(() => {
    if (hasMounted.current && typeof window !== "undefined") {
      localStorage.setItem("ansh_admin_tests", JSON.stringify(testSeriesList));
    }
  }, [testSeriesList]);

  useEffect(() => {
    if (hasMounted.current && typeof window !== "undefined") {
      localStorage.setItem("ansh_admin_library", JSON.stringify(libraryList));
    }
  }, [libraryList]);

  useEffect(() => {
    if (hasMounted.current && typeof window !== "undefined") {
      localStorage.setItem("ansh_admin_live", JSON.stringify(liveList));
    }
  }, [liveList]);

  useEffect(() => {
    if (hasMounted.current && typeof window !== "undefined") {
      localStorage.setItem("ansh_admin_announcements", JSON.stringify(announcements));
    }
  }, [announcements]);

  useEffect(() => {
    if (hasMounted.current && typeof window !== "undefined") {
      localStorage.setItem("ansh_admin_lectures", JSON.stringify(lecturesList));
    }
  }, [lecturesList]);

  useEffect(() => {
    if (hasMounted.current && typeof window !== "undefined") {
      localStorage.setItem("ansh_admin_dpps", JSON.stringify(dppsList));
    }
  }, [dppsList]);

  useEffect(() => {
    if (hasMounted.current && typeof window !== "undefined") {
      localStorage.setItem("ansh_admin_notes", JSON.stringify(notesList));
    }
  }, [notesList]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Actions
  const toggleBlockAccess = (orderId: string) => {
    setPayLaterList((prev) =>
      prev.map((item) => {
        if (item.orderId === orderId) {
          const updatedState = !item.isBlocked;
          showToast(
            updatedState
              ? `Batch Access BLOCKED for ${item.studentName}`
              : `Batch Access RESTORED for ${item.studentName}`
          );
          return { ...item, isBlocked: updatedState };
        }
        return item;
      })
    );
  };

  const markPayLaterPaid = (orderId: string) => {
    setPayLaterList((prev) =>
      prev.map((item) => {
        if (item.orderId === orderId) {
          showToast(`Marked ${orderId} as FULLY PAID!`);
          return { ...item, isPaid: true, isBlocked: false };
        }
        return item;
      })
    );
  };

  // Upload Handlers
  const handleUploadLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLecTitle.trim()) return;

    const newLec: LectureRecord = {
      id: `lec-${Date.now()}`,
      batchId: selectedBatchId,
      subject: selectedSubject,
      chapter: newLecChapter,
      lectureNumber: newLecNumber,
      title: newLecTitle.trim(),
      educator: newLecEducator,
      duration: newLecDuration,
      videoUrl: newLecUrl,
      date: "Today",
    };

    setLecturesList((prev) => [newLec, ...prev]);
    setNewLecTitle("");
    setUploadLectureModalOpen(false);
    showToast(`Recorded Lecture "${newLec.title}" uploaded!`);
  };

  const handleUploadNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    const newNote: NotesRecord = {
      id: `not-${Date.now()}`,
      batchId: selectedBatchId,
      subject: selectedSubject,
      chapter: newNoteChapter,
      title: newNoteTitle.trim(),
      fileName: newNoteFileName.trim() || "Lecture_Notes.pdf",
      pages: parseInt(newNotePages, 10) || 10,
      date: "Today",
    };

    setNotesList((prev) => [newNote, ...prev]);
    setNewNoteTitle("");
    setUploadNotesModalOpen(false);
    showToast(`Lecture Notes PDF "${newNote.title}" uploaded!`);
  };

  const handleUploadDpp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDppTitle.trim()) return;

    const newDpp: DppRecord = {
      id: `dpp-${Date.now()}`,
      batchId: selectedBatchId,
      subject: selectedSubject,
      chapter: newDppChapter,
      dppNumber: newDppNumber,
      title: newDppTitle.trim(),
      questionsCount: parseInt(newDppQuestions, 10) || 15,
      totalMarks: parseInt(newDppMarks, 10) || 60,
      dppFile: `${newDppNumber}_Question_Sheet.pdf`,
      solutionFile: `${newDppNumber}_Solutions.pdf`,
      date: "Today",
    };

    setDppsList((prev) => [newDpp, ...prev]);
    setNewDppTitle("");
    setUploadDppModalOpen(false);
    showToast(`Daily Practice Problem "${newDpp.dppNumber}" published!`);
  };

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestTitle.trim()) return;

    const newTest: TestSeriesRecord = {
      id: `test-${Date.now()}`,
      title: newTestTitle.trim(),
      type: newTestType,
      subject: selectedSubject,
      durationMins: parseInt(newTestDuration, 10) || 90,
      totalMarks: parseInt(newTestMarks, 10) || 100,
      totalQuestions: parseInt(newTestQuestions, 10) || 25,
      status: "Published",
      scheduledDate: "Active Now",
    };

    setTestSeriesList((prev) => [newTest, ...prev]);
    setNewTestTitle("");
    setCreateTestModalOpen(false);
    showToast(`Test "${newTest.title}" published to Test Series!`);
  };

  const handleUploadLibrary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLibTitle.trim()) return;

    const newRes: LibraryResourceRecord = {
      id: `lib-${Date.now()}`,
      title: newLibTitle.trim(),
      subject: newLibSubject,
      category: newLibCategory,
      classGrade: "Class 8",
      questionsCount: parseInt(newLibQuestions, 10) || 100,
      fileName: `${newLibTitle.replace(/\s+/g, "_")}.pdf`,
      topics: newLibTopics.split(",").map((t) => t.trim()).filter(Boolean),
      coverBg: "from-[#1E1B4B] to-[#312E81]",
      coverAccent: "#818CF8",
    };

    setLibraryList((prev) => [newRes, ...prev]);
    setNewLibTitle("");
    setUploadLibraryModalOpen(false);
    showToast(`Library Resource "${newRes.title}" published!`);
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchTitle.trim()) return;

    const newBatch: BatchRecord = {
      id: `batch-${Date.now()}`,
      title: newBatchTitle.trim(),
      grade: newBatchGrade,
      targetYear: newBatchTargetYear,
      faculty: newBatchFaculty.trim() || "Expert Faculty",
      validityDate: newBatchValidityDate.trim() || "31 March 2027",
      status: "Active",
      bannerBg: "bg-[#EAE5FC]",
      bannerTextColor: "text-[#5A4BDA]",
      bannerLabel: newBatchTitle.toUpperCase(),
    };

    setBatchesList((prev) => [newBatch, ...prev]);
    setNewBatchTitle("");
    setNewBatchFaculty("");
    setAddBatchModalOpen(false);
    showToast(`Batch "${newBatch.title}" published!`);
  };

  const handleCreateLiveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLiveTitle.trim()) return;

    const newClass: LiveClassRecord = {
      id: `live-${Date.now()}`,
      title: newLiveTitle.trim(),
      subject: newLiveSubject,
      faculty: newLiveFaculty.trim() || "Faculty Teacher",
      batch: batchesList[0]?.title || "Umang Term II 2027",
      time: newLiveTime,
      date: "Today",
      isLive: true,
    };

    setLiveList((prev) => [newClass, ...prev]);
    setNewLiveTitle("");
    setNewLiveFaculty("");
    setAddLiveModalOpen(false);
    showToast(`Live Class scheduled!`);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;

    const newAnn: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle.trim(),
      target: newAnnTarget,
      date: "Today",
      priority: "High",
      content: newAnnContent.trim(),
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
    setNewAnnTitle("");
    setNewAnnContent("");
    setAddAnnouncementModalOpen(false);
    showToast(`Announcement broadcasted!`);
  };

  const overdueCount = payLaterList.filter(
    (p) => !p.isPaid && (p.daysRemaining <= 0 || p.isBlocked)
  ).length;

  // Filtered Pay Later
  const filteredPayLater = payLaterList.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.batchTitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (payLaterFilter === "overdue") return !item.isPaid && item.daysRemaining <= 0;
    if (payLaterFilter === "blocked") return item.isBlocked;
    if (payLaterFilter === "paid") return item.isPaid;
    return true;
  });

  // Filtered Batch Content
  const currentBatchLectures = lecturesList.filter(
    (l) => l.batchId === selectedBatchId && l.subject === selectedSubject
  );
  const currentBatchNotes = notesList.filter(
    (n) => n.batchId === selectedBatchId && n.subject === selectedSubject
  );
  const currentBatchDpps = dppsList.filter(
    (d) => d.batchId === selectedBatchId && d.subject === selectedSubject
  );

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans selection:bg-[#5A4BDA] selection:text-white antialiased">
      {/* 1. DEDICATED ADMIN HEADER */}
      <AdminHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        overdueCount={overdueCount}
        onNavigateToPayLater={() => setActiveTab("paylater")}
      />

      {/* 2. BODY LAYOUT: PINNED ADMIN SIDEBAR + MAIN SCROLLABLE CONTENT */}
      <div className="flex flex-1 overflow-hidden relative">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          overdueCount={overdueCount}
        />

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto px-3.5 sm:px-8 lg:px-12 py-4 sm:py-8 bg-[#F8F9FB]">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-18 right-6 z-50 bg-[#1B212D] text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-lg border border-gray-700 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 1: OVERVIEW & DASHBOARD                              */}
          {/* ======================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6 max-w-6xl pb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1B212D] tracking-tight">
                    Admin Control Console
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Central authority to upload recorded videos, notes, DPPs, test series, library books, and manage Pay Later access.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    All Academic Services Online
                  </span>
                </div>
              </div>

              {/* 5 Admin Stat Cards (NO REVENUE / NO SALES) */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between text-gray-400 mb-1.5">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Batches</span>
                    <GraduationCap className="w-4 h-4 text-[#5A4BDA]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1B212D]">{batchesList.length}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Active running</div>
                </div>

                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between text-gray-400 mb-1.5">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Lectures &amp; DPPs</span>
                    <FolderPlus className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#1B212D]">{lecturesList.length + dppsList.length}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{notesList.length} Notes uploaded</div>
                </div>

                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between text-gray-400 mb-1.5">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Test Series</span>
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-[#1B212D]">{testSeriesList.length}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">CBT Tests live</div>
                </div>

                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between text-gray-400 mb-1.5">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Library Books</span>
                    <BookOpen className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-[#1B212D]">{libraryList.length}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Question Banks</div>
                </div>

                <div className={`bg-white rounded-2xl border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] col-span-2 lg:col-span-1 ${overdueCount > 0 ? 'border-red-300 bg-red-50/20' : 'border-[#E5E7EB]'}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-red-600 uppercase">Overdue Fees</span>
                    <Lock className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-red-700">{overdueCount}</div>
                  <button
                    onClick={() => setActiveTab("paylater")}
                    className="text-[10px] text-red-600 hover:underline font-bold mt-0.5 flex items-center gap-1 cursor-pointer"
                  >
                    Send Notice / Block &rarr;
                  </button>
                </div>
              </div>

              {/* Quick Action Hub: Direct upload shortcuts */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-4">
                <h2 className="text-base font-bold text-[#1B212D]">
                  Curriculum Upload &amp; Fast Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    onClick={() => {
                      setActiveTab("batch-content");
                      setContentSubTab("Lectures");
                      setUploadLectureModalOpen(true);
                    }}
                    className="p-4 rounded-xl border border-gray-200 hover:border-[#5A4BDA] hover:bg-[#F0EEFF]/40 text-left transition-all cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-purple-50 text-[#5A4BDA] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-sm text-[#1B212D]">Upload Video Lecture</div>
                    <div className="text-xs text-gray-500 mt-0.5">Add recorded lecture to batch</div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("batch-content");
                      setContentSubTab("DPPs");
                      setUploadDppModalOpen(true);
                    }}
                    className="p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-left transition-all cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-sm text-[#1B212D]">Upload New DPP</div>
                    <div className="text-xs text-gray-500 mt-0.5">Attach practice problems &amp; solutions</div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("batch-content");
                      setContentSubTab("Notes");
                      setUploadNotesModalOpen(true);
                    }}
                    className="p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 text-left transition-all cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-sm text-[#1B212D]">Upload Notes PDF</div>
                    <div className="text-xs text-gray-500 mt-0.5">Upload classroom PDF notes</div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("tests");
                      setCreateTestModalOpen(true);
                    }}
                    className="p-4 rounded-xl border border-gray-200 hover:border-amber-500 hover:bg-amber-50/30 text-left transition-all cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-sm text-[#1B212D]">Create CBT Test</div>
                    <div className="text-xs text-gray-500 mt-0.5">Publish mock test with timer &amp; marks</div>
                  </button>
                </div>
              </div>

              {/* Pay Later Overdue Quick Alert */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                    <h2 className="text-base font-bold text-[#1B212D]">
                      Pay Later 7-Day Fee Defaulters Requiring Action
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("paylater")}
                    className="text-xs font-bold text-[#5A4BDA] hover:underline cursor-pointer"
                  >
                    Full Pay Later Console ({payLaterList.length}) &rarr;
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {payLaterList.slice(0, 3).map((item) => (
                    <div key={item.orderId} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-sm text-[#1B212D]">{item.studentName}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.isBlocked ? 'bg-red-100 text-red-700' : item.isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {item.isBlocked ? 'ACCESS BLOCKED' : item.isPaid ? 'PAID' : `${item.daysRemaining} days remaining`}
                          </span>
                        </div>
                        <div className="text-gray-500">
                          {item.batchTitle} • {item.phone} • Pending: <strong className="text-gray-800">₹ {item.amount}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedEmailNotice(item)}
                          className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#5A4BDA]" />
                          <span>Email Notice</span>
                        </button>

                        <button
                          onClick={() => toggleBlockAccess(item.orderId)}
                          className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${
                            item.isBlocked
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {item.isBlocked ? 'Unblock' : 'Block Access'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: BATCH CONTENT MANAGER (VIDEOS, NOTES, DPPS)       */}
          {/* ======================================================== */}
          {activeTab === "batch-content" && (
            <div className="space-y-6 max-w-6xl pb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1B212D] tracking-tight">
                    Batch Content Manager
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Upload and manage recorded video lectures, lecture notes PDFs, and Daily Practice Problems (DPPs).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (contentSubTab === "Lectures") setUploadLectureModalOpen(true);
                      else if (contentSubTab === "Notes") setUploadNotesModalOpen(true);
                      else setUploadDppModalOpen(true);
                    }}
                    className="px-5 py-2.5 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload {contentSubTab === "Lectures" ? "Recorded Lecture" : contentSubTab === "Notes" ? "Notes PDF" : "DPP Sheet"}</span>
                  </button>
                </div>
              </div>

              {/* Batch & Subject Selector Bar */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Select Batch */}
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0">
                    Selected Batch:
                  </label>
                  <select
                    value={selectedBatchId}
                    onChange={(e) => setSelectedBatchId(e.target.value)}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-[#5A4BDA]"
                  >
                    {batchesList.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Subject Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {["Mathematics", "Science", "English", "SST", "Hindi"].map((subj) => (
                    <button
                      key={subj}
                      onClick={() => setSelectedSubject(subj)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedSubject === subj
                          ? "bg-[#5A4BDA] text-white shadow-2xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Type Sub-Tabs (Lectures | Notes | DPPs) */}
              <div className="bg-[#EAEFF5] p-1 rounded-2xl inline-flex items-center gap-1">
                {(["Lectures", "Notes", "DPPs"] as const).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setContentSubTab(sub)}
                    className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      contentSubTab === sub
                        ? "bg-white text-[#1B212D] shadow-2xs"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {sub === "Lectures"
                      ? `Recorded Lectures (${currentBatchLectures.length})`
                      : sub === "Notes"
                      ? `Lecture Notes (${currentBatchNotes.length})`
                      : `DPPs & Sheets (${currentBatchDpps.length})`}
                  </button>
                ))}
              </div>

              {/* 1. LECTURES SUB-TAB */}
              {contentSubTab === "Lectures" && (
                <div className="space-y-4">
                  {currentBatchLectures.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500 text-xs">
                      No recorded video lectures uploaded for {selectedSubject} yet.
                      <div className="mt-3">
                        <button
                          onClick={() => setUploadLectureModalOpen(true)}
                          className="px-4 py-2 bg-[#5A4BDA] text-white font-bold rounded-xl"
                        >
                          Upload First Lecture
                        </button>
                      </div>
                    </div>
                  ) : (
                    currentBatchLectures.map((lec) => (
                      <div
                        key={lec.id}
                        className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-purple-50 text-[#5A4BDA] text-[10px] font-bold">
                              {lec.lectureNumber}
                            </span>
                            <span className="text-xs font-semibold text-gray-400">•</span>
                            <span className="text-xs font-bold text-gray-600">{lec.chapter}</span>
                          </div>

                          <h3 className="text-base font-bold text-[#1B212D]">
                            {lec.title}
                          </h3>

                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>Educator: <strong className="text-gray-700">{lec.educator}</strong></span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-gray-400" />
                              {lec.duration}
                            </span>
                            <span>•</span>
                            <span>Uploaded: {lec.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={lec.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-[#F0EEFF] text-[#5A4BDA] hover:bg-[#E5E0FF] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Preview Video</span>
                          </a>

                          <button
                            onClick={() => {
                              setLecturesList((prev) => prev.filter((l) => l.id !== lec.id));
                              showToast(`Lecture "${lec.title}" removed`);
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Lecture"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 2. NOTES SUB-TAB */}
              {contentSubTab === "Notes" && (
                <div className="space-y-4">
                  {currentBatchNotes.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500 text-xs">
                      No lecture notes PDF uploaded for {selectedSubject} yet.
                      <div className="mt-3">
                        <button
                          onClick={() => setUploadNotesModalOpen(true)}
                          className="px-4 py-2 bg-[#5A4BDA] text-white font-bold rounded-xl"
                        >
                          Upload First Notes PDF
                        </button>
                      </div>
                    </div>
                  ) : (
                    currentBatchNotes.map((note) => (
                      <div
                        key={note.id}
                        className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">
                              PDF NOTES
                            </span>
                            <span className="text-xs font-semibold text-gray-400">•</span>
                            <span className="text-xs font-bold text-gray-600">{note.chapter}</span>
                          </div>

                          <h3 className="text-base font-bold text-[#1B212D]">
                            {note.title}
                          </h3>

                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>File: <strong className="text-gray-700 font-mono">{note.fileName}</strong></span>
                            <span>•</span>
                            <span>{note.pages} Pages</span>
                            <span>•</span>
                            <span>Uploaded: {note.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            href="/study_v2/pdf-viewer"
                            className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview Document</span>
                          </Link>

                          <button
                            onClick={() => {
                              setNotesList((prev) => prev.filter((n) => n.id !== note.id));
                              showToast(`Notes "${note.title}" removed`);
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Notes"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 3. DPPS SUB-TAB */}
              {contentSubTab === "DPPs" && (
                <div className="space-y-4">
                  {currentBatchDpps.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500 text-xs">
                      No DPP sheets uploaded for {selectedSubject} yet.
                      <div className="mt-3">
                        <button
                          onClick={() => setUploadDppModalOpen(true)}
                          className="px-4 py-2 bg-[#5A4BDA] text-white font-bold rounded-xl"
                        >
                          Upload First DPP
                        </button>
                      </div>
                    </div>
                  ) : (
                    currentBatchDpps.map((dpp) => (
                      <div
                        key={dpp.id}
                        className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                              {dpp.dppNumber}
                            </span>
                            <span className="text-xs font-semibold text-gray-400">•</span>
                            <span className="text-xs font-bold text-gray-600">{dpp.chapter}</span>
                          </div>

                          <h3 className="text-base font-bold text-[#1B212D]">
                            {dpp.title}
                          </h3>

                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{dpp.questionsCount} Questions</span>
                            <span>•</span>
                            <span>{dpp.totalMarks} Marks</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-medium">Solutions Attached</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            href="/study_v2/test/permutations-and-combinations"
                            className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>Preview DPP Test</span>
                          </Link>

                          <button
                            onClick={() => {
                              setDppsList((prev) => prev.filter((d) => d.id !== dpp.id));
                              showToast(`DPP "${dpp.dppNumber}" removed`);
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete DPP"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: TEST SERIES & CBT EXAMINATION MANAGER             */}
          {/* ======================================================== */}
          {activeTab === "tests" && (
            <div className="space-y-6 max-w-6xl pb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1B212D] tracking-tight">
                    Test Series &amp; CBT Examination Console
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Create mock tests, configure marking scheme, inspect answer keys, and monitor student test submissions.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCreateTestModalOpen(true)}
                    className="px-5 py-2.5 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Test</span>
                  </button>
                </div>
              </div>

              {/* Test Series Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {testSeriesList.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500 text-xs col-span-3">
                    <FileCheck className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <div className="font-bold text-gray-700 text-sm">No Tests Scheduled Yet</div>
                    <p className="text-gray-400 mt-1">Click &quot;Create New Test&quot; above to publish your first CBT Mock Test or DPP Quiz.</p>
                  </div>
                ) : (
                  testSeriesList.map((test) => (
                  <div
                    key={test.id}
                    className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2.5 py-0.5 rounded-[4px] text-[10px] font-extrabold uppercase ${
                          test.type === "FULL_MOCK" ? "bg-red-50 text-red-700" : "bg-purple-50 text-[#5A4BDA]"
                        }`}>
                          {test.type.replace("_", " ")}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600">
                          {test.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#1B212D] leading-snug">
                        {test.title}
                      </h3>

                      <div className="mt-2 text-xs text-gray-500 space-y-1">
                        <div>Subject: <strong className="text-gray-800">{test.subject}</strong></div>
                        <div>Duration: <strong>{test.durationMins} Mins</strong> • <strong>{test.totalQuestions} Questions</strong></div>
                        <div>Total Marks: <strong>{test.totalMarks} Marks (+4/-1 Scheme)</strong></div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/study_v2/test/${test.id}`}
                          className="flex-1 py-2 bg-[#F0EEFF] text-[#5A4BDA] hover:bg-[#E5E0FF] font-bold text-xs rounded-xl text-center transition-colors"
                        >
                          Preview CBT Screen
                        </Link>
                        <Link
                          href={`/study_v2/test/${test.id}/solutions`}
                          className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl text-center transition-colors"
                          title="Answer Key & Solutions"
                        >
                          Keys
                        </Link>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                        <Link
                          href={`/study_v2/test/${test.id}/result`}
                          className="font-bold text-[#5A4BDA] hover:underline"
                        >
                          View Results &rarr;
                        </Link>

                        <button
                          onClick={() => {
                            setTestSeriesList((prev) => prev.filter((t) => t.id !== test.id));
                            showToast(`Test "${test.title}" removed`);
                          }}
                          className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: DIGITAL LIBRARY & QUESTION BANKS                  */}
          {/* ======================================================== */}
          {activeTab === "library" && (
            <div className="space-y-6 max-w-6xl pb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1B212D] tracking-tight">
                    Digital Library &amp; Question Bank
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Upload chapter-wise Question Banks, NCERT Exemplars, and Formula Sheets to student Library.
                  </p>
                </div>

                <button
                  onClick={() => setUploadLibraryModalOpen(true)}
                  className="px-5 py-2.5 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Library Book / PDF</span>
                </button>
              </div>

              {/* Library Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {libraryList.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500 text-xs col-span-4">
                    <BookOpen className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <div className="font-bold text-gray-700 text-sm">No Library Resources Uploaded</div>
                    <p className="text-gray-400 mt-1">Click &quot;Upload Library Book / PDF&quot; to add Question Banks, Formula Sheets, or Exemplars.</p>
                  </div>
                ) : (
                  libraryList.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between"
                  >
                    <div>
                      {/* Book Cover Banner */}
                      <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${book.coverBg} p-3 text-white flex flex-col justify-between mb-3 shadow-2xs`}>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-80">
                          {book.category}
                        </div>
                        <div className="font-extrabold text-sm leading-tight">
                          {book.subject}
                        </div>
                        <div className="text-[10px] font-mono text-gray-200">
                          {book.questionsCount} Questions
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-[#1B212D] line-clamp-2 mb-1">
                        {book.title}
                      </h3>

                      <div className="text-[11px] text-gray-400 mb-2 truncate font-mono">
                        {book.fileName}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {book.topics.slice(0, 2).map((top, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px]">
                            {top}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href="/study_v2/library"
                        className="text-xs font-bold text-[#5A4BDA] hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview Book</span>
                      </Link>

                      <button
                        onClick={() => {
                          setLibraryList((prev) => prev.filter((b) => b.id !== book.id));
                          showToast(`Book "${book.title}" removed`);
                        }}
                        className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: PAY LATER AUTHORITY                               */}
          {/* ======================================================== */}
          {activeTab === "paylater" && (
            <div className="space-y-5 max-w-6xl pb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1B212D] tracking-tight">
                    Pay Later Authority &amp; Access Control
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Enforce the official 7-Day Fee Policy. Block batch access for defaulters or send readymade clearance notices.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-purple-50 text-[#5A4BDA] rounded-xl border border-purple-100 text-xs font-bold">
                    Total Enrolled Queue: {payLaterList.length}
                  </span>
                </div>
              </div>

              {/* Policy Container */}
              <div className="bg-[#F8F9FB] rounded-xl p-4 border border-gray-200 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">7-Day Pay Later Policy:</strong> Students who opt for Pay Later on the payment checkout receive instant, full batch access. If payment is not cleared within <strong>7 days</strong>, you have full authority to block their batch access below. Blocked students cannot view classes until marked paid.
                </div>
              </div>

              {/* Search & Status Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by student name, phone, order ID, or batch..."
                    className="w-full pl-9 pr-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5A4BDA]"
                  />
                </div>

                <div className="bg-[#EAEFF5] p-1 rounded-xl inline-flex items-center gap-1 self-start sm:self-auto overflow-x-auto max-w-full">
                  {[
                    { id: "all" as const, label: `All (${payLaterList.length})` },
                    { id: "overdue" as const, label: `Overdue (${overdueCount})` },
                    { id: "blocked" as const, label: `Blocked (${payLaterList.filter(p => p.isBlocked).length})` },
                    { id: "paid" as const, label: `Paid (${payLaterList.filter(p => p.isPaid).length})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setPayLaterFilter(f.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        payLaterFilter === f.id
                          ? "bg-white text-[#1B212D] shadow-2xs"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pay Later Cards List */}
              <div className="space-y-4">
                {filteredPayLater.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500 text-xs">
                    <ShieldAlert className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <div className="font-bold text-gray-700 text-sm">No Pay Later records currently</div>
                    <p className="text-gray-400 mt-1">When students opt for the 7-day Pay Later scheme at checkout, their authority records will appear here.</p>
                  </div>
                ) : (
                  filteredPayLater.map((item) => {
                  const isOverdue = !item.isPaid && item.daysRemaining <= 0;
                  return (
                    <div
                      key={item.orderId}
                      className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all ${
                        item.isBlocked
                          ? "border-red-300 bg-red-50/10"
                          : isOverdue
                          ? "border-amber-300"
                          : "border-[#E5E7EB]"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`px-2.5 py-0.5 rounded-[4px] text-[11px] font-bold uppercase tracking-wider ${
                                item.isBlocked
                                  ? "bg-red-100 text-red-700"
                                  : item.isPaid
                                  ? "bg-[#ECFDF5] text-[#059669]"
                                  : isOverdue
                                  ? "bg-red-50 text-red-600"
                                  : "bg-amber-50 text-amber-800"
                              }`}
                            >
                              {item.isBlocked
                                ? "BATCH ACCESS BLOCKED"
                                : item.isPaid
                                ? "PAID & VERIFIED"
                                : isOverdue
                                ? `OVERDUE BY ${Math.abs(item.daysRemaining)} DAYS`
                                : `7-DAY GRACE (${item.daysRemaining} DAYS LEFT)`}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">
                              {item.orderId}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-[#1B212D]">
                            {item.studentName}
                          </h3>
                        </div>

                        <div className="text-left sm:text-right">
                          <div className="text-sm font-bold text-gray-700">
                            Pending Fee: ₹ {item.amount}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">
                            Enrolled: {item.orderDate} • Due:{" "}
                            <strong className="text-gray-800">{item.dueDate}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs border-b border-gray-100">
                        <div className="flex items-center gap-2 text-gray-700">
                          <GraduationCap className="w-4 h-4 text-[#5A4BDA] shrink-0" />
                          <span>Batch: <strong>{item.batchTitle}</strong></span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 text-[#5A4BDA] shrink-0" />
                          <span>Phone: <strong>{item.phone}</strong></span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-[#5A4BDA] shrink-0" />
                          <span className="truncate">Address: <strong>{item.address}</strong></span>
                        </div>
                      </div>

                      <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs text-gray-500">
                          Email: <strong className="text-gray-800">{item.email}</strong>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {!item.isPaid && (
                            <button
                              onClick={() => toggleBlockAccess(item.orderId)}
                              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                                item.isBlocked
                                  ? "bg-[#ECFDF5] text-[#059669] hover:bg-emerald-100"
                                  : "bg-[#FEE2E2] text-[#DC2626] hover:bg-red-100"
                              }`}
                            >
                              {item.isBlocked ? (
                                <>
                                  <Unlock className="w-3.5 h-3.5" />
                                  <span>Unblock Batch Access</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3.5 h-3.5" />
                                  <span>Block Batch Access</span>
                                </>
                              )}
                            </button>
                          )}

                          {!item.isPaid && (
                            <button
                              onClick={() => markPayLaterPaid(item.orderId)}
                              className="px-4 py-2.5 bg-[#F0EEFF] text-[#5A4BDA] hover:bg-[#E5E0FF] font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Mark As Paid</span>
                            </button>
                          )}

                          <a
                            href={`https://wa.me/${item.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                              `Hello ${item.studentName}, This is an official notice from Ansh Tutor regarding your enrollment in "${item.batchTitle}". Your 7-day payment window expires on ${item.dueDate}. Please clear pending dues of ₹${item.amount} to continue accessing your live classes.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 bg-white border border-[#D1D5DB] hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>WhatsApp Notice</span>
                          </a>

                          <button
                            onClick={() => setSelectedEmailNotice(item)}
                            className="px-4 py-2.5 bg-white border border-[#D1D5DB] hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                          >
                            <Mail className="w-3.5 h-3.5 text-[#5A4BDA]" />
                            <span>Email Notice</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete pay later record for ${item.studentName}?`)) {
                                setPayLaterList(payLaterList.filter((p) => p.orderId !== item.orderId));
                                showToast(`Pay Later record "${item.orderId}" deleted`);
                              }
                            }}
                            className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: BATCHES                                           */}
          {/* ======================================================== */}
          {activeTab === "batches" && (
            <div className="space-y-6 max-w-6xl pb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1B212D] tracking-tight">
                    Academic Batches &amp; Class Cohorts
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Configure curriculum batches, assign educators, and jump directly to batch content upload.
                  </p>
                </div>

                <button
                  onClick={() => setAddBatchModalOpen(true)}
                  className="px-5 py-2.5 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Batch</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {batchesList.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500 text-xs col-span-3">
                    <GraduationCap className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <div className="font-bold text-gray-700 text-sm">No Batches Published Yet</div>
                    <p className="text-gray-400 mt-1">Click &quot;Create New Batch&quot; above to publish your first academic batch.</p>
                  </div>
                ) : (
                  batchesList.map((batch) => (
                  <div
                    key={batch.id}
                    className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3 min-h-[40px]">
                        <h3 className="text-sm sm:text-base font-bold text-[#1B212D] leading-snug line-clamp-2">
                          {batch.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#ECFDF5] text-[#059669] text-[10px] font-bold shrink-0">
                          {batch.status}
                        </span>
                      </div>

                      <div
                        className={`w-full h-32 rounded-xl ${batch.bannerBg} relative overflow-hidden flex flex-col items-center justify-between p-3 select-none mb-3 shadow-2xs`}
                      >
                        <div
                          className={`text-[10px] font-extrabold ${batch.bannerTextColor} uppercase tracking-wider text-center leading-tight whitespace-pre-line pt-1`}
                        >
                          {batch.bannerLabel}
                        </div>
                        <div className="relative w-14 h-14 -mb-1">
                          <Image
                            src="/batches/user_avatar.png"
                            alt="Faculty"
                            fill
                            className="object-cover rounded-full border border-white"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2 py-1.5 px-2 bg-gray-50 rounded-lg">
                        <span className="font-bold text-[#5A4BDA]">
                          {batch.grade}
                        </span>
                        <span className="text-gray-500 font-medium">
                          {batch.targetYear}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3 px-1">
                        <span>Faculty: <strong className="text-gray-800">{batch.faculty}</strong></span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Valid: {batch.validityDate || "31 Mar 2027"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setSelectedBatchId(batch.id);
                          setActiveTab("batch-content");
                        }}
                        className="flex-1 py-2 bg-[#F0EEFF] text-[#5A4BDA] hover:bg-[#E5E0FF] text-xs font-bold rounded-xl text-center transition-colors cursor-pointer"
                      >
                        Manage Content (Videos/Notes/DPPs)
                      </button>
                      <button
                        onClick={() => {
                          setBatchesList((prev) => prev.filter((b) => b.id !== batch.id));
                          showToast(`Batch "${batch.title}" removed`);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Batch"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 7: LIVE CLASSES STUDIO                               */}
          {/* ======================================================== */}
          {activeTab === "live" && (
            <div className="space-y-6 max-w-6xl pb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1B212D] tracking-tight">
                    Live Streaming Studio
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Schedule live streaming lectures, enter studio as moderator, and toggle live status.
                  </p>
                </div>

                <button
                  onClick={() => setAddLiveModalOpen(true)}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>Schedule Live Class</span>
                </button>
              </div>

              <div className="space-y-4">
                {liveList.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500 text-xs">
                    <Radio className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <div className="font-bold text-gray-700 text-sm">No Live Classes Scheduled</div>
                    <p className="text-gray-400 mt-1">Click &quot;Schedule Live Class&quot; above to setup a live stream session.</p>
                  </div>
                ) : (
                  liveList.map((cls) => (
                  <div
                    key={cls.id}
                    className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {cls.isLive ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 text-[11px] font-bold flex items-center gap-1.5 border border-red-200 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                            LIVE NOW
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                            UPCOMING
                          </span>
                        )}
                        <span className="text-xs font-bold text-[#5A4BDA]">
                          {cls.subject}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{cls.batch}</span>
                      </div>

                      <h3 className="text-base font-bold text-[#1B212D]">
                        {cls.title}
                      </h3>

                      <p className="text-xs text-gray-500">
                        Educator: <strong className="text-gray-800">{cls.faculty}</strong> | Slot: <strong>{cls.time}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/study_v2/live?title=${encodeURIComponent(cls.title)}`}
                        className="px-4 py-2.5 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
                      >
                        Enter Studio / Moderator
                      </Link>

                      <button
                        onClick={() => {
                          setLiveList((prev) =>
                            prev.map((l) => (l.id === cls.id ? { ...l, isLive: !l.isLive } : l))
                          );
                          showToast(`Live status toggled`);
                        }}
                        className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        {cls.isLive ? "End Stream" : "Go Live"}
                      </button>
                    </div>
                  </div>
                )))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 8: STUDENTS DIRECTORY                                */}
          {/* ======================================================== */}
          {activeTab === "students" && (
            <div className="space-y-6 max-w-6xl pb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1B212D] tracking-tight">
                    Student Enrollment Directory
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Verified registered students across all batches with direct access suspension control.
                  </p>
                </div>

                <div className="text-xs font-bold text-gray-500">
                  Total Students: {studentsList.length}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-x-auto shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-[#F8F9FB] text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Class</th>
                      <th className="py-3 px-4">Enrolled Course</th>
                      <th className="py-3 px-4 text-right">Access Status</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {studentsList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-gray-400 text-xs">
                          No registered student records in directory yet. Enrolled students will appear here automatically.
                        </td>
                      </tr>
                    ) : (
                      studentsList.map((st) => (
                      <tr key={st.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-bold text-gray-900">
                          {st.name}
                        </td>
                        <td className="py-3 px-4 text-gray-600 font-mono">{st.phone}</td>
                        <td className="py-3 px-4 text-gray-600">{st.email}</td>
                        <td className="py-3 px-4 text-gray-700">{st.cls}</td>
                        <td className="py-3 px-4 font-medium text-gray-800">{st.enrolledBatch}</td>
                        <td className="py-3 px-4 text-right">
                          <span
                            className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold ${
                              st.status === "Active"
                                ? "bg-[#ECFDF5] text-[#059669]"
                                : st.status.includes("Blocked")
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-50 text-amber-800"
                            }`}
                          >
                            {st.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to remove student "${st.name}"?`)) {
                                setStudentsList(studentsList.filter((s) => s.id !== st.id));
                                showToast(`Student "${st.name}" removed from directory`);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Delete Student"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    )))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 9: ANNOUNCEMENTS BROADCAST                           */}
          {/* ======================================================== */}
          {activeTab === "announcements" && (
            <div className="space-y-6 max-w-6xl pb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1B212D] tracking-tight">
                    Student Broadcasts &amp; Notices
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Publish urgent alerts and schedule updates directly onto student dashboards.
                  </p>
                </div>

                <button
                  onClick={() => setAddAnnouncementModalOpen(true)}
                  className="px-5 py-2.5 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Broadcast Notice</span>
                </button>
              </div>

              <div className="space-y-4">
                {announcements.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500 text-xs">
                    <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <div className="font-bold text-gray-700 text-sm">No Active Announcements</div>
                    <p className="text-gray-400 mt-1">Click &quot;Broadcast Notice&quot; above to send an announcement to students.</p>
                  </div>
                ) : (
                  announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ann.priority === "High" ? "bg-red-100 text-red-700" : "bg-blue-50 text-blue-700"
                        }`}>
                          {ann.priority} Priority
                        </span>
                        <span className="text-xs font-semibold text-gray-400">•</span>
                        <span className="text-xs font-bold text-[#5A4BDA]">{ann.target}</span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{ann.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#1B212D]">
                      {ann.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {ann.content}
                    </p>
                  </div>
                )))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 10: HELPDESK & SUPPORT TICKETS                       */}
          {/* ======================================================== */}
          {activeTab === "helpdesk" && (
            <div className="space-y-6 max-w-6xl pb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1B212D] tracking-tight">
                    Student Helpdesk &amp; Inquiry Tickets
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Resolve queries submitted by students from the Help &amp; Support portal.
                  </p>
                </div>

                <div className="text-xs font-bold text-gray-500">
                  Total Queries: {supportTickets.length}
                </div>
              </div>

              <div className="space-y-4">
                {supportTickets.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500 text-xs">
                    <Headphones className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <div className="font-bold text-gray-700 text-sm">No Inquiries or Support Tickets</div>
                    <p className="text-gray-400 mt-1">Inquiries submitted via the student Help &amp; Support page will appear here.</p>
                  </div>
                ) : (
                  supportTickets.map((tkt) => (
                  <div
                    key={tkt.id}
                    className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-purple-50 text-[#5A4BDA] text-[10px] font-bold">
                          {tkt.category}
                        </span>
                        <span className="font-bold text-sm text-[#1B212D]">{tkt.studentName}</span>
                        <span className="text-xs text-gray-400 font-mono">({tkt.phone})</span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        tkt.status === "Open" ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-700"
                      }`}>
                        {tkt.status}
                      </span>
                    </div>

                    <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl">
                      &ldquo;{tkt.message}&rdquo;
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                      <span className="text-gray-400">Received on: {tkt.date}</span>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${tkt.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Hello ${tkt.studentName}, We have received your query regarding "${tkt.category}". Here is the update from Ansh Tutor academic desk:`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-lg flex items-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Reply</span>
                        </a>

                        <button
                          onClick={() => {
                            setSupportTickets((prev) =>
                              prev.map((t) => (t.id === tkt.id ? { ...t, status: t.status === "Open" ? "Resolved" : "Open" } : t))
                            );
                            showToast(`Ticket status updated!`);
                          }}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg cursor-pointer"
                        >
                          {tkt.status === "Open" ? "Mark Resolved" : "Reopen Ticket"}
                        </button>
                      </div>
                    </div>
                  </div>
                )))}
              </div>

              {/* SECTION: 1-on-1 Academic Counseling & Offline Campus Bookings */}
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#5A4BDA]" />
                      <span>Academic Counseling &amp; Offline Campus Bookings</span>
                    </h2>
                    <p className="text-xs text-gray-500">
                      Slots booked by parents/students via the online booking portal (/book).
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-purple-50 text-[#5A4BDA] rounded-lg border border-purple-100">
                    Total: {counselingBookings.length}
                  </span>
                </div>

                {counselingBookings.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-400 text-xs">
                    No counseling slots booked yet. New bookings submitted on /book will appear here automatically.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {counselingBookings.map((b) => (
                      <div key={b.id} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-[#5A4BDA]">
                            {b.sessionMode === 'offline' ? '🏛️ Offline Campus Visit' : '💻 1:1 Video Call'}
                          </span>
                          <span className="text-xs font-mono text-gray-400">{b.id}</span>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-900">{b.studentName} ({b.studentClass})</div>
                          <div className="text-xs text-gray-500">Parent: {b.parentName} • Phone: {b.phone}</div>
                        </div>
                        <div className="text-xs bg-gray-50 p-2.5 rounded-lg text-gray-700">
                          <div><strong>Date &amp; Slot:</strong> {b.bookingDate} • {b.timeSlot}</div>
                          <div><strong>Focus:</strong> {b.subjectConcern}</div>
                          {b.notes && <div className="mt-1 text-gray-500 italic">&ldquo;{b.notes}&rdquo;</div>}
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <a
                            href={`https://wa.me/91${b.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                              `Hello ${b.parentName}, this is regarding your 1:1 counseling booking for ${b.studentName} (${b.studentClass}) at Ansh Tutor on ${b.bookingDate} (${b.timeSlot}).`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs rounded-lg flex items-center gap-1.5"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Parent</span>
                          </a>
                          <button
                            onClick={() => {
                              const updated = counselingBookings.filter((item) => item.id !== b.id);
                              setCounselingBookings(updated);
                              localStorage.setItem('ansh_counseling_bookings', JSON.stringify(updated));
                              showToast('Booking record cleared');
                            }}
                            className="text-xs text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                            title="Remove Booking"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ======================================================== */}
      {/* MODALS SECTION                                           */}
      {/* ======================================================== */}

      {/* 1. UPLOAD RECORDED VIDEO LECTURE MODAL */}
      {uploadLectureModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Upload Recorded Video Lecture
              </h3>
              <button onClick={() => setUploadLectureModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadLecture} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Lecture Title</label>
                <input
                  type="text"
                  value={newLecTitle}
                  onChange={(e) => setNewLecTitle(e.target.value)}
                  placeholder="e.g. Introduction to Rational Numbers"
                  className="w-full px-3.5 py-2 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Chapter / Unit</label>
                  <input
                    type="text"
                    value={newLecChapter}
                    onChange={(e) => setNewLecChapter(e.target.value)}
                    placeholder="CH - 01 Rational Numbers"
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Lecture Code / No.</label>
                  <input
                    type="text"
                    value={newLecNumber}
                    onChange={(e) => setNewLecNumber(e.target.value)}
                    placeholder="Lec 01"
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Educator / Faculty</label>
                  <input
                    type="text"
                    value={newLecEducator}
                    onChange={(e) => setNewLecEducator(e.target.value)}
                    placeholder="e.g. Rajwant Singh Sir"
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Video Duration</label>
                  <input
                    type="text"
                    value={newLecDuration}
                    onChange={(e) => setNewLecDuration(e.target.value)}
                    placeholder="e.g. 52 mins"
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Video Embed / Storage URL</label>
                <input
                  type="text"
                  value={newLecUrl}
                  onChange={(e) => setNewLecUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 border rounded-xl font-mono"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUploadLectureModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5A4BDA] hover:bg-[#4939C8] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Upload Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. UPLOAD NOTES PDF MODAL */}
      {uploadNotesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Upload Lecture Notes PDF
              </h3>
              <button onClick={() => setUploadNotesModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadNotes} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Notes Document Title</label>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="e.g. Rational Numbers Classroom Notes"
                  className="w-full px-3.5 py-2 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Chapter</label>
                  <input
                    type="text"
                    value={newNoteChapter}
                    onChange={(e) => setNewNoteChapter(e.target.value)}
                    placeholder="CH - 01 Rational Numbers"
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Page Count</label>
                  <input
                    type="number"
                    value={newNotePages}
                    onChange={(e) => setNewNotePages(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">PDF File Name / Path</label>
                <input
                  type="text"
                  value={newNoteFileName}
                  onChange={(e) => setNewNoteFileName(e.target.value)}
                  placeholder="e.g. Chapter_01_Notes.pdf"
                  className="w-full px-3.5 py-2 border rounded-xl font-mono"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUploadNotesModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5A4BDA] hover:bg-[#4939C8] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Publish Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. UPLOAD DPP MODAL */}
      {uploadDppModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Upload Daily Practice Problem (DPP)
              </h3>
              <button onClick={() => setUploadDppModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadDpp} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">DPP Title</label>
                <input
                  type="text"
                  value={newDppTitle}
                  onChange={(e) => setNewDppTitle(e.target.value)}
                  placeholder="e.g. Daily Practice Problem 02 - Laws of Rational Numbers"
                  className="w-full px-3.5 py-2 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">DPP Number / Code</label>
                  <input
                    type="text"
                    value={newDppNumber}
                    onChange={(e) => setNewDppNumber(e.target.value)}
                    placeholder="e.g. DPP 02"
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Chapter</label>
                  <input
                    type="text"
                    value={newDppChapter}
                    onChange={(e) => setNewDppChapter(e.target.value)}
                    placeholder="CH - 01 Rational Numbers"
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Total Questions</label>
                  <input
                    type="number"
                    value={newDppQuestions}
                    onChange={(e) => setNewDppQuestions(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Total Marks</label>
                  <input
                    type="number"
                    value={newDppMarks}
                    onChange={(e) => setNewDppMarks(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUploadDppModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5A4BDA] hover:bg-[#4939C8] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Publish DPP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. CREATE CBT TEST MODAL */}
      {createTestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Create CBT Test / Mock Exam
              </h3>
              <button onClick={() => setCreateTestModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Test Title</label>
                <input
                  type="text"
                  value={newTestTitle}
                  onChange={(e) => setNewTestTitle(e.target.value)}
                  placeholder="e.g. JEE Advanced Full Mock Test 2"
                  className="w-full px-3.5 py-2 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Test Type</label>
                  <select
                    value={newTestType}
                    onChange={(e) => setNewTestType(e.target.value as any)}
                    className="w-full px-3.5 py-2 border rounded-xl bg-white"
                  >
                    <option value="FULL_MOCK">Full Mock Test</option>
                    <option value="CHAPTER_TEST">Chapter Test</option>
                    <option value="DPP_QUIZ">DPP Quiz</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={newTestDuration}
                    onChange={(e) => setNewTestDuration(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Questions Count</label>
                  <input
                    type="number"
                    value={newTestQuestions}
                    onChange={(e) => setNewTestQuestions(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Total Marks</label>
                  <input
                    type="number"
                    value={newTestMarks}
                    onChange={(e) => setNewTestMarks(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateTestModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5A4BDA] hover:bg-[#4939C8] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Publish to Test Series
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. UPLOAD LIBRARY BOOK MODAL */}
      {uploadLibraryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Upload Digital Library Resource
              </h3>
              <button onClick={() => setUploadLibraryModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadLibrary} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Book / Resource Title</label>
                <input
                  type="text"
                  value={newLibTitle}
                  onChange={(e) => setNewLibTitle(e.target.value)}
                  placeholder="e.g. Science Exemplar & Question Bank"
                  className="w-full px-3.5 py-2 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={newLibCategory}
                    onChange={(e) => setNewLibCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 border rounded-xl bg-white"
                  >
                    <option value="Question Bank">Question Bank</option>
                    <option value="Formula Sheet">Formula Sheet</option>
                    <option value="NCERT Exemplar">NCERT Exemplar</option>
                    <option value="PYQs">PYQs</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Subject</label>
                  <select
                    value={newLibSubject}
                    onChange={(e) => setNewLibSubject(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl bg-white"
                  >
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>SST</option>
                    <option>Hindi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Questions Count</label>
                  <input
                    type="number"
                    value={newLibQuestions}
                    onChange={(e) => setNewLibQuestions(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Topics (comma-separated)</label>
                  <input
                    type="text"
                    value={newLibTopics}
                    onChange={(e) => setNewLibTopics(e.target.value)}
                    placeholder="e.g. Algebra, Mensuration"
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUploadLibraryModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5A4BDA] hover:bg-[#4939C8] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Publish to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. CREATE BATCH MODAL */}
      {addBatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Create New Academic Batch
              </h3>
              <button onClick={() => setAddBatchModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Batch Title</label>
                <input
                  type="text"
                  value={newBatchTitle}
                  onChange={(e) => setNewBatchTitle(e.target.value)}
                  placeholder="e.g. Lakshya JEE 2027"
                  className="w-full px-3.5 py-2 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Class / Cohort</label>
                  <select
                    value={newBatchGrade}
                    onChange={(e) => setNewBatchGrade(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl bg-white"
                  >
                    <option>Class 8</option>
                    <option>Class 7</option>
                    <option>Class 6</option>
                    <option>Class 5</option>
                    <option>Class 4</option>
                    <option>Class 3</option>
                    <option>Class 2</option>
                    <option>Class 1</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Academic Session</label>
                  <input
                    type="text"
                    value={newBatchTargetYear}
                    onChange={(e) => setNewBatchTargetYear(e.target.value)}
                    placeholder="e.g. Session 2026-27"
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Faculty Name</label>
                  <input
                    type="text"
                    value={newBatchFaculty}
                    onChange={(e) => setNewBatchFaculty(e.target.value)}
                    placeholder="e.g. Ritik Mishra Sir"
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Course Validity Date</label>
                  <input
                    type="text"
                    value={newBatchValidityDate}
                    onChange={(e) => setNewBatchValidityDate(e.target.value)}
                    placeholder="e.g. 31 March 2027"
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddBatchModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5A4BDA] hover:bg-[#4939C8] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Publish Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. SCHEDULE LIVE CLASS MODAL */}
      {addLiveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Schedule Live Class
              </h3>
              <button onClick={() => setAddLiveModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLiveClass} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Topic / Title</label>
                <input
                  type="text"
                  value={newLiveTitle}
                  onChange={(e) => setNewLiveTitle(e.target.value)}
                  placeholder="e.g. Physical Instruments Part 2"
                  className="w-full px-3.5 py-2 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Subject</label>
                  <select
                    value={newLiveSubject}
                    onChange={(e) => setNewLiveSubject(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl bg-white"
                  >
                    <option>Physics</option>
                    <option>Mathematics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Faculty</label>
                  <input
                    type="text"
                    value={newLiveFaculty}
                    onChange={(e) => setNewLiveFaculty(e.target.value)}
                    placeholder="e.g. Anurag Sir"
                    className="w-full px-3.5 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Time Slot</label>
                <input
                  type="text"
                  value={newLiveTime}
                  onChange={(e) => setNewLiveTime(e.target.value)}
                  placeholder="05:00 PM - 06:30 PM"
                  className="w-full px-3.5 py-2 border rounded-xl"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddLiveModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Schedule Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. BROADCAST ANNOUNCEMENT MODAL */}
      {addAnnouncementModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Broadcast Student Announcement
              </h3>
              <button onClick={() => setAddAnnouncementModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Announcement Title</label>
                <input
                  type="text"
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  placeholder="e.g. Schedule Change for Chemistry"
                  className="w-full px-3.5 py-2 border rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Target Audience</label>
                <select
                  value={newAnnTarget}
                  onChange={(e) => setNewAnnTarget(e.target.value)}
                  className="w-full px-3.5 py-2 border rounded-xl bg-white"
                >
                  <option>All Students</option>
                  <option>Umang Term II 2027 (Class 8)</option>
                  <option>Ansh Foundation Master Batch</option>
                  <option>JEE Prep 2027 Free Series</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Notice Content</label>
                <textarea
                  rows={4}
                  value={newAnnContent}
                  onChange={(e) => setNewAnnContent(e.target.value)}
                  placeholder="Type official notification text here..."
                  className="w-full px-3.5 py-2 border rounded-xl resize-none"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddAnnouncementModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5A4BDA] hover:bg-[#4939C8] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. READYMADE EMAIL NOTICE MODAL (PAY LATER FEE CLEARANCE) */}
      {selectedEmailNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-[#F8F9FB]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-[#5A4BDA]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1B212D]">
                    Official Fee Clearance Notice (Pay Later)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Pre-filled official notice for {selectedEmailNotice.studentName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmailNotice(null)}
                className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center font-bold text-base cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="bg-[#F8F9FB] border border-[#E5E7EB] rounded-xl p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-gray-700">
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Recipient</div>
                  <div className="font-bold text-[#1B212D] truncate">{selectedEmailNotice.studentName}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Order ID</div>
                  <div className="font-mono font-bold text-gray-700">{selectedEmailNotice.orderId}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Due Date</div>
                  <div className="font-bold text-red-600">{selectedEmailNotice.dueDate}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Pending Dues</div>
                  <div className="font-bold text-[#1B212D]">₹ {selectedEmailNotice.amount}</div>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Subject Line</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`Urgent: 7-Day Fee Payment Clearance Notice for ${selectedEmailNotice.batchTitle} - Ansh Tutor`}
                    className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium select-all"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `Urgent: 7-Day Fee Payment Clearance Notice for ${selectedEmailNotice.batchTitle} - Ansh Tutor`
                      );
                      showToast("Subject copied to clipboard!");
                    }}
                    className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-gray-700">Readymade Email Body</label>
                  <span className="text-[11px] text-gray-400">Official format pre-configured</span>
                </div>
                <div className="w-full bg-white border border-gray-200 rounded-xl p-4 font-sans text-gray-800 leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap select-all border-dashed shadow-2xs">
{`Dear ${selectedEmailNotice.studentName},

Greetings from Ansh Tutor!

This is an official administrative notice regarding your admission and enrollment in "${selectedEmailNotice.batchTitle}" under the 7-Day Pay Later scheme (Reference ID: ${selectedEmailNotice.orderId}).

As per Ansh Tutor's enrollment policy, you were granted immediate, unrestricted access to all live classes, recorded lectures, daily practice problems (DPPs), and test series upon opting for Pay Later on ${selectedEmailNotice.orderDate}.

Your 7-day fee clearance window is scheduled to conclude on:
>> Final Due Date: ${selectedEmailNotice.dueDate}
>> Pending Course Fee: ₹${selectedEmailNotice.amount}

Please ensure your course fee is settled prior to the due date. In accordance with academic guidelines, accounts with outstanding dues beyond the 7-day grace period will be subject to temporary batch access suspension until payment verification is completed.

Payment Modes Available:
1. UPI QR / Official UPI ID
2. Online Net Banking / Cards
(For any payment assistance or account verification, please reach out to our accounts desk).

Official Support & Accounts Desk:
• WhatsApp / Helpline: +91 75250 09428
• Official Email: support@anshtutor.gleeze.com
• Website: https://anshtutor.gleeze.com

Warm regards,
Academic Administration & Student Accounts
Ansh Tutor`}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F8F9FB] border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Notice includes student ID, due date, and suspension authority clause.</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEmailNotice(null)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const subject = `Urgent: 7-Day Fee Payment Clearance Notice for ${selectedEmailNotice.batchTitle} - Ansh Tutor`;
                    const body = `Dear ${selectedEmailNotice.studentName},

Greetings from Ansh Tutor!

This is an official administrative notice regarding your admission and enrollment in "${selectedEmailNotice.batchTitle}" under the 7-Day Pay Later scheme (Reference ID: ${selectedEmailNotice.orderId}).

As per Ansh Tutor's enrollment policy, you were granted immediate, unrestricted access to all live classes, recorded lectures, daily practice problems (DPPs), and test series upon opting for Pay Later on ${selectedEmailNotice.orderDate}.

Your 7-day fee clearance window is scheduled to conclude on:
>> Final Due Date: ${selectedEmailNotice.dueDate}
>> Pending Course Fee: ₹${selectedEmailNotice.amount}

Please ensure your course fee is settled prior to the due date. In accordance with academic guidelines, accounts with outstanding dues beyond the 7-day grace period will be subject to temporary batch access suspension until payment verification is completed.

Payment Modes Available:
1. UPI QR / Official UPI ID
2. Online Net Banking / Cards
(For any payment assistance or account verification, please reach out to our accounts desk).

Official Support & Accounts Desk:
• WhatsApp / Helpline: +91 75250 09428
• Official Email: support@anshtutor.gleeze.com
• Website: https://anshtutor.gleeze.com

Warm regards,
Academic Administration & Student Accounts
Ansh Tutor`;
                    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
                    showToast("Complete notice copied to clipboard!");
                  }}
                  className="px-4 py-2 bg-white border border-[#D1D5DB] hover:bg-gray-50 text-gray-800 font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <Copy className="w-3.5 h-3.5 text-[#5A4BDA]" />
                  <span>Copy Notice Text</span>
                </button>

                <a
                  href={`mailto:${selectedEmailNotice.email}?subject=${encodeURIComponent(
                    `Urgent: 7-Day Fee Payment Clearance Notice for ${selectedEmailNotice.batchTitle} - Ansh Tutor`
                  )}&body=${encodeURIComponent(
                    `Dear ${selectedEmailNotice.studentName},\n\nGreetings from Ansh Tutor!\n\nThis is an official administrative notice regarding your admission and enrollment in "${selectedEmailNotice.batchTitle}" under the 7-Day Pay Later scheme (Reference ID: ${selectedEmailNotice.orderId}).\n\nAs per Ansh Tutor's enrollment policy, you were granted immediate, unrestricted access to all live classes, recorded lectures, daily practice problems (DPPs), and test series upon opting for Pay Later on ${selectedEmailNotice.orderDate}.\n\nYour 7-day fee clearance window is scheduled to conclude on:\n>> Final Due Date: ${selectedEmailNotice.dueDate}\n>> Pending Course Fee: ₹${selectedEmailNotice.amount}\n\nPlease ensure your course fee is settled prior to the due date. In accordance with academic guidelines, accounts with outstanding dues beyond the 7-day grace period will be subject to temporary batch access suspension until payment verification is completed.\n\nPayment Modes Available:\n1. UPI QR / Official UPI ID\n2. Online Net Banking / Cards\n\nOfficial Support & Accounts Desk:\n• WhatsApp / Helpline: +91 75250 09428\n• Official Email: support@anshtutor.gleeze.com\n• Website: https://anshtutor.gleeze.com\n\nWarm regards,\nAcademic Administration & Student Accounts\nAnsh Tutor`
                  )}`}
                  className="px-5 py-2 bg-[#5A4BDA] hover:bg-[#4939C8] text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm font-semibold text-gray-600">
          Loading Admin Portal...
        </div>
      }
    >
      <AdminPortalContent />
    </Suspense>
  );
}
