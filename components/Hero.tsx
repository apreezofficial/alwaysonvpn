"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Zap, Lock, Smartphone, ArrowRight, Activity, Terminal } from "lucide-react";

interface HeroProps {
  onOpenWaitlist: () => void;
}

export default function Hero({ onOpenWaitlist }: HeroProps) {
  // 2 Days Countdown Timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ms: 0,
  });

  useEffect(() => {
    // 48 hours target from mount
    const targetDate = Date.now() + 48 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      const ms = Math.floor((diff % 1000) / 100);

      setTimeLeft({ days, hours, minutes, seconds, ms });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Japanese Minimalist Tag & Launch Countdown Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-gray-300 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="tracking-wide">ANDROID APK V1.0-RC</span>
            <span className="text-gray-500">•</span>
            <span className="text-cyan-400 font-jp">常時接続アーキテクチャ</span>
          </div>

          {/* 2-Day Launch Clock */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/40 to-transparent border border-cyan-500/30 text-xs font-mono text-cyan-200">
            <span className="text-cyan-400 font-bold">LAUNCHING IN 2 DAYS:</span>
            <div className="flex items-center gap-1 font-semibold text-white">
              <span className="bg-black/40 px-1.5 py-0.5 rounded border border-white/10">{String(timeLeft.days).padStart(2, "0")}d</span>
              <span>:</span>
              <span className="bg-black/40 px-1.5 py-0.5 rounded border border-white/10">{String(timeLeft.hours).padStart(2, "0")}h</span>
              <span>:</span>
              <span className="bg-black/40 px-1.5 py-0.5 rounded border border-white/10">{String(timeLeft.minutes).padStart(2, "0")}m</span>
              <span>:</span>
              <span className="bg-black/40 px-1.5 py-0.5 rounded border border-white/10 text-cyan-400">{String(timeLeft.seconds).padStart(2, "0")}s</span>
            </div>
            <span className="text-[11px] text-gray-400 font-jp hidden md:inline">2日後に公開</span>
          </div>
        </div>

        {/* Hero Headings */}
        <div className="max-w-4xl">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              You must have used other VPNs. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-gray-400">
                But this, this... is different.
              </span>
            </h1>

            {/* Japanese Sub-headline for inspiration */}
            <div className="flex items-center gap-3 text-sm md:text-base font-jp text-cyan-400/90 tracking-widest uppercase">
              <span>「他のVPNとは、決定的に違う。」</span>
              <span className="h-[1px] w-12 bg-cyan-500/30 hidden sm:block"></span>
              <span className="text-xs text-gray-500 font-mono tracking-normal">PURE ANDROID DAEMON</span>
            </div>
          </div>

          {/* Subtext */}
          <p className="mt-6 text-xl sm:text-2xl text-gray-300 font-normal leading-relaxed max-w-3xl">
            It&apos;s always on. Your real location <span className="text-cyan-400 font-semibold underline decoration-cyan-500/40 underline-offset-4">never slips</span>.
          </p>

          <p className="mt-3 text-sm sm:text-base text-gray-400 font-light max-w-2xl">
            Built from scratch to be featherweight, instant, and relentless on your Android device. 
            As long as your phone has internet, your traffic stays locked inside the cryptographic tunnel. 
            Zero drops. Zero leaks. Zero battery penalty.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenWaitlist}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_35px_rgba(0,240,255,0.3)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] hover:-translate-y-0.5 group"
            >
              <span>Get APK Early</span>
              <span className="text-xs font-jp opacity-75 font-normal">先行予約</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#architecture"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-medium text-gray-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-white/[0.25] transition-all"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>How It Works</span>
              <span className="text-xs text-gray-500 font-jp">仕組み</span>
            </a>
          </div>

          {/* Live System Stat Metrics */}
          <div className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>IP / DNS Leak Rate</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white tracking-tight flex items-baseline gap-1">
                <span>0.00%</span>
                <span className="text-xs font-jp text-emerald-400">絶対保護</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">Hardware kill-switch locked</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 uppercase">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>APK Footprint</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white tracking-tight flex items-baseline gap-1">
                <span>6.4 MB</span>
                <span className="text-xs font-jp text-cyan-400">極小設計</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">Pure native Rust engine</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 uppercase">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>Reconnect Latency</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white tracking-tight flex items-baseline gap-1">
                <span>&lt; 2 ms</span>
                <span className="text-xs font-jp text-amber-400">瞬時復帰</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">Wi-Fi to 5G zero-drop</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 uppercase">
                <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                <span>Daily Battery Use</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white tracking-tight flex items-baseline gap-1">
                <span>~0.7%</span>
                <span className="text-xs font-jp text-purple-400">超省電力</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">No wakelock wakeups</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
