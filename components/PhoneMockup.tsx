"use client";

import React, { useState, useEffect } from "react";
import { Shield, Wifi, BatteryCharging, Signal, RefreshCw, Lock, Globe, Server, CheckCircle2 } from "lucide-react";

export default function PhoneMockup() {
  const [isConnected, setIsConnected] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [throughputDown, setThroughputDown] = useState(38.4);
  const [throughputUp, setThroughputUp] = useState(12.1);
  const [simulatingHandover, setSimulatingHandover] = useState(false);
  const [handoverSuccess, setHandoverSuccess] = useState(false);

  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      setThroughputDown(parseFloat((35 + Math.random() * 15).toFixed(1)));
      setThroughputUp(parseFloat((10 + Math.random() * 5).toFixed(1)));
    }, 1500);
    return () => clearInterval(interval);
  }, [isConnected]);

  const handleToggle = () => {
    if (connecting) return;
    setConnecting(true);
    setTimeout(() => {
      setIsConnected(!isConnected);
      setConnecting(false);
    }, 350);
  };

  const handleSimulateHandover = () => {
    if (simulatingHandover || !isConnected) return;
    setSimulatingHandover(true);
    setHandoverSuccess(false);

    setTimeout(() => {
      setSimulatingHandover(false);
      setHandoverSuccess(true);
      setTimeout(() => setHandoverSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[370px]">
      {/* Phone chassis - clean matte dark border */}
      <div className="relative rounded-[44px] border border-white/[0.12] bg-[#0c0e14] p-3 shadow-2xl shadow-black">
        
        {/* Screen Bezel */}
        <div className="relative rounded-[36px] bg-[#07080c] overflow-hidden border border-white/[0.08] flex flex-col min-h-[560px]">
          
          {/* Status Bar */}
          <div className="pt-2 px-5 pb-1 flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span className="font-semibold text-gray-300">12:00</span>
            <div className="w-16 h-4 bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-gray-400">
              <Signal className="w-3 h-3 text-white" />
              <Wifi className="w-3 h-3 text-white" />
              <BatteryCharging className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          {/* App Header Inside Phone */}
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white/[0.08] border border-white/[0.1] flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-semibold tracking-tight text-white">AlwaysOnVPN</span>
            </div>
            <div className="text-[10px] font-mono text-gray-300 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.1]">
              ALWAYS-ON
            </div>
          </div>

          {/* Phone App Content */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="text-center pt-2">
                <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                  {connecting ? "RE-HANDSHAKING..." : isConnected ? "VPN TUNNEL LOCKED" : "TUNNEL DISARMED"}
                </p>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {isConnected ? "Protected" : "Exposed"}
                </h3>
              </div>

              {/* Huge Minimalist Shield Power Button */}
              <div className="flex justify-center py-4">
                <button
                  onClick={handleToggle}
                  disabled={connecting}
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                    isConnected
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-white/[0.05] text-white border border-white/20 hover:border-white/40"
                  }`}
                >
                  <Shield
                    className={`w-12 h-12 ${connecting ? "animate-spin" : ""}`}
                    strokeWidth={1.75}
                  />
                  <span className="text-[10px] font-mono font-bold mt-1">
                    {connecting ? "LOCKING..." : isConnected ? "ACTIVE" : "TAP TO ARM"}
                  </span>
                </button>
              </div>

              {/* Node Details */}
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5 font-mono">
                    <Globe className="w-3.5 h-3.5 text-gray-400" />
                    <span>Gateway</span>
                  </span>
                  <span className="text-white font-medium">Tokyo (HND-01)</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5 font-mono">
                    <Server className="w-3.5 h-3.5 text-gray-400" />
                    <span>Virtual IP</span>
                  </span>
                  <span className="font-mono text-gray-300 text-xs">
                    {isConnected ? "194.26.29.112" : "Unmasked Origin"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5 font-mono">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Cipher</span>
                  </span>
                  <span className="font-mono text-gray-300 text-[11px]">
                    ChaCha20-Poly1305
                  </span>
                </div>
              </div>

              {/* Speed Metrics */}
              {isConnected && (
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-2 text-center">
                    <span className="text-[10px] text-gray-500">DOWN</span>
                    <div className="text-xs font-semibold text-white">{throughputDown} MB/s</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-2 text-center">
                    <span className="text-[10px] text-gray-500">UP</span>
                    <div className="text-xs font-semibold text-white">{throughputUp} MB/s</div>
                  </div>
                </div>
              )}
            </div>

            {/* Handover Simulation */}
            <div className="pt-4 border-t border-white/[0.06] text-center">
              <button
                onClick={handleSimulateHandover}
                disabled={simulatingHandover || !isConnected}
                className="w-full py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-white flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${simulatingHandover ? "animate-spin" : ""}`} />
                <span>
                  {simulatingHandover
                    ? "Simulating Handover..."
                    : handoverSuccess
                    ? "Handover Passed (0.00ms Leak)"
                    : "Simulate Wi-Fi → 5G Switch"}
                </span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
