import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
      { name: "HTML5",       icon: <SiHtml5 />,       color: "#E34F26" },
      { name: "CSS3",        icon: <span style={{fontWeight:900, fontSize:"1.1rem", color:"#1572B6"}}>CSS</span>, color: "#1572B6" },
      { name: "React",       icon: <SiReact />,       color: "#61DAFB" },
      { name: "Tailwind",    icon: <SiTailwindcss />, color: "#06B6D4" },
      { name: "Bootstrap",   icon: <SiBootstrap />,   color: "#7952B3" },
    ],
  },
  {
    label: "Backend",
    emoji: "⚙️",
    skills: [
      { name: "Node.js",    icon: <SiNodedotjs />,   color: "#339933" },
      { name: "Express.js", icon: <SiExpress />,     color: "#888888" },
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
    label: "Tools & Others",
    emoji: "🛠️",
    skills: [
      { name: "Git",    icon: <SiGit />,    color: "#F05032" },
      { name: "GitHub", icon: <SiGithub />, color: "#ffffff" },
      { name: "VS Code",icon: <VscVscode />, color: "#007ACC" },
      { name: "Vercel", icon: <SiVercel />, color: "#ffffff" },
    ],
  },
];

// Returns a visible color for icons that are white (invisible on light backgrounds)
function getIconColor(skill, darkMode) {
  if (skill.color === "#ffffff") return darkMode ? "#ffffff" : "#1f1f1f";
  return skill.color;
}

function SkillChip({ skill, darkMode, delay }) {
  const iconColor = getIconColor(skill, darkMode);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.08, y: -3 }}
      className={`group flex flex-col items-center gap-2 p-4 rounded-2xl border cursor-default transition-all duration-300 ${
        darkMode
          ? "bg-[#0e0e1a] border-purple-500/10 hover:border-purple-500/30 hover:bg-[#12101e]"
          : "bg-white border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Icon */}
      <div
        className="text-3xl transition-transform duration-300 group-hover:scale-110"
        style={{ color: iconColor }}
      >
        {skill.icon}
      </div>
      {/* Name */}
      <span
        className={`text-xs font-semibold text-center leading-tight ${
          darkMode ? "text-gray-400 group-hover:text-gray-200" : "text-gray-500 group-hover:text-gray-800"
        } transition-colors duration-200`}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

function CategoryCard({ cat, darkMode, catDelay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: catDelay, ease: "easeOut" }}
      className={`p-6 rounded-2xl border transition-all duration-300 ${
        darkMode
          ? "bg-[#0b0b14] border-purple-500/10 hover:border-purple-500/20"
          : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-purple-100"
      }`}
    >
      {/* Category header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">{cat.emoji}</span>
        <h3
          className={`text-sm font-bold tracking-wide uppercase ${
            darkMode ? "text-purple-400" : "text-purple-600"
          }`}
        >
          {cat.label}
        </h3>
        <div className={`flex-1 h-px ml-2 ${darkMode ? "bg-purple-500/10" : "bg-purple-100"}`} />
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {cat.skills.map((skill, i) => (
          <SkillChip
            key={skill.name}
            skill={skill}
            darkMode={darkMode}
            delay={catDelay + i * 0.07}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills({ darkMode }) {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  return (
    <section
      id="skills"
      className={`relative py-28 overflow-hidden ${
        darkMode ? "bg-[#0a0a0f]" : "bg-gray-50"
      }`}
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

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
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
            className={`mt-4 text-sm max-w-xl ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Technologies and tools I've worked with — organized by category.
          </motion.p>
        </div>

        {/* Categories grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.label}
              cat={cat}
              darkMode={darkMode}
              catDelay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
