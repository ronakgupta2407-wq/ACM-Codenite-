import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

export function Stepper({ steps, currentStep, onStepClick }) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-10 px-2 sm:px-4">
      <div className="relative flex items-center justify-between">
        {/* Continuous Connecting Line Behind */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-[#101D3D] -z-0" />

        {/* Animated Active Line */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-tech-blue via-tech-electric to-tech-cyan shadow-[0_0_15px_#38BDF8] -z-0 rounded-full"
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={step.title}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
              onClick={() => onStepClick && isCompleted && onStepClick(stepNumber)}
            >
              {/* Step Circle Indicator */}
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.18 : 1,
                  backgroundColor: isCompleted
                    ? "#2563EB"
                    : isActive
                    ? "#101D3D"
                    : "#050B1E",
                  borderColor: isCompleted || isActive ? "#38BDF8" : "rgba(96, 165, 250, 0.25)",
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-mono text-xs sm:text-sm font-bold shadow-md transition-shadow",
                  isActive && "shadow-[0_0_25px_rgba(56,189,248,0.7)] ring-4 ring-tech-cyan/30",
                  isCompleted && "shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                ) : (
                  <span
                    className={cn(
                      isActive ? "text-tech-cyan font-extrabold" : "text-tech-muted"
                    )}
                  >
                    0{stepNumber}
                  </span>
                )}
              </motion.div>

              {/* Step Label */}
              <span
                className={cn(
                  "mt-2 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase text-center whitespace-nowrap transition-colors",
                  isActive
                    ? "text-tech-cyan font-extrabold drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                    : isCompleted
                    ? "text-slate-200"
                    : "text-tech-muted"
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
