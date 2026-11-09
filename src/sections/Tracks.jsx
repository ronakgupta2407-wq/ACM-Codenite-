import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Boxes,
  ShieldAlert,
  Coins,
  Activity,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ListTodo,
  Lock,
} from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { Modal } from "../components/ui/Modal";
import { Button } from "../components/ui/Button";
import { EVENT_DATA } from "../data/codeniteData";

export function Tracks() {
  const [selectedTrack, setSelectedTrack] = useState(null);

  const iconMap = {
    Cpu,
    Boxes,
    ShieldAlert,
    Coins,
    Activity,
    Sparkles,
  };

  const handleSelectTrackToRegister = (trackTitle) => {
    setSelectedTrack(null);
    const regSection = document.getElementById("register");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="tracks" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Innovation Domains"
          title="Explore Hackathon"
          highlight="Themes & Tracks"
          subtitle="Choose the arena that sparks your passion. From artificial intelligence to decentralized systems and open innovation."
        />

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {EVENT_DATA.tracks.map((track, index) => {
            const Icon = iconMap[track.icon] || Cpu;

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  tilt
                  spotlight
                  onClick={() => setSelectedTrack(track)}
                  className="h-full flex flex-col justify-between group hover:border-acm-cyan transition-all duration-300"
                >
                  <div>
                    {/* Top row with icon & badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-navy-800/80 border border-acm-blue/30 flex items-center justify-center text-acm-cyan group-hover:bg-acm-blue/20 group-hover:scale-110 group-hover:border-acm-cyan transition-all">
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-navy-800 text-sky-300 border border-sky-400/20 group-hover:border-acm-cyan/50">
                        {track.badge}
                      </span>
                    </div>

                    {/* Track Title */}
                    <h3 className="font-heading font-bold text-xl text-white group-hover:text-acm-cyan transition-colors mb-3">
                      {track.title}
                    </h3>

                    {/* Track Short Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                      {track.description}
                    </p>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="pt-4 border-t border-acm-blue/20 flex items-center justify-between text-xs font-heading font-semibold text-sky-400 group-hover:text-white transition-colors">
                    <span className="flex items-center gap-1.5 text-amber-300">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Problem Statements: Coming Soon</span>
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Track Detail & Sample Problem Statements Modal */}
      <Modal
        isOpen={Boolean(selectedTrack)}
        onClose={() => setSelectedTrack(null)}
        title={selectedTrack?.title}
        subtitle={`Track Code: ${selectedTrack?.id?.toUpperCase()}`}
        maxWidth="max-w-2xl"
      >
        {selectedTrack && (
          <div className="space-y-6">
            {/* Overview Box */}
            <div className="p-4 rounded-xl bg-navy-800/60 border border-acm-blue/30 text-slate-200 text-sm leading-relaxed">
              {selectedTrack.details}
            </div>

            {/* Problem Statements Section with COMING SOON Banner */}
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/40 flex items-start gap-3.5 shadow-sm">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0 mt-0.5">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-black text-sm sm:text-base text-amber-300 uppercase tracking-wider">
                      Problem Statements: Coming Soon
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 animate-pulse">
                      LOCKED
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Official problem statements for this track will be unveiled live at the <strong>Opening Ceremony on 17 January 2027 (07:00 PM IST)</strong>. Form your team and secure your registration today!
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  <ListTodo className="w-4 h-4 text-acm-cyan" />
                  <span>Domain Scope & Focus Areas:</span>
                </div>

                <div className="space-y-2.5">
                  {selectedTrack.sampleProblems.map((statement, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-navy-950/70 border border-acm-blue/20 flex items-start gap-3 text-slate-300 text-xs sm:text-sm leading-relaxed hover:border-acm-cyan/40 transition-colors"
                    >
                      <span className="w-5 h-5 rounded-full bg-acm-blue/20 text-acm-cyan text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        0{idx + 1}
                      </span>
                      <div>
                        <span className="text-white font-medium">{statement}</span>
                        <div className="text-[11px] text-amber-300/80 font-mono mt-0.5">
                          Detailed problem statement challenge releasing on hackathon night • Stay tuned!
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-acm-blue/20">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTrack(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSelectTrackToRegister(selectedTrack.title)}
              >
                Register For This Track
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
