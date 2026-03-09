import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 80);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Track */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[9996] h-[5px] bg-white/5"
          />

          {/* Progress fill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 z-[9997] h-[5px] origin-left"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #6d28d9, #8b5cf6, #c084fc, #e879f9)",
              boxShadow: "0 0 14px rgba(139,92,246,1), 0 0 30px rgba(139,92,246,0.6)",
            }}
          >
            {/* Shimmer */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-1/3"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              }}
            />
            {/* Glowing tip */}
            <div
              className="absolute right-0 top-1/2 w-4 h-4 rounded-full"
              style={{
                background: "#c084fc",
                boxShadow: "0 0 12px #c084fc, 0 0 24px #a78bfa, 0 0 40px #7c3aed",
                transform: "translate(50%, -50%)",
              }}
            />
          </motion.div>

          {/* % badge — always top-right */}
          {progress > 10 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed top-4 right-4 z-[9997] px-2.5 py-1 rounded-full text-xs font-bold border pointer-events-none"
              style={{
                background: "rgba(10,10,15,0.85)",
                borderColor: "rgba(139,92,246,0.25)",
                color: "#a78bfa",
                backdropFilter: "blur(8px)",
              }}
            >
              {Math.round(progress)}%
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
