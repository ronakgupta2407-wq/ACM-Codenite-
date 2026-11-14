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
      className="relative p-6 rounded-2xl bg-[#101D3D]/90 border border-[rgba(96,165,250,0.22)] backdrop-blur-xl group hover:border-tech-cyan/60 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(5,11,30,0.8),0_0_20px_rgba(56,189,248,0.25)] flex flex-col items-center text-center overflow-hidden"
    >
      {/* Top micro-line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-tech-cyan/40 to-transparent group-hover:via-tech-cyan transition-colors" />

      {/* Cyber Corner Crosshairs */}
      <span className="absolute top-2 left-2 text-[9px] font-mono text-tech-cyan/30 group-hover:text-tech-cyan/70 transition-colors">+</span>
      <span className="absolute top-2 right-2 text-[9px] font-mono text-tech-cyan/30 group-hover:text-tech-cyan/70 transition-colors">+</span>

      <div className="w-12 h-12 rounded-xl bg-tech-blue/15 border border-tech-cyan/30 flex items-center justify-center text-tech-cyan mb-4 group-hover:scale-110 group-hover:border-tech-cyan/70 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.35)] transition-all">
        <Icon className="w-6 h-6" />
      </div>

      <div className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-1 bg-gradient-to-b from-white via-slate-100 to-tech-cyan bg-clip-text text-transparent">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>

      <div className="text-xs sm:text-sm font-mono text-tech-muted font-medium tracking-wide">
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

        {/* Two-Column Story / Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <Card tilt={false} spotlight className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-tech-blue/15 text-tech-cyan border border-tech-cyan/30 mb-5">
                <Rocket className="w-3.5 h-3.5" />
                <span>Our Flagship Hackathon Mission</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-4">
                Empowering the Next Generation of Engineers
              </h3>
              <p className="text-tech-muted text-sm sm:text-base leading-relaxed mb-4">
                CodeNite was born from a singular vision: to construct an electrifying overnight crucible where developers, designers, and innovators transform conceptual ideas into fully deployable software.
              </p>
              <p className="text-tech-muted text-sm sm:text-base leading-relaxed">
                Over 12 intense hours, participants collaborate in cross-disciplinary teams, interact directly with senior engineering mentors, and build solutions addressing real-world problem statements.
              </p>
            </div>
          </Card>

          <Card tilt={false} spotlight className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-tech-violet/15 text-tech-purple border border-tech-violet/30 mb-5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>The ACM MITS Community</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-4">
                Peer Learning, Open Source & Growth
              </h3>
              <p className="text-tech-muted text-sm sm:text-base leading-relaxed mb-4">
                As one of the most vibrant student computing organizations in Central India, ACM MITS hosts competitive programming contests, research reading groups, cloud workshops, and community bootcamps.
              </p>
              <p className="text-tech-muted text-sm sm:text-base leading-relaxed">
                CodeNite 2027 represents our largest gathering yet, welcoming students from all years and departments to test their limits and claim technical glory.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
