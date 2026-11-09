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
    </section>
  );
}
