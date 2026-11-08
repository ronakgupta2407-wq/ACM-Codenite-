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
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-acm-blue via-sky-400 to-acm-cyan -z-0"
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
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isCompleted
                    ? "#0085CA"
                    : isActive
                    ? "#0A1128"
                    : "#020617",
                  borderColor: isCompleted || isActive ? "#22D3EE" : "#1e293b",
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center font-mono text-xs sm:text-sm font-bold shadow-md transition-shadow",
                  isActive && "shadow-glow-cyan ring-4 ring-acm-cyan/20",
                  isCompleted && "shadow-glow-sm"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                ) : (
                  <span
                    className={cn(
                      isActive ? "text-acm-cyan font-extrabold" : "text-slate-400"
                    )}
                  >
                    {stepNumber}
                  </span>
                )}
              </motion.div>

              {/* Step Label */}
              <span
                className={cn(
                  "mt-2 text-[10px] sm:text-xs font-heading font-medium tracking-wide text-center whitespace-nowrap transition-colors",
                  isActive
                    ? "text-acm-cyan font-bold"
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
