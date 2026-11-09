import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Instagram,
  Linkedin,
  ExternalLink,
  Sparkles,
  Code2,
  Terminal,
} from "lucide-react";
import { EVENT_DATA } from "../data/codeniteData";
import { DeveloperModal } from "../components/ui/DeveloperModal";

export function Footer() {
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About ACM MITS", href: "#about" },
    { label: "Themes & Tracks", href: "#tracks" },
    { label: "Timeline", href: "#timeline" },
    { label: "Prizes & Bounties", href: "#prizes" },
    { label: "Rules & Eligibility", href: "#rules" },
    { label: "Team Guide", href: "#guide" },
    { label: "Register Squad", href: "#register" },
  ];

  return (
    <footer className="relative bg-navy-950 border-t border-acm-blue/20 pt-16 pb-12 overflow-hidden z-10">
      {/* Top subtle blue reflective gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acm-cyan/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Chapter Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-acm-cyan/60 flex items-center justify-center p-0 shrink-0 shadow-sm">
                <img
                  src={EVENT_DATA.organizer.acmLogo}
                  alt="ACM Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-white">
                  ACM MITS Student Chapter
                </h3>
                <p className="text-xs font-mono text-acm-cyan">
                  Chartered {EVENT_DATA.organizer.est} • MITS Gwalior
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Empowering student technologists, developers, and researchers at Madhav Institute of Technology & Science through competitive programming, hackathons, and technical excellence.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={EVENT_DATA.contacts.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-slate-300 hover:text-white hover:border-acm-cyan hover:bg-acm-blue/20 transition-all flex items-center gap-2"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-mono font-medium text-slate-300 hover:text-white">@acm.mits</span>
              </a>

              <a
                href={EVENT_DATA.contacts.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-slate-300 hover:text-white hover:border-acm-cyan hover:bg-acm-blue/20 transition-all flex items-center gap-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono font-medium text-slate-300 hover:text-white">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-acm-cyan transition-colors flex items-center gap-1.5"
                  >
                    <span>&rsaquo;</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Connect With Us
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">
                  Email Inquiries
                </span>
                <a
                  href={`mailto:${EVENT_DATA.contacts.email}`}
                  className="hover:text-acm-cyan transition-colors break-all font-mono"
                >
                  {EVENT_DATA.contacts.email}
                </a>
              </div>

              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">
                  Helpline Numbers
                </span>
                {EVENT_DATA.contacts.phones.map((p) => (
                  <div key={p} className="font-mono text-slate-300">
                    {p}
                  </div>
                ))}
              </div>

              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">
                  WhatsApp Community
                </span>
                <a
                  href={EVENT_DATA.contacts.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  Join Official Chat <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Venue Map Embed (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-acm-cyan" /> Venue Location
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              MITS Gwalior, Racecourse Road, Gwalior (M.P.)
            </p>

            {/* Embedded Google Map */}
            <div className="w-full h-36 rounded-xl overflow-hidden border border-acm-blue/30 shadow-sm relative">
              <iframe
                title="MITS Gwalior Location"
                src={EVENT_DATA.venue.mapEmbedUrl}
                className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ================= LEAD PLATFORM DEVELOPERS FEATURE IN FOOTER ================= */}
        <div className="py-8 my-8 border-y border-acm-blue/20 bg-gradient-to-r from-navy-950/90 via-[#071338]/80 to-navy-950/90 rounded-2xl px-6 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <h4 className="font-orbitron font-extrabold text-sm sm:text-base text-white tracking-wider uppercase text-glow-cyan">
                  &lt;Lead Platform Developers/&gt;
                </h4>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Engineered with precision for ACM MITS CodeNite 2027. Click card to view full profile & tech stack.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              {EVENT_DATA.developers.map((dev) => (
                <div
                  key={dev.name}
                  onClick={() => setSelectedDeveloper(dev)}
                  title={`Click to view ${dev.name}'s full profile & tech stack`}
                  className="group relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#071338]/95 to-navy-950/95 border border-cyan-400/40 hover:border-cyan-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all cursor-pointer flex items-center gap-3.5 overflow-hidden"
                >
                  {/* Subtle top accent beam on card hover */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className={`relative w-12 h-12 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr ${dev.avatarColor || "from-cyan-500 to-indigo-500"} shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.3)]`}>
                    <div className="w-full h-full rounded-[10px] bg-navy-950 flex flex-col items-center justify-center relative overflow-hidden border border-white/10">
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
                      <span className="font-orbitron font-black text-xs text-white group-hover:text-cyan-300 tracking-wider">
                        {dev.initials || dev.name.split(" ").map(n => n[0]).join("")}
                      </span>
                      <span className="text-[9px] font-mono text-cyan-400 font-bold leading-none">
                        &lt;/&gt;
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-400/40 uppercase flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                        <span>{dev.badge}</span>
                      </span>
                    </div>
                    <h5 className="font-heading font-black text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                      {dev.name}
                    </h5>
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      {dev.role}
                    </p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-cyan-950/60 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-colors shrink-0">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            &copy; {new Date().getFullYear()} ACM MITS Student Chapter. All rights reserved.
          </div>

          <div className="text-center sm:text-right">
            Designed & Engineered with ❤️ by{" "}
            <button
              type="button"
              onClick={() => setSelectedDeveloper(EVENT_DATA.developers[0])}
              className="text-cyan-400 font-bold hover:underline cursor-pointer transition-colors"
            >
              Aditya Ahamana
            </button>
            {" & "}
            <button
              type="button"
              onClick={() => setSelectedDeveloper(EVENT_DATA.developers[1])}
              className="text-cyan-400 font-bold hover:underline cursor-pointer transition-colors"
            >
              Ronak Gupta
            </button>
          </div>

          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-slate-300 hover:text-white hover:border-acm-cyan transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cyber Developer Profile Popup Modal */}
      <DeveloperModal
        developer={selectedDeveloper}
        isOpen={!!selectedDeveloper}
        onClose={() => setSelectedDeveloper(null)}
      />
    </footer>
  );
}
