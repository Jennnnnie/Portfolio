import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  MeshDistortMaterial,
  DragControls,
} from '@react-three/drei';
import * as THREE from 'three';

interface DistortMaterialType extends THREE.Material {
  distort: number;
  speed: number;
}

interface LiquidObjectProps {
  position: [number, number, number];
}

const LiquidObject: React.FC<LiquidObjectProps> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<DistortMaterialType>(null!);

  //direction and movement of liquid objects
  const movement = useMemo(
    () => ({
      dirX: (Math.random() - 0.5) * 0.0006,
      dirY: (Math.random() - 0.5) * 0.0006,
      phase: Math.random() * Math.PI * 2,
    }),
    []
  );

  // animation loop
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (meshRef.current) {
      // constant drift
      meshRef.current.position.x += movement.dirX;
      meshRef.current.position.y += movement.dirY;

      // wander
      meshRef.current.position.x += Math.sin(t * 0.2 + movement.phase) * 0.001;
      meshRef.current.position.y += Math.cos(t * 0.2 + movement.phase) * 0.001;

      // rotation
      meshRef.current.rotation.y = t * 0.1;

      // If they go too far left, they wrap to the right (and vice versa)
      if (meshRef.current.position.x > 12) meshRef.current.position.x = -12;
      if (meshRef.current.position.x < -12) meshRef.current.position.x = 12;
      if (meshRef.current.position.y > 8) meshRef.current.position.y = -8;
      if (meshRef.current.position.y < -8) meshRef.current.position.y = 8;
    }

    const material = materialRef.current;
    if (material && 'distort' in material) {
      material.distort = 0.5 + Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {/* Shape and size of the liquid object */}
      <sphereGeometry args={[1.3, 64, 64]} />

      {/* MeshDistortMaterial for a liquid/organic look. Set metalness higher for reflective effect*/}
      <MeshDistortMaterial
        ref={materialRef as any}
        metalness={1.0}
        roughness={0.1}
        color={'#E0E0E0'}
        clearcoat={1.0}
        speed={1}
      />
    </mesh>
  );
};

const MetalLiquidEffect = () => {
  return (
    // Canvas creates the WebGL context
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <color attach='background' args={['#A8B5B5']} />
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />

      {/* Each blob can move independently from one another*/}
      <DragControls>
        <LiquidObject position={[-5, 2, 2]} />
      </DragControls>

      <DragControls>
        <LiquidObject position={[4, -1, 5]} />
      </DragControls>

      <DragControls>
        <LiquidObject position={[2, 4, -1]} />
      </DragControls>

      <Environment preset='forest' />
    </Canvas>
  );
};

export default MetalLiquidEffect;
