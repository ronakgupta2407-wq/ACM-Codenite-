import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin, Mail, Code2, Sparkles, CheckCircle2, Terminal, Cpu } from "lucide-react";

/**
 * DeveloperModal
 * High-tech cyberpunk modal card displaying full developer profile,
 * skills matrix, CodeNite contributions, and direct social links.
 */
export function DeveloperModal({ developer, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !developer) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#020512]/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-gradient-to-b from-[#0b173e]/98 via-[#060e28]/98 to-[#020516]/98 border-2 border-cyan-400/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.35)] z-10"
        >
          {/* Top Neon Laser Beam */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f0ff]" />

          {/* Corner Crosshairs */}
          <span className="absolute top-3 left-3 text-[10px] font-mono text-cyan-400/50">+</span>
          <span className="absolute top-3 right-3 text-[10px] font-mono text-cyan-400/50">+</span>
          <span className="absolute bottom-3 left-3 text-[10px] font-mono text-cyan-400/50">+</span>
          <span className="absolute bottom-3 right-3 text-[10px] font-mono text-cyan-400/50">+</span>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-navy-900/80 hover:bg-navy-800 text-slate-400 hover:text-white border border-cyan-500/30 hover:border-cyan-400 transition-colors cursor-pointer"
            aria-label="Close Profile"
          >
            <X className="w-4 h-4 text-cyan-300" />
          </button>

          {/* Header Profile Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-cyan-500/20 text-center sm:text-left">
            {/* High-Tech Cyber Monogram Avatar */}
            <div
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden p-1 bg-gradient-to-tr ${
                developer.avatarColor || "from-cyan-400 via-sky-300 to-purple-500"
              } shadow-[0_0_30px_rgba(6,182,212,0.4)] shrink-0`}
            >
              {developer.image ? (
                <img
                  src={developer.image}
                  alt={developer.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-gradient-to-b from-[#09153a] via-[#050c26] to-[#020514] flex flex-col items-center justify-center relative overflow-hidden border border-cyan-400/30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)] pointer-events-none" />
                  <div className="absolute top-1.5 left-2 text-[9px] font-mono text-cyan-400/40 select-none">&lt;DEV&gt;</div>
                  <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-cyan-400/40 select-none">&lt;/DEV&gt;</div>
                  <div className="flex items-center justify-center mb-0.5">
                    {developer.iconType === "Terminal" ? (
                      <Terminal className="w-5 h-5 text-purple-400" />
                    ) : (
                      <Code2 className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>
                  <span className="font-orbitron font-black text-2xl sm:text-3xl text-white tracking-widest text-glow-cyan leading-tight">
                    {developer.initials || developer.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span className="text-[9px] font-mono text-cyan-300/80 font-bold uppercase tracking-wider mt-0.5">
                    Core Architect
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-400/40 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>{developer.badge}</span>
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight text-glow-cyan">
                {developer.name}
              </h2>

              <p className="text-xs sm:text-sm font-mono font-bold text-sky-300 mt-0.5">
                {developer.role}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                {developer.dept}
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="py-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 mb-2 uppercase">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Developer Bio</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal bg-[#04091e]/60 p-3.5 rounded-2xl border border-cyan-500/20">
              {developer.bio}
            </p>
          </div>

          {/* Tech Stack / Skills Matrix */}
          <div className="py-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 mb-2.5 uppercase">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Tech Stack & Architecture</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {developer.skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-xl bg-cyan-950/70 border border-cyan-400/30 text-cyan-200 text-xs font-mono font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* CodeNite 2027 Engineering Contributions */}
          <div className="py-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 mb-2.5 uppercase">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Platform Contributions</span>
            </div>
            <div className="space-y-2">
              {developer.contributions?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links: GitHub, LinkedIn, Contact */}
          <div className="pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {developer.socials?.github && (
                <a
                  href={developer.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-200 hover:text-white border border-cyan-400/40 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Github className="w-4 h-4 text-cyan-300" />
                  <span>GitHub</span>
                </a>
              )}

              {developer.socials?.linkedin && (
                <a
                  href={developer.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-200 hover:text-white border border-cyan-400/40 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>

            {developer.socials?.email && (
              <a
                href={developer.socials.email}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-navy-950 font-heading font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Developer</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
