"use client";

import React from "react";
import { Radio, EyeOff, Feather, Lock, Cpu, Server } from "lucide-react";

export default function PerksSection() {
  const perks = [
    {
      title: "Always-On Kernel Daemon",
      description:
        "Hooks directly into Android's native VpnService with an unkillable foreground watchdog. Seamless Wi-Fi to cellular transitions with 0ms leak.",
      icon: Radio,
    },
    {
      title: "Zero Location Slips",
      description:
        "Commercial VPNs leak your real location during handshakes. We enforce strict hardware-level DNS redirection and WebRTC spoofing. Your true coordinates never slip.",
      icon: EyeOff,
    },
    {
      title: "6.4 MB Featherweight APK",
      description:
        "Zero tracking SDKs. Zero advertising bloat. Zero webviews. Pure, optimized native Rust binary built to load instantly.",
      icon: Feather,
    },
    {
      title: "Stealth Obfuscation",
      description:
        "Cloaks VPN packets as standard HTTPS TLS 1.3 traffic. Flies cleanly under the radar of university, public Wi-Fi, and ISP firewalls.",
      icon: Lock,
    },
    {
      title: "Sub-1% Daily Battery Draw",
      description:
        "Zero-copy asynchronous networking avoids waking up the CPU when idle. Leave it enabled 24/7 without battery anxiety.",
      icon: Cpu,
    },
    {
      title: "Diskless RAM-Only Gateways",
      description:
        "Every gateway runs purely in volatile RAM without persistent storage. Zero connection histories or logs can physically exist.",
      icon: Server,
    },
  ];

  return (
    <section id="perks" className="relative py-28 px-6 sm:px-12 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="max-w-xl mb-16">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
            Core Engineering
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Built to stay on. Forever.
          </h2>
          <p className="mt-3 text-base text-gray-400 font-light">
            Every feature is designed around one goal: keeping your device completely protected without friction or battery drain.
          </p>
        </div>

        {/* Perks Grid with Huge Icons & Clean Minimalist Cards (No Gradients) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, idx) => {
            const IconComponent = perk.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0c0e14]/90 border border-white/[0.08] p-8 flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  {/* Huge Minimalist Icon */}
                  <div className="mb-8 text-white">
                    <IconComponent className="w-14 h-14 text-white" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2.5">
                    {perk.title}
                  </h3>

                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
