import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { EVENT_DATA } from "../data/codeniteData";

export function Team() {
  return (
    <section id="team" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Crew Behind CodeNite"
          title="Meet The"
          highlight="Organizing Team"
          subtitle="Driven student leaders, researchers, and technical heads committed to hosting an unforgettable hackathon experience."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {EVENT_DATA.team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card tilt spotlight className="p-6 flex flex-col items-center text-center group">
                {/* Avatar with cyan neon border ring */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-acm-blue via-sky-400 to-acm-cyan mb-5 shadow-glow-sm group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>

                {/* Member Info */}
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white group-hover:text-acm-cyan transition-colors mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-mono font-semibold text-sky-400 mb-1">
                  {member.role}
                </p>
                <p className="text-xs text-slate-400 font-normal mb-5">
                  {member.dept}
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-acm-blue/20 w-full justify-center">
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white hover:bg-navy-700 transition-colors"
                      aria-label="GitHub profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white hover:bg-navy-700 transition-colors"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.email && (
                    <a
                      href={member.socials.email}
                      className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white hover:bg-navy-700 transition-colors"
                      aria-label="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
