import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Home",       href: "#hero" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    // 1024px covers phones + all iPads (Mini 768, Air 820, Pro 1024)
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const handleNavClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? darkMode
              ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-purple-500/10 shadow-[0_4px_30px_rgba(139,92,246,0.08)]"
              : "bg-white/80 backdrop-blur-xl border-b border-purple-200/40 shadow-[0_4px_30px_rgba(139,92,246,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div
          className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
          style={{ paddingRight: isMobile ? "3.5rem" : undefined }}
        >

          {/* Logo */}
          <motion.a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative group"
          >
            <div className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{ background: "conic-gradient(from 0deg, #7c3aed, #a78bfa, #7c3aed)" }}
              />
              <div
                className="absolute inset-[2px] rounded-[10px] flex items-center justify-center"
                style={{ background: darkMode ? "#0a0a0f" : "#ffffff" }}
              >
                <span className="text-sm font-black tracking-tight bg-gradient-to-br from-purple-400 to-violet-300 bg-clip-text text-transparent select-none">
                  SB
                </span>
              </div>
            </div>
          </motion.a>

          {/* Desktop Nav Links — only on screens 1024px and above */}
          {!isMobile && (
            <ul className="flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group ${
                      darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    } ${activeLink === link.href ? (darkMode ? "text-white" : "text-gray-900") : ""}`}
                  >
                    <span
                      className={`absolute inset-0 rounded-lg transition-opacity duration-200 ${
                        activeLink === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      } ${darkMode ? "bg-purple-500/10" : "bg-purple-50"}`}
                    />
                    <span className="relative z-10">{link.label}</span>
                    {activeLink === link.href && (
                      <motion.span
                        layoutId="activeNavUnderline"
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                        style={{ background: "linear-gradient(90deg, #7c3aed, #c084fc)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Right controls */}
          <div className="flex items-center gap-2">

            {/* Dark/Light Toggle — always visible */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={toggleDarkMode}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 flex items-center ${
                darkMode ? "bg-purple-600/30 border border-purple-500/30" : "bg-gray-200 border border-gray-300"
              }`}
              aria-label="Toggle theme"
            >
              <motion.div
                animate={{ x: darkMode ? 28 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`absolute top-[3px] w-5 h-5 rounded-full flex items-center justify-center shadow-md ${
                  darkMode ? "bg-purple-400" : "bg-white"
                }`}
              >
                {darkMode ? (
                  <FiMoon size={11} className="text-purple-900" />
                ) : (
                  <FiSun size={11} className="text-yellow-500" />
                )}
              </motion.div>
            </motion.button>

            {/* Hamburger — mobile + tablet only */}
            {isMobile && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? "text-gray-300 hover:bg-purple-500/10" : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiX size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMenu size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

          </div>
        </div>
      </motion.nav>

      {/* Mobile + Tablet Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed top-[72px] left-4 right-4 z-40 rounded-2xl overflow-hidden ${
              darkMode
                ? "bg-[#0e0e1a]/95 backdrop-blur-xl border border-purple-500/15 shadow-[0_20px_60px_rgba(139,92,246,0.15)]"
                : "bg-white/95 backdrop-blur-xl border border-purple-100 shadow-[0_20px_60px_rgba(139,92,246,0.1)]"
            }`}
          >
            <ul className="p-3 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      darkMode
                        ? "text-gray-300 hover:text-white hover:bg-purple-500/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-purple-50"
                    } ${
                      activeLink === link.href
                        ? darkMode
                          ? "text-white bg-purple-500/10 border-l-2 border-purple-500"
                          : "text-purple-700 bg-purple-50 border-l-2 border-purple-500"
                        : ""
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
