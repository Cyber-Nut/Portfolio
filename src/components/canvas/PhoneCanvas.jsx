import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, Sparkles } from '@react-three/drei';
import { markLoaded } from '../../utils/loadState';
import Phone from './Phone';

function SceneReady() {
  useEffect(() => markLoaded('scene'), []);
  return null;
}

/** Hero 3D scene: floating phone + app tiles, lit by procedural light panels (no HDR download). */
export default function PhoneCanvas({ active = true, play = true, reduceMotion = false }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 9], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 6]} intensity={1.4} />
      <pointLight position={[-4, -2, 3]} intensity={25} color="#13b9fd" />

      <Suspense fallback={null}>
        <Phone play={play} reduceMotion={reduceMotion} />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[10, 2, 1]} />
          <Lightformer form="rect" intensity={2.5} color="#13b9fd" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
          <Lightformer form="rect" intensity={1.6} color="#5eead4" position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} />
          <Lightformer form="ring" intensity={2} position={[0, 0, -8]} scale={8} />
        </Environment>
        <SceneReady />
      </Suspense>

      {!reduceMotion && <Sparkles count={45} scale={[6, 7, 3]} size={2.4} speed={0.35} color="#13b9fd" opacity={0.7} />}
      <ContactShadows position={[0, -2.35, 0]} opacity={0.55} scale={8} blur={2.6} far={4} resolution={256} color="#000000" />
    </Canvas>
  );
}
