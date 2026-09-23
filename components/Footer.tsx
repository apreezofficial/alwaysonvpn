"use client";

import React from "react";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#06070a] border-t border-white/[0.08] py-16 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-white" strokeWidth={2} />
          <span className="text-base font-semibold text-white">AlwaysOnVPN</span>
        </div>

        <p className="text-xs font-mono text-gray-500">
          © {new Date().getFullYear()} AlwaysOnVPN. All rights reserved. Launching in 2 days.
        </p>

      </div>
    </footer>
  );
}
