import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Check } from "lucide-react";
import { cn } from "../../utils/cn";

export const Button = React.forwardRef(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      isSuccess = false,
      pulseRing = false,
      magnetic = false,
      disabled = false,
      icon: Icon,
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef(null);
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [ripples, setRipples] = useState([]);

    const handleMouseMove = (e) => {
      if (!magnetic || disabled || isLoading) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      setMouseOffset({ x: x * 0.25, y: y * 0.25 });
    };

    const handleMouseLeave = () => {
      setMouseOffset({ x: 0, y: 0 });
    };

    const handleClick = (e) => {
      if (disabled || isLoading) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rippleId = Date.now();

      setRipples((prev) => [...prev, { x, y, id: rippleId }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 700);

      if (onClick) onClick(e);
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-xs font-semibold gap-1.5 rounded-xl",
      md: "px-5 py-2.5 text-sm font-semibold gap-2 rounded-xl",
      lg: "px-7 py-3.5 text-base font-bold gap-2.5 rounded-xl",
    };

    const baseClasses =
      "relative inline-flex items-center justify-center font-heading tracking-wide transition-all duration-300 overflow-hidden cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-tech-cyan focus:ring-offset-2 focus:ring-offset-[#050B1E] disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-tech-blue via-tech-electric to-tech-cyan text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.55)] border border-tech-cyan/40 hover:brightness-110",
      secondary:
        "bg-[#101D3D]/90 hover:bg-[#15244C] text-white border border-[rgba(96,165,250,0.3)] hover:border-tech-cyan shadow-glass backdrop-blur-md",
      outline:
        "bg-transparent text-tech-cyan border border-tech-cyan/50 hover:text-white hover:border-tech-cyan hover:bg-tech-blue/20 shadow-sm",
      glow:
        "bg-tech-blue text-white shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] border border-tech-cyan/60 hover:bg-tech-electric",
      ghost:
        "bg-transparent text-slate-300 hover:text-white hover:bg-white/5 border border-transparent",
    };

    return (
      <div className="relative inline-flex group">
        {pulseRing && !disabled && (
          <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-tech-blue via-tech-electric to-tech-cyan opacity-40 blur-md group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse-slow pointer-events-none" />
        )}

        <motion.button
          ref={(node) => {
            buttonRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          type={type}
          disabled={disabled || isLoading}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ x: mouseOffset.x, y: mouseOffset.y }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
          {...props}
        >
          {ripples.map((r) => (
            <span
              key={r.id}
              className="absolute bg-white/25 rounded-full pointer-events-none animate-ping"
              style={{
                left: r.x - 10,
                top: r.y - 10,
                width: 20,
                height: 20,
              }}
            />
          ))}

          {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
          {isSuccess && <Check className="w-4 h-4 text-emerald-300 mr-1" />}
          {Icon && !isLoading && !isSuccess && <Icon className="w-4 h-4 mr-1" />}
          {children}
        </motion.button>
      </div>
    );
  }
);

Button.displayName = "Button";
