import React, { useMemo } from "react";

export function BackgroundEffects() {
  // Generate random twinkling stars
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      color: i % 3 === 0 ? "bg-tech-cyan" : i % 3 === 1 ? "bg-tech-electric" : "bg-tech-violet",
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* TechForge Deep Midnight Navy Base (#050B1E) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050B1E] via-[#0A1530] to-[#050B1E]" />

      {/* Cyber Grid Pattern with Smooth Perspective Radial Mask */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(96, 165, 250, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(96, 165, 250, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 35%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 35%, transparent 80%)",
        }}
      />

      {/* Atmospheric Radial Gradient Lighting - Electric Blue & Violet */}
      <div className="absolute -top-[15%] left-[10%] w-[800px] h-[800px] rounded-full bg-tech-electric/15 blur-[160px] animate-pulse-slow" />
      <div className="absolute top-[32%] -right-[15%] w-[700px] h-[700px] rounded-full bg-tech-cyan/12 blur-[170px] animate-float" />
      <div className="absolute bottom-[20%] left-[2%] w-[720px] h-[720px] rounded-full bg-tech-violet/15 blur-[180px] animate-float-reverse" />
      <div className="absolute -bottom-[10%] right-[25%] w-[850px] h-[850px] rounded-full bg-tech-blue/15 blur-[190px]" />

      {/* Top Cyber Glow Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-tech-cyan/60 to-transparent shadow-[0_0_12px_rgba(56,189,248,0.5)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-tech-cyan/10 to-transparent blur-3xl pointer-events-none" />

      {/* Subtle Dot Matrix Micro Grid */}
      <div className="absolute inset-0 bg-repeat opacity-[0.04] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Twinkling Tech Stars */}
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

      {/* Cyber Circuit Accent Traces */}
      <svg
        className="absolute right-0 top-0 w-96 h-96 opacity-20 text-tech-cyan pointer-events-none"
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
