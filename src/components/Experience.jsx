import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";

const experiences = [
  {
    company: "Centre for Development of Advanced Computing (CDAC)",
    role: "Virtual Intern – Cybersecurity",
    duration: "Jun 2025 – Jul 2025",
    type: "Internship",
    location: "Remote",
    points: [
      "Completed a virtual internship program covering core concepts of malware analysis and cybersecurity fundamentals.",
      "Conducted in-depth research on Indicators of Compromise (IoCs) and their detection using regular expressions.",
      "Prepared a technical report and presentation summarizing the analysis methodology and findings.",
    ],
    accentColor: "#a78bfa",
  },
];

function TimelineItem({ exp, darkMode, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="relative flex gap-6"
    >
      {/* Dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.2, type: "spring" }}
          className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${exp.accentColor}33, ${exp.accentColor}11)`,
            border: `1.5px solid ${exp.accentColor}40`,
            boxShadow: `0 0 20px ${exp.accentColor}20`,
          }}
        >
          <FiBriefcase size={18} style={{ color: exp.accentColor }} />
        </motion.div>
        {index < experiences.length - 1 && (
          <motion.div initial={{ height: 0 }} animate={isInView ? { height: "100%" } : {}} transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
            className="w-px mt-3 flex-1" style={{ background: `linear-gradient(to bottom, ${exp.accentColor}40, transparent)` }} />
        )}
      </div>

      {/* Card */}
      <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}
        className={`flex-1 mb-12 p-6 rounded-2xl border transition-all duration-300 group relative ${
          darkMode ? "bg-[#0e0e1a] border-purple-500/10 hover:border-purple-500/25 hover:bg-[#11111f]"
                   : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200"
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${exp.accentColor}, transparent)` }} />

        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold mb-2 border"
              style={{ color: exp.accentColor, borderColor: `${exp.accentColor}40`, background: `${exp.accentColor}15` }}>
              {exp.type}
            </span>
            <h3 className={`text-lg font-black leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>{exp.role}</h3>
            <p className={`text-sm font-semibold mt-0.5 ${darkMode ? "text-purple-400" : "text-purple-600"}`}>{exp.company}</p>
          </div>
          <div className={`flex flex-col items-end gap-1 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            <span className="flex items-center gap-1.5"><FiCalendar size={11} />{exp.duration}</span>
            <span className="flex items-center gap-1.5"><FiMapPin size={11} />{exp.location}</span>
          </div>
        </div>

        <div className={`w-full h-px mb-4 ${darkMode ? "bg-white/5" : "bg-gray-100"}`} />

        <ul className="flex flex-col gap-3">
          {exp.points.map((point, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.15 + 0.3 + i * 0.08 }}
              className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: exp.accentColor }} />
              <span className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default function Experience({ darkMode }) {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  return (
    <section id="experience" className={`relative py-28 overflow-hidden ${darkMode ? "bg-[#0a0a0f]" : "bg-gray-50"}`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px]"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div ref={headingRef} className="mb-16">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={isHeadingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className={`text-sm font-semibold tracking-widest uppercase mb-3 ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
            — Where I've worked
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isHeadingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
            className={`text-4xl font-black tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
            Experience
          </motion.h2>
          <motion.div initial={{ width: 0 }} animate={isHeadingInView ? { width: "60px" } : {}} transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 mt-4 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500" />
          <motion.p initial={{ opacity: 0, y: 16 }} animate={isHeadingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
            className={`mt-4 text-sm max-w-xl ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            My professional journey so far — internships and roles that shaped my skills.
          </motion.p>
        </div>

        <div className="relative">
          {experiences.map((exp, i) => <TimelineItem key={i} exp={exp} darkMode={darkMode} index={i} />)}
        </div>
      </div>
    </section>
  );
}
