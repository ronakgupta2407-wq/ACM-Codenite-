import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, Shield, Sparkles, Instagram, ExternalLink } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { DeveloperModal } from "../components/ui/DeveloperModal";
import { EVENT_DATA } from "../data/codeniteData";

export function Team() {
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  return (
    <section id="team" className="relative py-20 md:py-28 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Architects & Leadership"
          title="Engineered by Developers &"
          highlight="ACM MITS Chapter"
          subtitle="Built with passion by core student developers and organized under the official patronage of ACM MITS Student Chapter."
        />

        {/* 1. CORE DEVELOPERS SECTION */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wider uppercase text-glow-cyan text-center">
              &lt;Lead Platform Developers/&gt;
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {EVENT_DATA.developers.map((dev, index) => (
              <motion.div
                key={dev.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onClick={() => setSelectedDeveloper(dev)}
                className="cursor-pointer"
              >
                <Card
                  tilt
                  spotlight
                  className="p-6 sm:p-7 flex flex-col items-center text-center group bg-gradient-to-b from-[#09163e]/90 via-[#050d28]/95 to-[#020516]/98 border-2 border-cyan-400/40 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] transition-all relative overflow-hidden"
                >
                  {/* Top Neon Accent line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00f0ff]" />

                  {/* Corner cyber brackets */}
                  <span className="absolute top-2 left-2 text-[8px] font-mono text-cyan-400/40">┌</span>
                  <span className="absolute top-2 right-2 text-[8px] font-mono text-cyan-400/40">┐</span>
                  <span className="absolute bottom-2 left-2 text-[8px] font-mono text-cyan-400/40">└</span>
                  <span className="absolute bottom-2 right-2 text-[8px] font-mono text-cyan-400/40">┘</span>

                  {/* Click to view modal pill */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-[9px] font-mono text-cyan-300 flex items-center gap-1 group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                    <span>View Details</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>

                  {/* Avatar with cyan neon border ring */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden p-1 bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-500 mb-4 sm:mb-5 shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className="w-full h-full object-cover rounded-2xl"
                      loading="lazy"
                    />
                  </div>

                  <span className="text-[10px] font-mono font-bold px-3 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-400/40 shadow-sm mb-2 uppercase">
                    {dev.badge}
                  </span>

                  {/* Developer Name */}
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors mb-1 tracking-tight">
                    {dev.name}
                  </h3>

                  <p className="text-xs font-mono font-bold text-sky-300 mb-1">
                    {dev.role}
                  </p>
                  <p className="text-xs text-slate-400 font-normal mb-5">
                    {dev.dept}
                  </p>

                  {/* Social Links & View Profile CTA */}
                  <div className="flex items-center gap-3 pt-3 border-t border-cyan-500/20 w-full justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDeveloper(dev);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/50 text-xs font-mono font-bold text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Full Profile & Stack</span>
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. ORGANIZING TEAM SECTION (EXACTLY 2 CARDS, NO PERSONAL NAMES) */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wider uppercase text-glow-purple">
              Organizing Directorate & Operations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {EVENT_DATA.team.map((card, index) => (
              <motion.div
                key={card.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card
                  tilt
                  spotlight
                  className="p-7 flex flex-col items-center text-center group bg-gradient-to-b from-[#110a28]/90 via-[#0a061c]/95 to-[#03020c]/98 border-2 border-purple-400/35 hover:border-purple-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] transition-all relative overflow-hidden"
                >
                  {/* Top Neon Accent line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_12px_#a855f7]" />

                  {/* Corner cyber brackets */}
                  <span className="absolute top-2 left-2 text-[8px] font-mono text-purple-400/40">┌</span>
                  <span className="absolute top-2 right-2 text-[8px] font-mono text-purple-400/40">┐</span>
                  <span className="absolute bottom-2 left-2 text-[8px] font-mono text-purple-400/40">└</span>
                  <span className="absolute bottom-2 right-2 text-[8px] font-mono text-purple-400/40">┘</span>

                  {/* ACM Emblem Avatar */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden p-1 bg-gradient-to-tr from-purple-500 via-indigo-400 to-cyan-500 mb-5 shadow-[0_0_20px_rgba(168,85,247,0.35)] group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center p-2">
                      <img
                        src={card.image}
                        alt="ACM MITS Student Chapter"
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-3 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-400/40 shadow-sm mb-2 uppercase">
                    {card.badge}
                  </span>

                  {/* Directorate Role Header */}
                  <h3 className="font-heading font-black text-xl text-white group-hover:text-purple-300 transition-colors mb-2 tracking-tight">
                    {card.role}
                  </h3>

                  <p className="text-xs text-slate-400 font-normal mb-6">
                    {card.dept}
                  </p>

                  {/* Chapter Social Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-purple-500/20 w-full justify-center">
                    {card.socials.instagram && (
                      <a
                        href={card.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-navy-900 border border-purple-500/30 text-slate-300 hover:text-white hover:bg-purple-500/20 hover:border-purple-400 transition-all flex items-center gap-2 text-xs font-mono"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-4 h-4 text-pink-400" />
                        <span>@acm.mits</span>
                      </a>
                    )}
                    {card.socials.linkedin && (
                      <a
                        href={card.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-navy-900 border border-purple-500/30 text-slate-300 hover:text-white hover:bg-purple-500/20 hover:border-purple-400 transition-all flex items-center gap-2 text-xs font-mono"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4 text-sky-400" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Cyber Developer Profile Popup Modal */}
      <DeveloperModal
        developer={selectedDeveloper}
        isOpen={!!selectedDeveloper}
        onClose={() => setSelectedDeveloper(null)}
      />
    </section>
  );
}
