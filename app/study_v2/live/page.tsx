"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
  Check,
  MessageSquare,
  BarChart3,
  Send,
  Smile,
  Users,
  Flame,
  ThumbsUp,
  Heart,
  HelpCircle,
  Radio,
  Clock,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: string;
  avatarColor: string;
  text: string;
  time: string;
  isTeacher?: boolean;
}

interface PollOption {
  key: string;
  text: string;
  votes: number;
}

function LiveClassContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const lectureTitle =
    searchParams.get("title") ||
    "Physical Instruments: Vernier Calipers, Multimeter & Measuring Devices";
  const facultyName = searchParams.get("faculty") || "Rajwant Singh Sir";
  const subjectName = searchParams.get("subject") || "Physics";

  const containerRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Player States
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Side Panel Tab: 'chat' | 'poll'
  const [sideTab, setSideTab] = useState<"chat" | "poll">("chat");

  // Chat States
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "Ansh Tutor System",
      avatarColor: "bg-[#5A4BDA]",
      text: "Welcome to Live Class! Keep the chat polite & focused on concepts.",
      time: "8:55 PM",
      isTeacher: true,
    },
    {
      id: "2",
      sender: "Priya Sharma",
      avatarColor: "bg-emerald-600",
      text: "Good evening Sir! Excited for Vernier Calipers numericals today.",
      time: "8:56 PM",
    },
    {
      id: "3",
      sender: "Aman Gupta",
      avatarColor: "bg-purple-600",
      text: "Audio & video crystal clear sir 👍",
      time: "8:57 PM",
    },
    {
      id: "4",
      sender: "Rohan Verma",
      avatarColor: "bg-amber-600",
      text: "Sir, what is the zero error formula when positive?",
      time: "8:58 PM",
    },
    {
      id: "5",
      sender: "Rajwant Singh Sir",
      avatarColor: "bg-red-600",
      text: "Correct reading = Observed reading - (Zero Error). We will solve 5 PYQs now!",
      time: "8:59 PM",
      isTeacher: true,
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");

  // Poll States
  const [selectedPollOption, setSelectedPollOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [pollTimer, setPollTimer] = useState(38);

  const [pollOptions, setPollOptions] = useState<PollOption[]>([
    { key: "A", text: "Moving Coil Galvanometer", votes: 84 },
    { key: "B", text: "Potentiometer (Null Deflection)", votes: 612 },
    { key: "C", text: "Digital Voltmeter", votes: 142 },
    { key: "D", text: "Simple Hot Wire Meter", votes: 38 },
  ]);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sideTab]);

  // Poll countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setPollTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleRewind10 = () => {
    // live stream rewind buffer
  };

  const handleForward10 = () => {
    // live stream catch-up
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "You",
      avatarColor: "bg-[#5A4BDA]",
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMsg("");
  };

  const handleSendQuickReaction = (emoji: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "You",
      avatarColor: "bg-[#5A4BDA]",
      text: emoji,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleVote = (key: string) => {
    if (hasVoted) return;
    setSelectedPollOption(key);
    setHasVoted(true);
    setPollOptions((prev) =>
      prev.map((opt) => (opt.key === key ? { ...opt, votes: opt.votes + 1 } : opt))
    );
  };

  const totalVotes = pollOptions.reduce((acc, opt) => acc + opt.votes, 0);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Mouse activity auto-hide controls on player
  const handleMouseMove = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !speedMenuOpen) {
        setControlsVisible(false);
      }
    }, 4000);
  };

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-[#0A0D14] text-white overflow-hidden select-none font-sans flex flex-col lg:flex-row"
    >
      {/* ======================================================== */}
      {/* 1. LEFT / CENTER: RECORDED-STYLE LIVE STREAM PLAYER       */}
      {/* ======================================================== */}
      <div
        onMouseMove={handleMouseMove}
        className="flex-1 h-full relative flex flex-col justify-between overflow-hidden bg-[#111827]"
      >
        {/* Top Overlay Bar */}
        <div
          className={`absolute top-0 left-0 right-0 p-4 sm:p-5 flex items-center justify-between z-30 bg-gradient-to-b from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
            controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Back Arrow Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/study_v2/study")}
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              title="Leave Live Class"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Live Indicator Badge */}
            <div className="flex items-center gap-2 px-3 py-1 bg-red-600/90 text-white rounded-full text-xs font-extrabold tracking-wider uppercase shadow-md">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>LIVE</span>
            </div>

            {/* Live Viewers Count */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-black/40 text-gray-200 border border-white/10 rounded-full text-xs font-semibold backdrop-blur-xs">
              <Users className="w-3.5 h-3.5 text-red-400" />
              <span>1,428 Watching</span>
            </div>
          </div>

          {/* Title & Subject */}
          <div className="text-right max-w-md min-w-0">
            <span className="text-[11px] text-gray-300 font-medium block">
              {subjectName} • {facultyName}
            </span>
            <h2 className="text-xs sm:text-sm font-bold text-white truncate">
              {lectureTitle}
            </h2>
          </div>
        </div>

        {/* Video Canvas / Smart Board Slide (Matching Screenshot Design) */}
        <div
          onClick={handlePlayPause}
          className="relative w-full h-full flex items-center justify-center bg-[#E5E7EB] cursor-pointer overflow-hidden"
        >
          {/* 4K Smart Board Lecture Slide */}
          <div className="relative w-full max-w-4xl h-full max-h-[82vh] flex flex-col items-center justify-center px-6">
            {/* Top Inverted Ruler graphic */}
            <div className="absolute top-8 w-72 sm:w-96 h-12 bg-[#F3F4F6] border border-gray-400 rounded-sm shadow-md flex flex-col justify-end px-3 pb-1 select-none pointer-events-none">
              <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
              </div>
              <div className="flex justify-between items-end h-4 w-full">
                {Array.from({ length: 31 }).map((_, i) => (
                  <div
                    key={i}
                    className={`bg-gray-700 ${
                      i % 5 === 0 ? "h-3.5 w-[1.5px]" : "h-2 w-[1px]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Main Title Typography */}
            <div className="text-center my-auto z-10 select-none">
              <div className="inline-block px-3 py-1 bg-[#5A4BDA] text-white text-[10px] sm:text-xs font-extrabold uppercase rounded-full mb-3 tracking-widest">
                CLASS 8 &amp; FOUNDATION • LIVE MASTERCLASS
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#111827] tracking-tight uppercase leading-[0.95]">
                PHYSICAL<br />INSTRUMENT
              </h1>
            </div>

            {/* Left Digital Multimeter Graphic */}
            <div className="absolute left-4 sm:left-10 bottom-20 w-32 sm:w-44 h-44 sm:h-56 bg-[#FACC15] border-4 border-gray-900 rounded-3xl shadow-2xl p-3 sm:p-4 flex flex-col justify-between select-none pointer-events-none">
              <div className="h-9 bg-gray-900 rounded-lg border-2 border-gray-700 flex items-center justify-end px-3">
                <span className="font-mono text-emerald-400 font-bold text-base sm:text-lg">
                  230.4 V
                </span>
              </div>
              <div className="w-14 h-14 rounded-full bg-gray-900 border-4 border-gray-700 mx-auto flex items-center justify-center">
                <div className="w-2 h-7 bg-red-500 rounded-full" />
              </div>
              <div className="flex justify-around pt-1">
                <div className="w-3.5 h-3.5 rounded-full bg-red-600 border border-black" />
                <div className="w-3.5 h-3.5 rounded-full bg-black border border-gray-700" />
              </div>
            </div>

            {/* Right Weighing Machine Graphic */}
            <div className="absolute right-4 sm:right-10 bottom-20 w-32 sm:w-44 h-44 sm:h-56 bg-[#0E7490] border-4 border-gray-900 rounded-3xl shadow-2xl p-3 sm:p-4 flex flex-col items-center justify-between select-none pointer-events-none">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center relative mt-1">
                <div className="w-1 h-9 bg-red-600 rounded-full origin-bottom rotate-45" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-900 absolute" />
              </div>
              <div className="w-full h-7 bg-[#FDE047] border-2 border-yellow-600 rounded-md flex items-center justify-around text-[8px] sm:text-[9px] font-mono text-gray-800 font-bold">
                <span>| 12</span>
                <span>| 13</span>
                <span>| 14</span>
              </div>
            </div>
          </div>

          {/* Pause overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-black/70 border border-white/30 text-white flex items-center justify-center shadow-2xl backdrop-blur-xs">
                <Play className="w-10 h-10 fill-current ml-1.5" />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-30 px-4 sm:px-6 pb-4 pt-10 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${
            controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Live Progress Bar with Red Line */}
          <div className="w-full h-1.5 bg-gray-700/80 rounded-full mb-3 relative overflow-hidden">
            <div className="h-full bg-red-600 rounded-full w-full" />
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Left Controls: Play/Pause, Rewind, Forward, Volume */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={handlePlayPause}
                className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer text-white"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={handleRewind10}
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer relative"
                title="Rewind 10s"
              >
                <RotateCcw className="w-4 h-4 stroke-[2.2]" />
                <span className="text-[8px] font-bold absolute -bottom-1">10</span>
              </button>

              <button
                onClick={handleForward10}
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer relative"
                title="Forward 10s"
              >
                <RotateCw className="w-4 h-4 stroke-[2.2]" />
                <span className="text-[8px] font-bold absolute -bottom-1">10</span>
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 group">
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white"
                  title="Volume"
                />
              </div>

              {/* Live Badge & Stream Timer */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-300 ml-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400">LIVE</span>
                <span>• 01:24:18</span>
              </div>
            </div>

            {/* Right Controls: Speed Settings, Fullscreen */}
            <div className="flex items-center gap-2 sm:gap-3 relative">
              {/* Settings / Speed Menu */}
              <div className="relative">
                <button
                  onClick={() => setSpeedMenuOpen(!speedMenuOpen)}
                  className={`w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer ${
                    speedMenuOpen ? "bg-white/20 text-white" : "text-gray-300"
                  }`}
                  title="Playback Speed"
                >
                  <Settings className="w-4 h-4" />
                </button>

                {speedMenuOpen && (
                  <div className="absolute right-0 bottom-12 w-44 bg-[#1E293B] border border-gray-700 rounded-xl p-2 shadow-2xl z-40 text-xs animate-in fade-in">
                    <div className="px-3 py-1.5 text-gray-400 font-bold uppercase tracking-wider text-[10px] border-b border-gray-700/60 mb-1">
                      Playback Speed
                    </div>
                    {speedOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setPlaybackSpeed(s);
                          setSpeedMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                          playbackSpeed === s
                            ? "bg-[#5A4BDA] text-white font-bold"
                            : "text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <span>{s === 1 ? "Normal" : `${s}x`}</span>
                        {playbackSpeed === s && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4" />
                ) : (
                  <Maximize className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. RIGHT SIDE PANEL: CHAT & POLL SECTIONS                */}
      {/* ======================================================== */}
      <div className="w-full lg:w-80 xl:w-96 h-64 lg:h-full bg-[#111827] border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col shrink-0">
        {/* Top 2 Sections Header: Chat & Poll with Relevant Icons */}
        <div className="grid grid-cols-2 border-b border-gray-800 bg-[#0F172A] shrink-0">
          {/* Tab 1: Chat */}
          <button
            onClick={() => setSideTab("chat")}
            className={`py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              sideTab === "chat"
                ? "bg-[#1E293B] text-white border-b-2 border-[#5A4BDA] shadow-xs"
                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#5A4BDA]" />
            <span>Chat</span>
          </button>

          {/* Tab 2: Poll */}
          <button
            onClick={() => setSideTab("poll")}
            className={`py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all cursor-pointer relative ${
              sideTab === "poll"
                ? "bg-[#1E293B] text-white border-b-2 border-[#5A4BDA] shadow-xs"
                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Poll</span>
            {/* Live Poll Active Notification Pill */}
            {pollTimer > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </button>
        </div>

        {/* ===================== TAB 1: LIVE CHAT ===================== */}
        {sideTab === "chat" && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden min-h-0">
            {/* Sub-header info */}
            <div className="px-4 py-2 bg-[#0B0F17] border-b border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Chat Active
              </span>
              <span>Slow mode: 3s</span>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 scrollbar-thin scrollbar-thumb-gray-700">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 text-xs ${
                    msg.sender === "You" ? "opacity-95" : ""
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full ${msg.avatarColor} text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5`}
                  >
                    {msg.sender.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`font-bold truncate ${
                          msg.isTeacher
                            ? "text-red-400"
                            : msg.sender === "You"
                            ? "text-[#A5B4FC]"
                            : "text-gray-300"
                        }`}
                      >
                        {msg.sender}
                      </span>
                      {msg.isTeacher && (
                        <span className="px-1.5 py-0.2 bg-red-950 text-red-300 border border-red-800 text-[9px] rounded font-bold uppercase">
                          Faculty
                        </span>
                      )}
                      <span className="text-[10px] text-gray-500 ml-auto shrink-0">
                        {msg.time}
                      </span>
                    </div>

                    <p className="text-gray-200 mt-0.5 break-words leading-relaxed text-[12px]">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Emoji Reactions */}
            <div className="px-3 py-1.5 bg-[#0F172A] border-t border-gray-800/80 flex items-center gap-2 justify-around shrink-0">
              {["🔥", "👍", "❤️", "👏", "⚡"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleSendQuickReaction(emoji)}
                  className="px-2 py-0.5 hover:bg-white/10 rounded-lg text-sm transition-transform active:scale-125 cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Chat Input Field */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-[#0B0F17] border-t border-gray-800 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask teacher or chat..."
                className="flex-1 bg-[#1E293B] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-gray-500 outline-none focus:border-[#5A4BDA] transition-colors"
              />

              <button
                type="submit"
                disabled={!inputMsg.trim()}
                className="w-8 h-8 rounded-xl bg-[#5A4BDA] hover:bg-[#4939C8] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors shrink-0 cursor-pointer shadow-sm"
                title="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* ===================== TAB 2: LIVE POLL ===================== */}
        {sideTab === "poll" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-5 min-h-0">
            {/* Active Poll Card */}
            <div className="bg-[#1E293B] rounded-2xl border border-gray-700/80 p-4 space-y-4 shadow-sm">
              {/* Poll Header: Timer + Live Status */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-700/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                    {pollTimer > 0 ? "Live Question" : "Poll Ended"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-300 font-mono font-bold bg-black/40 px-2.5 py-1 rounded-full border border-gray-700">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{pollTimer > 0 ? `${pollTimer}s left` : "Closed"}</span>
                </div>
              </div>

              {/* Poll Question */}
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Question #3 • Physics
                </span>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                  Which instrument is used to measure potential difference with
                  the highest accuracy without drawing any current?
                </p>
              </div>

              {/* Poll Options (Clickable before vote, shows live percentages after vote) */}
              <div className="space-y-2.5 pt-1">
                {pollOptions.map((opt) => {
                  const percentage =
                    totalVotes > 0
                      ? Math.round((opt.votes / totalVotes) * 100)
                      : 0;
                  const isSelected = selectedPollOption === opt.key;
                  const isCorrect = opt.key === "B"; // Potentiometer

                  return (
                    <button
                      key={opt.key}
                      disabled={hasVoted || pollTimer === 0}
                      onClick={() => handleVote(opt.key)}
                      className={`w-full text-left p-3 rounded-xl border transition-all relative overflow-hidden cursor-pointer ${
                        isSelected
                          ? "border-[#5A4BDA] bg-[#5A4BDA]/15"
                          : "border-gray-700 bg-black/30 hover:bg-black/50 hover:border-gray-600"
                      }`}
                    >
                      {/* Live Percentage Fill Bar if voted */}
                      {hasVoted && (
                        <div
                          className={`absolute left-0 top-0 bottom-0 opacity-20 rounded-xl transition-all duration-700 ${
                            isCorrect ? "bg-emerald-500" : "bg-[#5A4BDA]"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      )}

                      <div className="relative z-10 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                              isSelected
                                ? "bg-[#5A4BDA] text-white"
                                : "bg-gray-700 text-gray-300"
                            }`}
                          >
                            {opt.key}
                          </span>
                          <span className="text-gray-200 font-medium truncate">
                            {opt.text}
                          </span>
                        </div>

                        {hasVoted && (
                          <span
                            className={`font-bold font-mono text-xs shrink-0 ${
                              isCorrect ? "text-emerald-400" : "text-gray-300"
                            }`}
                          >
                            {percentage}%
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Poll Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-700/60 text-[11px] text-gray-400">
                <span>Total Votes: {totalVotes}</span>
                {hasVoted ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Vote Submitted
                  </span>
                ) : (
                  <span className="text-amber-400 font-semibold">
                    Select an option to vote
                  </span>
                )}
              </div>
            </div>

            {/* Past Polls Summary Card */}
            <div className="bg-[#1E293B]/60 rounded-xl border border-gray-800 p-3 space-y-2">
              <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                Previous Polls from this Class
              </span>
              <div className="text-xs text-gray-300 flex items-center justify-between py-1 border-b border-gray-800">
                <span>Q1: Least Count of Vernier Scale</span>
                <span className="text-emerald-400 font-bold">88% Correct</span>
              </div>
              <div className="text-xs text-gray-300 flex items-center justify-between py-1">
                <span>Q2: Multimeter resistance range dial</span>
                <span className="text-emerald-400 font-bold">92% Correct</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LiveClassPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0D14] flex items-center justify-center text-sm font-semibold text-white">
          Joining Live Class...
        </div>
      }
    >
      <LiveClassContent />
    </Suspense>
  );
}
