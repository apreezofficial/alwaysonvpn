"use client";

import React, { useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenWaitlist?: () => void;
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
    <section className="relative min-h-[82vh] flex flex-col justify-center px-6 sm:px-12 pt-32 pb-16">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Sleek Launch Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-gray-300 backdrop-blur-md mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-widest uppercase">ANDROID APK</span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-200">LAUNCHING IN 2 DAYS</span>
        </div>

        {/* Guaranteed 2-Line Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold tracking-tight text-white leading-[1.08] max-w-5xl">
          <span className="block whitespace-normal sm:whitespace-nowrap">
            You must have used other VPNs.
          </span>
          <span className="block whitespace-normal sm:whitespace-nowrap text-gray-300 mt-1 sm:mt-2">
            But this, this... is different.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-8 text-xl sm:text-2xl text-gray-200 font-light max-w-2xl leading-relaxed">
          It&apos;s always on. Your real location <span className="text-white font-medium underline decoration-white/40 underline-offset-8">never slips</span>.
        </p>

        <p className="mt-3 text-sm sm:text-base text-gray-400 font-light max-w-xl leading-relaxed">
          Built exclusively for Android. As long as your phone is connected to the internet, 
          the tunnel holds. No background sleep drops. No micro-leaks during network transitions.
        </p>

        {/* Sleek Action Form */}
        <div className="mt-10 max-w-md">
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/[0.04] border border-white/[0.12] focus:border-white/50 px-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition-all font-mono"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-white text-black font-semibold text-sm rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2 flex-shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
              >
                <span>Get APK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-sm text-gray-200 font-mono flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>You&apos;re reserved. Early APK link arrives in 48 hours.</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
