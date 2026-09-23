"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, ChevronDown, Loader2 } from "lucide-react";

interface HeroProps {
  onOpenWaitlist?: () => void;
}

function useCountdown() {
  // 48 hours stored in localStorage so it persists across page reloads
  const [timeLeft, setTimeLeft] = useState({ h: 47, m: 59, s: 59 });

  useEffect(() => {
    const KEY = "aovpn_launch_target";
    let target = parseInt(localStorage.getItem(KEY) || "0", 10);
    if (!target || target < Date.now()) {
      target = Date.now() + 48 * 60 * 60 * 1000;
      localStorage.setItem(KEY, String(target));
    }

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const totalSecs = Math.floor(diff / 1000);
      setTimeLeft({
        h: Math.floor(totalSecs / 3600),
        m: Math.floor((totalSecs % 3600) / 60),
        s: totalSecs % 60,
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

function Digit({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-0.5">
        {padded.split("").map((d, i) => (
          <span
            key={i}
            className="inline-block w-7 sm:w-8 py-1 text-center text-sm sm:text-base font-mono font-bold text-white bg-white/[0.06] border border-white/[0.1] rounded-md"
          >
            {d}
          </span>
        ))}
      </div>
      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );
}

export default function Hero({ onOpenWaitlist }: HeroProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { h, m, s } = useCountdown();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError("");

    try {
      // Send as FormData / JSON to proforms endpoint
      const formData = new FormData();
      formData.append("email", email);

      const res = await fetch("https://app.proforms.top/f/apreez", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!res.ok) {
        // Try fallback JSON payload if formData wasn't accepted
        const jsonRes = await fetch("https://app.proforms.top/f/apreez", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email }),
        });
        if (!jsonRes.ok) throw new Error("Failed to submit");
      }

      setSubscribed(true);
    } catch {
      setError("Unable to submit right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 sm:px-12 pt-32 pb-20">
      <div className="max-w-6xl mx-auto w-full">

        {/* Launch Pill — live timer without 'APK' text */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-gray-300 backdrop-blur-md mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          
          {/* Live countdown in the pill */}
          <div className="flex items-center gap-1.5">
            <Digit value={h} label="hr" />
            <span className="text-gray-500 font-bold mb-3">:</span>
            <Digit value={m} label="min" />
            <span className="text-gray-500 font-bold mb-3">:</span>
            <Digit value={s} label="sec" />
          </div>
        </div>

        {/* Strict 2-Line Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold tracking-tight text-white leading-[1.08] max-w-5xl">
          <span className="block">You must have used other VPNs.</span>
          <span className="block text-gray-300 mt-1 sm:mt-2">But this, this... is different.</span>
        </h1>

        {/* Subtext */}
        <p className="mt-8 text-xl sm:text-2xl text-gray-200 font-light max-w-2xl leading-relaxed">
          It&apos;s always on. Your real location{" "}
          <span className="text-white font-medium underline decoration-white/40 underline-offset-8">
            never slips
          </span>.
        </p>

        <p className="mt-3 text-sm sm:text-base text-gray-400 font-light max-w-xl leading-relaxed">
          Built exclusively for Android. As long as your phone is connected to the internet, 
          the tunnel holds. No background sleep drops. No micro-leaks during network transitions.
        </p>

        {/* Email Form */}
        <div className="mt-10 max-w-md">
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/[0.04] border border-white/[0.12] focus:border-white/50 px-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition-all font-mono disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 bg-white text-black font-semibold text-sm rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2 flex-shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Get APK</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className="text-xs text-rose-400 font-mono mt-1">
                  {error}
                </p>
              )}
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-sm text-gray-200 font-mono flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>You&apos;re reserved. APK link arrives when the clock hits zero.</span>
            </div>
          )}
        </div>

      </div>

      {/* Scroll-down swipe indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce pointer-events-none">
        <ChevronDown className="w-5 h-5" />
        <ChevronDown className="w-5 h-5 -mt-3 opacity-50" />
      </div>
    </section>
  );
}
