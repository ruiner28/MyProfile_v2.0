import { useState } from "react";
import { Section } from "../ui/Section";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { Mail, ArrowUpRight, Copy, CheckCircle2 } from "lucide-react";
import { personalInfo } from "../../data/resume";

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Section id="contact">
      <GlassCard className="relative overflow-hidden p-10 md:p-16 text-center max-w-4xl mx-auto border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-indigo-500/10 blur-[100px] pointer-events-none" />

        {/* Beacon Center */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <Mail className="w-8 h-8 text-indigo-400" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Let's Build Something.
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 flex-grow leading-relaxed font-light">
            I'm always open to discussing product architecture, engineering leadership roles, or partnerships. 
            Drop me a line or connect directly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-xl mx-auto">
            {/* Click to Copy Email Container */}
            <div 
              onClick={handleCopyEmail}
              className="group relative flex items-center justify-between w-full sm:w-auto flex-1 bg-black/40 hover:bg-white/5 border border-white/10 hover:border-indigo-500/30 rounded-xl px-6 py-4 cursor-pointer transition-all duration-300"
            >
              <span className="text-gray-300 font-mono text-sm md:text-base mr-6">{personalInfo.email}</span>
              {copied ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Copy className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors" />
              )}
            </div>

            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full h-full py-4 px-8 text-base font-medium border-white/10">
                LinkedIn Profile <ArrowUpRight className="w-5 h-5 ml-2 opacity-50" />
              </Button>
            </a>
          </div>
        </div>

      </GlassCard>
    </Section>
  );
};
