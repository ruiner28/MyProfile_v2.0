import { Section } from "../ui/Section";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { ExternalLink } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { projects, personalInfo } from "../../data/resume";

export const Projects = () => {
  return (
    <Section id="projects">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            Featured Work
          </h2>
          <p className="text-gray-400 max-w-2xl">
            A selection of production-grade applications emphasizing architecture, performance, and user experience.
          </p>
        </div>
        <a href={personalInfo.github} target="_blank" rel="noreferrer" className="max-w-fit">
          <Button variant="secondary" className="w-full">
            View All on GitHub
          </Button>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {projects.map((project, idx) => (
          <GlassCard 
            key={idx} 
            hoverEffect 
            className="group flex flex-col h-full !p-0 overflow-hidden cursor-pointer"
            onClick={() => window.open(project.live, '_blank', 'noopener,noreferrer')}
          >
            
            {/* Visual Image/Mockup Placeholder */}
            <div className="w-full h-64 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 relative overflow-hidden border-b border-white/5">
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${project.title} Interface`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-black/40 border border-white/10 rounded-lg shadow-2xl backdrop-blur-md flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <span className="text-white/30 font-medium tracking-widest uppercase text-sm">
                      {project.title} Interface
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold text-white tracking-tight">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 relative z-20">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-4 mb-6">
                {project.bullets.map((bullet, i) => (
                  <div key={i} className="flex gap-3 text-sm text-gray-300">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/10">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-xs font-medium text-gray-400 bg-black/50 px-2.5 py-1 rounded-md border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
          </GlassCard>
        ))}
      </div>
    </Section>
  );
};
