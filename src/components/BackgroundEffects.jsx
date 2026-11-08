import React, { useMemo } from "react";

export function BackgroundEffects() {
  // Generate random twinkling stars
  const stars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Navy Dark Mesh Base */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Cyber Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial Gradient Ambient Mesh Orbs */}
      <div className="absolute -top-[15%] left-[10%] w-[650px] h-[650px] rounded-full bg-acm-blue/15 blur-[140px] animate-pulse-slow" />
      <div className="absolute top-[35%] -right-[10%] w-[550px] h-[550px] rounded-full bg-acm-cyan/10 blur-[130px] animate-float" />
      <div className="absolute bottom-[20%] left-[5%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px] animate-float-reverse" />
      <div className="absolute -bottom-[10%] right-[25%] w-[700px] h-[700px] rounded-full bg-acm-blue/10 blur-[160px]" />

      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 bg-repeat opacity-[0.015] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Twinkling Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white opacity-40 animate-pulse"
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

      {/* Circuit board accent lines top right */}
      <svg
        className="absolute right-0 top-0 w-96 h-96 opacity-10 text-cyan-400"
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
