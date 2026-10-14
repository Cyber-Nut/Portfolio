// Shared 3D smartphone pieces used by the hero phone and the project phones.
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Phone dimensions (world units)
export const W = 1.62;
export const H = 3.34;
const D = 0.2;
const R = 0.27;
const BEVEL = 0.04;
const BEZEL = 0.05;
const SW = W - 2 * BEVEL - 2 * BEZEL;
const SH = H - 2 * BEVEL - 2 * BEZEL;
const FRONT = D / 2;

export function roundedRect(w, h, r) {
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
export function roundedPlane(w, h, r) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 24);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
  return g;
}

export function roundedSlab(w, h, r, depth, bevel) {
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

/** sRGB + anisotropy for screenshot textures (call once per texture set). */
export function prepareScreenTextures(textures) {
  textures.forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });
}

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
    uniform float uDir;   // +1 = next (content moves left), -1 = previous
    uniform float uMode;  // 0 = soft wipe from the bottom, 1 = horizontal slide
    varying vec2 vUv;

    vec3 sampleFrom(vec2 uv) { return texture2D(uFrom, (uv - 0.5) * uScaleFrom + 0.5).rgb; }
    vec3 sampleTo(vec2 uv) { return texture2D(uTo, (uv - 0.5) * uScaleTo + 0.5).rgb; }

    void main() {
      float p = uProgress;
      vec3 glow = vec3(0.07, 0.72, 0.99);
      vec3 col;
      if (uMode < 0.5) {
        float t = p * 1.3 - 0.15;
        float mask = 1.0 - smoothstep(t - 0.12, t + 0.12, vUv.y);
        float edge = (1.0 - abs(mask * 2.0 - 1.0)) * 0.35;
        col = mix(sampleFrom(vUv), sampleTo(vUv), mask) + edge * glow;
      } else {
        float useTo = uDir > 0.0 ? step(1.0 - p, vUv.x) : step(vUv.x, p);
        vec3 a = sampleFrom(vUv + vec2(p * uDir, 0.0)) * (1.0 - 0.35 * p);
        vec3 b = sampleTo(vUv + vec2((p - 1.0) * uDir, 0.0));
        float seam = uDir > 0.0 ? 1.0 - p : p;
        float edge = (1.0 - smoothstep(0.0, 0.025, abs(vUv.x - seam))) * step(0.001, p) * step(p, 0.999);
        col = mix(a, b, useTo) + edge * glow * 0.8;
      }
      gl_FragColor = vec4(col, 1.0);
      #include <colorspace_fragment>
    }
  `,
};

/**
 * The phone's display. Shows `textures[index]` and animates whenever `index` changes
 * (`direction` picks the slide side). With `autoplay` (seconds) it advances on its own.
 */
export function ScreenSurface({ textures, index = 0, direction = 1, mode = 'wipe', autoplay = 0, duration = 0.9, reduceMotion = false }) {
  const geometry = useMemo(() => roundedPlane(SW, SH, R - BEVEL - BEZEL), []);
  const state = useRef({ shown: index, target: index, progress: 1, timer: 0 });

  const material = useMemo(() => {
    const start = textures[state.current.shown] ?? textures[0];
    return new THREE.ShaderMaterial({
      ...screenShader,
      uniforms: {
        uFrom: { value: start },
        uTo: { value: start },
        uScaleFrom: { value: coverScale(start) },
        uScaleTo: { value: coverScale(start) },
        uProgress: { value: 0 },
        uDir: { value: 1 },
        uMode: { value: mode === 'slide' ? 1 : 0 },
      },
    });
  }, [textures, mode]);

  useEffect(() => () => material.dispose(), [material]);

  const show = (i) => {
    const u = material.uniforms;
    u.uFrom.value = textures[i];
    u.uScaleFrom.value = coverScale(textures[i]);
    u.uProgress.value = 0;
  };

  const goTo = (to, dir) => {
    const s = state.current;
    if (s.progress < 1) s.shown = s.target; // finish any running transition first
    s.target = to;
    s.timer = 0;
    if (reduceMotion || to === s.shown) {
      s.shown = to;
      s.progress = 1;
      show(to);
      return;
    }
    const u = material.uniforms;
    show(s.shown);
    u.uTo.value = textures[to];
    u.uScaleTo.value = coverScale(textures[to]);
    u.uDir.value = dir;
    s.progress = 0;
  };

  useEffect(() => {
    if (index !== state.current.target) goTo(index, direction);
    // goTo reads the latest direction; only an index change should trigger it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useFrame((_, rawDelta) => {
    const s = state.current;
    const delta = Math.min(rawDelta, 0.1);
    if (s.progress >= 1) {
      if (autoplay && textures.length > 1) {
        s.timer += delta;
        if (s.timer >= autoplay) goTo((s.target + 1) % textures.length, 1);
      }
      return;
    }
    s.progress = Math.min(1, s.progress + delta / duration);
    material.uniforms.uProgress.value = easeInOut(s.progress);
    if (s.progress >= 1) {
      s.shown = s.target;
      show(s.shown);
    }
  });

  return <mesh geometry={geometry} material={material} position-z={FRONT + 0.004} />;
}

/** Titanium frame, black glass, dynamic island and side buttons. Pass the screen as children. */
export function PhoneBody({ children }) {
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
      {children}
      <mesh geometry={island} position={[0, SH / 2 - 0.13, FRONT + 0.006]}>
        <meshBasicMaterial color="#000" />
      </mesh>
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
