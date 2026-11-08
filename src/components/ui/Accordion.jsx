import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertCircle } from "lucide-react";
import { cn } from "../../utils/cn";

export function AccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
  highlight = false,
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-md mb-3.5",
        isOpen
          ? "bg-navy-900/80 border-acm-cyan/50 shadow-glow-sm"
          : "bg-navy-900/40 border-acm-blue/20 hover:border-acm-blue/50 hover:bg-navy-900/60",
        highlight && !isOpen && "border-sky-400/35 bg-sky-950/20"
      )}
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none group"
      >
        <span className="flex items-center gap-3 font-heading font-semibold text-base sm:text-lg text-white group-hover:text-acm-cyan transition-colors">
          {highlight && (
            <AlertCircle className="w-5 h-5 text-sky-400 shrink-0 animate-pulse" />
          )}
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "p-1.5 rounded-full border transition-colors shrink-0 ml-3",
            isOpen
              ? "bg-acm-blue/20 border-acm-cyan text-acm-cyan"
              : "bg-navy-800 border-acm-blue/30 text-slate-400 group-hover:text-white"
          )}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 sm:px-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-acm-blue/10">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items, allowMultiple = false }) {
  const [openIds, setOpenIds] = useState([items[0]?.id || ""]);

  const handleToggle = (id) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="w-full">
      {items.map((item) => (
        <AccordionItem
          key={item.id || item.question}
          id={item.id || item.question}
          question={item.question}
          answer={item.answer}
          highlight={item.highlight}
          isOpen={openIds.includes(item.id || item.question)}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
