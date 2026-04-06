import { useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Rocket } from "lucide-react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [isLaunching, setIsLaunching] = useState(false);
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);

  const scrollToTop = () => {
    setIsLaunching(true);
    if (window.customLenis) {
      window.customLenis.scrollTo(0, { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      style={{ opacity, scale: isLaunching ? 1.05 : 1 }}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex items-center justify-center cursor-none group"
      onClick={scrollToTop}
    >
      <motion.div 
        className="relative flex items-center justify-center w-14 h-14 bg-black/40 backdrop-blur-md rounded-full shadow-2xl border border-white/10 transition-colors"
        animate={{
          backgroundColor: isLaunching ? "rgba(99, 102, 241, 0.2)" : "rgba(0, 0, 0, 0.4)",
          borderColor: isLaunching ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.1)"
        }}
      >
        {/* The rotating progress SVG */}
        <svg className="absolute w-14 h-14 -rotate-90 transform pointer-events-none" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="3.5"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#progressGradient)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* The Rocket Icon */}
        <div className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none overflow-hidden rounded-full">
          <motion.div
            animate={
              isLaunching
                ? { y: -120, opacity: 0, scale: 0.8 }
                : { y: 0, opacity: 1, scale: 1 }
            }
            transition={{
              duration: isLaunching ? 0.7 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={() => {
              if (isLaunching) {
                // Ensure it resets after flying out
                setTimeout(() => setIsLaunching(false), 200);
              }
            }}
            className="flex items-center justify-center text-gray-400 group-hover:text-white transition-colors duration-300"
          >
            <Rocket strokeWidth={1.5} className="w-5 h-5 pointer-events-none -mt-0.5" />
          </motion.div>
          
          {/* Subtle thruster trail effect when launching */}
          {isLaunching && (
             <motion.div
               initial={{ height: 0, opacity: 0, y: 10 }}
               animate={{ height: 40, opacity: 1, y: -20 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="absolute bottom-0 w-1 bg-gradient-to-t from-transparent via-indigo-400 to-indigo-100 rounded-full blur-[1px]"
             />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
