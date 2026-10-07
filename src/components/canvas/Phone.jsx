import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { heroScreens, techIcon } from '../../data/assets';
import { makePlaceholderScreens } from './placeholderScreens';

// Phone dimensions (world units)
const W = 1.62;
const H = 3.34;
const D = 0.2;
const R = 0.27;
const BEVEL = 0.04;
const BEZEL = 0.05;
const SW = W - 2 * BEVEL - 2 * BEZEL;
const SH = H - 2 * BEVEL - 2 * BEZEL;
const FRONT = D / 2;

const HOLD = 3.2; // seconds each screen stays
const FADE = 0.9; // transition length
const BASE_Y = -0.32; // resting yaw so the phone is slightly turned

function roundedRect(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Flat rounded-rect plane with UVs spanning 0..1 across its bounds. */
function roundedPlane(w, h, r) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 24);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
  return g;
}

function roundedSlab(w, h, r, depth, bevel) {
  const g = new THREE.ExtrudeGeometry(roundedRect(w - 2 * bevel, h - 2 * bevel, r - bevel), {
    depth: depth - 2 * bevel,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 8,
    curveSegments: 32,
  });
  g.center();
  return g;
}

const screenShader = {
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D uFrom;
    uniform sampler2D uTo;
    uniform vec2 uScaleFrom;
    uniform vec2 uScaleTo;
    uniform float uProgress;
    varying vec2 vUv;
    void main() {
      vec4 a = texture2D(uFrom, (vUv - 0.5) * uScaleFrom + 0.5);
      vec4 b = texture2D(uTo, (vUv - 0.5) * uScaleTo + 0.5);
      // Soft wipe from the bottom with a glowing leading edge.
      float t = uProgress * 1.3 - 0.15;
      float mask = 1.0 - smoothstep(t - 0.12, t + 0.12, vUv.y);
      float edge = (1.0 - abs(mask * 2.0 - 1.0)) * 0.35;
      vec3 col = mix(a.rgb, b.rgb, mask) + edge * vec3(0.07, 0.72, 0.99);
      gl_FragColor = vec4(col, 1.0);
      #include <colorspace_fragment>
    }
  `,
};

/** object-fit: cover for a texture on the screen plane */
function coverScale(texture) {
  const img = texture.image;
  const imgAspect = img.width / img.height;
  const planeAspect = SW / SH;
  return imgAspect > planeAspect
    ? new THREE.Vector2(planeAspect / imgAspect, 1)
    : new THREE.Vector2(1, imgAspect / planeAspect);
}

const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

function Screen({ textures, reduceMotion }) {
  const geometry = useMemo(() => roundedPlane(SW, SH, R - BEVEL - BEZEL), []);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        ...screenShader,
        uniforms: {
          uFrom: { value: textures[0] },
          uTo: { value: textures[1 % textures.length] },
          uScaleFrom: { value: coverScale(textures[0]) },
          uScaleTo: { value: coverScale(textures[1 % textures.length]) },
          uProgress: { value: 0 },
        },
      }),
    [textures],
  );
  const cycle = useRef({ from: 0, timer: 0, progress: -1 });

  useEffect(() => () => material.dispose(), [material]);

  useFrame((_, rawDelta) => {
    const n = textures.length;
    if (n < 2) return;
    const delta = Math.min(rawDelta, 0.1);
    const c = cycle.current;
    const u = material.uniforms;

    if (c.progress < 0) {
      c.timer += delta;
      if (c.timer < HOLD) return;
      c.timer = 0;
      c.progress = 0;
      const to = (c.from + 1) % n;
      u.uTo.value = textures[to];
      u.uScaleTo.value = coverScale(textures[to]);
    }

    c.progress = reduceMotion ? 1 : Math.min(1, c.progress + delta / FADE);
    u.uProgress.value = easeInOut(c.progress);

    if (c.progress >= 1) {
      c.from = (c.from + 1) % n;
      u.uFrom.value = textures[c.from];
      u.uScaleFrom.value = coverScale(textures[c.from]);
      u.uProgress.value = 0;
      c.progress = -1;
    }
  });

  return <mesh geometry={geometry} material={material} position-z={FRONT + 0.004} />;
}

function ImageScreen(props) {
  const textures = useTexture(heroScreens);
  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);
  return <Screen textures={textures} {...props} />;
}

function PlaceholderScreen(props) {
  const textures = useMemo(() => makePlaceholderScreens(), []);
  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);
  return <Screen textures={textures} {...props} />;
}

function PhoneBody({ reduceMotion }) {
  const body = useMemo(() => roundedSlab(W, H, R, D, BEVEL), []);
  const glass = useMemo(() => roundedPlane(W - 2 * BEVEL, H - 2 * BEVEL, R - BEVEL), []);
  const island = useMemo(() => roundedPlane(0.46, 0.13, 0.065), []);

  return (
    <group>
      <mesh geometry={body}>
        <meshPhysicalMaterial color="#2b3554" metalness={0.9} roughness={0.28} clearcoat={0.8} clearcoatRoughness={0.2} />
      </mesh>
      <mesh geometry={glass} position-z={FRONT + 0.002}>
        <meshPhysicalMaterial color="#010205" roughness={0.12} clearcoat={1} />
      </mesh>
      {heroScreens.length ? <ImageScreen reduceMotion={reduceMotion} /> : <PlaceholderScreen reduceMotion={reduceMotion} />}
      <mesh geometry={island} position={[0, SH / 2 - 0.13, FRONT + 0.006]}>
        <meshBasicMaterial color="#000" />
      </mesh>
      {/* side buttons */}
      <RoundedBox args={[0.03, 0.42, 0.08]} radius={0.012} position={[W / 2 + 0.005, 0.55, 0]}>
        <meshPhysicalMaterial color="#3a4567" metalness={0.9} roughness={0.3} />
      </RoundedBox>
      {[0.95, 0.6, 0.28].map((y, i) => (
        <RoundedBox key={y} args={[0.03, i === 0 ? 0.14 : 0.26, 0.08]} radius={0.012} position={[-W / 2 - 0.005, y, 0]}>
          <meshPhysicalMaterial color="#3a4567" metalness={0.9} roughness={0.3} />
        </RoundedBox>
      ))}
    </group>
  );
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

  return (
    // Starts lower, smaller and spun around, then eases into place (intro).
    <group ref={group} rotation={[0, reduceMotion ? BASE_Y : BASE_Y - Math.PI * 1.15, 0]} position-y={reduceMotion ? 0 : -0.8} scale={reduceMotion ? 1 : 0.7}>
      <Float enabled={!reduceMotion} speed={1.5} rotationIntensity={0.25} floatIntensity={0.6}>
        <PhoneBody reduceMotion={reduceMotion} />
      </Float>
      <AppTiles reduceMotion={reduceMotion} />
    </group>
  );
}
