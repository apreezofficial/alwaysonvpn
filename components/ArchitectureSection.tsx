"use client";

import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import PhoneMockup from "./PhoneMockup";

export default function ArchitectureSection() {
  const [activeItem, setActiveItem] = useState<number | null>(0);

  const items = [
    {
      index: "01",
      title: "Direct Android VpnService Lock",
      details:
        "AlwaysOnVPN registers as an unkillable foreground system daemon rather than an app that gets killed during battery saver mode. The kernel binds all routing exclusively through our encrypted TUN device.",
    },
    {
      index: "02",
      title: "Zero-Gap Network Handshake",
      details:
        "When Wi-Fi disconnects and switches to 5G, outbound sockets are frozen at the kernel interface until the WireGuard tunnel re-establishes in under 2ms. Not a single unencrypted packet ever escapes.",
    },
    {
      index: "03",
      title: "Hardware-Enforced DNS Scrubbing",
      details:
        "All DNS and WebRTC lookups are forced strictly through encrypted RAM resolvers, eliminating IP exposure from hostile web scripts and carrier tracking.",
    },
  ];

  const handleToggle = (i: number) => {
    setActiveItem(activeItem === i ? null : i);
  };

  return (
    <section id="architecture" className="relative py-28 px-6 sm:px-12 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header as requested */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
            Tunnel Reliability
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            How we eliminate the microsecond leak.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            When standard VPNs switch between Wi-Fi and mobile networks, your real IP leaks for a split second. AlwaysOnVPN prevents this at the kernel level.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive Phone Mockup with Auto-Demonstration & Sync */}
          <div className="lg:col-span-5 flex justify-center">
            <PhoneMockup
              highlightFeature={activeItem}
              onFeatureSelect={(idx) => setActiveItem(idx)}
            />
          </div>

          {/* Right: Clickable Accordion Items (01, 02, 03) */}
          <div className="lg:col-span-7 space-y-4">
            
            <p className="text-xs font-mono text-gray-500 mb-2">
              CLICK ANY ARCHITECTURE PILLAR TO INSPECT:
            </p>

            {items.map((item, i) => {
              const isOpen = activeItem === i;
              return (
                <div
                  key={i}
                  onClick={() => handleToggle(i)}
                  className={`cursor-pointer rounded-2xl border transition-all duration-200 select-none overflow-hidden ${
                    isOpen
                      ? "bg-white/[0.06] border-white/30 shadow-lg shadow-black/40"
                      : "bg-[#0c0e14]/80 border-white/[0.08] hover:border-white/20 hover:bg-[#0c0e14]"
                  }`}
                >
                  {/* Clickable Header */}
                  <div className="p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-sm font-semibold transition-colors ${
                          isOpen ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {item.index}
                      </span>
                      <h3
                        className={`text-base sm:text-lg font-semibold transition-colors ${
                          isOpen ? "text-white" : "text-gray-300"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-transform duration-200 ${
                        isOpen
                          ? "rotate-180 bg-white text-black border-white"
                          : "text-gray-400 border-white/10"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-gray-300 font-light leading-relaxed border-t border-white/[0.06] animate-in fade-in duration-200">
                      <p>{item.details}</p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-mono text-white/70">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Active on simulated device &bull; Verified in kernel</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}
