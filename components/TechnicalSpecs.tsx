"use client";

import React from "react";
import { Terminal, Shield, Check, Lock, Cpu, Globe } from "lucide-react";

export default function TechnicalSpecs() {
  const specs = [
    { label: "Target Architecture", value: "arm64-v8a / armeabi-v7a / x86_64 (Universal APK)" },
    { label: "Minimum Android OS", value: "Android 8.0 (API Level 26) up to Android 15+" },
    { label: "Encryption Cipher", value: "ChaCha20-Poly1305 AEAD (Quantum-Resistant WireGuard)" },
    { label: "Key Exchange", value: "Curve25519 Elliptic Curve Diffie-Hellman" },
    { label: "Hashing Function", value: "BLAKE2s 256-bit cryptographic digest" },
    { label: "Tunnel Interface", value: "Native Linux TUN virtual network device" },
    { label: "Memory Footprint", value: "< 14 MB Resident Set Size (RSS)" },
    { label: "Package Footprint", value: "6.4 MB compressed APK download" },
    { label: "DNS Protection", value: "Forced Recursive Encrypted Resolvers (No ISP DNS fallback)" },
    { label: "Obfuscation Engine", value: "Shadow TLS 1.3 handshake camouflage (DPI-proof)" },
  ];

  return (
    <section id="specs" className="relative py-24 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-cyan-300 mb-4">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>RAW TECHNICAL MANIFEST</span>
            <span className="text-gray-500">•</span>
            <span className="font-jp text-gray-400">技術仕様</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Built for Android power users who inspect their sockets.
          </h2>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((spec, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#0c0e15]/70 border border-white/[0.07] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="uppercase tracking-wider">{spec.label}</span>
                <span className="text-cyan-400/60 font-jp">確定仕様</span>
              </div>
              <div className="mt-2 text-sm sm:text-base font-semibold text-white font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>{spec.value}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
