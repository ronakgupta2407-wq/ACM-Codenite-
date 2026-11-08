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
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-acm-cyan bg-acm-blue/10 border border-acm-cyan/30 shadow-sm mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-acm-cyan animate-ping" />
          {badge}
        </motion.div>
      )}

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight"
      >
        {title}{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-sky-400 via-acm-cyan to-indigo-400 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </motion.h2>

      {/* Animated Underline Sweep */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "80px", opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={cn(
          "h-1 rounded-full bg-gradient-to-r from-acm-blue via-acm-cyan to-transparent my-4",
          align === "center" ? "mx-auto" : ""
        )}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
