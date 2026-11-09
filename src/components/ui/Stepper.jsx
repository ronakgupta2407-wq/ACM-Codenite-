import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

export function Stepper({ steps, currentStep, onStepClick }) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-10 px-2 sm:px-4">
      <div className="relative flex items-center justify-between">
        {/* Continuous Connecting Line Behind */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-navy-800 -z-0" />

        {/* Animated Active Line */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 shadow-[0_0_15px_#00f0ff] -z-0 rounded-full"
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
                    ? "#0085CA"
                    : isActive
                    ? "#040d28"
                    : "#02040b",
                  borderColor: isCompleted || isActive ? "#00f0ff" : "#1e293b",
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-mono text-xs sm:text-sm font-bold shadow-md transition-shadow",
                  isActive && "shadow-[0_0_25px_rgba(0,240,255,0.7)] ring-4 ring-cyan-400/30",
                  isCompleted && "shadow-[0_0_15px_rgba(0,133,202,0.5)]"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                ) : (
                  <span
                    className={cn(
                      isActive ? "text-cyan-300 font-extrabold" : "text-slate-400"
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
                    ? "text-cyan-300 font-extrabold drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                    : isCompleted
                    ? "text-slate-200"
                    : "text-slate-400"
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
