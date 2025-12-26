import React, { useRef } from 'react';
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

  // useFrame for animation loop
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }

    const material = materialRef.current;

    if (material && 'distort' in material) {
      material.distort = 0.5 + Math.sin(clock.getElapsedTime()) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {/* Tesselated Sphere*/}
      <sphereGeometry args={[1, 64, 64]} />

      {/* MeshDistortMaterial for a liquid/organic look. Set metalness HIGH for reflective effect*/}
      <MeshDistortMaterial
        ref={materialRef as any}
        metalness={1.0}
        roughness={0.1}
        color={'#E0E0E0'}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        distort={0.6}
        speed={2.5}
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
        <LiquidObject position={[-1, 0, 1]} />
      </DragControls>

      <DragControls>
        <LiquidObject position={[4, -2, -1]} />
      </DragControls>

      <DragControls>
        <LiquidObject position={[0, 2, -3]} />
      </DragControls>

      <Environment preset='forest' />
    </Canvas>
  );
};

export default MetalLiquidEffect;
