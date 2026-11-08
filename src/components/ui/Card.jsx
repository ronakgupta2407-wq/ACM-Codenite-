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
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
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
        "bg-navy-900/60 backdrop-blur-xl border border-acm-blue/20",
        "hover:border-acm-cyan/50 hover:shadow-glow-md",
        borderGlow && "before:absolute before:inset-0 before:rounded-2xl before:border before:border-transparent before:hover:border-acm-electric/40 before:pointer-events-none",
        onClick && "cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Radial Spotlight gradient following cursor */}
      {spotlight && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(450px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(56, 189, 248, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Subtle top reflective edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none rounded-t-2xl" />

      {/* Card Content with 3D depth */}
      <div className="relative z-10" style={{ transform: "translateZ(10px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
