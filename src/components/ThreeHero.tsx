import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment } from '@react-three/drei';
import { Suspense } from 'react';

const SpinningShapes = () => {
  return (
    <Float floatIntensity={1.5} speed={2} rotationIntensity={0.4}>
      <group>
        <mesh position={[-1.2, 0.2, 0]}>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color={'#f97316'} metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[1.1, -0.3, 0]}>
          <dodecahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color={'#7c3aed'} metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.9, -0.4]}>
          <torusGeometry args={[0.5, 0.18, 32, 96]} />
          <meshStandardMaterial color={'#14b8a6'} metalness={0.5} roughness={0.25} />
        </mesh>
      </group>
    </Float>
  );
};

const ThreeHero = () => {
  return (
    <div className="w-full h-[380px] rounded-2xl overflow-hidden edu-card-shadow bg-card">
      <Canvas camera={{ position: [3, 2, 4], fov: 50 }}>
        {/* Keep canvas transparent so parent bg (card) shows in both themes */}
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} />
        <Suspense fallback={null}>
          <SpinningShapes />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
};

export default ThreeHero;


