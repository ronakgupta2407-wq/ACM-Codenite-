import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin, Mail, Code2, Sparkles, CheckCircle2, Terminal, Cpu, ExternalLink } from "lucide-react";

/**
 * DeveloperModal
 * High-tech modal card displaying developer profile,
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
          className="fixed inset-0 bg-[#050B1E]/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-gradient-to-b from-[#101D3D]/98 via-[#0A1530]/98 to-[#050B1E]/98 border border-[rgba(96,165,250,0.3)] rounded-3xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(5,11,30,0.9),0_0_35px_rgba(56,189,248,0.25)] z-10"
        >
          {/* Top Neon Laser Beam */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-tech-cyan to-transparent shadow-[0_0_15px_#38BDF8]" />

          {/* Corner Crosshairs */}
          <span className="absolute top-3 left-3 text-[10px] font-mono text-tech-cyan/50">+</span>
          <span className="absolute top-3 right-3 text-[10px] font-mono text-tech-cyan/50">+</span>
          <span className="absolute bottom-3 left-3 text-[10px] font-mono text-tech-cyan/50">+</span>
          <span className="absolute bottom-3 right-3 text-[10px] font-mono text-tech-cyan/50">+</span>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-[#0A1530] hover:bg-[#15244C] text-slate-300 hover:text-white border border-[rgba(96,165,250,0.3)] hover:border-tech-cyan transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 pb-6 border-b border-[rgba(96,165,250,0.2)]">
            <div className={`relative w-24 h-24 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr ${developer.avatarColor || "from-tech-cyan to-tech-blue"} shrink-0 shadow-[0_0_20px_rgba(56,189,248,0.35)]`}>
              <div className="w-full h-full rounded-[14px] bg-[#050B1E] flex flex-col items-center justify-center relative overflow-hidden border border-white/10">
                {developer.image ? (
                  <img src={developer.image} alt={developer.name} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-tech-cyan/15 to-transparent pointer-events-none" />
                    <span className="font-orbitron font-black text-2xl text-white tracking-wider">
                      {developer.initials || developer.name.split(" ").map(n => n[0]).join("")}
                    </span>
                    <span className="text-[10px] font-mono text-tech-cyan font-bold leading-none mt-1">
                      &lt;DEV/&gt;
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tech-blue/20 text-tech-cyan border border-tech-cyan/40 text-[10px] font-mono uppercase mb-2">
                <Sparkles className="w-3 h-3 text-tech-cyan" />
                <span>{developer.badge}</span>
              </div>
              <h3 className="font-heading font-black text-2xl text-white tracking-tight">
                {developer.name}
              </h3>
              <p className="text-xs font-mono text-tech-cyan font-medium mt-0.5">
                {developer.role}
              </p>
              <p className="text-xs text-tech-muted mt-2 leading-relaxed">
                {developer.bio}
              </p>
            </div>
          </div>

          {/* Tech Stack Matrix */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-tech-muted font-semibold">
              <Cpu className="w-3.5 h-3.5 text-tech-cyan" />
              <span>Core Tech Stack:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {developer.techStack?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-[#0A1530] border border-[rgba(96,165,250,0.25)] text-slate-200 text-xs font-mono font-medium hover:border-tech-cyan/60 hover:text-tech-cyan transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contributions list */}
          {developer.contributions && developer.contributions.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-tech-muted font-semibold">
                <Terminal className="w-3.5 h-3.5 text-tech-cyan" />
                <span>Key CodeNite Contributions:</span>
              </div>
              <div className="space-y-2">
                {developer.contributions.map((contrib, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#050B1E] border border-[rgba(96,165,250,0.18)] flex items-start gap-2.5 text-xs text-tech-muted"
                  >
                    <CheckCircle2 className="w-4 h-4 text-tech-cyan shrink-0 mt-0.5" />
                    <span>{contrib}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links Footer */}
          <div className="pt-4 border-t border-[rgba(96,165,250,0.2)] flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-tech-muted">
              Connect with {developer.name.split(" ")[0]}:
            </span>
            <div className="flex items-center gap-2">
              {developer.socials?.github && (
                <a
                  href={developer.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#0A1530] hover:bg-tech-blue/20 text-slate-200 hover:text-tech-cyan border border-[rgba(96,165,250,0.3)] hover:border-tech-cyan text-xs font-mono flex items-center gap-1.5 transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {developer.socials?.linkedin && (
                <a
                  href={developer.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#0A1530] hover:bg-tech-blue/20 text-slate-200 hover:text-tech-cyan border border-[rgba(96,165,250,0.3)] hover:border-tech-cyan text-xs font-mono flex items-center gap-1.5 transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                  <span>LinkedIn</span>
                </a>
              )}
              {developer.socials?.email && (
                <a
                  href={`mailto:${developer.socials.email}`}
                  className="px-3 py-1.5 rounded-xl bg-[#0A1530] hover:bg-tech-blue/20 text-slate-200 hover:text-tech-cyan border border-[rgba(96,165,250,0.3)] hover:border-tech-cyan text-xs font-mono flex items-center gap-1.5 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
