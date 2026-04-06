import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Extremely snappy but smooth spring physics
  const springConfig = { damping: 20, stiffness: 600, mass: 0.05 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8); // Offset by half width
      cursorY.set(e.clientY - 8);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
      
      const computedStyle = window.getComputedStyle(target);
      if (computedStyle.cursor === 'pointer') {
         setIsPointer(true);
      } else {
         setIsPointer(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // If mobile, we usually want to hide the custom cursor completely
  // For simplicity, we just rely on the CSS hiding the default cursor and the JS doing its job.

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-exclusion"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isHovered || isPointer ? 3 : 1,
          opacity: isHovered || isPointer ? 0.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};
