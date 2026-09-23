"use client";

import React, { useState, useEffect } from "react";
import { Shield, ShieldAlert, Wifi, BatteryCharging, Signal, RefreshCw, Lock, Globe, Server, CheckCircle2 } from "lucide-react";

export default function PhoneMockup() {
  const [isConnected, setIsConnected] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [throughputDown, setThroughputDown] = useState(38.4);
  const [throughputUp, setThroughputUp] = useState(12.1);
  const [simulatingHandover, setSimulatingHandover] = useState(false);
  const [handoverSuccess, setHandoverSuccess] = useState(false);

  // Dynamic throughput ticker
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
    }, 400);
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
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px]">
      {/* Outer ambient glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-b from-cyan-500/20 via-emerald-500/10 to-transparent rounded-[48px] blur-xl opacity-60 pointer-events-none" />

      {/* Phone chassis */}
      <div className="relative rounded-[44px] border-[5px] border-[#222734] bg-[#0c0e14] p-3 shadow-2xl shadow-black/80">
        
        {/* Screen Bezel */}
        <div className="relative rounded-[36px] bg-[#07080c] overflow-hidden border border-white/[0.08] flex flex-col min-h-[580px]">
          
          {/* Android Status Bar */}
          <div className="pt-2 px-5 pb-1 flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span className="font-semibold text-gray-200">12:00</span>
            <div className="w-16 h-4 bg-black rounded-full mx-auto" /> {/* Camera cutout */}
            <div className="flex items-center gap-1.5 text-gray-300">
              <Signal className="w-3 h-3 text-cyan-400" />
              <Wifi className="w-3 h-3 text-cyan-400" />
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* App Header Inside Phone */}
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <span className="text-xs font-bold tracking-tight text-white">AlwaysOnVPN</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/40">
              <span className="font-jp">常時起動中</span>
            </div>
          </div>

          {/* Phone App Content */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            
            {/* Status Card */}
            <div className="space-y-4">
              <div className="text-center pt-2">
                <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                  {connecting ? "TUNNEL RE-HANDSHAKING..." : isConnected ? "VPN TUNNEL LOCKED" : "TUNNEL DISARMED"}
                </p>
                <h3 className="text-xl font-bold text-white mt-0.5 flex items-center justify-center gap-1.5">
                  {isConnected ? (
                    <>
                      <span className="text-emerald-400">●</span> 100% Protected
                    </>
                  ) : (
                    <>
                      <span className="text-rose-400">●</span> Raw IP Exposed
                    </>
                  )}
                </h3>
                <p className="text-[11px] font-jp text-gray-400 mt-0.5">
                  {isConnected ? "IP漏洩保護: 完全ロック" : "警告: 接続されていません"}
                </p>
              </div>

              {/* Huge Interactive Shield Power Button */}
              <div className="flex justify-center py-4">
                <button
                  onClick={handleToggle}
                  disabled={connecting}
                  className={`relative group w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${
                    isConnected
                      ? "bg-gradient-to-b from-cyan-500/20 to-emerald-500/20 border-2 border-cyan-400/60 shadow-[0_0_35px_rgba(0,240,255,0.3)] hover:shadow-[0_0_45px_rgba(0,240,255,0.5)]"
                      : "bg-red-500/10 border-2 border-red-500/30 hover:border-red-500/60"
                  }`}
                >
                  <Shield
                    className={`w-12 h-12 transition-transform duration-300 group-hover:scale-110 ${
                      connecting
                        ? "animate-spin text-cyan-400"
                        : isConnected
                        ? "text-cyan-400"
                        : "text-red-400"
                    }`}
                  />
                  <span className="text-[10px] font-mono font-bold mt-1 text-gray-300">
                    {connecting ? "LOCKING..." : isConnected ? "ARMED" : "TAP TO ARM"}
                  </span>
                </button>
              </div>

              {/* Node Location Details */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5 font-mono">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Active Gateway</span>
                  </span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <span>Tokyo (HND-01)</span>
                    <span className="text-[10px] font-jp text-cyan-400">東京</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5 font-mono">
                    <Server className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Masked Public IP</span>
                  </span>
                  <span className="font-mono text-cyan-300 text-xs">
                    {isConnected ? "194.26.29.112" : "185.12.88.4 (ORIGIN)"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5 font-mono">
                    <Lock className="w-3.5 h-3.5 text-purple-400" />
                    <span>Cipher & Daemon</span>
                  </span>
                  <span className="font-mono text-gray-300 text-[11px]">
                    ChaCha20 / Kernel
                  </span>
                </div>
              </div>

              {/* Live Speed Graph / Metrics */}
              {isConnected && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-2.5 text-center">
                    <span className="text-[10px] font-mono text-gray-400">DOWNLOAD SPEED</span>
                    <div className="text-sm font-bold text-white font-mono">{throughputDown} MB/s</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-2.5 text-center">
                    <span className="text-[10px] font-mono text-gray-400">UPLOAD SPEED</span>
                    <div className="text-sm font-bold text-white font-mono">{throughputUp} MB/s</div>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Handover Simulation Trigger */}
            <div className="pt-4 border-t border-white/[0.06] text-center">
              <button
                onClick={handleSimulateHandover}
                disabled={simulatingHandover || !isConnected}
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/40 text-xs font-mono text-cyan-300 flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${simulatingHandover ? "animate-spin text-cyan-400" : ""}`} />
                <span>
                  {simulatingHandover
                    ? "Simulating Wi-Fi → 5G Cut..."
                    : handoverSuccess
                    ? "Handover Zero-Leak: 100% Passed!"
                    : "Test Wi-Fi / 5G Failover (0ms Leak)"}
                </span>
              </button>
              {handoverSuccess && (
                <p className="text-[10px] text-emerald-400 font-mono mt-1.5 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>0 packets leaked outside tunnel during network drop.</span>
                </p>
              )}
            </div>

          </div>

        </div>
      </div>

      <div className="mt-3 text-center text-xs font-mono text-gray-500 flex items-center justify-center gap-1.5">
        <span className="text-cyan-400">▲</span>
        <span>Interactive Live APK Simulator (Click Shield to test)</span>
      </div>
    </div>
  );
}
