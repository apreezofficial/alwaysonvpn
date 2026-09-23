"use client";

import React, { useState } from "react";
import EarthNetCanvas from "@/components/EarthNetCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PerksSection from "@/components/PerksSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ComparisonSection from "@/components/ComparisonSection";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import Footer from "@/components/Footer";
import WaitlistModal from "@/components/WaitlistModal";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#08090c] text-white overflow-hidden">
      {/* 3D Procedural Earth + Global Internet Mesh Canvas (Linked to Scroll) */}
      <EarthNetCanvas />

      {/* Foreground Content Stack */}
      <div className="relative z-10">
        <Navbar onOpenWaitlist={() => setWaitlistOpen(true)} />
        
        <Hero onOpenWaitlist={() => setWaitlistOpen(true)} />
        
        <PerksSection />
        
        <ArchitectureSection />
        
        <ComparisonSection />
        
        <TechnicalSpecs />
        
        <Footer onOpenWaitlist={() => setWaitlistOpen(true)} />
      </div>

      {/* Early-Bird APK Waitlist Modal */}
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />
    </main>
  );
}
