import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
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
      if (window.scrollY > 40) {
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
          ? "bg-navy-950/85 backdrop-blur-xl border-b border-acm-blue/20 shadow-glass py-3"
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
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border-2 border-acm-blue/60 flex items-center justify-center p-0 group-hover:border-acm-cyan transition-colors shadow-sm shrink-0">
            <img
              src={EVENT_DATA.organizer.acmLogo}
              alt="ACM MITS Student Chapter"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-heading font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-acm-cyan transition-colors">
              <span>CodeNite</span>
              <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-sky-950 text-acm-cyan border border-acm-cyan/30">
                {EVENT_DATA.edition}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase -mt-0.5">
              ACM MITS Chapter
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "relative px-3 py-2 text-xs xl:text-sm font-heading font-medium tracking-wide transition-colors rounded-lg",
                  isActive
                    ? "text-acm-cyan"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}

                {/* Animated active underline */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-acm-blue to-acm-cyan rounded-full shadow-[0_0_8px_#22D3EE]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA Button & Admin Access */}
        <div className="hidden lg:flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            pulseRing
            magnetic
            onClick={(e) => handleNavClick(e, "#register")}
          >
            Register Now
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>

          {/* Admin Button on Right of Register */}
          <button
            type="button"
            onClick={() => onOpenAdmin && onOpenAdmin()}
            className="px-3.5 py-2 rounded-xl bg-navy-900/90 hover:bg-navy-800 text-slate-300 hover:text-acm-cyan border border-acm-blue/30 hover:border-acm-cyan text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            title="Open ACM Organizer Admin Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-acm-cyan" />
            <span>Admin</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-navy-900 border border-acm-blue/30 text-slate-300 hover:text-white hover:border-acm-cyan transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-navy-950/95 border-b border-acm-blue/30 backdrop-blur-2xl px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, idx) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "px-4 py-3 rounded-xl font-heading text-base font-semibold flex items-center justify-between transition-colors",
                      isActive
                        ? "bg-acm-blue/20 text-acm-cyan border border-acm-cyan/30"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-acm-cyan animate-pulse" />}
                  </motion.a>
                );
              })}

              <div className="pt-4 border-t border-acm-blue/20 mt-2 space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  pulseRing
                  className="w-full"
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
                  className="w-full py-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-slate-300 hover:text-acm-cyan text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-acm-cyan" />
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
