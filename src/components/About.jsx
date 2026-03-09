import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FiCode, FiTarget, FiBookOpen } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { AiOutlineProject } from "react-icons/ai";

const stats = [
  {
    icon: <SiLeetcode size={20} />,
    value: 450,
    suffix: "+",
    label: "LC Problems Solved",
    href: "https://leetcode.com/u/shashwata66/",
    external: true,
  },
  {
    icon: <AiOutlineProject size={20} />,
    value: 3,
    suffix: "+",
    label: "Projects Built",
    href: "#projects",
    external: false,
  },
];

const cards = [
  {
    icon: <FiBookOpen size={18} />,
    title: "Background & Education",
    content:
      "I'm Shashwata Barman, a 3rd year B.Tech CSE student with a strong interest in web development and problem solving. I enjoy building modern, responsive web applications and continuously improving my programming skills.",
  },
  {
    icon: <FiCode size={18} />,
    title: "Currently Learning",
    content:
      "Currently, I am focused on strengthening my frontend development skills using React and modern web technologies, while also learning backend development with Node.js, Express, and MongoDB. Alongside this, I practice Data Structures and Algorithms in C++ to improve my problem-solving ability.",
  },
  {
    icon: <FiTarget size={18} />,
    title: "My Goals",
    content:
      "My goal is to grow into a skilled software developer and contribute to building efficient, user-friendly applications while continuously learning new technologies.",
  },
];

function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const totalSteps = Math.ceil(duration / 16);
    const step = target / totalSteps;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return { count, ref };
}

function StatCard({ stat, darkMode }) {
  const { count, ref } = useCountUp(stat.value);
  const handleClick = () => {
    if (stat.external) window.open(stat.href, "_blank", "noopener noreferrer");
    else document.querySelector(stat.href)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <motion.div
      ref={ref}
      onClick={handleClick}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`p-5 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
        darkMode
          ? "bg-gradient-to-br from-purple-500/10 to-violet-500/5 border-purple-500/15 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
          : "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100 hover:border-purple-200 hover:shadow-md"
      }`}
    >
      <div className={`flex justify-center mb-2 ${darkMode ? "text-purple-400" : "text-purple-600"}`}>{stat.icon}</div>
      <div className={`text-2xl font-black mb-1 tabular-nums ${darkMode ? "text-white" : "text-gray-900"}`}>{count}{stat.suffix}</div>
      <div className={`text-xs font-medium ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{stat.label}</div>
      <div className={`mt-2 text-[10px] font-semibold tracking-wide ${darkMode ? "text-purple-500/60" : "text-purple-400/70"}`}>
        {stat.external ? "View Profile →" : "See Projects →"}
      </div>
    </motion.div>
  );
}

export default function About({ darkMode }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: "easeOut" },
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative py-28 overflow-hidden ${darkMode ? "bg-[#0a0a0f]" : "bg-gray-50"}`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[500px] h-[500px] rounded-full opacity-5 blur-[100px]"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <p className={`text-sm font-semibold tracking-widest uppercase mb-3 ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
            — Get to know me
          </p>
          <h2 className={`text-4xl font-black tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "60px" } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 mt-4 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
          />
        </motion.div>

        {/* Two column on desktop, single column on mobile/tablet */}
        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: "3rem" }}>

          {/* Left — Info cards + Stats */}
          <div className="flex flex-col gap-5">
            {cards.map((card, i) => (
              <motion.div
                key={i} {...fadeUp(0.15 + i * 0.12)} whileHover={{ x: 5 }}
                className={`p-5 rounded-2xl border transition-all duration-300 group ${
                  darkMode ? "bg-[#0e0e1a] border-purple-500/10 hover:border-purple-500/25 hover:bg-[#11111f]"
                           : "bg-white border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 p-2.5 rounded-xl shrink-0 transition-colors duration-300 ${
                    darkMode ? "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20"
                             : "bg-purple-50 text-purple-600 group-hover:bg-purple-100"
                  }`}>{card.icon}</div>
                  <div>
                    <h3 className={`text-sm font-bold mb-1.5 ${darkMode ? "text-white" : "text-gray-900"}`}>{card.title}</h3>
                    <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{card.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div {...fadeUp(0.55)} className="grid grid-cols-2 gap-4 mt-1">
              {stats.map((stat, i) => <StatCard key={i} stat={stat} darkMode={darkMode} />)}
            </motion.div>
          </div>

          {/* Right — Info Panel */}
          <motion.div {...fadeUp(0.25)} className="flex flex-col gap-5">
            {/* Quick facts */}
            <div className={`p-6 rounded-2xl border ${darkMode ? "bg-[#0e0e1a] border-purple-500/10" : "bg-white border-gray-100 shadow-sm"}`}>
              <p className={`text-xs font-bold tracking-widest uppercase mb-4 ${darkMode ? "text-purple-400" : "text-purple-600"}`}>⚡ Quick Facts</p>
              <div className="flex flex-col gap-3">
                {[
                  { emoji: "🎓", label: "Degree",   value: "B.Tech in CSE" },
                  { emoji: "📅", label: "Year",     value: "3rd Year (2023–2027)" },
                  { emoji: "📍", label: "Location", value: "India" },
                  { emoji: "💼", label: "Status",   value: "Open to Internships" },
                  { emoji: "🌐", label: "Languages",value: "C++, C, JavaScript" },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className={`flex items-center justify-between py-2.5 border-b last:border-b-0 ${darkMode ? "border-white/5" : "border-gray-100"}`}
                  >
                    <span className={`text-xs flex items-center gap-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                      <span>{item.emoji}</span> {item.label}
                    </span>
                    <span className={`text-xs font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Currently focusing on */}
            <div className={`p-6 rounded-2xl border ${darkMode ? "bg-[#0e0e1a] border-purple-500/10" : "bg-white border-gray-100 shadow-sm"}`}>
              <p className={`text-xs font-bold tracking-widest uppercase mb-4 ${darkMode ? "text-purple-400" : "text-purple-600"}`}>🔥 Currently Focusing On</p>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "MongoDB", "DSA in C++", "REST APIs", "Tailwind CSS"].map((tag, i) => (
                  <motion.span key={i}
                    initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.07 }}
                    whileHover={{ y: -2, scale: 1.05 }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-default transition-all duration-200 ${
                      darkMode ? "bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/20"
                               : "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                    }`}
                  >{tag}</motion.span>
                ))}
              </div>
            </div>

            {/* Fun fact */}
            <motion.div
              animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`p-5 rounded-2xl border text-sm leading-relaxed ${
                darkMode ? "bg-gradient-to-br from-purple-500/10 to-violet-500/5 border-purple-500/15 text-gray-400"
                         : "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100 text-gray-500"
              }`}
            >
              <span className="text-lg mr-2">💡</span>
              <span className={`font-semibold ${darkMode ? "text-purple-300" : "text-purple-600"}`}>Fun fact: </span>
              I enjoy solving DSA problems almost as much as building UIs — both feel like puzzles to me!
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
