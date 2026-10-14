import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';

/**
 * One fixed, transparent, click-through canvas that draws every project phone.
 * Each card renders a drei <View> whose contents are tunnelled into <View.Port />,
 * so 5 phones cost a single WebGL context, and off-screen views aren't drawn.
 */
export default function ProjectsCanvas({ active = true }) {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden="true"
    >
      <View.Port />
    </Canvas>
  );
}
