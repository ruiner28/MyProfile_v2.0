import { Section } from "../ui/Section";
import { GlassCard } from "../ui/GlassCard";
import { experience } from "../../data/resume";

export const Experience = () => {
  return (
    <Section id="experience">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
          Professional Journey
        </h2>
        <p className="text-gray-400 max-w-2xl">
          A track record of building and shipping enterprise systems and scalable full-stack products.
        </p>
      </div>

      <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-8 md:pl-12 space-y-12">
        {experience.map((job, idx) => (
          <div key={idx} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[41px] md:-left-[57px] top-6 w-5 h-5 rounded-full bg-black border-2 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

            <GlassCard hoverEffect className="p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">{job.role}</h3>
                  <div className="text-lg text-indigo-400 font-medium">{job.company}</div>
                </div>
                <div className="text-right flex flex-col md:items-end">
                  <span className="text-gray-300 font-medium bg-white/5 px-3 py-1 rounded-full text-sm inline-block w-max">
                    {job.period}
                  </span>
                  <span className="text-gray-500 text-sm mt-2">{job.location}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {job.bullets.map((bullet, i) => (
                  <div key={i} className="flex gap-3 text-gray-300">
                    <span className="text-gray-500 mt-1.5 text-xs">▹</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {job.technologies.map((tech) => (
                  <span key={tech} className="text-xs font-medium text-gray-400">
                    #{tech}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </Section>
  );
};
