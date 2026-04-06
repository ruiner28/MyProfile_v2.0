import { useEffect, useRef, useState } from "react";

const texts = [
  "TypeScript", "React", "Next.js", "Node.js", "NestJS", 
  "Python", "AWS", "Docker", "PostgreSQL", "Supabase", 
  "GraphQL", "Redis", "Kafka", "LLMs", "Genkit", 
  "Vector Search", "Spring Boot", "TailwindCSS", "Framer"
];

// Fibonacci sphere distribution
const computePositions = (n: number, radius: number) => {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // radius at y
    const theta = phi * i; // golden angle increment
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push({ x: x * radius, y: y * radius, z: z * radius });
  }
  return points;
};

export const TagSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<{ x: number, y: number, z: number }[]>([]);
  
  // Rotation states
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  const mouseX = useRef(0.002);
  const mouseY = useRef(0.002);

  useEffect(() => {
    setPositions(computePositions(texts.length, 120));

    const handleMouseMove = (e: MouseEvent) => {
      // mapping mouse position to small rotation speeds
      const x = (e.clientX / window.innerWidth - 0.5) * 0.02;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.02;
      mouseX.current = x;
      mouseY.current = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      rotationY.current += mouseX.current || 0.005;
      rotationX.current -= mouseY.current || 0.005;

      if (containerRef.current) {
        const cx = Math.cos(rotationX.current);
        const sx = Math.sin(rotationX.current);
        const cy = Math.cos(rotationY.current);
        const sy = Math.sin(rotationY.current);

        const children = containerRef.current.children;
        for (let i = 0; i < children.length; i++) {
          const el = children[i] as HTMLElement;
          // Initial positions
          const p = positions[i];
          if (!p) continue;

          // Rotation Y
          let x = p.x * cy + p.z * sy;
          let z = -p.x * sy + p.z * cy;
          let y = p.y;

          // Rotation X
          const tempY = y * cx - z * sx;
          z = y * sx + z * cx;
          y = tempY;

          // Project 3D to 2D
          const perspective = 300;
          const scale = perspective / (perspective + z);
          const alpha = (z + 120) / 240; // z normalized from 0 to 1

          el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
          el.style.opacity = `${0.2 + alpha * 0.8}`;
          el.style.zIndex = `${Math.round(scale * 100)}`;
          el.style.filter = `blur(${Math.max(0, (1 - alpha) * 2)}px)`;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    if (positions.length > 0) {
      animate();
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [positions.length]);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-80 mix-blend-screen scale-75 md:scale-100 z-0">
      <div 
        ref={containerRef} 
        className="relative w-full h-full flex items-center justify-center perspective-[1000px]"
      >
        {positions.length > 0 && texts.map((text) => (
          <span 
            key={text} 
            className="absolute text-sm md:text-base font-mono font-bold text-indigo-300 whitespace-nowrap drop-shadow-[0_0_12px_rgba(129,140,248,0.9)]"
            style={{ 
              top: '50%', 
              left: '50%',
              marginTop: '-0.5rem',
              marginLeft: '-1rem'
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
