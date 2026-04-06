import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

interface Project {
  title: string;
  period: string;
  techStack: string[];
  github: string;
  live: string;
  image?: string;
  description: string;
  bullets: string[];
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  
  // Freeze background scrolling while modal is open to preserve the physical scroll position natively
  useEffect(() => {
    if (window.customLenis) window.customLenis.stop();
    return () => {
      if (window.customLenis) window.customLenis.start();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Modal Container */}
      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl relative custom-scrollbar flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from triggering master close
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-black/50 hover:bg-white/10 border border-white/10 rounded-full text-white/70 hover:text-white transition-colors z-50 backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cinematic Header Image */}
        <div className="w-full h-40 md:h-56 flex-shrink-0 relative overflow-hidden bg-[#050505] select-none border-b border-white/10">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top opacity-90"
            />
          ) : (
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/20 font-bold text-4xl tracking-widest uppercase">{project.title}</span>
             </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 md:p-6 flex flex-col gap-6">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex flex-col gap-2 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">{project.title}</h2>
              <p className="text-indigo-400 text-sm font-medium tracking-wide">{project.period}</p>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-1">{project.description}</p>
            </div>

            {/* Direct Action Buttons - Removed from the main card click trigger */}
            <div className="flex flex-wrap md:flex-col gap-3 min-w-[200px]">
               <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded-xl font-medium w-full text-sm md:text-base">
                 <span>Live Deployment</span>
                 <ExternalLink className="w-4 h-4" />
               </a>
               <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors rounded-xl font-medium w-full text-sm md:text-base">
                 <Github className="w-4 h-4" />
                 <span>Source Code</span>
               </a>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Architecture / Deep Dive Section */}
          <div className="flex flex-col gap-4">
             <h3 className="text-xl font-semibold text-white tracking-tight">System Architecture & Technical Scope</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               
               <div className="flex flex-col gap-3">
                  {project.bullets.map((bullet, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                      <span className="text-indigo-400 font-bold text-lg leading-none">0{i+1}</span>
                      <p className="text-xs text-gray-400 leading-relaxed">{bullet}</p>
                    </div>
                  ))}
               </div>

               <div className="flex w-full">
                 <div className="flex flex-col gap-3 p-5 w-full rounded-xl border border-white/10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-black to-black">
                    <h4 className="font-semibold text-white mb-2 tracking-wide uppercase text-sm">Ecosystem Integrations</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(t => (
                        <span key={t} className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                 </div>
               </div>
               
             </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};
