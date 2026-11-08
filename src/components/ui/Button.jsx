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

      // Ripple effect
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

    // Size variants
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs font-semibold gap-1.5 rounded-lg",
      md: "px-5 py-2.5 text-sm font-semibold gap-2 rounded-xl",
      lg: "px-7 py-3.5 text-base font-bold gap-2.5 rounded-xl",
    };

    // Variant styles
    const baseClasses =
      "relative inline-flex items-center justify-center font-heading tracking-wide transition-colors duration-300 overflow-hidden cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-acm-electric focus:ring-offset-2 focus:ring-offset-navy-950 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-acm-blue via-sky-500 to-acm-cyan text-white shadow-glow-sm hover:shadow-glow-md hover:from-sky-500 hover:to-acm-electric border border-cyan-400/30",
      secondary:
        "bg-navy-800/80 hover:bg-navy-700/80 text-white border border-acm-blue/40 hover:border-acm-cyan shadow-glass backdrop-blur-md",
      outline:
        "bg-transparent text-sky-300 border border-sky-400/50 hover:text-white hover:border-acm-cyan hover:bg-acm-blue/15 shadow-sm",
      glow:
        "bg-acm-blue text-white shadow-glow-md hover:shadow-glow-lg border border-acm-cyan/60 hover:bg-sky-500",
      ghost:
        "bg-transparent text-slate-300 hover:text-white hover:bg-white/5 border border-transparent",
    };

    return (
      <div className="relative inline-flex group">
        {/* Continuous pulse ring for CTA */}
        {pulseRing && !disabled && (
          <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-acm-blue to-acm-cyan opacity-40 blur-md group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse-slow pointer-events-none" />
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
          whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
          whileTap={{ scale: disabled ? 1 : 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
          {...props}
        >
          {/* Animated shine sweep on hover for primary/glow */}
          {(variant === "primary" || variant === "glow") && (
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-[200%] group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out pointer-events-none" />
          )}

          {/* Outline fill-slide animation */}
          {variant === "outline" && (
            <span className="absolute inset-0 bg-gradient-to-r from-acm-blue/20 to-sky-500/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out pointer-events-none" />
          )}

          {/* Ripple elements */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full bg-white/30 animate-ping pointer-events-none"
              style={{
                left: ripple.x - 20,
                top: ripple.y - 20,
                width: 40,
                height: 40,
              }}
            />
          ))}

          {/* Content / Morphing States */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Processing...</span>
              </>
            ) : isSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span>Success!</span>
              </>
            ) : (
              <>
                {Icon && <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />}
                {children}
              </>
            )}
          </span>
        </motion.button>
      </div>
    );
  }
);

Button.displayName = "Button";
