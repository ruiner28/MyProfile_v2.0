import { useEffect, useRef } from "react";

interface Grain {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export const SandEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const grainsRef = useRef<Grain[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Fewer particles on mobile for performance
    const count = window.innerWidth < 768 ? 200 : 600;
    const grains: Grain[] = [];
    for (let i = 0; i < count; i++) {
      grains.push(createGrain(canvas.width, canvas.height));
    }
    grainsRef.current = grains;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    canvas.parentElement?.addEventListener("mousemove", handleMouseMove);

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < grains.length; i++) {
        const g = grains[i];

        // Mouse repulsion physics
        const dx = g.x - mx;
        const dy = g.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150;

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * 2;
          g.vx += (dx / dist) * force;
          g.vy += (dy / dist) * force;
        }

        // Gravity: grains slowly fall
        g.vy += 0.01;

        // Friction / air resistance
        g.vx *= 0.98;
        g.vy *= 0.98;

        // Gentle ambient drift
        g.vx += Math.sin(Date.now() * 0.0005 + i) * 0.02;

        g.x += g.vx;
        g.y += g.vy;

        // Age the grain
        g.life -= 1;

        // Reset grain if it drifts off-screen or dies
        if (g.x < -20 || g.x > canvas.width + 20 || g.y > canvas.height + 20 || g.life <= 0) {
          Object.assign(g, createGrain(canvas.width, canvas.height));
        }

        // Draw the grain
        const fadeAlpha = Math.min(1, g.life / (g.maxLife * 0.2)) * g.alpha;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 180, 150, ${fadeAlpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
    />
  );
};

function createGrain(w: number, h: number): Grain {
  const maxLife = 300 + Math.random() * 400;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: 0.5 + Math.random() * 1.5,
    alpha: 0.1 + Math.random() * 0.4,
    life: maxLife,
    maxLife,
  };
}
