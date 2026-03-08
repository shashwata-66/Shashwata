import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  SiCplusplus, SiC, SiJavascript,
  SiHtml5, SiReact, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress,
  SiMongodb, SiMysql,
  SiGit, SiGithub, SiVercel,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const categories = [
  {
    label: "Languages",
    emoji: "⌨️",
    skills: [
      { name: "C++",        icon: <SiCplusplus />,   color: "#00599C" },
      { name: "C",          icon: <SiC />,            color: "#A8B9CC" },
      { name: "JavaScript", icon: <SiJavascript />,   color: "#F7DF1E" },
    ],
  },
  {
    label: "Frontend",
    emoji: "🎨",
    skills: [
      { name: "HTML5",     icon: <SiHtml5 />,       color: "#E34F26" },
      { name: "CSS3",      icon: <span style={{fontWeight:900, fontSize:"1.1rem", color:"#1572B6"}}>CSS</span>, color: "#1572B6" },
      { name: "React",     icon: <SiReact />,       color: "#61DAFB" },
      { name: "Tailwind",  icon: <SiTailwindcss />, color: "#06B6D4" },
      { name: "Bootstrap", icon: <SiBootstrap />,   color: "#7952B3" },
    ],
  },
  {
    label: "Backend",
    emoji: "⚙️",
    skills: [
      { name: "Node.js",    icon: <SiNodedotjs />, color: "#339933" },
      { name: "Express.js", icon: <SiExpress />,   color: "#888888" },
    ],
  },
  {
    label: "Database",
    emoji: "🗄️",
    skills: [
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
      { name: "MySQL",   icon: <SiMysql />,   color: "#4479A1" },
    ],
  },
  {
    label: "Tools",
    emoji: "🛠️",
    skills: [
      { name: "Git",     icon: <SiGit />,     color: "#F05032" },
      { name: "GitHub",  icon: <SiGithub />,  color: "#ffffff" },
      { name: "VS Code", icon: <VscVscode />, color: "#007ACC" },
      { name: "Vercel",  icon: <SiVercel />,  color: "#ffffff" },
    ],
  },
];

// Returns a visible color for icons that are white (invisible on light backgrounds)
function getIconColor(skill, darkMode) {
  if (skill.color === "#ffffff") return darkMode ? "#ffffff" : "#1f1f1f";
  return skill.color;
}

function SkillPill({ skill, darkMode, index }) {
  const iconColor = getIconColor(skill, darkMode);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, delay: index * 0.055, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.06 }}
      className={`group relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-300 cursor-default ${
        darkMode
          ? "bg-[#0e0e1a] border-white/5 hover:border-purple-500/40 hover:bg-[#13101f]"
          : "bg-white border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-lg"
      }`}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 24px ${iconColor}22` }}
      />

      {/* Icon */}
      <div
        className="text-4xl leading-none transition-transform duration-300 group-hover:scale-110"
        style={{ color: iconColor, filter: `drop-shadow(0 0 8px ${iconColor}55)` }}
      >
        {skill.icon}
      </div>

      {/* Name */}
      <span className={`text-[11px] font-bold tracking-wide text-center leading-tight ${
        darkMode ? "text-gray-400 group-hover:text-gray-200" : "text-gray-500 group-hover:text-gray-800"
      } transition-colors duration-200`}>
        {skill.name}
      </span>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-8 rounded-full transition-all duration-300"
        style={{ background: iconColor }}
      />
    </motion.div>
  );
}

export default function Skills2({ darkMode }) {
  const [activeTab, setActiveTab] = useState(0);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  const activeCat = categories[activeTab];

  return (
    <section
      id="skills"
      className={`relative py-28 overflow-hidden ${darkMode ? "bg-[#0a0a0f]" : "bg-gray-50"}`}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Heading */}
        <div ref={headingRef} className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={`text-sm font-semibold tracking-widest uppercase mb-3 ${
              darkMode ? "text-purple-400" : "text-purple-600"
            }`}
          >
            — What I work with
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className={`text-4xl md:text-5xl font-black tracking-tight ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Skills
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isHeadingInView ? { width: "60px" } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 mt-4 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`mt-4 text-sm max-w-xl ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            Technologies and tools I've worked with — organized by category.
          </motion.p>
        </div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`relative flex flex-wrap gap-2 p-1.5 rounded-2xl mb-8 w-fit ${
            darkMode ? "bg-[#0e0e1a] border border-white/5" : "bg-white border border-gray-100 shadow-sm"
          }`}
        >
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveTab(i)}
              className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === i
                  ? "text-white"
                  : darkMode
                    ? "text-gray-500 hover:text-gray-300"
                    : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {activeTab === i && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600"
                  style={{ boxShadow: "0 0 16px rgba(139,92,246,0.5)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.emoji}</span>
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className={`relative rounded-2xl border p-6 md:p-8 min-h-[200px] ${
            darkMode
              ? "bg-[#0b0b14] border-purple-500/10"
              : "bg-white border-gray-100 shadow-sm"
          }`}
        >
          {/* Panel header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{activeCat.emoji}</span>
            <h3 className={`text-sm font-black tracking-widest uppercase ${
              darkMode ? "text-purple-400" : "text-purple-600"
            }`}>
              {activeCat.label}
            </h3>
            <div className={`flex-1 h-px ${darkMode ? "bg-white/5" : "bg-gray-100"}`} />
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              darkMode ? "bg-purple-500/10 text-purple-400" : "bg-purple-50 text-purple-600"
            }`}>
              {activeCat.skills.length} skills
            </span>
          </div>

          {/* Skills grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
            >
              {activeCat.skills.map((skill, i) => (
                <SkillPill key={skill.name} skill={skill} darkMode={darkMode} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* All skills compact strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${
            darkMode ? "text-gray-600" : "text-gray-400"
          }`}>
            All technologies at a glance
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.flatMap((cat) =>
              cat.skills.map((skill) => (
                <motion.span
                  key={skill.name}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-default ${
                    darkMode
                      ? "bg-[#0e0e1a] border-white/5 text-gray-400 hover:border-purple-500/30 hover:text-gray-200"
                      : "bg-white border-gray-100 text-gray-500 hover:border-purple-200 shadow-sm"
                  }`}
                >
                  <span style={{ color: getIconColor(skill, darkMode), fontSize: "0.85rem" }} className="flex items-center">
                    {skill.icon}
                  </span>
                  {skill.name}
                </motion.span>
              ))
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
