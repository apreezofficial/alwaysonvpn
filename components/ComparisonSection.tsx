"use client";

import React from "react";
import { Check, X, ShieldAlert, ShieldCheck } from "lucide-react";

export default function ComparisonSection() {
  const comparisons = [
    {
      feature: "Connection Continuity (Always-On)",
      standard: "Drops silently when Android sleeps or enters battery saver",
      alwayson: "Locks kernel socket, zero drops, persistent unkillable service",
    },
    {
      feature: "Wi-Fi to Cellular Handover",
      standard: "Leakes real IP for 200–800ms during network switch",
      alwayson: "0.00ms packet leak, instant sub-2ms handshake",
    },
    {
      feature: "APK Download Size",
      standard: "65 MB to 120 MB (bloated with tracking SDKs & webviews)",
      alwayson: "6.4 MB (featherweight pure native Rust binary)",
    },
    {
      feature: "24-Hour Battery Consumption",
      standard: "8% to 16% daily battery drain from constant wakelocks",
      alwayson: "Less than 0.8% daily drain with async epoll loops",
    },
    {
      feature: "Strict Firewall & DPI Bypass",
      standard: "Easily identified and throttled by deep packet inspection",
      alwayson: "Shadow Mode cloaks traffic as standard HTTPS TLS 1.3",
    },
    {
      feature: "Logging & Volatile Storage",
      standard: "Disk logging of timestamps and metadata on servers",
      alwayson: "100% diskless RAM nodes, cryptographically zero-log",
    },
  ];

  return (
    <section id="comparison" className="relative py-24 md:py-32 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-cyan-300 mb-4">
            <span>SIDE-BY-SIDE MATRIX</span>
            <span className="text-gray-500">•</span>
            <span className="font-jp text-gray-400">他社比較</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            &ldquo;You must have used other VPNs...&rdquo; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-cyan-400">
              Here is why this is different.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400 font-light">
            We stripped out the corporate bloatware and solved the flaws that plague commercial Android VPN apps.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="overflow-x-auto">
          <div className="min-w-[640px] rounded-3xl bg-[#0c0e15]/90 border border-white/[0.08] overflow-hidden">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 border-b border-white/[0.08] p-5 text-sm font-mono uppercase tracking-wider">
              <div className="col-span-4 text-gray-400">Core Metric</div>
              <div className="col-span-4 text-red-400/90 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>Other Commercial VPNs</span>
              </div>
              <div className="col-span-4 text-cyan-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>AlwaysOnVPN (常時接続)</span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/[0.05]">
              {comparisons.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 p-5 text-sm hover:bg-white/[0.02] transition-colors items-center">
                  <div className="col-span-4 font-semibold text-white pr-4">
                    {row.feature}
                  </div>
                  
                  {/* Standard VPN */}
                  <div className="col-span-4 text-gray-400 flex items-start gap-2.5 pr-4 text-xs sm:text-sm">
                    <X className="w-4 h-4 text-red-400/80 flex-shrink-0 mt-0.5" />
                    <span>{row.standard}</span>
                  </div>

                  {/* AlwaysOnVPN */}
                  <div className="col-span-4 text-cyan-300 flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{row.alwayson}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
