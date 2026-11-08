import React, { useState, useEffect } from "react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Sparkles, Users, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { EVENT_DATA } from "../data/codeniteData";

export function WelcomeModal({ showAfterLoader }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (showAfterLoader) {
      const hasSeen = sessionStorage.getItem("acm_codenite_welcome_seen");
      if (!hasSeen) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [showAfterLoader]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("acm_codenite_welcome_seen", "true");
  };

  const handleRegisterCTA = () => {
    handleClose();
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Welcome to CodeNite 2027!"
      subtitle="Flagship Hackathon by ACM MITS Student Chapter"
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        {/* Banner with ACM Logo & Highlight */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-acm-blue/20 via-navy-800 to-navy-900 border border-acm-cyan/30 flex items-center gap-4">
          <img
            src={EVENT_DATA.organizer.acmLogo}
            alt="ACM Logo"
            className="w-14 h-14 object-contain shrink-0 filter drop-shadow-md"
          />
          <div>
            <div className="font-heading font-extrabold text-white text-base">
              Gear Up for 12 Hours of Innovation
            </div>
            <div className="text-xs text-sky-300 font-mono mt-0.5">
              17 January 2027 • MITS Gwalior Campus
            </div>
          </div>
        </div>

        {/* Key rules reminder */}
        <div className="space-y-2.5 text-sm text-slate-300">
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-acm-cyan shrink-0" />
            <span>
              <strong>Team Size:</strong> Strictly <strong>4 or 6 members</strong> only.
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Zero Gender Quotas:</strong> Open to all, no female requirement.
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              <strong>Free Registration:</strong> 100% Free with food, swag & ₹1.5L+ prizes!
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
          <Button
            variant="primary"
            size="md"
            className="w-full sm:flex-1"
            pulseRing
            onClick={handleRegisterCTA}
          >
            Register Your Team <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="md"
            className="w-full sm:w-auto"
            onClick={handleClose}
          >
            Explore Site
          </Button>
        </div>
      </div>
    </Modal>
  );
}
