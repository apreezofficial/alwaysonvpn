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

        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-gray-500">
          <p>© {new Date().getFullYear()} AlwaysOnVPN. All rights reserved. Launching in 2 days.</p>
          <span className="hidden sm:inline text-gray-700">·</span>
          <p>
            By{" "}
            <a
              href="https://preciousadedokun.com.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
            >
              ap
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
