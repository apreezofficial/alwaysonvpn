"use client";

import React, { useState } from "react";
import { Radio, EyeOff, Feather, Lock, Cpu, Server, ChevronDown, ChevronRight } from "lucide-react";

export default function PerksSection() {
  const [open, setOpen] = useState(false);
  const [selectedPerk, setSelectedPerk] = useState<number | null>(null);

  const perks = [
    {
      title: "Always-On Kernel Daemon",
      subtitle: "Unkillable System Service",
      description:
        "Hooks directly into Android's native VpnService with an unkillable foreground watchdog. Seamless Wi-Fi to cellular transitions with 0ms leak.",
      icon: Radio,
    },
    {
      title: "Zero Location Slips",
      subtitle: "Hardware-Level DNS Lock",
      description:
        "Commercial VPNs leak your real location during handshakes. We enforce strict hardware-level DNS redirection and WebRTC spoofing. Your true coordinates never slip.",
      icon: EyeOff,
    },
    {
      title: "6.4 MB Featherweight APK",
      subtitle: "Pure Native Rust Engine",
      description:
        "Zero tracking SDKs. Zero advertising bloat. Zero webviews. Pure, optimized native Rust binary built to load instantly.",
      icon: Feather,
    },
    {
      title: "Stealth Obfuscation",
      subtitle: "TLS 1.3 Camouflage",
      description:
        "Cloaks VPN packets as standard HTTPS TLS 1.3 traffic. Flies cleanly under the radar of university, public Wi-Fi, and ISP firewalls.",
      icon: Lock,
    },
    {
      title: "Sub-1% Daily Battery Draw",
      subtitle: "Zero Wakelock Architecture",
      description:
        "Zero-copy asynchronous networking avoids waking up the CPU when idle. Leave it enabled 24/7 without battery anxiety.",
      icon: Cpu,
    },
    {
      title: "Diskless RAM-Only Gateways",
      subtitle: "Cryptographic Zero-Retention",
      description:
        "Every gateway runs purely in volatile RAM without persistent storage. Zero connection histories or logs can physically exist.",
      icon: Server,
    },
  ];

  return (
    <section id="perks" className="relative border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 sm:px-12">

        {/* Clickable Section Title */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between py-10 text-left group"
        >
          <div>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Core Engineering</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-gray-200 transition-colors">
              Built to stay on. Forever.
            </h2>
          </div>
          <ChevronDown
            className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-6 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Collapsible Content */}
        {open && (
          <div className="pb-20 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-base text-gray-400 font-light mb-10 -mt-4 max-w-xl">
              Every feature is designed around one goal: keeping your device completely protected without friction or battery drain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perks.map((perk, idx) => {
                const IconComponent = perk.icon;
                const isSelected = selectedPerk === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedPerk(isSelected ? null : idx)}
                    className={`cursor-pointer rounded-2xl border p-8 flex flex-col justify-between transition-all duration-200 select-none ${
                      isSelected
                        ? "bg-white/[0.07] border-white/40 shadow-xl shadow-black/50 scale-[1.02]"
                        : "bg-[#0c0e14]/90 border-white/[0.08] hover:border-white/20 hover:bg-[#0e111a]"
                    }`}
                  >
                    <div>
                      <div className="mb-6 flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                          <IconComponent className="w-8 h-8 text-white" strokeWidth={1.75} />
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">0{idx + 1}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">{perk.title}</h3>
                      <p className="text-xs font-mono text-gray-400 mb-3">{perk.subtitle}</p>
                      <p className="text-sm text-gray-300 font-light leading-relaxed">{perk.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-gray-400">
                      <span>{isSelected ? "Active Focus" : "Inspect"}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "rotate-90 text-white" : ""}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
