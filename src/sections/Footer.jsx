import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Instagram,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { EVENT_DATA } from "../data/codeniteData";

export function Footer() {
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

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-acm-blue/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            &copy; {new Date().getFullYear()} ACM MITS Student Chapter. All rights reserved.
          </div>

          <div className="text-center sm:text-right">
            Designed & Engineered with ❤️ by{" "}
            <span className="text-acm-cyan font-semibold">
              ACM MITS Technical Team
            </span>
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
    </footer>
  );
}
