import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import { FaXTwitter as Twitter } from "react-icons/fa6";
import { Button } from "../ui/Button";
import { personalInfo } from "../../data/resume";
import { cn } from "../../utils";
import { uiAudio } from "../../utils/audio";

const AudioVisualizer = ({ isPlaying }: { isPlaying: boolean }) => {
  const bars = [0, 1, 2, 3];
  return (
    <div className="flex items-center gap-[3px] h-3 w-4 justify-center">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-[2px] bg-white rounded-full"
          animate={
            isPlaying
              ? {
                  height: ["4px", "12px", "4px"],
                }
              : {
                  height: "2px",
                }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.6 + bar * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : {
                  duration: 0.2,
                }
          }
        />
      ))}
    </div>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  // Sync scroll detection for header shape
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for Scroll-Spy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // triggers when section is near vertical center of screen
      threshold: 0.05,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = ["about", "skills", "projects", "experience", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Reset if scrolled back to top
    const handleScrollTop = () => {
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScrollTop);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, []);

  const handleToggleAudio = () => {
    const newState = uiAudio.toggleSound();
    setIsAudioEnabled(newState);
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled
            ? "top-3 left-3 right-3 md:top-4 md:left-4 md:right-4 lg:top-6 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:w-max max-w-full py-2.5 px-4 md:py-3 md:px-6 bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl lg:rounded-full"
            : "top-0 left-0 right-0 py-4 px-4 md:py-6 md:px-6 lg:px-8 bg-transparent"
        )}
      >
        <div className={cn("mx-auto flex items-center justify-between", !isScrolled && "max-w-6xl w-full", isScrolled && "gap-12")}>
          <a href="#" className="text-white font-medium tracking-tight text-lg hover:text-gray-300 transition-colors">
            {personalInfo.name.split(" ")[0]}
            <span className="text-gray-500">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name} className="relative">
                    <a
                      href={link.href}
                      className={cn(
                        "relative z-10 text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300 block",
                        isActive ? "text-white" : "text-gray-400 hover:text-white"
                      )}
                    >
                      {link.name}
                    </a>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-white/10 border border-white/5 rounded-full z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              {/* Interactive Audio Toggle */}
              <button
                onClick={handleToggleAudio}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                title={isAudioEnabled ? "Mute interface sounds" : "Unmute interface sounds"}
              >
                <AudioVisualizer isPlaying={isAudioEnabled} />
              </button>

              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={personalInfo.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={personalInfo.resume} target="_blank" rel="noreferrer">
                <Button variant="secondary" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </Button>
              </a>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-400 hover:text-white p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl px-6 pt-24 pb-8 flex flex-col md:hidden"
          >
            <nav className="flex-1 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-gray-300 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-6 mt-auto">
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-6">
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href={personalInfo.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>

                {/* Mobile Audio Toggle */}
                <button
                  onClick={handleToggleAudio}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-colors"
                  title={isAudioEnabled ? "Mute interface sounds" : "Unmute interface sounds"}
                >
                  <AudioVisualizer isPlaying={isAudioEnabled} />
                </button>
              </div>
              <a href={personalInfo.resume} target="_blank" rel="noreferrer" className="w-full">
                <Button variant="primary" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
