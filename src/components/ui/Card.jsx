import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function Card({
  children,
  className,
  tilt = true,
  spotlight = true,
  borderGlow = true,
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (spotlight) {
      setSpotlightPos({ x, y });
    }

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      setRotate({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setSpotlightPos({ x: -200, y: -200 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={
        tilt
          ? {
              rotateX: rotate.x,
              rotateY: rotate.y,
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-300",
        "bg-gradient-to-b from-[#101D3D]/90 via-[#0C1733]/92 to-[#050B1E]/95 backdrop-blur-2xl border border-[rgba(96,165,250,0.22)]",
        "hover:border-tech-cyan/60 hover:shadow-[0_15px_35px_rgba(5,11,30,0.9),0_0_25px_rgba(56,189,248,0.25)]",
        borderGlow && "before:absolute before:inset-0 before:rounded-2xl before:border before:border-transparent before:hover:border-tech-cyan/30 before:pointer-events-none",
        onClick && "cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Cyber Corner HUD crosshairs */}
      <span className="absolute top-2.5 left-2.5 text-[9px] font-mono text-tech-cyan/30 select-none pointer-events-none">+</span>
      <span className="absolute top-2.5 right-2.5 text-[9px] font-mono text-tech-cyan/30 select-none pointer-events-none">+</span>
      <span className="absolute bottom-2.5 left-2.5 text-[9px] font-mono text-tech-cyan/30 select-none pointer-events-none">+</span>
      <span className="absolute bottom-2.5 right-2.5 text-[9px] font-mono text-tech-cyan/30 select-none pointer-events-none">+</span>

      {/* Radial Spotlight gradient following cursor */}
      {spotlight && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(56, 189, 248, 0.16), transparent 75%)`,
          }}
        />
      )}

      {/* Top reflective neon edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech-cyan/60 to-transparent pointer-events-none rounded-t-2xl" />

      {/* Card Content with 3D depth */}
      <div className="relative z-10" style={{ transform: "translateZ(8px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
