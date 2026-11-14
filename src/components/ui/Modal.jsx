import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-2xl",
  className,
}) {
  const modalRef = useRef(null);

  // Close on ESC & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop Blur Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050B1E]/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card with Spring Physics */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={cn(
              "relative w-full z-10 rounded-2xl bg-[#101D3D]/95 border border-[rgba(96,165,250,0.3)] shadow-[0_15px_45px_rgba(5,11,30,0.9),0_0_25px_rgba(56,189,248,0.25)] backdrop-blur-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto my-auto custom-scrollbar",
              maxWidth,
              className
            )}
          >
            {/* Top reflective edge highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech-cyan/60 to-transparent pointer-events-none rounded-t-2xl" />

            {/* Header & Close Button */}
            <div className="flex items-start justify-between gap-4 mb-5 border-b border-[rgba(96,165,250,0.2)] pb-4">
              <div>
                {title && (
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-tech-muted text-xs sm:text-sm mt-1 font-mono">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-2 rounded-xl bg-[#0A1530] hover:bg-[#15244C] text-slate-300 hover:text-white border border-[rgba(96,165,250,0.3)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
