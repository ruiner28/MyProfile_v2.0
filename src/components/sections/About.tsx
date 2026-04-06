import { Section } from "../ui/Section";
import { GlassCard } from "../ui/GlassCard";
import { Cpu, Rocket, MapPin, GraduationCap, Sparkles } from "lucide-react";

export const About = () => {
  return (
    <Section id="about">
      {/* Compact Glass Console Shield */}
      <GlassCard className="relative overflow-hidden p-6 md:p-8 lg:p-10 max-w-4xl mx-auto bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20">

        {/* Subtle Console Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="flex flex-col gap-8">

          {/* Header Console Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                Profile Overview
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium">
                {/* Status Indicator */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  Available for new roles
                </div>
                {/* Location */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  Global / Remote
                </div>
                {/* Degree */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  MS Computer Science
                </div>
              </div>
            </div>

            {/* Minimal Avatar / Identity Marker */}
            <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-white/10 shadow-inner">
              <Sparkles className="w-6 h-6 text-indigo-300" />
            </div>
          </div>

          {/* Main Editorial Typography */}
          <div className="text-base md:text-lg font-light leading-relaxed text-gray-300 max-w-3xl">
            <span className="text-white font-medium">Software Engineer transitioning into applied AI</span>, combining 2+ years of enterprise systems experience with hands-on production work in <span className="text-indigo-400 font-semibold drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">LLM integration</span> and real-time architectures.
            <br /><br />
            I specialize in <span className="text-white font-medium">taking complex products from zero to one</span>. Whether architecting high-availability backend microservices or shipping polished, production-ready AI tools, my absolute focus is on driving measurable business value and delivering seamless, reliable experiences to end users.
          </div>

          {/* Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">

            <div className="flex flex-col gap-3 p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <Cpu className="w-16 h-16" />
              </div>
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 w-fit">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-base mb-1">Systems Architecture</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Designing highly scalable microservices and robust enterprise APIs.</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <Rocket className="w-16 h-16" />
              </div>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 w-fit">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-base mb-1">Zero-to-One Execution</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Driving bare ambiguous requirements into shipped, production-ready products.</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="w-16 h-16" />
              </div>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 w-fit">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-base mb-1">Product Thinking</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Marrying complex backend technical precision with seamless frontend UX.</p>
              </div>
            </div>

          </div>

        </div>
      </GlassCard>
    </Section>
  );
};
