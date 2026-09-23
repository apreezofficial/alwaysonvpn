"use client";

import React, { useState } from "react";
import { X, CheckCircle, Smartphone, Mail, Download, Sparkles, Shield, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [device, setDevice] = useState("Google Pixel / Pure Android");
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Generate random Japanese-accented early access token
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    const token = `AOV-JP-${randomHex}`;
    setTicketId(token);
    setSubmitted(true);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00f0ff", "#00e699", "#ffffff", "#ff2a5f"],
      });
    } catch {
      // fallback if confetti fails
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0d0f17] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                LAUNCHING IN 2 DAYS • 48H REMAINING
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Reserve Early APK Access
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs font-jp text-gray-400">
              <span>先行配布ベータ版の登録</span>
              <span>•</span>
              <span className="text-cyan-400 font-mono">100% FREE FOR FIRST 2,000 TESTERS</span>
            </div>

            <p className="mt-4 text-sm text-gray-300 leading-relaxed font-light">
              Be the first to install the unkillable AlwaysOnVPN APK before the public launch. 
              Get direct download links for the signed .apk directly to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">
                  Your Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    placeholder="satoshi@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-mono transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">
                  Primary Android Device / ROM
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                  <select
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-mono appearance-none transition-all cursor-pointer"
                  >
                    <option value="Google Pixel / Pure Android">Google Pixel (Android 14 / 15)</option>
                    <option value="Samsung Galaxy (OneUI 6 / 7)">Samsung Galaxy (OneUI)</option>
                    <option value="Xiaomi / HyperOS">Xiaomi / Redmi (HyperOS)</option>
                    <option value="OnePlus / OxygenOS">OnePlus (OxygenOS)</option>
                    <option value="Nothing Phone">Nothing Phone (Nothing OS)</option>
                    <option value="LineageOS / GrapheneOS / CalyxOS">GrapheneOS / Custom ROM (Hardened)</option>
                    <option value="Other Android Device">Other Android Device</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Lock In Early APK (Free)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-center text-gray-500 font-mono">
                No credit card required. No spam. Instant APK delivery in 48 hours.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-jp">
                予約完了 • RESERVATION CONFIRMED
              </span>
              <h3 className="text-2xl font-bold text-white">You Are on the VIP Launch Deck</h3>
              <p className="text-sm text-gray-300 font-light">
                We have reserved an early-bird APK slot for <span className="text-cyan-300 font-mono">{email}</span>.
              </p>
            </div>

            {/* Access Pass Token */}
            <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/40 text-left font-mono space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>VIP APK PASS TOKEN</span>
                <span className="text-emerald-400">STATUS: QUEUED</span>
              </div>
              <div className="text-xl font-bold text-white tracking-widest">{ticketId}</div>
              <div className="text-[11px] text-gray-500">
                Target: {device} • WireGuard v1.0.0 APK
              </div>
            </div>

            <p className="text-xs text-gray-400 font-mono">
              The direct signed APK download link will automatically dispatch to your email as soon as the 48-hour launch timer hits 00:00:00.
            </p>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-semibold transition-colors"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
