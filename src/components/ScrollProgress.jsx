import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[100] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-tech-blue via-tech-electric to-tech-cyan shadow-[0_0_12px_#38BDF8]"
        style={{ width: `${scrollPercentage}%` }}
        transition={{ ease: "easeOut", duration: 0.1 }}
      />
    </div>
  );
}
