import { motion } from "framer-motion";

export const GridBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center z-0">
      
      {/* 
        The grid layer 
      */}
      <div 
        className="absolute inset-0 w-full h-full opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)'
        }}
      >
        {/* Animated scrolling plane */}
        <motion.div
           className="w-full h-[200%]"
           animate={{
             y: [0, -64] // 4rem = 64px, seamlessly tiles the grid infinitely
           }}
           transition={{
             duration: 5,
             repeat: Infinity,
             ease: "linear"
           }}
           style={{
            backgroundImage: `
              linear-gradient(to right, rgba(167, 139, 250, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(167, 139, 250, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
           }}
        />
      </div>

    </div>
  );
};
