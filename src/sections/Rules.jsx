import React from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Accordion } from "../components/ui/Accordion";
import { EVENT_DATA } from "../data/codeniteData";
import { ShieldCheck, Users, AlertOctagon } from "lucide-react";

export function Rules() {
  return (
    <section id="rules" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Guidelines & Integrity"
          title="Official Rules &"
          highlight="Eligibility Protocol"
          subtitle="Please read through all guidelines before registering your squad. Strict compliance is enforced by the ACM Technical Committee."
        />

        {/* Quick Highlights Alert Banner */}
        <div className="mb-10 p-5 rounded-2xl bg-sky-950/40 border border-sky-400/40 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-sky-500/20 text-acm-cyan border border-acm-cyan/40 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-base">
                Key Participation Essentials
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
                Teams must consist of <strong>4 to 6 members</strong> (4, 5, or 6 members). A <strong>female participant is NOT compulsory</strong> (any gender combination is permitted). Cross-college teams are completely allowed.
              </p>
            </div>
          </div>
        </div>

        {/* Rules Accordion */}
        <Accordion items={EVENT_DATA.rules} />
      </div>
    </section>
  );
}
