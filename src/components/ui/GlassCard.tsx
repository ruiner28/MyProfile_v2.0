import { forwardRef, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils";
import { uiAudio } from "../../utils/audio";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  hoverEffect?: boolean;
  children?: React.ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 3D Tilt rotation motion values
    const rotateXVal = useMotionValue(0);
    const rotateYVal = useMotionValue(0);

    // Springs for 3D tilt
    const rotateX = useSpring(rotateXVal, { damping: 20, stiffness: 150 });
    const rotateY = useSpring(rotateYVal, { damping: 20, stiffness: 150 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (localRef.current) {
        const rect = localRef.current.getBoundingClientRect();
        const left = rect.left;
        const top = rect.top;
        const width = rect.width;
        const height = rect.height;

        const localX = e.clientX - left;
        const localY = e.clientY - top;

        mouseX.set(localX);
        mouseY.set(localY);

        if (hoverEffect) {
          const normalizedX = (localX / width) - 0.5;
          const normalizedY = (localY / height) - 0.5;
          const maxRotation = 8; // subtle and premium rotation
          rotateXVal.set(-normalizedY * maxRotation);
          rotateYVal.set(normalizedX * maxRotation);
        }
      }
      if (props.onMouseMove) props.onMouseMove(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoverEffect) uiAudio.playHoverTick();
      if (props.onMouseEnter) props.onMouseEnter(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      rotateXVal.set(0);
      rotateYVal.set(0);
      if (props.onMouseLeave) props.onMouseLeave(e);
    };

    return (
      <motion.div
        ref={(r) => {
          localRef.current = r;
          if (typeof ref === "function") ref(r);
          else if (ref) ref.current = r;
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          if (props.onClick) {
            uiAudio.playClickPop();
            props.onClick(e);
          }
        }}
        className={cn(
          "glass-card relative overflow-hidden p-6 md:p-8 group",
          className
        )}
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
          rotateX: hoverEffect ? rotateX : 0,
          rotateY: hoverEffect ? rotateY : 0,
          ...props.style,
        }}
        whileHover={hoverEffect ? {
          scale: 1.015,
          y: -4,
          boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 20px 40px rgba(0, 0, 0, 0.4)",
        } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
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
        <div 
          className="relative z-10 flex flex-col h-full"
          style={{ transform: hoverEffect ? "translateZ(20px)" : "none", transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
