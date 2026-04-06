import { Section } from "../ui/Section";
import { GlassCard } from "../ui/GlassCard";
import { achievements, education } from "../../data/resume";
import { Award, GraduationCap } from "lucide-react";

export const Achievements = () => {
  return (
    <Section id="achievements">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-8 h-8 text-indigo-400" />
            <h2 className="text-3xl font-semibold text-white tracking-tight">Education</h2>
          </div>
          <div className="relative border-l border-white/10 ml-4 space-y-8 pb-4">
            {education.map((edu, idx) => (
              <div key={idx} className="relative pl-8">
                {/* Glowing Node */}
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />

                <GlassCard className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold text-white mb-1">{edu.degree}</h3>
                  <div className="text-indigo-400 font-medium mb-4">{edu.institution}</div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                    <span className="text-gray-400 leading-relaxed">{edu.details}</span>
                    <span className="text-gray-300 font-mono text-sm bg-black/40 border border-white/10 px-3 py-1.5 rounded-md whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl font-semibold text-white tracking-tight">Highlights</h2>
          </div>
          <div className="relative border-l border-white/10 ml-4 space-y-8 pb-4">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="relative pl-8 group">
                {/* Glowing Node */}
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />

                <GlassCard hoverEffect className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {achievement.description}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
};
