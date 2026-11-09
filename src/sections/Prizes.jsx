import React from "react";
import { motion } from "framer-motion";
import { Trophy, Award, CheckCircle2, Cpu, Boxes, ShieldCheck, GraduationCap, Sparkles } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { EVENT_DATA } from "../data/codeniteData";
import { cn } from "../utils/cn";

export function Prizes() {
  const specialIcons = {
    Cpu,
    Boxes,
    ShieldCheck,
    GraduationCap,
  };

  return (
    <section id="prizes" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Bounties & Glory"
          title="₹1,50,000+ Prize Pool &"
          highlight="Championship Awards"
          subtitle="Compete for hard cash, prestigious ACM trophies, direct industry interview fast-tracks, and high-value developer swag."
        />

        {/* Podium Style Main Prizes (2nd, 1st, 3rd) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto mb-20">
          {EVENT_DATA.prizes.map((prize, idx) => {
            return (
              <motion.div
                key={prize.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={cn("w-full", prize.order)}
              >
                <div
                  className={cn(
                    "relative rounded-2xl p-6 sm:p-7 backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group",
                    prize.isPopular 
                      ? "bg-gradient-to-b from-[#1c1506]/90 via-[#0d0918]/95 to-[#050410]/95 border-amber-500/50 md:-translate-y-5 shadow-[0_0_35px_rgba(245,158,11,0.22)] ring-1 ring-amber-400/40" 
                      : "bg-gradient-to-b from-[#0b132b]/80 via-[#070b1f]/90 to-[#020412]/95 border-cyan-500/25 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.18)]"
                  )}
                >
                  {/* Top Neon Accent Line */}
                  <div className={cn(
                    "absolute top-0 left-0 right-0 h-0.5",
                    prize.isPopular
                      ? "bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                      : "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  )} />

                  {/* Corner cyber ticks */}
                  <span className="absolute top-2 left-2 text-[8px] font-mono text-cyan-500/30">┌</span>
                  <span className="absolute top-2 right-2 text-[8px] font-mono text-cyan-500/30">┐</span>
                  <span className="absolute bottom-2 left-2 text-[8px] font-mono text-cyan-500/30">└</span>
                  <span className="absolute bottom-2 right-2 text-[8px] font-mono text-cyan-500/30">┘</span>

                  {/* Popular Banner for 1st Place */}
                  {prize.isPopular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black text-[10px] font-heading font-black tracking-widest uppercase px-3.5 py-1 rounded-bl-xl shadow-lg">
                        ★ GRAND WINNER
                      </div>
                    </div>
                  )}

                  {/* Top Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center border font-orbitron font-black text-xl shadow-inner",
                          prize.isPopular
                            ? "bg-amber-400/20 text-amber-300 border-amber-400/50"
                            : "bg-navy-800 text-slate-200 border-acm-blue/30"
                        )}
                      >
                        {prize.place}
                      </div>

                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-navy-950/80 text-slate-300 border border-white/10">
                        {prize.badge}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-2xl text-white mb-1">
                      {prize.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mb-6 uppercase tracking-wider">
                      {prize.rank}
                    </p>

                    {/* Big Cash Amount */}
                    <div className="font-orbitron font-black text-4xl text-white tracking-tight mb-6 bg-gradient-to-r from-white via-sky-200 to-acm-cyan bg-clip-text text-transparent">
                      {prize.cash}
                    </div>

                    {/* Perks List */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      {prize.perks.map((perk, pIndex) => (
                        <div key={pIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2
                            className={cn(
                              "w-4 h-4 shrink-0 mt-0.5",
                              prize.isPopular ? "text-amber-400" : "text-sky-400"
                            )}
                          />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Accents */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center">
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-acm-cyan" /> Official ACM Chapter Honor
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Special Category Track Prizes */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Special Category Awards
            </h3>
            <p className="text-sm font-mono text-acm-cyan mt-1">
              ₹50,000 in Domain-Specific Accolades
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVENT_DATA.specialPrizes.map((spec, index) => {
              const Icon = specialIcons[spec.icon] || Award;

              return (
                <motion.div
                  key={spec.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card tilt spotlight className="h-full flex flex-col justify-between p-6">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-navy-800 border border-acm-blue/30 flex items-center justify-center text-acm-cyan mb-4">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="font-orbitron font-extrabold text-2xl text-white mb-1 bg-gradient-to-r from-sky-300 to-acm-cyan bg-clip-text text-transparent">
                        {spec.cash}
                      </div>

                      <h4 className="font-heading font-bold text-base text-white mb-2">
                        {spec.category}
                      </h4>

                      <p className="text-slate-400 text-xs leading-relaxed font-normal">
                        {spec.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-acm-blue/20 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-acm-cyan" />
                      <span>Cash + Merit Certificate</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
