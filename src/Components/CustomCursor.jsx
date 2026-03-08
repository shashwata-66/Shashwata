import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Both dot and ring follow cursor exactly — no lag
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  useEffect(() => {
    const enter = (e) => {
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        e.target.closest("a") ||
        e.target.closest("button")
      ) setHovering(true);
    };
    const leave = () => setHovering(false);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    return () => {
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, []);

  const ringSize = hovering ? 44 : clicking ? 24 : 36;
  const dotSize = clicking ? 3 : hovering ? 0 : 5;

  return (
    <>
      {/* Ring — centered exactly on cursor with spring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border-2"
        animate={{
          x: pos.x - ringSize / 2,
          y: pos.y - ringSize / 2,
          width: ringSize,
          height: ringSize,
          borderColor: hovering ? "#c4b5fd" : clicking ? "#7c3aed" : "#a78bfa",
          opacity: hovering ? 0.9 : 0.65,
        }}
        transition={{ type: "spring", stiffness: 900, damping: 40, mass: 0.3 }}
      />

      {/* Dot — always at exact cursor position, instant */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        animate={{
          x: pos.x - dotSize / 2,
          y: pos.y - dotSize / 2,
          width: dotSize,
          height: dotSize,
          opacity: hovering ? 0 : 1,
          backgroundColor: "#a78bfa",
        }}
        transition={{ type: "tween", duration: 0 }}
      />

      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>
    </>
  );
}
