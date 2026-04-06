import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../../utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
          "bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm",
          "transition-colors hover:bg-white/10 hover:text-white cursor-default",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
