import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * CodeNite3DCore
 * High-tech 3D holographic isometric cube and multi-axis gyroscope
 * completely branded around CodeNite Hackathon with interactive mouse tilt.
 */
export function CodeNite3DCore({ progress = 0 }) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Track mouse movement across window for 3D interactive parallax tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX / innerWidth - 0.5) * 35; // deg
      const yOffset = (e.clientY / innerHeight - 0.5) * -35; // deg
      setTilt({ x: yOffset, y: xOffset });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const size = 110; // cube size in px
  const halfSize = size / 2;

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center perspective-1000 select-none"
    >
      {/* Dynamic 3D Rig with mouse parallax */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="relative w-full h-full flex items-center justify-center preserve-3d"
      >
        {/* Ambient Volumetric Hologram Orb */}
        <div className="absolute w-48 h-48 rounded-full bg-cyan-500/20 blur-[50px] animate-pulse pointer-events-none" />
        <div className="absolute w-36 h-36 rounded-full bg-indigo-500/25 blur-[40px] pointer-events-none" />

        {/* 3D Gyroscope Ring 1 (Cyan X-axis Orbit) */}
        <div className="absolute w-56 h-56 rounded-full border border-cyan-400/35 border-dashed animate-gyro-x pointer-events-none preserve-3d">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#22D3EE]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
        </div>

        {/* 3D Gyroscope Ring 2 (Purple Y-axis Orbit) */}
        <div className="absolute w-48 h-48 rounded-full border border-indigo-400/40 animate-gyro-y pointer-events-none preserve-3d">
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_12px_#818CF8]" />
        </div>

        {/* 3D Gyroscope Ring 3 (Electric Cyan Z-axis Track with ticks) */}
        <div className="absolute w-60 h-60 rounded-full border border-cyan-500/20 animate-gyro-z pointer-events-none preserve-3d">
          <span className="absolute -top-1 left-1/2 text-[8px] font-mono text-cyan-400 font-bold -translate-x-1/2">
            01
          </span>
          <span className="absolute -bottom-1 left-1/2 text-[8px] font-mono text-cyan-400 font-bold -translate-x-1/2">
            02
          </span>
        </div>

        {/* 3D Rotating CodeNite Cube Container */}
        <div className="relative w-[110px] h-[110px] preserve-3d animate-cube-spin">
          {/* FACE 1: FRONT - <CODE/> */}
          <div
            style={{ transform: `translateZ(${halfSize}px)` }}
            className="absolute inset-0 rounded-2xl bg-[#03091e]/90 border-2 border-cyan-400/80 backdrop-blur-xl flex flex-col items-center justify-center p-2 shadow-[0_0_25px_rgba(6,182,212,0.5)] backface-visible"
          >
            <span className="text-[9px] font-mono text-cyan-400/70 tracking-widest uppercase">
              // HACK
            </span>
            <div className="font-orbitron font-black text-xl text-white tracking-wider text-glow-cyan flex items-center gap-1">
              &lt;CODE&gt;
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[8px] font-mono text-cyan-300">ONLINE</span>
            </div>
          </div>

          {/* FACE 2: BACK - NITE */}
          <div
            style={{ transform: `rotateY(180deg) translateZ(${halfSize}px)` }}
            className="absolute inset-0 rounded-2xl bg-[#0b0520]/90 border-2 border-purple-400/80 backdrop-blur-xl flex flex-col items-center justify-center p-2 shadow-[0_0_25px_rgba(168,85,247,0.5)] backface-visible"
          >
            <span className="text-[9px] font-mono text-purple-400/70 tracking-widest uppercase">
              // 12 HOURS
            </span>
            <div className="font-orbitron font-black text-xl text-purple-200 tracking-wider text-glow-purple">
              NITE
            </div>
            <div className="mt-1 text-[8px] font-mono text-purple-300">
              OVERNIGHT
            </div>
          </div>

          {/* FACE 3: RIGHT - 2027 */}
          <div
            style={{ transform: `rotateY(90deg) translateZ(${halfSize}px)` }}
            className="absolute inset-0 rounded-2xl bg-[#020b1c]/90 border-2 border-sky-400/80 backdrop-blur-xl flex flex-col items-center justify-center p-2 shadow-[0_0_25px_rgba(56,189,248,0.5)] backface-visible"
          >
            <span className="text-[9px] font-mono text-sky-400/70 tracking-widest uppercase">
              EDITION
            </span>
            <div className="font-orbitron font-black text-2xl text-white tracking-widest bg-gradient-to-r from-sky-200 via-white to-cyan-300 bg-clip-text text-transparent">
              2027
            </div>
            <span className="text-[8px] font-mono text-cyan-300">MITS GWL</span>
          </div>

          {/* FACE 4: LEFT - { / } BRACKETS */}
          <div
            style={{ transform: `rotateY(-90deg) translateZ(${halfSize}px)` }}
            className="absolute inset-0 rounded-2xl bg-[#051128]/90 border-2 border-cyan-400/80 backdrop-blur-xl flex flex-col items-center justify-center p-2 shadow-[0_0_25px_rgba(6,182,212,0.5)] backface-visible"
          >
            <span className="text-[8px] font-mono text-cyan-400">DEV MATRIX</span>
            <div className="font-orbitron font-black text-3xl text-cyan-300">
              &#123; &#47; &#125;
            </div>
            <span className="text-[8px] font-mono text-slate-400">1500+ HACK</span>
          </div>

          {/* FACE 5: TOP - TERMINAL PROMPT */}
          <div
            style={{ transform: `rotateX(90deg) translateZ(${halfSize}px)` }}
            className="absolute inset-0 rounded-2xl bg-[#01091a]/95 border-2 border-cyan-500/70 backdrop-blur-xl flex flex-col items-center justify-center p-2 backface-visible shadow-inner"
          >
            <div className="text-[9px] font-mono font-bold text-cyan-300">
              $_ CODENITE
            </div>
            <div className="text-[8px] font-mono text-slate-400">EXECUTE 12H</div>
          </div>

          {/* FACE 6: BOTTOM - HEX CODES */}
          <div
            style={{ transform: `rotateX(-90deg) translateZ(${halfSize}px)` }}
            className="absolute inset-0 rounded-2xl bg-[#020514]/95 border-2 border-purple-500/70 backdrop-blur-xl flex flex-col items-center justify-center p-2 backface-visible shadow-inner"
          >
            <div className="text-[8px] font-mono text-purple-300 font-bold">
              0xCODENITE
            </div>
            <div className="text-[7px] font-mono text-slate-400">
              READY : {progress}%
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
