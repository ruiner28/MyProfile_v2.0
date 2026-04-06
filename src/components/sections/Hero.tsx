import { ArrowRight, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { personalInfo } from "../../data/resume";
import { Magnetic } from "../ui/Magnetic";
import { GridBackground } from "../ui/GridBackground";

export const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Infinite Cinematic Engineering Grid */}
      <GridBackground />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center z-10 w-full mt-10 md:mt-0 relative">
        
        {/* Core text glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] bg-indigo-500/10 blur-[140px] rounded-[100%] pointer-events-none" />

        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center relative z-10">
          
          <motion.div variants={item}>
            <Badge className="mb-8 px-4 py-1.5 flex items-center gap-2 border-white/10 bg-white/5 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)] animate-pulse" />
              <span className="text-gray-300 font-medium tracking-wide">Available for Opportunities</span>
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-bold text-white tracking-tighter lg:-tracking-[0.02em] mb-6 max-w-4xl leading-[1.1]"
          >
            {personalInfo.heroHeadline}
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed tracking-wide font-light"
          >
            I am a <span className="text-gray-200 font-medium">{personalInfo.title}</span> focused on building scalable systems, real-time architectures, and exceptional digital product experiences.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center gap-5"
          >
            <Magnetic>
              <a href="#projects" className="block w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-white text-black hover:bg-gray-200 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  Explore Work
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://gauravpawar.com" target="_blank" rel="noopener noreferrer" className="block w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 bg-white/5 border border-white/10 hover:bg-white/10">
                  View Last Work
                  <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="block w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 bg-white/5 border border-white/10 hover:bg-white/10">
                  <Mail className="w-4 h-4 mr-1" />
                  Contact Me
                </Button>
              </a>
            </Magnetic>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
};
