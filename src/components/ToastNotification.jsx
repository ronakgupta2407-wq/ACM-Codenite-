import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, ArrowRight } from "lucide-react";

export function ToastNotification() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show toast after 4 seconds of reading
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToRegister = () => {
    setIsVisible(false);
    const regSection = document.getElementById("register");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md p-4 rounded-2xl bg-navy-900/95 border border-sky-400/40 shadow-glow-md backdrop-blur-xl"
        >
          {/* Top highlight bar */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-acm-blue via-acm-cyan to-transparent rounded-t-2xl" />

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 shrink-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                  Registration Window Active!
                </h4>
                <button
                  type="button"
                  onClick={() => setIsVisible(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                  aria-label="Dismiss toast"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Slots are filling up fast for CodeNite 2027. Teams require{" "}
                <span className="text-acm-cyan font-semibold">4 to 6 members</span> (female not compulsory).
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleScrollToRegister}
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-acm-cyan hover:text-white transition-colors cursor-pointer"
                >
                  Register Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
