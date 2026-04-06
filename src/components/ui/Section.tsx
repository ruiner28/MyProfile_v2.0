import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils";

interface SectionProps extends HTMLMotionProps<"section"> {
  id: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, children, id, ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        id={id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className={cn("py-10 md:py-16 w-full max-w-7xl mx-auto px-6 lg:px-8", className)}
        {...props}
      >
        {children}
      </motion.section>
    );
  }
);

Section.displayName = "Section";
