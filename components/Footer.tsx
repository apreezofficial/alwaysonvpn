"use client";

import React from "react";
import { Shield, Heart, Terminal, Globe, Lock, ArrowUp } from "lucide-react";

interface FooterProps {
  onOpenWaitlist: () => void;
}

export default function Footer({ onOpenWaitlist }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#06070a] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Call to Action Banner inside footer */}
        <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#0e121b] to-emerald-950/30 border border-white/[0.08] p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-xs font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>48 HOURS UNTIL PUBLIC RELEASE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready for a VPN that never lets your location slip?
            </h3>
            <p className="text-sm text-gray-400 font-jp">
              「常時接続。あなたの位置情報は、一瞬たりとも漏洩しない。」
            </p>
          </div>

          <button
            onClick={onOpenWaitlist}
            className="flex-shrink-0 px-8 py-4 rounded-2xl text-base font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:scale-105"
          >
            Claim Free APK Pass (ベータ登録)
          </button>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-400/20 border border-cyan-400/40">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                AlwaysOn<span className="text-cyan-400">VPN</span>
              </span>
              <span className="text-xs font-mono text-cyan-400 font-jp">常時接続</span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed font-light max-w-sm">
              The ultra-fast, lightweight, always-on Android VPN APK engineered to maintain cryptographic integrity across all network handovers.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>GLOBAL NODE BACKBONE: 100% OPERATIONAL</span>
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
              Navigation (目次)
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-light">
              <li>
                <a href="#perks" className="hover:text-cyan-400 transition-colors">
                  Perks & Features (特徴)
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-cyan-400 transition-colors">
                  Kill-Switch Architecture (構造)
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-cyan-400 transition-colors">
                  Comparison Matrix (比較)
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-cyan-400 transition-colors">
                  Technical Manifest (技術仕様)
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy & Legal */}
          <div>
            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
              Security Protocol
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-light">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero-Log RAM Verification</span>
              </li>
              <li className="flex items-center gap-1.5 text-cyan-400">
                <Shield className="w-3.5 h-3.5" />
                <span>WebRTC Leak Immunity</span>
              </li>
              <li className="flex items-center gap-1.5 text-purple-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>Native Rust WireGuard Daemon</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} AlwaysOnVPN (常時接続). Built for speed, privacy, and continuous protection.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 font-jp">「絶対の自由と、揺るぎない接続を」</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
