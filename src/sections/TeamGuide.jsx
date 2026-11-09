import React from "react";
import { motion } from "framer-motion";
import { UsersRound, Zap, Shield, Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { EVENT_DATA } from "../data/codeniteData";

export function TeamGuide() {
  const scrollToRegisterWithSize = (size) => {
    const regSection = document.getElementById("register");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="guide" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Squad Formation Blueprint"
          title="Team Sizing"
          highlight="Visual Explainer"
          subtitle="CodeNite permits squads of 4 to 6 members. Review role architectures to pick what suits your team best."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {EVENT_DATA.teamGuide.models.map((model, idx) => (
            <motion.div
              key={model.size}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Card tilt spotlight className="h-full flex flex-col justify-between p-7 sm:p-8">
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-acm-blue/20 text-acm-cyan border border-acm-cyan/40">
                      {model.size === 4 ? <Zap className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                      {model.badge}
                    </span>

                    <div className="w-10 h-10 rounded-xl bg-navy-800 border border-acm-blue/30 flex items-center justify-center font-orbitron font-extrabold text-lg text-white">
                      {model.size}
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl text-white mb-2">
                    Squad of {model.size} Members
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                    {model.tagline}
                  </p>

                  {/* Recommended Roles Breakdown */}
                  <div className="space-y-3.5 mb-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Recommended Role Distribution:
                    </div>
                    {model.roles.map((r, rIdx) => (
                      <div
                        key={rIdx}
                        className="p-3 rounded-xl bg-navy-950/60 border border-acm-blue/20 flex flex-col gap-0.5"
                      >
                        <div className="font-heading font-bold text-xs sm:text-sm text-sky-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-acm-cyan" />
                          {r.role}
                        </div>
                        <div className="text-xs text-slate-400 pl-3.5 font-normal">
                          {r.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Ideal For note */}
                  <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-600/20 text-xs text-slate-300 mb-6">
                    <strong className="text-white">Best suited for: </strong>
                    {model.idealFor}
                  </div>

                  <Button
                    variant={model.size === 5 ? "primary" : model.size === 4 ? "secondary" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => scrollToRegisterWithSize(model.size)}
                  >
                    Register a {model.size}-Member Team
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
