import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { SiReact, SiTailwindcss, SiFramer, SiVite, SiJavascript, SiHtml5 } from "react-icons/si";

import aiAgencyImg from "../assets/agency-ai.png";
import studyPlannerImg from "../assets/study-planer.png";
import newsAppImg from "../assets/news-app.png";

const techIcons = {
  React:          { icon: <SiReact />,       color: "#61DAFB" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
  "Framer Motion":{ icon: <SiFramer />,      color: "#FF0055" },
  Vite:           { icon: <SiVite />,        color: "#646CFF" },
  JavaScript:     { icon: <SiJavascript />,  color: "#F7DF1E" },
  HTML:           { icon: <SiHtml5 />,       color: "#E34F26" },
  "CSS":          { icon: <span style={{ fontSize: "0.6rem", fontWeight: 900, color: "#1572B6" }}>CSS</span>, color: "#1572B6" },
  "News API":     { icon: <span style={{ fontSize: "0.6rem", fontWeight: 900, color: "#a78bfa" }}>API</span>, color: "#a78bfa" },
};

const projects = [
  {
    name: "AI Agency Portfolio",
    description:
      "A modern portfolio for an AI agency showcasing services, features, and contact sections with a clean and responsive UI.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    github: "https://github.com/shashwata-66/agency-ai",
    live: "https://shashwata-agency-ai.vercel.app",
    image: aiAgencyImg,
    accentColor: "#a78bfa",
    emoji: "🤖",
  },
  {
    name: "Study Planner Web App",
    description:
      "A productivity web app that helps users organize study tasks, manage schedules, and track daily learning goals.",
    tech: ["React", "Tailwind CSS", "JavaScript", "Vite"],
    github: "https://github.com/shashwata-66/study-planer",
    live: "https://shashwata-study-planer.vercel.app/",
    image: studyPlannerImg,
    accentColor: "#67e8f9",
    emoji: "📚",
  },
  {
    name: "News App",
    description:
      "A news application that fetches and displays the latest articles from an external API with category-based browsing and a responsive UI.",
    tech: ["HTML", "CSS", "JavaScript", "News API"],
    github: null,
    live: null,
    image: newsAppImg,
    accentColor: "#fb923c",
    emoji: "📰",
  },
];

function TechTag({ name, darkMode }) {
  const tech = techIcons[name];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border ${
        darkMode
          ? "bg-white/5 border-white/10 text-gray-300"
          : "bg-gray-50 border-gray-200 text-gray-600"
      }`}
    >
      {tech && (
        <span style={{ color: tech.color }} className="flex items-center text-sm">
          {tech.icon}
        </span>
      )}
      {name}
    </span>
  );
}

function ProjectCard({ project, darkMode, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className={`group flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 ${
        darkMode
          ? "bg-[#0e0e1a] border-purple-500/10 hover:border-purple-500/30 hover:shadow-[0_8px_40px_rgba(139,92,246,0.12)]"
          : "bg-white border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-200"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover overlay with buttons */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          style={{ background: `${project.accentColor}22`, backdropFilter: "blur(2px)" }}
        >
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg"
              style={{ background: `${project.accentColor}dd` }}
            >
              <FiGithub size={13} /> GitHub
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg"
              style={{ background: `${project.accentColor}dd` }}
            >
              <FiExternalLink size={13} /> Live Demo
            </motion.a>
          )}
          {!project.github && !project.live && (
            <span
              className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg"
              style={{ background: `${project.accentColor}dd` }}
            >
              🚧 Coming Soon
            </span>
          )}
        </div>

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
        />
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title + link icons row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{project.emoji}</span>
            <h3 className={`text-sm font-bold leading-snug ${darkMode ? "text-white" : "text-gray-900"}`}>
              {project.name}
            </h3>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -1 }}
                className={`p-1.5 rounded-lg transition-colors ${
                  darkMode ? "text-gray-500 hover:text-purple-400" : "text-gray-400 hover:text-purple-600"
                }`}
              >
                <FiGithub size={14} />
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -1 }}
                className={`p-1.5 rounded-lg transition-colors ${
                  darkMode ? "text-gray-500 hover:text-purple-400" : "text-gray-400 hover:text-purple-600"
                }`}
              >
                <FiExternalLink size={14} />
              </motion.a>
            )}
            {!project.github && !project.live && (
              <span
                className={`text-xs px-2 py-0.5 rounded-lg font-semibold border ${
                  darkMode
                    ? "text-orange-400 border-orange-500/20 bg-orange-500/10"
                    : "text-orange-500 border-orange-200 bg-orange-50"
                }`}
              >
                Coming Soon
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className={`text-xs leading-relaxed mb-4 flex-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <TechTag key={t} name={t} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ darkMode }) {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  return (
    <section
      id="projects"
      className={`relative py-28 overflow-hidden ${darkMode ? "bg-[#0a0a0f]" : "bg-gray-50"}`}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
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
            — Things I've built
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
              Projects
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
            A selection of projects I've built — from web apps to real-world tools.
          </motion.p>
        </div>

        {/* 3 equal cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              darkMode={darkMode}
              delay={i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
