import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  DoorOpen,
  Flame,
  Terminal,
  Coffee,
  Code2,
  Sunrise,
  CheckCheck,
  Presentation,
  Trophy,
} from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { ChronoBot } from "../components/3d/ChronoBot";
import { EVENT_DATA } from "../data/codeniteData";
import { cn } from "../utils/cn";

export function Timeline() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const iconMap = {
    DoorOpen,
    Flame,
    Terminal,
    Coffee,
    Code2,
    Sunrise,
    CheckCheck,
    Presentation,
    Trophy,
  };

  return (
    <section id="timeline" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Event Schedule"
          title="The 12-Hour"
          highlight="Battleground Journey"
          subtitle="From campus reporting to midnight energy push, code freeze, and grand jury evaluation."
        />

        {/* 3D Animated ChronoBot */}
        <ChronoBot />

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto mt-12">
          {/* Static Center Line (Background track) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#101D3D] -translate-x-1/2" />

          {/* Animated Glowing Center Line on Scroll */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-tech-blue via-tech-electric to-tech-cyan shadow-[0_0_12px_#38BDF8] -translate-x-1/2"
          />

          {/* Timeline Nodes */}
          <div className="space-y-10 sm:space-y-12">
            {EVENT_DATA.timeline.map((item, index) => {
              const Icon = iconMap[item.icon] || Terminal;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.title}
                  className={cn(
                    "relative flex items-center",
                    "flex-col md:flex-row",
                    isEven ? "md:flex-row-reverse" : ""
                  )}
                >
                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8"
                  >
                    <Card
                      tilt={false}
                      spotlight
                      className={cn(
                        "p-5 sm:p-6 transition-all duration-300 hover:border-tech-cyan",
                        isEven ? "md:text-left" : "md:text-right"
                      )}
                    >
                      {/* Time & Date Header */}
                      <div
                        className={cn(
                          "flex items-center gap-2 mb-2 text-xs font-mono font-bold text-tech-cyan",
                          isEven ? "md:justify-start" : "md:justify-end"
                        )}
                      >
                        <span className="px-2 py-0.5 rounded-md bg-[#0A1530] border border-[rgba(96,165,250,0.3)]">
                          {item.date}
                        </span>
                        <span className="text-white font-extrabold">{item.time}</span>
                      </div>

                      {/* Title */}
                      <h4 className="font-heading font-extrabold text-lg sm:text-xl text-white mb-2">
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="text-tech-muted text-xs sm:text-sm leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </Card>
                  </motion.div>

                  {/* Pulsing Node in Center */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="absolute left-6 md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                  >
                    <div className="relative w-10 h-10 rounded-full bg-[#050B1E] border-2 border-tech-cyan flex items-center justify-center text-tech-cyan shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                      <Icon className="w-5 h-5" />
                      <span className="absolute -inset-1 rounded-full bg-tech-cyan/30 animate-ping -z-10" />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
