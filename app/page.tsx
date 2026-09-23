"use client";

import React from "react";
import EarthNetCanvas from "@/components/EarthNetCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PerksSection from "@/components/PerksSection";
import ArchitectureSection from "@/components/ArchitectureSection";
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
        <Hero onOpenWaitlist={() => {}} />
        <PerksSection />
        <ArchitectureSection />
        <ComparisonSection />
        <TechnicalSpecs />
        <Footer />
      </div>
    </main>
  );
}
