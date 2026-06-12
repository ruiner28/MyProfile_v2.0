import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  { minProgress: 0, text: "Initializing Web Audio context..." },
  { minProgress: 15, text: "Compiling WebGL particle engine... OK" },
  { minProgress: 35, text: "Configuring Fibonacci TagSphere math... OK" },
  { minProgress: 55, text: "Applying glassmorphism styling tokens... OK" },
  { minProgress: 75, text: "Indexing pgvector vector embeddings... OK" },
  { minProgress: 90, text: "Establishing secure SSL connection... OK" },
  { minProgress: 100, text: "System online. Launching workspace..." }
];

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

  // Keep last 4 logs to simulate scrolling terminal
  const activeLogs = BOOT_LOGS.filter((log) => progress >= log.minProgress).slice(-4);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center overflow-hidden flex-col"
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="flex flex-col items-start w-72 gap-4">
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

        {/* Terminal Boot Sequence Logs */}
        <div className="w-full h-24 overflow-hidden text-[11px] font-mono text-gray-500 flex flex-col gap-1.5 pt-2 border-t border-white/5">
          {activeLogs.map((log) => (
            <motion.div
              key={log.text}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={log.minProgress === 100 ? "text-indigo-400 font-bold" : "text-gray-400"}
            >
              <span className="text-gray-600 font-bold mr-2">&gt;</span>
              {log.text}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
