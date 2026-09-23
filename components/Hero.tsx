"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenWaitlist: () => void;
}

export default function Hero({ onOpenWaitlist }: HeroProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center px-6 sm:px-12 pt-28 pb-16">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Minimalist Launch Notice */}
        <p className="text-xs sm:text-sm font-mono text-gray-400 tracking-widest uppercase mb-6">
          Android APK &bull; Launching in 2 days
        </p>

        {/* 2-Line Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.15]">
          You must have used other VPNs.<br />
          But this, this... is different.
        </h1>

        {/* Subtext */}
        <p className="mt-8 text-xl sm:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
          It&apos;s always on. Your real location never slips.
        </p>

        <p className="mt-3 text-sm sm:text-base text-gray-400 font-light max-w-xl">
          An ultra-fast, lightweight APK built to stay locked to your Android device from the second it connects to the internet. No background disconnects. No micro-leaks.
        </p>

        {/* Clean, Non-Generic Inline Action */}
        <div className="mt-10 max-w-md">
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/[0.05] border border-white/[0.12] focus:border-white px-4 py-3.5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors font-mono"
              />
              <button
                type="submit"
                className="px-5 py-3.5 bg-white text-black font-medium text-sm rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <span>Get APK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm text-gray-200 font-mono">
              ✓ You&apos;re on the list. We&apos;ll send the APK link in 2 days.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
