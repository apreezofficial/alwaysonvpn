"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TechnicalSpecs() {
  const [open, setOpen] = useState(false);

  const specs = [
    { label: "Architecture", value: "arm64-v8a / armeabi-v7a / x86_64" },
    { label: "Minimum Android OS", value: "Android 8.0 (API Level 26) through Android 15+" },
    { label: "Encryption", value: "ChaCha20-Poly1305 AEAD" },
    { label: "Key Exchange", value: "Curve25519 ECDH" },
    { label: "Hashing Function", value: "BLAKE2s 256-bit" },
    { label: "Tunnel Interface", value: "Native Linux TUN device" },
    { label: "Memory Footprint", value: "< 14 MB RAM" },
    { label: "APK Download Size", value: "6.4 MB" },
    { label: "DNS Protection", value: "Encrypted RAM Recursive Resolvers" },
    { label: "Stealth Protocol", value: "TLS 1.3 Camouflage" },
  ];

  return (
    <section id="specs" className="relative border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 sm:px-12">

        {/* Clickable Section Title */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between py-10 text-left group"
        >
          <div>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Specifications</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-gray-200 transition-colors">
              Technical Manifest
            </h2>
          </div>
          <ChevronDown
            className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-6 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Collapsible Content */}
        {open && (
          <div className="pb-20 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-[#0c0e14]/90 border border-white/[0.08] flex items-center justify-between hover:border-white/20 transition-colors"
                >
                  <span className="text-xs font-mono uppercase text-gray-400">{spec.label}</span>
                  <span className="text-xs sm:text-sm font-mono text-white font-medium text-right ml-4">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
