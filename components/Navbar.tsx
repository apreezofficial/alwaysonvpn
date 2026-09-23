"use client";

import React from "react";
import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6 px-6 sm:px-12 backdrop-blur-sm bg-[#08090c]/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-white" strokeWidth={2} />
          <span className="text-lg font-semibold tracking-tight text-white">
            AlwaysOnVPN
          </span>
        </div>
      </div>
    </header>
  );
}
