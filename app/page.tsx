"use client";

import React from "react";
import EarthNetCanvas from "@/components/EarthNetCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ArchitectureSection from "@/components/ArchitectureSection";
import PerksSection from "@/components/PerksSection";
import ComparisonSection from "@/components/ComparisonSection";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#08090c] text-white overflow-hidden">
      {/* 3D Procedural Earth + Global Internet Web Canvas (Scroll Coupled) */}
      <EarthNetCanvas />

      {/* Foreground Content Stack */}
      <div className="relative z-10">
        <Navbar />
        
        {/* 1. Hero Section */}
        <Hero />
        
        {/* 2. Tunnel Reliability & Interactive Phone Simulator (Immediately After Hero) */}
        <ArchitectureSection />
        
        {/* 3. Core Perks */}
        <PerksSection />
        
        {/* 4. Comparison Matrix */}
        <ComparisonSection />
        
        {/* 5. Technical Manifest */}
        <TechnicalSpecs />
        
        {/* 6. Footer */}
        <Footer />
      </div>
    </main>
  );
}
