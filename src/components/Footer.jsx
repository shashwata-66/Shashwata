import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiHeart, FiArrowUp } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

const navLinks = [
  { label: "Home",       href: "#hero" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

const socialLinks = [
  { icon: <FiGithub size={18} />,   href: "https://github.com/shashwata-66",                   label: "GitHub"   },
  { icon: <FiLinkedin size={18} />, href: "https://www.linkedin.com/in/shashwata-barman-66-/",  label: "LinkedIn" },
  { icon: <SiLeetcode size={18} />, href: "https://leetcode.com/u/shashwata66/",                label: "LeetCode" },
];

export default function Footer({ darkMode }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className={`relative overflow-hidden border-t ${darkMode ? "bg-[#0a0a0f] border-purple-500/10" : "bg-gray-50 border-gray-200"}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, #7c3aed55, transparent)" }} />

      <div className="max-w-6xl mx-auto px-6 py-8">

        {isDesktop ? (
          /* ── DESKTOP ── */
          <>
            <div className="flex flex-row items-center justify-between gap-8 mb-8">
              {/* Logo */}
              <LogoButton darkMode={darkMode} scrollToTop={scrollToTop} size="lg" />
              {/* Nav */}
              <nav className="flex flex-wrap justify-center gap-1">
                <NavLinks darkMode={darkMode} />
              </nav>
              {/* Socials */}
              <SocialIcons darkMode={darkMode} />
            </div>
            <div className={`w-full h-px mb-6 ${darkMode ? "bg-white/5" : "bg-gray-200"}`} />
            <div className="flex flex-row items-center justify-between gap-4">
              <Copyright darkMode={darkMode} />
              <MadeWith darkMode={darkMode} />
              <BackToTop darkMode={darkMode} scrollToTop={scrollToTop} />
            </div>
          </>
        ) : (
          /* ── MOBILE / TABLET — compact and centered ── */
          <>
            <div className="flex flex-col items-center gap-5 mb-6">

              {/* Logo — bigger name */}
              <LogoButton darkMode={darkMode} scrollToTop={scrollToTop} size="lg" />

              {/* Nav links — more spacing between them */}
              <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                <NavLinks darkMode={darkMode} />
              </nav>

              {/* Socials */}
              <SocialIcons darkMode={darkMode} />
            </div>

            <div className={`w-full h-px mb-5 ${darkMode ? "bg-white/5" : "bg-gray-200"}`} />

            <div className="flex flex-col items-center gap-3 text-center">
              <Copyright darkMode={darkMode} />
              <MadeWith darkMode={darkMode} />
              <BackToTop darkMode={darkMode} scrollToTop={scrollToTop} />
            </div>
          </>
        )}

      </div>
    </footer>
  );
}

function LogoButton({ darkMode, scrollToTop, size }) {
  return (
    <motion.button onClick={scrollToTop} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3">
      <div className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0" style={{ background: "conic-gradient(from 0deg, #7c3aed, #a78bfa, #7c3aed)" }} />
        <div className="absolute inset-[2px] rounded-[10px] flex items-center justify-center"
          style={{ background: darkMode ? "#0a0a0f" : "#ffffff" }}>
          <span className="text-xs font-black bg-gradient-to-br from-purple-400 to-violet-300 bg-clip-text text-transparent">SB</span>
        </div>
      </div>
      {/* Bigger name text */}
      <span className={`font-bold text-base ${darkMode ? "text-white" : "text-gray-900"}`}>Shashwata Barman</span>
    </motion.button>
  );
}

function NavLinks({ darkMode }) {
  return navLinks.map((link) => (
    <motion.a
      key={link.href}
      href={link.href}
      onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }); }}
      whileHover={{ y: -1 }}
      className={`px-2 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
        darkMode ? "text-gray-400 hover:text-purple-300 hover:bg-purple-500/10"
                 : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
      }`}
    >{link.label}</motion.a>
  ));
}

function SocialIcons({ darkMode }) {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((s) => (
        <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
          whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.93 }}
          className={`p-2 rounded-xl border transition-all duration-200 ${
            darkMode ? "border-purple-500/15 text-gray-400 hover:text-purple-300 hover:border-purple-500/35 hover:bg-purple-500/10"
                     : "border-gray-200 text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50"
          }`}>{s.icon}</motion.a>
      ))}
    </div>
  );
}

function Copyright({ darkMode }) {
  return (
    <p className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
      © {new Date().getFullYear()} Shashwata Barman. All rights reserved.
    </p>
  );
}

function MadeWith({ darkMode }) {
  return (
    <p className={`text-xs flex items-center gap-1.5 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
      Made with
      <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
        <FiHeart size={11} className="text-purple-400 fill-purple-400" />
      </motion.span>
      by Shashwata Barman
    </p>
  );
}

function BackToTop({ darkMode, scrollToTop }) {
  return (
    <motion.button onClick={scrollToTop} whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.93 }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
        darkMode ? "border-purple-500/20 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/40"
                 : "border-purple-200 text-purple-600 hover:bg-purple-50"
      }`}>
      <FiArrowUp size={12} /> Back to top
    </motion.button>
  );
}
