import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { heroScreens, techIcon } from '../../data/assets';
import { PhoneBody, prepareScreenTextures, roundedPlane, roundedSlab, ScreenSurface } from './phoneParts';
import { makePlaceholderScreens } from './placeholderScreens';

const HOLD = 3.2; // seconds each screen stays
const BASE_Y = -0.32; // resting yaw so the phone is slightly turned

function ImageScreen(props) {
  const textures = useTexture(heroScreens);
  useMemo(() => prepareScreenTextures(textures), [textures]);
  return <ScreenSurface textures={textures} {...props} />;
}

function PlaceholderScreen(props) {
  const textures = useMemo(() => makePlaceholderScreens(), []);
  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);
  return <ScreenSurface textures={textures} {...props} />;
}

const TILES = [
  { icon: 'flutter', position: [-1.55, 1.25, 0.5], rotation: [0.1, 0.4, -0.12], speed: 1.6 },
  { icon: 'firebase', position: [1.5, 0.95, -0.3], rotation: [-0.1, -0.5, 0.1], speed: 1.3 },
  { icon: 'dart', position: [-1.35, -1.05, -0.2], rotation: [0.05, 0.5, 0.15], speed: 1.1 },
  { icon: 'android', position: [1.4, -1.3, 0.6], rotation: [-0.05, -0.35, -0.1], speed: 1.45 },
];

function AppTiles({ reduceMotion }) {
  const icons = useTexture(TILES.map((t) => techIcon(t.icon)));
  const tile = useMemo(() => roundedSlab(0.56, 0.56, 0.16, 0.08, 0.025), []);
  const face = useMemo(() => roundedPlane(0.34, 0.34, 0.02), []);
  useMemo(() => icons.forEach((t) => (t.colorSpace = THREE.SRGBColorSpace)), [icons]);

  return TILES.map((t, i) => (
    <Float key={t.icon} enabled={!reduceMotion} speed={t.speed} rotationIntensity={1.2} floatIntensity={1.2}>
      <group position={t.position} rotation={t.rotation}>
        <mesh geometry={tile}>
          <meshPhysicalMaterial color="#121a35" roughness={0.25} metalness={0.4} clearcoat={1} />
        </mesh>
        <mesh geometry={face} position-z={0.045}>
          <meshBasicMaterial map={icons[i]} transparent toneMapped={false} />
        </mesh>
      </group>
    </Float>
  ));
}

/** Hero phone: auto-cycles through real app screens and follows the cursor. */
export default function Phone({ play = true, reduceMotion = false }) {
  const group = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  // Track the cursor across the whole window, not just the canvas.
  useEffect(() => {
    if (reduceMotion) return;
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduceMotion]);

  useFrame((state, rawDelta) => {
    const g = group.current;
    if (!g || !play) return; // hold the intro pose until the loader lifts
    const delta = Math.min(rawDelta, 0.1);
    const t = state.clock.elapsedTime;
    const sway = reduceMotion ? 0 : Math.sin(t * 0.5) * 0.08;
    const { damp } = THREE.MathUtils;
    g.rotation.y = damp(g.rotation.y, BASE_Y + pointer.current.x * 0.45 + sway, 3, delta);
    g.rotation.x = damp(g.rotation.x, pointer.current.y * 0.2, 3, delta);
    g.position.y = damp(g.position.y, 0, 2.5, delta);
    g.scale.setScalar(damp(g.scale.x, 1, 3, delta));
  });

  const screen = { mode: 'wipe', autoplay: HOLD, reduceMotion };

  return (
    // Starts lower, smaller and spun around, then eases into place (intro).
    <group ref={group} rotation={[0, reduceMotion ? BASE_Y : BASE_Y - Math.PI * 1.15, 0]} position-y={reduceMotion ? 0 : -0.8} scale={reduceMotion ? 1 : 0.7}>
      <Float enabled={!reduceMotion} speed={1.5} rotationIntensity={0.25} floatIntensity={0.6}>
        <PhoneBody>{heroScreens.length ? <ImageScreen {...screen} /> : <PlaceholderScreen {...screen} />}</PhoneBody>
      </Float>
      <AppTiles reduceMotion={reduceMotion} />
    </group>
  );
}
