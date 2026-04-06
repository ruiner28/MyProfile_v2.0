import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Achievements } from "./components/sections/Achievements";
import { Contact } from "./components/sections/Contact";
import { AmbientCursorGlow } from "./components/ui/AmbientCursorGlow";
import { Noise } from "./components/ui/Noise";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { CustomCursor } from "./components/ui/CustomCursor";
import { TagSphere } from "./components/ui/TagSphere";
import { Preloader } from "./components/ui/Preloader";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { uiAudio } from "./utils/audio";

function App() {
  const { scrollYProgress } = useScroll();

  // Keep sphere pinned on the left with a gentle vertical drift
  const sphereY = useTransform(scrollYProgress, [0, 0.5, 1], ["5vh", "25vh", "10vh"]);
  // Fade out before footer region
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.05, 0.75, 0.85], [0, 1, 1, 0]);

  const [isLoading, setIsLoading] = useState(true);

  // Cinematic Intro: Scroll from Footer to Hero after curtain drop
  useEffect(() => {
    if (!isLoading) {
      // Wait for the curtain to lift (1.2s) + hold on footer for a few seconds
      const enterTimer = setTimeout(() => {
        if (window.customLenis) {
          // Trigger a dramatic smooth scroll to the top over 3.5 seconds
          window.customLenis.scrollTo(0, { duration: 3.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
        }
      }, 2500); // 2.5 second hold at the bottom

      return () => clearTimeout(enterTimer);
    }
  }, [isLoading]);

  // Global Audio Unlocker for Web Audio API
  useEffect(() => {
    const unlockAudio = () => {
      uiAudio.init();
      document.removeEventListener('mousedown', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
    document.addEventListener('mousedown', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
    return () => {
      document.removeEventListener('mousedown', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <SmoothScroll>
        <div className="relative w-full min-h-screen text-gray-400 bg-[#030303] overflow-hidden selection:bg-indigo-500/30 md:cursor-none">

          {/* Immersive Depth Background */}
          <div className="pointer-events-none fixed inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] opacity-50" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] opacity-30" />
          </div>

          <motion.div
            className="fixed left-[-80px] z-0 w-[400px] h-[400px] hidden md:block"
            style={{ y: sphereY, opacity: sphereOpacity }}
          >
            <TagSphere />
          </motion.div>

          <Noise />
          <AmbientCursorGlow />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          <main className="flex flex-col items-center justify-center w-full">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Achievements />
            <Contact />
          </main>

          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}

export default App;
