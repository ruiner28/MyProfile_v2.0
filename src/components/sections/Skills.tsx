import { Section } from "../ui/Section";
import { GlassCard } from "../ui/GlassCard";
import { skills } from "../../data/resume";
import { motion } from "framer-motion";
import { Code2, Server, Database, Layout, Cloud, Brain } from "lucide-react";

export const Skills = () => {
  // Define mathematically perfect 3x3 grid layout spans
  const getCategoryTheme = (key: string) => {
    const themes: Record<string, { title: string, icon: any, span: string, color: string }> = {
      languages: { title: "Languages", icon: Code2, span: "col-span-1", color: "text-indigo-500" },
      backend: { title: "Backend Systems", icon: Server, span: "col-span-1", color: "text-emerald-500" },
      databases: { title: "Databases", icon: Database, span: "col-span-1", color: "text-cyan-500" },
      frontend: { title: "Frontend & UI", icon: Layout, span: "col-span-1", color: "text-pink-500" },
      cloudDevOps: { title: "Cloud & DevOps", icon: Cloud, span: "col-span-1", color: "text-orange-500" },
      aiMl: { title: "AI & Machine Learning", icon: Brain, span: "col-span-1", color: "text-purple-500" }
    };
    return themes[key] || { title: key, icon: Code2, span: "col-span-1", color: "text-white" };
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  // Enforce precise order so the asymmetric 3x3 grid tiles flawlessly
  const orderedKeys = ["languages", "backend", "databases", "frontend", "cloudDevOps", "aiMl"];

  return (
    <Section id="skills">
      <div className="text-center mb-16 relative z-20">
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
          Technical Arsenal
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          A comprehensive suite of technologies I use to build scalable, high-performance applications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto relative z-20">
        {orderedKeys.map((category) => {
          const items = skills[category as keyof typeof skills] || [];
          const theme = getCategoryTheme(category);
          const Icon = theme.icon;

          return (
            <GlassCard
              key={category}
              hoverEffect
              className={`relative overflow-hidden group p-5 lg:p-6 flex flex-col h-full bg-gradient-to-br from-white/[0.05] to-transparent border-white/10 ${theme.span}`}
            >
              {/* Giant Background Watermark */}
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-all duration-700 pointer-events-none z-0">
                <Icon className={`w-32 h-32 ${theme.color}`} strokeWidth={1} />
              </div>

              <div className="flex items-center gap-3 mb-6 relative z-20">
                <div className="p-2 rounded-lg bg-black/40 border border-white/10 shadow-inner">
                  <Icon className={`w-4 h-4 ${theme.color}`} />
                </div>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  {theme.title}
                </h3>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-wrap gap-2 relative z-20 mt-auto"
              >
                {items.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={item}
                    className="px-2.5 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-md text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
};
