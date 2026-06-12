import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const AmbientCursorGlow = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth springs for a fluid, floating feel
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 25, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 25, mass: 0.4 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] z-30 -translate-x-1/2 -translate-y-1/2"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    />
  );
};
