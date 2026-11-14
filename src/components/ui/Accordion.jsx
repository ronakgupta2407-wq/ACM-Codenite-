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
          ? "bg-[#101D3D]/90 border-tech-cyan/50 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          : "bg-[#101D3D]/50 border-[rgba(96,165,250,0.2)] hover:border-[rgba(96,165,250,0.45)] hover:bg-[#101D3D]/70",
        highlight && !isOpen && "border-tech-cyan/40 bg-[#101D3D]/80"
      )}
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none group"
      >
        <span className="flex items-center gap-3 font-heading font-semibold text-base sm:text-lg text-white group-hover:text-tech-cyan transition-colors">
          {highlight && (
            <AlertCircle className="w-5 h-5 text-tech-cyan shrink-0 animate-pulse" />
          )}
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "p-1.5 rounded-full border transition-colors shrink-0 ml-3",
            isOpen
              ? "bg-tech-blue/25 border-tech-cyan text-tech-cyan shadow-[0_0_10px_rgba(56,189,248,0.3)]"
              : "bg-[#0A1530] border-[rgba(96,165,250,0.3)] text-tech-muted group-hover:text-white"
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
            <div className="px-5 pb-6 sm:px-6 pt-1 text-tech-muted text-sm sm:text-base leading-relaxed border-t border-[rgba(96,165,250,0.15)]">
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
