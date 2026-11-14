import React from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Accordion } from "../components/ui/Accordion";
import { EVENT_DATA } from "../data/codeniteData";
import { HelpCircle, MessageSquare } from "lucide-react";

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Got Questions?"
          title="Frequently Asked"
          highlight="Queries"
          subtitle="Clear answers on registration, team formations, overnight logistics, evaluation, and venue facilities."
        />

        <Accordion items={EVENT_DATA.faqs} allowMultiple />

        {/* Helpdesk & Social Contact prompt */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#101D3D]/90 border border-[rgba(96,165,250,0.25)] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_8px_24px_rgba(5,11,30,0.6)]">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-tech-blue/20 text-tech-cyan border border-tech-cyan/30">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-white text-sm">
                Have another question not listed here?
              </div>
              <div className="text-xs text-tech-muted">
                Reach out to us on Instagram @acm.mits or LinkedIn, or ping the ACM MITS helpdesk.
              </div>
            </div>
          </div>

          <a
            href={EVENT_DATA.contacts.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#0A1530] hover:bg-[#15244C] text-xs font-mono font-bold text-tech-cyan border border-tech-cyan/40 hover:border-tech-cyan hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all cursor-pointer"
          >
            Connect on Instagram &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
