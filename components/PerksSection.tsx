"use client";

import React from "react";
import {
  ShieldAlert,
  Zap,
  EyeOff,
  Feather,
  Cpu,
  Lock,
  Radio,
  Server,
  Sparkles,
} from "lucide-react";

export default function PerksSection() {
  const perks = [
    {
      jpTag: "常時接続",
      jpMeaning: "Continuous Connection",
      title: "Android Always-On Kernel Daemon",
      description:
        "Unlike regular VPNs that die in the background when Android enters Doze mode, AlwaysOnVPN hooks directly into native VpnService with an unkillable foreground watchdog. Seamless Wi-Fi to cellular transitions with 0ms leak.",
      icon: Radio,
      badge: "CORE ENGINE",
      accent: "from-cyan-500/20 to-cyan-500/5",
      iconColor: "text-cyan-400",
      borderGlow: "group-hover:border-cyan-400/40",
    },
    {
      jpTag: "不可視",
      jpMeaning: "Absolute Invisibility",
      title: "Zero Location Slips Guarantee",
      description:
        "Commercial VPNs constantly leak your real GPS or ISP during network handshakes. We enforce strict hardware-level DNS redirection and WebRTC spoofing. Your true coordinates never slip.",
      icon: EyeOff,
      badge: "LEAKPROOF",
      accent: "from-emerald-500/20 to-emerald-500/5",
      iconColor: "text-emerald-400",
      borderGlow: "group-hover:border-emerald-400/40",
    },
    {
      jpTag: "羽毛",
      jpMeaning: "Featherweight",
      title: "6.4 MB Ultra-Compact APK",
      description:
        "Zero tracking SDKs. Zero advertising bloat. Zero useless browser extensions bundled in. Just a pure, high-performance Rust and WireGuard kernel package built to open instantly.",
      icon: Feather,
      badge: "SLIM & FAST",
      accent: "from-purple-500/20 to-purple-500/5",
      iconColor: "text-purple-400",
      borderGlow: "group-hover:border-purple-400/40",
    },
    {
      jpTag: "影",
      jpMeaning: "Shadow Stealth",
      title: "Stealth Obfuscation Mode",
      description:
        "Need to bypass hotel, airport, university, or ISP deep packet inspection? Shadow Mode cloaks VPN packets as regular HTTPS TLS 1.3 traffic. Firewalls have no idea you're on a VPN.",
      icon: Lock,
      badge: "DPI BYPASS",
      accent: "from-amber-500/20 to-amber-500/5",
      iconColor: "text-amber-400",
      borderGlow: "group-hover:border-amber-400/40",
    },
    {
      jpTag: "省電力",
      jpMeaning: "Power Conservation",
      title: "Sub-1% Daily Battery Impact",
      description:
        "Built using zero-copy asynchronous networking that avoids waking up the CPU during idle moments. Keep it enabled 24/7/365 without ever worrying about your battery percentage.",
      icon: Cpu,
      badge: "GREEN CORE",
      accent: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-400",
      borderGlow: "group-hover:border-blue-400/40",
    },
    {
      jpTag: "沈黙",
      jpMeaning: "Cryptographic Silence",
      title: "Diskless RAM-Only Gateways",
      description:
        "Every single server node runs in volatile RAM without magnetic or solid-state storage. Even with physical access, no logs, connection histories, or timestamps can physically exist.",
      icon: Server,
      badge: "RAM-ONLY",
      accent: "from-rose-500/20 to-rose-500/5",
      iconColor: "text-rose-400",
      borderGlow: "group-hover:border-rose-400/40",
    },
  ];

  return (
    <section id="perks" className="relative py-24 md:py-32 overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENGINEERED DIFFERENTLY</span>
            <span className="text-gray-500">•</span>
            <span className="font-jp text-gray-400">特徴と優位性</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Why you&apos;ll never turn it off. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Perks that make other VPNs feel obsolete.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400 font-light">
            Most Android VPNs drop in the background or siphon your battery. 
            AlwaysOnVPN was engineered to remain on your device continuously without friction.
          </p>
        </div>

        {/* Perks Grid with Huge Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {perks.map((perk, idx) => {
            const IconComponent = perk.icon;
            return (
              <div
                key={idx}
                className={`group relative rounded-3xl bg-[#0c0e15]/80 border border-white/[0.07] p-8 transition-all duration-300 hover:-translate-y-1.5 ${perk.borderGlow} hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between`}
              >
                {/* Background ambient gradient glow */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${perk.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10">
                  {/* Top Bar: Kanji Tag & Badge */}
                  <div className="flex items-center justify-between mb-8">
                    {/* Japanese Accent Tag */}
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold font-jp text-white/90 tracking-tight">
                        {perk.jpTag}
                      </span>
                      <span className="text-[11px] font-mono text-gray-500 uppercase">
                        [{perk.jpMeaning}]
                      </span>
                    </div>

                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400">
                      {perk.badge}
                    </span>
                  </div>

                  {/* HUGE ICON */}
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] group-hover:scale-105 group-hover:border-cyan-400/30 transition-all duration-300">
                    <IconComponent className={`w-14 h-14 sm:w-16 sm:h-16 ${perk.iconColor}`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {perk.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    {perk.description}
                  </p>
                </div>

                {/* Bottom decorative numbering */}
                <div className="relative z-10 mt-8 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono text-gray-500">
                  <span>SPEC-{String(idx + 1).padStart(2, "0")}</span>
                  <span className="text-cyan-400/80 group-hover:translate-x-1 transition-transform">
                    → VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
