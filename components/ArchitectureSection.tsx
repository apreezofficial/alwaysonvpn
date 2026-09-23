"use client";

import React from "react";
import PhoneMockup from "./PhoneMockup";

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="relative py-28 px-6 sm:px-12 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-xl mb-16">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
            Tunnel Reliability
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            How we eliminate the microsecond leak.
          </h2>
          <p className="mt-3 text-base text-gray-400 font-light">
            When standard VPNs switch between Wi-Fi and mobile networks, your real IP leaks for a split second. AlwaysOnVPN prevents this at the kernel level.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Phone Simulator */}
          <div className="lg:col-span-5 flex justify-center">
            <PhoneMockup />
          </div>

          {/* Right: Architecture Steps */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="p-6 rounded-2xl bg-[#0c0e14]/90 border border-white/[0.08]">
              <div className="flex items-start gap-4">
                <span className="font-mono text-sm text-gray-500 font-semibold mt-0.5">01</span>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Direct Android VpnService Lock
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-400 font-light leading-relaxed">
                    AlwaysOnVPN registers as an unkillable foreground system daemon rather than an app that gets killed during battery saver mode.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0e14]/90 border border-white/[0.08]">
              <div className="flex items-start gap-4">
                <span className="font-mono text-sm text-gray-500 font-semibold mt-0.5">02</span>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Zero-Gap Network Handshake
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-400 font-light leading-relaxed">
                    When Wi-Fi disconnects and switches to 5G, outbound sockets are frozen at the kernel interface until the WireGuard tunnel re-establishes in under 2ms.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0e14]/90 border border-white/[0.08]">
              <div className="flex items-start gap-4">
                <span className="font-mono text-sm text-gray-500 font-semibold mt-0.5">03</span>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Hardware-Enforced DNS Scrubbing
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-400 font-light leading-relaxed">
                    All DNS and WebRTC lookups are forced strictly through encrypted RAM resolvers, eliminating IP exposure from hostile web scripts.
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
