import { Suspense, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, PerspectiveCamera, useTexture, View } from '@react-three/drei';
import * as THREE from 'three';
import { PhoneBody, prepareScreenTextures, ScreenSurface } from './phoneParts';

const BASE_Y = -0.14; // resting yaw

function ProjectPhone({ screens, index, direction, motion, reduceMotion, onReady }) {
  const textures = useTexture(screens);
  useMemo(() => prepareScreenTextures(textures), [textures]);

  const group = useRef(null);
  const kick = useRef(0);
  const lastIndex = useRef(index);

  useEffect(() => {
    onReady?.(); // textures are loaded once this commits
  }, [onReady]);

  // A small "flick" toward the swipe direction on every screen change.
  useEffect(() => {
    if (index !== lastIndex.current && !reduceMotion) kick.current = -direction * 0.55;
    lastIndex.current = index;
  }, [index, direction, reduceMotion]);

  useFrame((_, rawDelta) => {
    const g = group.current;
    if (!g) return;
    const delta = Math.min(rawDelta, 0.1);
    const { damp } = THREE.MathUtils;
    const m = motion.current;
    const tiltX = reduceMotion ? 0 : m.tiltX;
    const tiltY = reduceMotion ? 0 : m.tiltY;
    kick.current = damp(kick.current, 0, 5, delta);
    g.rotation.y = damp(g.rotation.y, BASE_Y + tiltX * 0.4 + m.drag * 0.9 + kick.current, 8, delta);
    g.rotation.x = damp(g.rotation.x, tiltY * 0.18, 6, delta);
    g.scale.setScalar(damp(g.scale.x, 1, 6, delta));
  });

  return (
    <group ref={group} rotation-y={BASE_Y} scale={reduceMotion ? 1 : 0.85}>
      <Float enabled={!reduceMotion} speed={1.3} rotationIntensity={0.15} floatIntensity={0.4}>
        <PhoneBody>
          <ScreenSurface textures={textures} index={index} direction={direction} mode="slide" duration={0.55} reduceMotion={reduceMotion} />
        </PhoneBody>
      </Float>
    </group>
  );
}

/** A card's 3D phone. Renders a tracked <div> here; the scene is drawn by ProjectsCanvas. */
export default function ProjectPhoneView({ theme, ...props }) {
  return (
    <View className="absolute inset-0">
      {/* Phone ≈ 322px tall in the 480px media area, nudged ~14px up to clear the caption/dots */}
      <PerspectiveCamera makeDefault position={[0, -0.15, 9.3]} fov={30} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 6]} intensity={1.3} />
      <pointLight position={[-4, -2, 3]} intensity={18} color={theme[0]} />
      <Suspense fallback={null}>
        <ProjectPhone {...props} />
        <Environment resolution={64}>
          <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[10, 2, 1]} />
          <Lightformer form="rect" intensity={2.2} color={theme[0]} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
          <Lightformer form="rect" intensity={1.4} color={theme[1]} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} />
        </Environment>
      </Suspense>
    </View>
  );
}
