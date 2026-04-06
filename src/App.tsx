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
import { motion, useScroll, useTransform } from "framer-motion";

function App() {
  const { scrollYProgress } = useScroll();

  // Parallax path across the screen based on scroll depth
  // Starts top left, moves to right middle, then bottom left, then center.
  const sphereX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["-10vw", "60vw", "-20vw", "20vw"]);
  const sphereY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["0vh", "30vh", "60vh", "20vh"]);
  const sphereOpacity = useTransform(scrollYProgress, [0.8, 0.95], [1, 0]);

  return (
    <SmoothScroll>
      <div className="relative w-full min-h-screen text-gray-400 bg-[#030303] overflow-hidden selection:bg-indigo-500/30 cursor-none">

        {/* Immersive Depth Background */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] opacity-30" />
        </div>

        <motion.div
          className="fixed z-0 w-[400px] h-[400px]"
          style={{ x: sphereX, y: sphereY, opacity: sphereOpacity }}
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
  );
}

export default App;
