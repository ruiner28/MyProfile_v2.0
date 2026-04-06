import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSwarm = () => {
  const pointsRef = useRef<THREE.Points>(null);

  // Mathematical Generation of The Swarm
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Generate coordinates using spherical distribution
      // Pushing particles out to create a deep ambient volumetric field
      const r = 25 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta); // x
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
      pos[i * 3 + 2] = r * Math.cos(phi); // z
    }
    return pos;
  }, [count]);

  // Framer-loop physics
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();

      // Base ambient nebula rotation
      const baseRotationY = time * 0.02;
      const baseRotationX = Math.sin(time * 0.05) * 0.1;

      // Mouse-reactive parallax pulling (Attractor Math)
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;

      // Smoothly interpolate current rotation to the mouse target
      pointsRef.current.rotation.y += 0.05 * ((baseRotationY + targetX) - pointsRef.current.rotation.y);
      pointsRef.current.rotation.x += 0.05 * ((baseRotationX - targetY) - pointsRef.current.rotation.x);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#818cf8"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const ParticleHero = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen transition-opacity duration-1000">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
};
