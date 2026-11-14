import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";
import { EVENT_DATA } from "../data/codeniteData";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { cn } from "../utils/cn";

export function Navbar({ onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Tracks", href: "#tracks" },
    { label: "Timeline", href: "#timeline" },
    { label: "Prizes", href: "#prizes" },
    { label: "Rules", href: "#rules" },
    { label: "Team Guide", href: "#guide" },
    { label: "FAQ", href: "#faq" },
  ];

  const sectionIds = ["home", "about", "tracks", "timeline", "prizes", "rules", "guide", "faq", "register"];
  const activeSection = useScrollSpy(sectionIds, 150);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#050B1E]/88 backdrop-blur-xl border-b border-[rgba(96,165,250,0.2)] shadow-[0_10px_30px_rgba(5,11,30,0.85)] py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logos */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-white/95 border border-[rgba(96,165,250,0.4)] flex items-center justify-center p-0.5 group-hover:border-tech-cyan group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all shadow-md shrink-0">
            <img
              src={EVENT_DATA.organizer.acmLogo}
              alt="ACM MITS Student Chapter"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-tech-cyan transition-colors">
              <span>CodeNite</span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#101D3D] text-tech-cyan border border-tech-cyan/35 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                {EVENT_DATA.edition}
              </span>
            </div>
            <span className="text-[10px] font-mono text-tech-muted tracking-wider uppercase -mt-0.5 font-medium">
              ACM MITS Chapter
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#0A1530]/60 p-1.5 rounded-full border border-[rgba(96,165,250,0.2)] backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs xl:text-sm font-heading font-semibold tracking-wide transition-all rounded-full",
                  isActive
                    ? "text-white bg-gradient-to-r from-blue-600/90 to-tech-electric/90 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA Button & Admin Access */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            pulseRing
            magnetic
            onClick={(e) => handleNavClick(e, "#register")}
            className="shadow-[0_0_20px_rgba(37,99,235,0.45)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]"
          >
            Register Now
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>

          {/* Admin Button */}
          <button
            type="button"
            onClick={() => onOpenAdmin && onOpenAdmin()}
            className="px-3.5 py-2 rounded-xl bg-[#101D3D]/90 hover:bg-[#15244C] text-slate-200 hover:text-tech-cyan border border-[rgba(96,165,250,0.25)] hover:border-tech-cyan/60 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-md hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] cursor-pointer"
            title="Open ACM Organizer Admin Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-tech-cyan" />
            <span>Admin</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#101D3D] border border-[rgba(96,165,250,0.3)] text-slate-200 hover:text-white hover:border-tech-cyan transition-colors cursor-pointer shadow-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-tech-cyan" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Slide-in Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#050B1E]/95 border-b border-[rgba(96,165,250,0.25)] backdrop-blur-2xl px-6 py-5 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link, idx) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "px-4 py-2.5 rounded-xl font-heading text-sm font-semibold flex items-center justify-between transition-all",
                      isActive
                        ? "bg-gradient-to-r from-blue-600/30 to-tech-cyan/20 text-tech-cyan border border-tech-cyan/40 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-tech-cyan shadow-[0_0_8px_#38BDF8]" />}
                  </motion.a>
                );
              })}

              <div className="pt-4 border-t border-[rgba(96,165,250,0.2)] mt-2 space-y-2.5">
                <Button
                  variant="primary"
                  size="md"
                  pulseRing
                  className="w-full justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  onClick={(e) => handleNavClick(e, "#register")}
                >
                  Register Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAdmin) onOpenAdmin();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#101D3D] border border-[rgba(96,165,250,0.3)] text-slate-200 hover:text-tech-cyan text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-tech-cyan" />
                  <span>Admin Portal</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
