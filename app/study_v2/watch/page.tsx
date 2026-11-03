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
} from "lucide-react";

function WatchPlayerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const lectureTitle = searchParams.get("title") || "Recorded Lecture Session";
  const subjectName = searchParams.get("subject") || "General";
  const returnUrl = searchParams.get("returnUrl") || "/study_v2/study/my-batches";

  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(14); // seconds
  const duration = 22186; // 6h:09m:46s (22186 seconds)
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev < duration ? prev + playbackSpeed : prev));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, duration]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Format time (HH:MM:SS or MM:SS)
  const formatTime = (secs: number) => {
    const totalSecs = Math.floor(secs);
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    if (h > 0) {
      return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleRewind10 = () => {
    setCurrentTime((prev) => Math.max(0, prev - 10));
  };

  const handleForward10 = () => {
    setCurrentTime((prev) => Math.min(duration, prev + 10));
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Mouse activity auto-hide controls
  const handleMouseMove = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !speedMenuOpen) {
        setControlsVisible(false);
      }
    }, 3500);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-screen h-screen bg-[#0A0D14] text-white overflow-hidden select-none font-sans flex items-center justify-center cursor-default"
    >
      {/* 1. TOP OVERLAY HEADER: Back Arrow Only */}
      <div
        className={`absolute top-0 left-0 right-0 p-5 sm:p-7 flex items-center justify-between z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => router.push(returnUrl)}
          className="w-10 h-10 rounded-full hover:bg-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
          title="Back"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        <div className="text-right">
          <span className="text-xs text-gray-400 font-medium">{subjectName}</span>
          <h2 className="text-sm sm:text-base font-bold text-gray-200 line-clamp-1">
            {lectureTitle}
          </h2>
        </div>
      </div>

      {/* 2. VIDEO CANVAS / SLIDE (Matching screenshot media_1793626523461_c2189374.png) */}
      <div
        onClick={handlePlayPause}
        className="relative w-full h-full flex items-center justify-center bg-[#E5E7EB] cursor-pointer"
      >
        {/* Lecture Slide Illustration Graphic */}
        <div className="relative w-full max-w-5xl h-full max-h-[82vh] flex flex-col items-center justify-center px-6">
          {/* Top Inverted Ruler graphic */}
          <div className="absolute top-8 w-80 sm:w-96 h-12 bg-[#F3F4F6] border border-gray-400 rounded-sm shadow-md flex flex-col justify-end px-3 pb-1 select-none pointer-events-none">
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
          <div className="text-center my-auto z-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#111827] tracking-tight uppercase leading-[0.95]">
              PHYSICAL<br />INSTRUMENT
            </h1>
          </div>

          {/* Left Digital Multimeter Graphic */}
          <div className="absolute left-6 sm:left-12 bottom-20 w-36 sm:w-48 h-48 sm:h-60 bg-[#FACC15] border-4 border-gray-900 rounded-3xl shadow-2xl p-4 flex flex-col justify-between select-none pointer-events-none">
            {/* Screen */}
            <div className="h-10 bg-gray-900 rounded-lg border-2 border-gray-700 flex items-center justify-end px-3">
              <span className="font-mono text-emerald-400 font-bold text-lg">0.00</span>
            </div>
            {/* Rotary Dial */}
            <div className="w-16 h-16 rounded-full bg-gray-900 border-4 border-gray-700 mx-auto flex items-center justify-center">
              <div className="w-2 h-8 bg-red-500 rounded-full" />
            </div>
            {/* Ports */}
            <div className="flex justify-around pt-2">
              <div className="w-4 h-4 rounded-full bg-red-600 border border-black" />
              <div className="w-4 h-4 rounded-full bg-black border border-gray-700" />
            </div>
          </div>

          {/* Right Weighing Machine Graphic */}
          <div className="absolute right-6 sm:right-12 bottom-20 w-36 sm:w-48 h-48 sm:h-60 bg-[#0E7490] border-4 border-gray-900 rounded-3xl shadow-2xl p-4 flex flex-col items-center justify-between select-none pointer-events-none">
            {/* Round Gauge */}
            <div className="w-24 h-24 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center relative mt-2">
              <div className="w-1 h-10 bg-red-600 rounded-full origin-bottom rotate-45" />
              <div className="w-3 h-3 rounded-full bg-gray-900 absolute" />
            </div>
            {/* Wrapped Measuring Tape */}
            <div className="w-full h-8 bg-[#FDE047] border-2 border-yellow-600 rounded-md flex items-center justify-around text-[9px] font-mono text-gray-800 font-bold">
              <span>| 12</span>
              <span>| 13</span>
              <span>| 14</span>
              <span>| 15</span>
            </div>
          </div>
        </div>

        {/* Big Center Play Indicator when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/35 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-black/70 border border-white/30 text-white flex items-center justify-center shadow-2xl backdrop-blur-xs">
              <Play className="w-10 h-10 fill-current ml-1.5" />
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM CONTROL BAR (Screenshot exact layout & features) */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 px-5 sm:px-8 pb-5 pt-12 bg-gradient-to-t from-black via-black/75 to-transparent transition-opacity duration-300 ${
          controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress Timeline Scrubber */}
        <div className="relative group/timeline w-full mb-3 flex items-center">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/25 rounded-full appearance-none cursor-pointer accent-[#0084FF] focus:outline-none"
          />
        </div>

        {/* Control Buttons Row */}
        <div className="flex items-center justify-between">
          {/* Left Controls: Play/Pause, Rewind 10, Forward 10, Volume, Time */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              className="p-1 text-white hover:text-[#0084FF] transition-colors cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current" />
              )}
            </button>

            {/* Rewind 10s */}
            <button
              onClick={handleRewind10}
              className="relative p-1 text-white hover:text-[#0084FF] transition-colors cursor-pointer flex items-center justify-center"
              title="Rewind 10s"
            >
              <RotateCcw className="w-6 h-6 stroke-[2]" />
              <span className="absolute text-[8px] font-bold font-mono">10</span>
            </button>

            {/* Forward 10s */}
            <button
              onClick={handleForward10}
              className="relative p-1 text-white hover:text-[#0084FF] transition-colors cursor-pointer flex items-center justify-center"
              title="Forward 10s"
            >
              <RotateCw className="w-6 h-6 stroke-[2]" />
              <span className="absolute text-[8px] font-bold font-mono">10</span>
            </button>

            {/* Volume with hover slider */}
            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={toggleMute}
                className="p-1 text-white hover:text-[#0084FF] transition-colors cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-white"
              />
            </div>

            {/* Time Stamp */}
            <div className="text-xs sm:text-sm font-mono text-gray-300 font-medium pl-1">
              <span>{formatTime(currentTime)}</span>
              <span className="text-gray-500 mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Controls: STRICTLY ONLY Settings (Playback Speed) & Fullscreen */}
          <div className="flex items-center gap-3 relative">
            {/* Settings (Speed Menu Only) */}
            <div className="relative">
              <button
                onClick={() => setSpeedMenuOpen(!speedMenuOpen)}
                className={`p-1 text-white hover:text-[#0084FF] transition-colors cursor-pointer ${
                  speedMenuOpen ? "text-[#0084FF]" : ""
                }`}
                title="Playback Speed"
              >
                <Settings className="w-6 h-6 stroke-[2]" />
              </button>

              {/* Speed Dropdown Menu */}
              {speedMenuOpen && (
                <div className="absolute right-0 bottom-10 w-44 bg-[#181C24] border border-gray-700 rounded-xl shadow-2xl py-2 z-50 text-xs font-semibold">
                  <div className="px-3 py-1.5 text-gray-400 font-bold uppercase tracking-wider text-[10px] border-b border-gray-800">
                    Playback Speed
                  </div>
                  {speedOptions.map((spd) => (
                    <button
                      key={spd}
                      onClick={() => {
                        setPlaybackSpeed(spd);
                        setSpeedMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-white/10 flex items-center justify-between transition-colors text-gray-200"
                    >
                      <span>{spd === 1 ? "1.0x (Normal)" : `${spd}x`}</span>
                      {playbackSpeed === spd && (
                        <Check className="w-3.5 h-3.5 text-[#0084FF] stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-1 text-white hover:text-[#0084FF] transition-colors cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="w-6 h-6 stroke-[2]" />
              ) : (
                <Maximize className="w-6 h-6 stroke-[2]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WatchPlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-black flex items-center justify-center text-white text-sm font-semibold">
          Loading Video Player...
        </div>
      }
    >
      <WatchPlayerContent />
    </Suspense>
  );
}
