import React, { useMemo } from "react";

export function BackgroundEffects() {
  // Generate random twinkling cyber stars
  const stars = useMemo(() => {
    return Array.from({ length: 55 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      color: i % 3 === 0 ? "bg-cyan-400" : i % 3 === 1 ? "bg-sky-300" : "bg-indigo-300",
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Space Obsidian Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040d] via-[#050b1d] to-[#020308]" />

      {/* Cyber Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)",
        }}
      />

      {/* Luminous Ambient Nebula Orbs */}
      <div className="absolute -top-[15%] left-[12%] w-[750px] h-[750px] rounded-full bg-cyan-500/15 blur-[160px] animate-pulse-slow" />
      <div className="absolute top-[30%] -right-[12%] w-[650px] h-[650px] rounded-full bg-sky-600/15 blur-[150px] animate-float" />
      <div className="absolute bottom-[25%] left-[3%] w-[680px] h-[680px] rounded-full bg-indigo-600/15 blur-[160px] animate-float-reverse" />
      <div className="absolute -bottom-[12%] right-[20%] w-[800px] h-[800px] rounded-full bg-acm-blue/15 blur-[180px]" />

      {/* High-Tech Perspective Horizon Glow (Top Beam) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-cyan-500/10 to-transparent blur-2xl" />

      {/* Subtle Dot Matrix Micro Grid */}
      <div className="absolute inset-0 bg-repeat opacity-[0.025] pointer-events-none bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Twinkling Cyber Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${star.color} opacity-40 animate-pulse`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Futuristic Telemetry HUD Watermarks (Fixed Corners) */}
      <div className="hidden xl:flex absolute top-20 left-8 items-center gap-2 text-[10px] font-mono text-cyan-400/40 uppercase tracking-widest pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-ping" />
        <span>SYS.STATUS // LAT 26.2302°N • LONG 78.2046°E // NODE.MITS.01</span>
      </div>

      <div className="hidden xl:flex absolute top-20 right-8 items-center gap-2 text-[10px] font-mono text-cyan-400/40 uppercase tracking-widest pointer-events-none">
        <span>// ACM MITS CHAPTER • CODENITE 2027 • T-MINUS 12H //</span>
      </div>

      {/* Circuit trace accent lines top right */}
      <svg
        className="absolute right-0 top-0 w-96 h-96 opacity-15 text-cyan-400 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M400 50 H 250 L 200 100 H 100 L 50 150 V 300"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <circle cx="250" cy="50" r="4" fill="currentColor" />
        <circle cx="200" cy="100" r="4" fill="currentColor" />
        <circle cx="50" cy="150" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}
