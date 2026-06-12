import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotSpringConfig = { damping: 30, stiffness: 800, mass: 0.05 };
  const ringSpringConfig = { damping: 25, stiffness: 220, mass: 0.15 };

  const dotX = useSpring(cursorX, dotSpringConfig);
  const dotY = useSpring(cursorY, dotSpringConfig);

  const ringX = useSpring(cursorX, ringSpringConfig);
  const ringY = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    // Detect touch devices
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.style.cursor === "pointer" ||
        target.getAttribute("role") === "button";

      setIsHovered(!!interactive);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      setRipples((prev) => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY]);

  // Hide completely on mobile/touch
  if (isMobile) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-exclusion -translate-x-1/2 -translate-y-1/2"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isClicked ? 0.6 : (isHovered ? 1.5 : 1),
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border border-white/40 rounded-full pointer-events-none z-[9998] mix-blend-exclusion -translate-x-1/2 -translate-y-1/2"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isClicked ? 0.8 : (isHovered ? 1.8 : 1),
          borderColor: isHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)",
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9997] mix-blend-exclusion -translate-x-1/2 -translate-y-1/2"
          style={{
            x: ripple.x,
            y: ripple.y,
          }}
          initial={{ scale: 0.4, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() => {
            setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
          }}
        />
      ))}
    </>
  );
};
