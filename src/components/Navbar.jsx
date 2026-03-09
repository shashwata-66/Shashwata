import { useState, useEffect, useRef } from "react";
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

// Returns whichever section has scrolled past the top-third of the viewport
function getActiveSection() {
  const triggerY = window.innerHeight * 0.35; // 35% down viewport

  // Walk sections bottom-up; first one whose top is above the trigger line wins
  for (let i = navLinks.length - 1; i >= 0; i--) {
    const el = document.querySelector(navLinks[i].href);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= triggerY) {
      return navLinks[i].href;
    }
  }
  return "#hero";
}

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("#hero");
  const [isMobile,   setIsMobile]   = useState(false);

  const isClickScrolling = useRef(false);
  const suppressTimer    = useRef(null);

  // ── Responsive ─────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // ── Scroll spy ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!isClickScrolling.current) {
        setActiveLink(getActiveSection());
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // sync on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Nav click ──────────────────────────────────────────────────────────
  const handleNavClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);

    // Suppress spy while smooth-scroll animates (~1 s), then re-sync
    isClickScrolling.current = true;
    clearTimeout(suppressTimer.current);
    suppressTimer.current = setTimeout(() => {
      isClickScrolling.current = false;
      setActiveLink(getActiveSection());
    }, 1000);

    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
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
          className="max-w-6xl mx-auto py-4 flex items-center justify-between"
          style={{ paddingLeft: "1.5rem", paddingRight: isMobile ? "1.25rem" : "1.5rem" }}
        >

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
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

          {/* ── Desktop links ─────────────────────────────────────────── */}
          {!isMobile && (
            <ul className="flex items-center gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeLink === link.href;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 group ${
                        isActive
                          ? "text-white"
                          : darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {/* Animated glowing pill for active */}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavPill"
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: "linear-gradient(135deg, #6d28d9, #9333ea)",
                            boxShadow: "0 0 18px rgba(139,92,246,0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      {/* Hover bg when not active */}
                      {!isActive && (
                        <span
                          className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                            darkMode ? "bg-white/5" : "bg-gray-100"
                          }`}
                        />
                      )}

                      <span className="relative z-10">{link.label}</span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          )}

          {/* ── Right controls ────────────────────────────────────────── */}
          <div className="flex items-center gap-2">

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={toggleDarkMode}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 flex items-center ${
                darkMode
                  ? "bg-purple-600/30 border border-purple-500/30"
                  : "bg-gray-200 border border-gray-300"
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
                {darkMode
                  ? <FiMoon size={11} className="text-purple-900" />
                  : <FiSun  size={11} className="text-yellow-500" />}
              </motion.div>
            </motion.button>

            {/* Hamburger */}
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
                    <motion.span key="close"
                      initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}>
                      <FiX size={20} />
                    </motion.span>
                  ) : (
                    <motion.span key="open"
                      initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}>
                      <FiMenu size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile dropdown ──────────────────────────────────────────────── */}
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
              {navLinks.map((link, i) => {
                const isActive = activeLink === link.href;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`relative w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden ${
                        isActive ? "text-white" : darkMode ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: "linear-gradient(135deg, #6d28d9, #9333ea)",
                            boxShadow: "0 0 14px rgba(139,92,246,0.4)",
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
