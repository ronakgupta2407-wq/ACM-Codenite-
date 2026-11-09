import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Flame, Trophy, Clock, Code, Award, Lightbulb, Rocket } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { RobotProfessor } from "../components/3d/RobotProfessor";
import { EVENT_DATA } from "../data/codeniteData";

function StatCounter({ value, prefix = "", suffix = "", label, icon: IconName }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1800; // ms
    const increment = Math.ceil(end / (duration / 25));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const icons = {
    Users,
    Flame,
    Trophy,
    Clock,
  };

  const Icon = icons[IconName] || Trophy;

  return (
    <div
      ref={ref}
      className="relative p-6 rounded-2xl cyber-panel group hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.18)] flex flex-col items-center text-center overflow-hidden"
    >
      {/* Top micro-line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent group-hover:via-cyan-400 transition-colors" />

      {/* Cyber Corner Crosshairs */}
      <span className="absolute top-2 left-2 text-[9px] font-mono text-cyan-500/30 group-hover:text-cyan-400/70 transition-colors">+</span>
      <span className="absolute top-2 right-2 text-[9px] font-mono text-cyan-500/30 group-hover:text-cyan-400/70 transition-colors">+</span>

      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-acm-cyan mb-4 group-hover:scale-110 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
        <Icon className="w-6 h-6" />
      </div>

      <div className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-1 bg-gradient-to-b from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>

      <div className="text-xs sm:text-sm font-mono text-slate-400 font-medium tracking-wide">
        {label}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="About The Hackathon & Chapter"
          title="Building Tomorrow's Tech at"
          highlight="MITS Gwalior"
          subtitle="ACM MITS Student Chapter stands at the nexus of student innovation, peer mentorship, and cutting-edge software development."
        />

        {/* 3D Animated Robot Professor ("Dr. Byte") */}
        <RobotProfessor />

        {/* Animated Stat Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {EVENT_DATA.stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Two Story Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Pillar 1: About ACM MITS Student Chapter */}
          <Card tilt={false} spotlight className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-acm-blue/20 border border-acm-cyan/40 text-acm-cyan">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                    ACM MITS Student Chapter
                  </h3>
                  <p className="text-xs font-mono text-acm-cyan">Established 2014 • MITS Gwalior</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                Chartered under the global Association for Computing Machinery (ACM), our student chapter at Madhav Institute of Technology & Science nurtures passionate engineers through hands-on technical workshops, competitive programming leagues, and open-source hackathons.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                With a decade of technical legacy, we connect driven student developers with industry veterans, Google Summer of Code mentors, and top-tier technological opportunities.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-acm-blue/20">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-300">
                <Code className="w-4 h-4 text-acm-cyan" />
                <span>Peer-Led Tech Culture</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-300">
                <Award className="w-4 h-4 text-acm-cyan" />
                <span>Global ACM Network</span>
              </div>
            </div>
          </Card>

          {/* Pillar 2: About CodeNite */}
          <Card tilt={false} spotlight className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-400">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                    The CodeNite Legacy
                  </h3>
                  <p className="text-xs font-mono text-indigo-300">12 Hours Overnight Hackathon</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                <strong>CodeNite</strong> is designed to test your resilience, architectural agility, and product thinking under the midnight clock. Over 12 rigorous overnight hours, teams conceive, architect, prototype, and push deploy-ready solutions.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                From high-speed campus internet, continuous power backups, and midnight energy refreshments, to 1-on-1 industry mentor checkpoints — we provide everything your squad needs to code through the night.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-acm-blue/20">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>4 to 6 Members / Squad</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Cross-College Squads Allowed</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
