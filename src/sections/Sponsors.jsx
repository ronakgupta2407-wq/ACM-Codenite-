import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../components/ui/SectionHeading";
import { EVENT_DATA } from "../data/codeniteData";

export function Sponsors() {
  const sponsors = [...EVENT_DATA.sponsors, ...EVENT_DATA.sponsors];

  return (
    <section id="sponsors" className="relative py-16 md:py-24 overflow-hidden border-y border-acm-blue/15 bg-navy-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <SectionHeading
          badge="Ecosystem Backers"
          title="Powered by Industry"
          highlight="Partners & Sponsors"
          subtitle="Backed by visionary developer platforms and technology leaders empowering student builders."
        />
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden flex">
        {/* Left & Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
          className="flex gap-6 sm:gap-8 items-center whitespace-nowrap"
        >
          {sponsors.map((sponsor, index) => (
            <div
              key={`${sponsor.name}-${index}`}
              className="group relative flex flex-col items-center justify-center p-6 sm:p-8 min-w-[200px] sm:min-w-[240px] rounded-2xl bg-navy-900/70 border border-acm-blue/20 backdrop-blur-md transition-all duration-300 hover:border-acm-cyan hover:shadow-glow-sm cursor-pointer"
            >
              <div className="font-heading font-black text-lg sm:text-xl text-slate-400 group-hover:text-white transition-colors duration-300 filter grayscale group-hover:grayscale-0">
                {sponsor.logoText}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-acm-cyan/80 mt-1">
                {sponsor.tier}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
