import { Mail } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import { FaXTwitter as Twitter } from "react-icons/fa6";
import { personalInfo } from "../../data/resume";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { SandEffect } from "../ui/SandEffect";

export const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }
  };

  return (
    <footer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full pt-24 pb-8 overflow-hidden flex flex-col items-center relative z-20 bg-[#030303]"
    >

      {/* Massive Typo Art */}
      <div className="w-full max-w-[100vw] flex flex-col items-center justify-center pointer-events-none select-none mb-16 md:mb-32 px-4 overflow-hidden relative">
        {/* Sand Particle Layer */}
        <SandEffect />
        <div className="flex flex-col items-center justify-center relative z-10 w-full">
          <motion.h1
            className="font-black uppercase text-transparent bg-clip-text tracking-tighter cursor-default"
            style={{
              fontSize: "16vw",
              lineHeight: 0.85,
              backgroundImage: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,1), rgba(255,255,255,0.18))`
            }}
          >
            SOFTWARE
          </motion.h1>
          <motion.h1
            className="font-black uppercase text-transparent bg-clip-text tracking-tighter -mt-[1vw] cursor-default"
            style={{
              fontSize: "16vw",
              lineHeight: 0.85,
              backgroundImage: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,1), rgba(255,255,255,0.18))`
            }}
          >
            ENGINEER
          </motion.h1>
        </div>

        {/* Crisp AI Overlay Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-fit text-center mt-[1vw]">
          <div className="relative group cursor-default">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <p className="relative text-white uppercase tracking-[0.15em] md:tracking-[0.4em] text-[10px] md:text-sm lg:text-base font-semibold backdrop-blur-md px-4 md:px-8 py-2.5 md:py-3.5 border border-white/10 rounded-full bg-white/[0.03] shadow-2xl transition-colors hover:bg-white/[0.08] hover:border-white/30">
              Transitioning into AI Applied Roles
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-medium text-white tracking-tight">{personalInfo.name}</h3>
          <p className="text-sm text-gray-400">Built with care and clean code.</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-4">
            <a href={`mailto:${personalInfo.email}`} className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={personalInfo.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
