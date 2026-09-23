"use client";

import React, { useState } from "react";
import { Check, X, ChevronDown } from "lucide-react";

export default function ComparisonSection() {
  const [open, setOpen] = useState(false);

  const comparisons = [
    {
      feature: "Continuous Protection",
      standard: "Drops silently when Android sleeps or saves battery",
      alwayson: "Locks kernel socket, zero drops, unkillable foreground service",
    },
    {
      feature: "Wi-Fi to Cellular Handover",
      standard: "Leaks true IP during network switches",
      alwayson: "0.00ms packet leak, instant sub-2ms reconnect",
    },
    {
      feature: "APK Download Size",
      standard: "65 MB to 120 MB (bloated with tracking SDKs)",
      alwayson: "6.4 MB (featherweight pure native Rust binary)",
    },
    {
      feature: "24-Hour Battery Consumption",
      standard: "8% to 15% daily drain from aggressive wakelocks",
      alwayson: "Less than 0.8% daily drain with async epoll",
    },
    {
      feature: "Strict Firewall Bypass",
      standard: "Throttled or blocked by deep packet inspection",
      alwayson: "Stealth mode masks traffic as standard HTTPS TLS 1.3",
    },
    {
      feature: "Server Infrastructure",
      standard: "Disk logging of metadata and timestamps",
      alwayson: "100% diskless RAM nodes, verifiable zero logs",
    },
  ];

  return (
    <section id="comparison" className="relative border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 sm:px-12">

        {/* Clickable Section Title */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between py-10 text-left group"
        >
          <div>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Comparison</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-gray-200 transition-colors">
              Other VPNs vs. AlwaysOnVPN
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
              We stripped out the bloatware and solved the fatal flaws of commercial Android VPNs.
            </p>

            <div className="overflow-x-auto">
              <div className="min-w-[620px] rounded-2xl bg-[#0c0e14]/90 border border-white/[0.08] overflow-hidden">
                
                <div className="grid grid-cols-12 border-b border-white/[0.08] p-5 text-xs font-mono uppercase tracking-wider text-gray-400">
                  <div className="col-span-4">Feature</div>
                  <div className="col-span-4 text-gray-400">Typical VPNs</div>
                  <div className="col-span-4 text-white font-semibold">AlwaysOnVPN</div>
                </div>

                <div className="divide-y divide-white/[0.05]">
                  {comparisons.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-12 p-5 text-sm items-center hover:bg-white/[0.02] transition-colors">
                      <div className="col-span-4 font-medium text-white pr-4">{row.feature}</div>
                      <div className="col-span-4 text-gray-400 flex items-start gap-2 pr-4 text-xs sm:text-sm">
                        <X className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span>{row.standard}</span>
                      </div>
                      <div className="col-span-4 text-white flex items-start gap-2 text-xs sm:text-sm">
                        <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                        <span>{row.alwayson}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
