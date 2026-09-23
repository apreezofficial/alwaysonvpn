"use client";

import React, { useState, useEffect } from "react";
import { Shield, Sparkles, Download, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export default function Navbar({ onOpenWaitlist }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090c]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-xl shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 border border-cyan-400/30 group-hover:border-cyan-400 transition-colors">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  AlwaysOn<span className="text-cyan-400">VPN</span>
                </span>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300/80">
                  常時接続
                </span>
              </div>
              <p className="text-[10px] font-mono text-gray-400 tracking-wider">
                ANDROID KERNEL DAEMON
              </p>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a
              href="#perks"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <span>Perks</span>
              <span className="text-[10px] text-gray-500 font-jp">特徴</span>
            </a>
            <a
              href="#architecture"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <span>Architecture</span>
              <span className="text-[10px] text-gray-500 font-jp">構造</span>
            </a>
            <a
              href="#comparison"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <span>Compare</span>
              <span className="text-[10px] text-gray-500 font-jp">比較</span>
            </a>
            <a
              href="#specs"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <span>Tech Specs</span>
              <span className="text-[10px] text-gray-500 font-jp">仕様</span>
            </a>
          </nav>

          {/* Right Action & Launch Countdown Pill */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-xs font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>LAUNCHING IN 2 DAYS</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">48h 残り</span>
            </div>

            <button
              onClick={onOpenWaitlist}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:-translate-y-0.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Reserve APK</span>
              <span className="text-[10px] opacity-75 font-jp font-normal">先行予約</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenWaitlist}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-black bg-cyan-400"
            >
              Reserve
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-3 pb-4">
            <a
              href="#perks"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-cyan-400 text-sm py-1 flex items-center justify-between"
            >
              <span>Perks (特徴)</span>
              <span className="text-xs text-gray-500">01</span>
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-cyan-400 text-sm py-1 flex items-center justify-between"
            >
              <span>Architecture (構造)</span>
              <span className="text-xs text-gray-500">02</span>
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-cyan-400 text-sm py-1 flex items-center justify-between"
            >
              <span>Comparison (比較)</span>
              <span className="text-xs text-gray-500">03</span>
            </a>
            <a
              href="#specs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-cyan-400 text-sm py-1 flex items-center justify-between"
            >
              <span>Specs (仕様)</span>
              <span className="text-xs text-gray-500">04</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
