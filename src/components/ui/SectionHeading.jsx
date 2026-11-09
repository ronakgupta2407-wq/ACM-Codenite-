import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
}) {
  const alignment = {
    center: "items-center text-center mx-auto",
    left: "items-start text-left",
    right: "items-end text-right ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-14 md:mb-20 px-4", alignment[align], className)}>
      {/* Badge / Eyebrow */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase text-cyan-300 bg-cyan-950/40 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] mb-4 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 font-mono">//</span>
          {badge}
        </motion.div>
      )}

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight"
      >
        <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
          {title}
        </span>{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
            {highlight}
          </span>
        )}
      </motion.h2>

      {/* Futuristic Cyber Divider */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "120px", opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={cn(
          "h-0.5 relative my-5 flex items-center justify-center",
          align === "center" ? "mx-auto" : ""
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        <div className="w-2 h-2 rotate-45 bg-cyan-400 shadow-[0_0_10px_#00f0ff] relative z-10" />
      </motion.div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
