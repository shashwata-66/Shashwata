import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

import heroImage from "../assets/hero-image.jpeg";

const roles = ["Front End Developer", "C++ Programmer", "DSA Enthusiast", "Creative Coder"];

const socialLinks = [
  { icon: <FiGithub size={20} />,   href: "https://github.com/shashwata-66",                   label: "GitHub"   },
  { icon: <FiLinkedin size={20} />, href: "https://www.linkedin.com/in/shashwata-barman-66-/",  label: "LinkedIn" },
  { icon: <SiLeetcode size={20} />, href: "https://leetcode.com/u/shashwata66/",                label: "LeetCode" },
];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;
    if (!deleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1); }, speed);
      } else {
        timeout = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1); }, speed / 2);
      } else {
        setDeleting(false);
        setWordIndex(w => (w + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

function Particle({ darkMode }) {
  const style = {
    left:              `${Math.random() * 100}%`,
    top:               `${Math.random() * 100}%`,
    width:             `${Math.random() * 3 + 1}px`,
    height:            `${Math.random() * 3 + 1}px`,
    animationDelay:    `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 10 + 8}s`,
  };
  return (
    <div
      className="absolute rounded-full opacity-30 animate-float"
      style={{ ...style, background: darkMode ? "#a78bfa" : "#7c3aed" }}
    />
  );
}

export default function Hero({ darkMode }) {
  const typed     = useTypewriter(roles);
  const particles = Array.from({ length: 30 });

  // Three breakpoints: phone < 640, tablet 640–1279, desktop >= 1280
  const [screenType, setScreenType] = useState("desktop");

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640)       setScreenType("phone");
      else if (w < 1280) setScreenType("tablet");
      else               setScreenType("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isDesktop = screenType === "desktop";

  // Photo size per screen
  const photoSize = screenType === "phone" ? "w-52 h-52" : "w-72 h-72";

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center overflow-hidden ${
        darkMode ? "bg-[#0a0a0f]" : "bg-gray-50"
      }`}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-600 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-violet-500 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-fuchsia-600 blur-[100px]"
        />
        {particles.map((_, i) => <Particle key={i} darkMode={darkMode} />)}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${darkMode ? "#a78bfa" : "#7c3aed"} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? "#a78bfa" : "#7c3aed"} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full"
        style={{ paddingTop: isDesktop ? "7rem" : "6rem", paddingBottom: isDesktop ? "7rem" : "4rem" }}
      >

        {isDesktop ? (
          /* ── DESKTOP: text left, photo right ── */
          <div className="grid grid-cols-2 gap-12 items-center">

            {/* Left — Text */}
            <div className="flex flex-col gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border ${
                  darkMode ? "bg-purple-500/10 border-purple-500/20 text-purple-300" : "bg-purple-50 border-purple-200 text-purple-700"
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  Available for work
                </span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <p className={`text-lg font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Hi there 👋, I'm</p>
                <h1 className="text-5xl font-black leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Shashwata</span>
                  <br />
                  <span className={darkMode ? "text-white" : "text-gray-900"}>Barman</span>
                </h1>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center gap-2">
                <span className={`text-xl font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>I'm a </span>
                <span className="text-xl font-bold text-purple-400 min-w-[220px]">
                  {typed}<span className="inline-block w-0.5 h-5 ml-0.5 bg-purple-400 animate-pulse align-middle" />
                </span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className={`text-base leading-relaxed max-w-md ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Computer Science student passionate about building responsive web applications with React and solving problems using Data Structures and Algorithms in C++.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-3">
                <motion.a href="#projects" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300"
                >View Projects</motion.a>
                <motion.a href="/Resume.pdf" download="Shashwata_Barman_Resume.pdf" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 border transition-all duration-300 ${
                    darkMode ? "border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400" : "border-purple-300 text-purple-700 hover:bg-purple-50"
                  }`}
                >Download Resume <FiExternalLink size={14} /></motion.a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex items-center gap-3">
                {socialLinks.map((s, i) => (
                  <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.93 }}
                    className={`p-2.5 rounded-xl border transition-all duration-200 ${
                      darkMode ? "border-purple-500/20 text-gray-400 hover:text-purple-300 hover:border-purple-500/40 hover:bg-purple-500/10" : "border-gray-200 text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50"
                    }`}
                  >{s.icon}</motion.a>
                ))}
                <span className={`text-xs ml-1 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>— find me online</span>
              </motion.div>
            </div>

            {/* Right — Photo */}
            <motion.div initial={{ opacity: 0, scale: 0.9, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} className="flex justify-center items-center">
              <div className="relative">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-full opacity-40"
                  style={{ background: "conic-gradient(from 0deg, #7c3aed, #a78bfa, #c4b5fd, #7c3aed)", filter: "blur(8px)" }}
                />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 opacity-60" />
                <div className={`relative w-72 h-72 rounded-full overflow-hidden border-4 ${darkMode ? "border-[#0a0a0f]" : "border-white"}`}>
                  <img src={heroImage} alt="Shashwata Barman" className="w-full h-full object-cover" />
                </div>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute -bottom-3 -left-6 px-4 py-2 rounded-2xl text-xs font-semibold shadow-xl border ${
                    darkMode ? "bg-[#13111f] border-purple-500/20 text-purple-300" : "bg-white border-purple-100 text-purple-700"
                  }`}>✨ Open to opportunities</motion.div>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className={`absolute -top-3 -right-6 px-4 py-2 rounded-2xl text-xs font-semibold shadow-xl border ${
                    darkMode ? "bg-[#13111f] border-purple-500/20 text-purple-300" : "bg-white border-purple-100 text-purple-700"
                  }`}>⚛️ React + Tailwind</motion.div>
              </div>
            </motion.div>

          </div>

        ) : (
          /* ── MOBILE / TABLET: photo top, text bottom, centered ── */
          <div className="flex flex-col items-center gap-8">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-full opacity-40"
                  style={{ background: "conic-gradient(from 0deg, #7c3aed, #a78bfa, #c4b5fd, #7c3aed)", filter: "blur(8px)" }}
                />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 opacity-60" />
                <div className={`relative ${photoSize} rounded-full overflow-hidden border-4 ${darkMode ? "border-[#0a0a0f]" : "border-white"}`}>
                  <img src={heroImage} alt="Shashwata Barman" className="w-full h-full object-cover" />
                </div>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-2xl text-xs font-semibold shadow-xl border ${
                    darkMode ? "bg-[#13111f] border-purple-500/20 text-purple-300" : "bg-white border-purple-100 text-purple-700"
                  }`}>✨ Open to opportunities</motion.div>
              </div>
            </motion.div>

            {/* Text */}
            <div className="flex flex-col items-center text-center gap-5 w-full max-w-lg mx-auto">

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border ${
                  darkMode ? "bg-purple-500/10 border-purple-500/20 text-purple-300" : "bg-purple-50 border-purple-200 text-purple-700"
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  Available for work
                </span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <p className={`text-base font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Hi there 👋, I'm</p>
                <h1 style={{ fontSize: screenType === "phone" ? "2.5rem" : "3.5rem" }} className="font-black leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Shashwata</span>
                  <br />
                  <span className={darkMode ? "text-white" : "text-gray-900"}>Barman</span>
                </h1>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center justify-center gap-2 flex-wrap">
                <span className={`font-semibold ${screenType === "phone" ? "text-lg" : "text-xl"} ${darkMode ? "text-gray-300" : "text-gray-600"}`}>I'm a </span>
                <span className={`font-bold text-purple-400 ${screenType === "phone" ? "text-lg min-w-[180px]" : "text-xl min-w-[220px]"} text-left`}>
                  {typed}<span className="inline-block w-0.5 h-5 ml-0.5 bg-purple-400 animate-pulse align-middle" />
                </span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className={`leading-relaxed ${screenType === "phone" ? "text-sm" : "text-base"} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Computer Science student passionate about building responsive web applications with React and solving problems using Data Structures and Algorithms in C++.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap justify-center gap-3">
                <motion.a href="#projects" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
                >View Projects</motion.a>
                <motion.a href="/Resume.pdf" download="Shashwata_Barman_Resume.pdf" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 border transition-all duration-300 ${
                    darkMode ? "border-purple-500/30 text-purple-300 hover:bg-purple-500/10" : "border-purple-300 text-purple-700 hover:bg-purple-50"
                  }`}
                >Download Resume <FiExternalLink size={14} /></motion.a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex items-center gap-3">
                {socialLinks.map((s, i) => (
                  <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.93 }}
                    className={`p-2.5 rounded-xl border transition-all duration-200 ${
                      darkMode ? "border-purple-500/20 text-gray-400 hover:text-purple-300 hover:border-purple-500/40 hover:bg-purple-500/10" : "border-gray-200 text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50"
                    }`}
                  >{s.icon}</motion.a>
                ))}
                <span className={`text-xs ml-1 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>— find me online</span>
              </motion.div>

              {/* Scroll indicator — below social icons on mobile/tablet */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                className="flex flex-col items-center gap-2 pt-2"
              >
                <span className={`text-xs tracking-widest uppercase ${darkMode ? "text-gray-600" : "text-gray-400"}`}>scroll</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-px h-10 bg-gradient-to-b from-purple-500 to-transparent"
                />
              </motion.div>

            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator — desktop only */}
      {isDesktop && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className={`text-xs tracking-widest uppercase ${darkMode ? "text-gray-600" : "text-gray-400"}`}>scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-purple-500 to-transparent"
        />
      </motion.div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33%       { transform: translateY(-20px) translateX(10px); }
          66%       { transform: translateY(10px) translateX(-10px); }
        }
        .animate-float { animation: float linear infinite; }
      `}</style>
    </section>
  );
}
