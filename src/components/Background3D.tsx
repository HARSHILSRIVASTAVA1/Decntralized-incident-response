import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box, Torus } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingShape = ({ position, shape = 'sphere' }: { position: [number, number, number], shape?: 'sphere' | 'box' | 'torus' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const renderShape = () => {
    const material = (
      <meshStandardMaterial 
        color="#3b82f6" 
        transparent 
        opacity={0.3}
        emissive="#1e40af"
        emissiveIntensity={0.1}
      />
    );

    switch (shape) {
      case 'box':
        return <Box ref={meshRef} args={[1, 1, 1]}>{material}</Box>;
      case 'torus':
        return <Torus ref={meshRef} args={[1, 0.3, 16, 32]}>{material}</Torus>;
      default:
        return <Sphere ref={meshRef} args={[0.8, 32, 32]}>{material}</Sphere>;
    }
  };

  return (
    <Float
      position={position}
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      {renderShape()}
    </Float>
  );
};

export const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        {/* Floating shapes */}
        <FloatingShape position={[-8, 3, -5]} shape="sphere" />
        <FloatingShape position={[8, -2, -8]} shape="box" />
        <FloatingShape position={[3, 5, -3]} shape="torus" />
        <FloatingShape position={[-5, -4, -6]} shape="sphere" />
        <FloatingShape position={[6, 2, -4]} shape="box" />
        <FloatingShape position={[-2, -6, -7]} shape="torus" />
        <FloatingShape position={[10, -5, -9]} shape="sphere" />
        <FloatingShape position={[-10, 4, -5]} shape="box" />
      </Canvas>
    </div>
  );
};