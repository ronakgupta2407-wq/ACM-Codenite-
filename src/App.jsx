import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";

// UI Components
import { Loader } from "./components/ui/Loader";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { Navbar } from "./components/Navbar";

// Sections
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Tracks } from "./sections/Tracks";
import { Timeline } from "./sections/Timeline";
import { Prizes } from "./sections/Prizes";
import { Rules } from "./sections/Rules";
import { TeamGuide } from "./sections/TeamGuide";
import { Sponsors } from "./sections/Sponsors";
import { Team } from "./sections/Team";
import { FAQ } from "./sections/FAQ";
import { Registration } from "./sections/Registration";
import { Footer } from "./sections/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Only enable Lenis if user does not prefer reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-navy-950 text-slate-100 overflow-x-hidden selection:bg-acm-blue selection:text-white">
      {/* 1. Initial Interactive Loader */}
      <AnimatePresence mode="wait">
        {loading && <Loader onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {/* 2. Background Visual Canvas */}
      <BackgroundEffects />

      {/* 3. Top Glowing Scroll Progress */}
      <ScrollProgress />

      {/* 4. Desktop Custom Neon Cursor */}
      <CustomCursor />

      {/* 5. Sticky Navigation Bar */}
      <Navbar />

      {/* 6. Main Interactive Experience */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Tracks />
        <Timeline />
        <Prizes />
        <Rules />
        <TeamGuide />
        <Sponsors />
        <Team />
        <FAQ />
        <Registration />
      </main>

      {/* 7. Comprehensive Footer */}
      <Footer />
    </div>
  );
}
