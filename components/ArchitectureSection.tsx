"use client";

import React from "react";
import { ShieldCheck, Cpu, ArrowRight, Zap, Check, AlertTriangle, Layers } from "lucide-react";
import PhoneMockup from "./PhoneMockup";

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="relative py-24 md:py-32 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-xs font-mono text-cyan-300 mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>HOW IT NEVER SLIPS</span>
            <span className="text-gray-500">•</span>
            <span className="font-jp text-gray-400">絶対防壁の構造</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            How we eliminate the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-cyan-300 to-emerald-400">
              Microsecond Location Leak.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400 font-light">
            Every other VPN has an Achilles heel: network transitions. Here is why AlwaysOnVPN never lets your true IP or physical GPS coordinates slip.
          </p>
        </div>

        {/* 2-Column Showcase: Interactive Phone Simulator & Architecture Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Interactive Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <PhoneMockup />
          </div>

          {/* Right: Technical Explanation Steps */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Kernel Level Hook */}
            <div className="p-6 rounded-3xl bg-[#0c0e15]/80 border border-white/[0.07] hover:border-cyan-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-mono font-bold text-cyan-400">
                  01
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                      Direct Android VpnService Lock
                    </h3>
                    <span className="text-xs font-jp text-cyan-400 font-mono">核部統合</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed font-light">
                    Instead of running as a vulnerable user-space background task that Android kills when RAM gets tight, AlwaysOnVPN registers as an unkillable foreground system daemon. It is the network gateway for the entire operating system.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Instant Handover Guard */}
            <div className="p-6 rounded-3xl bg-[#0c0e15]/80 border border-white/[0.07] hover:border-emerald-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-mono font-bold text-emerald-400">
                  02
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                      Zero-Gap Network Handshake
                    </h3>
                    <span className="text-xs font-jp text-emerald-400 font-mono">瞬時遮断</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed font-light">
                    When you step out of your house and Wi-Fi switches to 5G, typical apps drop packets outside the tunnel. AlwaysOnVPN freezes raw socket dispatch at the kernel level until the WireGuard handshake resumes in less than 2 milliseconds.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Anti-Leak WebRTC & DNS Sanitizer */}
            <div className="p-6 rounded-3xl bg-[#0c0e15]/80 border border-white/[0.07] hover:border-purple-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-mono font-bold text-purple-400">
                  03
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                      Hardware-Enforced DNS & IPv6 Scrubbing
                    </h3>
                    <span className="text-xs font-jp text-purple-400 font-mono">情報完全消去</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed font-light">
                    All DNS lookups are forced through 1.1.1.1 encrypted recursive resolvers hosted inside our volatile memory nodes. WebRTC STUN requests are neutralized so malicious websites can never reveal your real residential IP.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
