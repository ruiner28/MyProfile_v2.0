import { forwardRef, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (localRef.current) {
        const { left, top } = localRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }
    };

    return (
      <motion.div
        ref={(r) => {

          localRef.current = r;
          if (typeof ref === "function") ref(r);
          else if (ref) ref.current = r;
        }}
        onMouseMove={handleMouseMove}
        className={cn(
          "glass-card relative overflow-hidden p-6 md:p-8 group",
          hoverEffect ? "hover:-translate-y-1 hover:shadow-2xl transition-all duration-500" : "",
          className
        )}
        {...props}
      >
        {hoverEffect && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
            style={{
              background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 40%)`,
            }}
          />
        )}
        <motion.div className="relative z-10 flex flex-col h-full">{children}</motion.div>
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
