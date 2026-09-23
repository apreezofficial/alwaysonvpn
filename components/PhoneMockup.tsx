"use client";

import React, { useState, useEffect } from "react";
import { Shield, Wifi, BatteryCharging, Signal, RefreshCw, Lock, Globe, Server, CheckCircle2 } from "lucide-react";

interface PhoneMockupProps {
  highlightFeature?: number | null; // 0, 1, or 2 from parent
  onFeatureSelect?: (index: number) => void;
}

export default function PhoneMockup({ highlightFeature, onFeatureSelect }: PhoneMockupProps) {
  const [isConnected, setIsConnected] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [throughputDown, setThroughputDown] = useState(42.1);
  const [throughputUp, setThroughputUp] = useState(11.4);
  const [simulatingHandover, setSimulatingHandover] = useState(false);
  const [handoverSuccess, setHandoverSuccess] = useState(false);
  const [handPos, setHandPos] = useState({ x: 50, y: 38, visible: false, tapping: false });
  const [autoDemoActive, setAutoDemoActive] = useState(true);

  // Speed ticker
  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      setThroughputDown(parseFloat((38 + Math.random() * 12).toFixed(1)));
      setThroughputUp(parseFloat((9 + Math.random() * 5).toFixed(1)));
    }, 1800);
    return () => clearInterval(interval);
  }, [isConnected]);

  // When parent selects feature 1 (Handover), trigger simulation
  useEffect(() => {
    if (highlightFeature === 1 && isConnected && !simulatingHandover) {
      triggerHandover();
    }
  }, [highlightFeature]);

  // Virtual Hand Auto-Demonstration Loop
  useEffect(() => {
    if (!autoDemoActive) return;

    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    let timeout3: NodeJS.Timeout;

    const runDemoCycle = () => {
      // Step 1: Hand appears near the shield button
      setHandPos({ x: 50, y: 38, visible: true, tapping: false });

      // Step 2: Hand taps the button
      timeout1 = setTimeout(() => {
        setHandPos((prev) => ({ ...prev, tapping: true }));
        
        // Retrigger toggle or handover
        setTimeout(() => {
          setHandPos((prev) => ({ ...prev, tapping: false }));
        }, 300);
      }, 1500);

      // Step 3: Hand moves to the Handover Switch button
      timeout2 = setTimeout(() => {
        setHandPos({ x: 50, y: 88, visible: true, tapping: false });

        timeout3 = setTimeout(() => {
          setHandPos((prev) => ({ ...prev, tapping: true }));
          triggerHandover();
          setTimeout(() => {
            setHandPos((prev) => ({ ...prev, visible: false, tapping: false }));
          }, 400);
        }, 1200);
      }, 4000);
    };

    const interval = setInterval(runDemoCycle, 14000);
    const initialRun = setTimeout(runDemoCycle, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialRun);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [autoDemoActive, isConnected]);

  const handleManualToggle = () => {
    setAutoDemoActive(false); // User took control
    if (connecting) return;
    setConnecting(true);
    setTimeout(() => {
      setIsConnected((prev) => !prev);
      setConnecting(false);
    }, 350);
  };

  const triggerHandover = () => {
    if (simulatingHandover) return;
    setSimulatingHandover(true);
    setHandoverSuccess(false);

    setTimeout(() => {
      setSimulatingHandover(false);
      setHandoverSuccess(true);
      setTimeout(() => setHandoverSuccess(false), 3500);
    }, 1200);
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[370px]">
      
      {/* Phone chassis */}
      <div className="relative rounded-[46px] border border-white/[0.14] bg-[#0c0e14] p-3 shadow-2xl shadow-black/80 transition-all">
        
        {/* Screen Bezel */}
        <div className="relative rounded-[38px] bg-[#07080c] overflow-hidden border border-white/[0.08] flex flex-col min-h-[580px] select-none">
          
          {/* Animated Hand Tap Cursor */}
          {handPos.visible && (
            <div
              className="absolute z-40 pointer-events-none transition-all duration-700 ease-out flex flex-col items-center"
              style={{
                left: `${handPos.x}%`,
                top: `${handPos.y}%`,
                transform: `translate(-50%, -50%) scale(${handPos.tapping ? 0.85 : 1})`,
              }}
            >
              {/* Circular Ripple */}
              {handPos.tapping && (
                <div className="absolute -inset-3 rounded-full bg-white/30 animate-ping" />
              )}
              {/* Hand Icon */}
              <div className="text-2xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] animate-bounce">
                👆
              </div>
            </div>
          )}

          {/* Android Status Bar */}
          <div className="pt-2 px-5 pb-1 flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span className="font-semibold text-gray-200">12:00</span>
            <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-gray-300">
              <Signal className="w-3 h-3 text-white" />
              <Wifi className="w-3 h-3 text-white" />
              <BatteryCharging className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          {/* App Header */}
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white/[0.08] border border-white/[0.1] flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-semibold tracking-tight text-white">AlwaysOnVPN</span>
            </div>
            <div className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
              highlightFeature === 0 ? "bg-white text-black font-bold border-white" : "text-gray-300 bg-white/[0.05] border-white/[0.1]"
            }`}>
              ALWAYS-ON
            </div>
          </div>

          {/* Phone App Content */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            
            <div className="space-y-4">
              
              {/* Status Indicator */}
              <div className="text-center pt-2">
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  {connecting ? "RE-HANDSHAKING..." : isConnected ? "VPN TUNNEL LOCKED" : "TUNNEL DISARMED"}
                </p>
                <h3 className="text-xl font-bold text-white mt-0.5 flex items-center justify-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
                  <span>{isConnected ? "Protected" : "Exposed"}</span>
                </h3>
              </div>

              {/* Big Interactive Power Button */}
              <div className="flex justify-center py-3">
                <button
                  onClick={handleManualToggle}
                  disabled={connecting}
                  className={`relative group w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                    isConnected
                      ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95"
                      : "bg-white/[0.05] text-white border border-white/20 hover:border-white/40 active:scale-95"
                  }`}
                >
                  <Shield
                    className={`w-12 h-12 ${connecting ? "animate-spin" : ""}`}
                    strokeWidth={1.8}
                  />
                  <span className="text-[10px] font-mono font-bold mt-1 tracking-wider">
                    {connecting ? "LOCKING..." : isConnected ? "ACTIVE" : "TAP TO ARM"}
                  </span>
                </button>
              </div>

              {/* Node Details */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3.5 space-y-2">
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
                  <span className="font-mono text-gray-200 text-xs">
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

              {/* Speed Telemetry */}
              {isConnected && (
                <div className="grid grid-cols-2 gap-2 pt-0.5 font-mono">
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

            {/* Handover Simulation Button */}
            <div className="pt-3 border-t border-white/[0.06] text-center">
              <button
                onClick={() => {
                  setAutoDemoActive(false);
                  triggerHandover();
                }}
                disabled={simulatingHandover || !isConnected}
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 transition-all ${
                  highlightFeature === 1
                    ? "bg-white text-black font-semibold border-white"
                    : "bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.12] text-white"
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${simulatingHandover ? "animate-spin" : ""}`} />
                <span>
                  {simulatingHandover
                    ? "Switching Networks..."
                    : handoverSuccess
                    ? "Handover Passed (0.00ms Leak)"
                    : "Simulate Wi-Fi → 5G Switch"}
                </span>
              </button>

              {handoverSuccess && (
                <p className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>0 packets leaked outside tunnel.</span>
                </p>
              )}
            </div>

          </div>

        </div>
      </div>

      <div className="mt-3 text-center text-xs font-mono text-gray-500 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-ping" />
        <span>Live Interactive APK Demo (Auto-playing & Clickable)</span>
      </div>
    </div>
  );
}
