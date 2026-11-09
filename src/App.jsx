import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";

// UI Components
import { Loader } from "./components/ui/Loader";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { LayeredFuturisticUniverse } from "./components/3d/LayeredFuturisticUniverse";
import { FloatingCompanionBot } from "./components/3d/FloatingCompanionBot";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { Navbar } from "./components/Navbar";
import { AdminPortalModal } from "./components/AdminPortalModal";

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
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem("codenite_loaded_once");
    } catch {
      return true;
    }
  });
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const handleFinishLoading = React.useCallback(() => {
    try {
      sessionStorage.setItem("codenite_loaded_once", "true");
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

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

      let animationFrameId;
      function raf(time) {
        lenis.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      }

      animationFrameId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(animationFrameId);
        lenis.destroy();
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-navy-950 text-slate-100 overflow-x-hidden selection:bg-acm-blue selection:text-white">
      {/* 1. Initial Interactive Loader */}
      <AnimatePresence mode="wait">
        {loading && <Loader onFinish={handleFinishLoading} />}
      </AnimatePresence>

      {/* 2. Background Visual Canvas */}
      <BackgroundEffects />
      <LayeredFuturisticUniverse />

      {/* 3. Top Glowing Scroll Progress */}
      <ScrollProgress />

      {/* 4. Desktop Custom Neon Cursor */}
      <CustomCursor />

      {/* 4.1. 3D Floating Companion Drone ("Sparky") */}
      <FloatingCompanionBot />

      {/* 5. Sticky Navigation Bar */}
      <Navbar onOpenAdmin={() => setAdminModalOpen(true)} />

      {/* 6. Main Interactive Experience */}
      <main className="relative z-10 flex flex-col">
        <Hero onOpenAdmin={() => setAdminModalOpen(true)} />
        <About />
        <Tracks />
        <Timeline />
        <Prizes />
        <Rules />
        <TeamGuide />
        <Sponsors />
        <Team />
        <FAQ />
        <Registration onOpenAdmin={() => setAdminModalOpen(true)} />
      </main>

      {/* 7. Comprehensive Footer */}
      <Footer />

      {/* 8. Admin Portal Modal */}
      <AdminPortalModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
}
