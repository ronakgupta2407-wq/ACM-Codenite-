import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { EVENT_DATA } from "../data/codeniteData";

export function Team() {
  return (
    <section id="team" className="relative py-20 md:py-28 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Leadership & Directorate"
          title="Organized by"
          highlight="ACM MITS Student Chapter"
          subtitle="CodeNite 2027 is presented and organized under the official patronage of the ACM MITS Student Chapter executive leadership."
        />

        {/* ORGANIZING TEAM SECTION (EXACTLY 2 CARDS, NO PERSONAL NAMES) */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-tech-cyan animate-ping" />
            <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wider uppercase text-glow-cyan">
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
                  className="p-7 flex flex-col items-center text-center group bg-gradient-to-b from-[#101D3D]/95 via-[#0A1530]/95 to-[#050B1E]/98 border border-[rgba(96,165,250,0.25)] hover:border-tech-cyan hover:shadow-[0_15px_35px_rgba(5,11,30,0.9),0_0_25px_rgba(56,189,248,0.25)] transition-all relative overflow-hidden"
                >
                  {/* Top Neon Accent line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-tech-cyan to-transparent shadow-[0_0_12px_#38BDF8]" />

                  {/* Corner cyber brackets */}
                  <span className="absolute top-2 left-2 text-[8px] font-mono text-tech-cyan/40">┌</span>
                  <span className="absolute top-2 right-2 text-[8px] font-mono text-tech-cyan/40">┐</span>
                  <span className="absolute bottom-2 left-2 text-[8px] font-mono text-tech-cyan/40">└</span>
                  <span className="absolute bottom-2 right-2 text-[8px] font-mono text-tech-cyan/40">┘</span>

                  {/* ACM Emblem Avatar */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden p-1 bg-gradient-to-tr from-tech-blue via-tech-electric to-tech-cyan mb-5 shadow-[0_0_20px_rgba(56,189,248,0.35)] group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center p-2">
                      <img
                        src={card.image}
                        alt="ACM MITS Student Chapter"
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-3 py-0.5 rounded-full bg-tech-blue/20 text-tech-cyan border border-tech-cyan/40 shadow-sm mb-2 uppercase">
                    {card.badge}
                  </span>

                  {/* Directorate Role Header */}
                  <h3 className="font-heading font-black text-xl text-white group-hover:text-tech-cyan transition-colors mb-2 tracking-tight">
                    {card.role}
                  </h3>

                  <p className="text-xs text-tech-muted font-normal mb-6">
                    {card.dept}
                  </p>

                  {/* Chapter Social Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[rgba(96,165,250,0.2)] w-full justify-center">
                    {card.socials.instagram && (
                      <a
                        href={card.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-[#0A1530] border border-[rgba(96,165,250,0.25)] text-slate-300 hover:text-white hover:bg-tech-blue/20 hover:border-tech-cyan transition-all flex items-center gap-2 text-xs font-mono"
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
                        className="p-2.5 rounded-xl bg-[#0A1530] border border-[rgba(96,165,250,0.25)] text-slate-300 hover:text-white hover:bg-tech-blue/20 hover:border-tech-cyan transition-all flex items-center gap-2 text-xs font-mono"
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
    </section>
  );
}
