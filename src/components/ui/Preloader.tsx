import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds total load time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center overflow-hidden flex-col"
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="flex flex-col items-start w-64 gap-4">
        {/* Top Text */}
        <div className="flex justify-between w-full text-xs font-medium tracking-[0.2em] uppercase text-gray-500">
          <span>{progress === 100 ? "System Ready" : "Initializing"}</span>
          <span className="font-mono">{progress}%</span>
        </div>
        
        {/* Loading Bar Container */}
        <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
          {/* Loading Bar Fill */}
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
