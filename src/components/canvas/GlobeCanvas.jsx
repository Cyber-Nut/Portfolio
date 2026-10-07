import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import landPoints from '../../data/landPoints.json';

const R = 1.6;
const DEG = Math.PI / 180;
const HOME = { lat: 30.22, lng: 78.78 }; // Srinagar Garhwal, Uttarakhand
const CITIES = [
  { lat: 12.97, lng: 77.59 }, // Bengaluru
  { lat: 25.2, lng: 55.27 }, // Dubai
  { lat: 1.35, lng: 103.82 }, // Singapore
  { lat: 52.52, lng: 13.4 }, // Berlin
  { lat: 51.51, lng: -0.13 }, // London
];
// Yaw that brings HOME to face the camera, plus a tilt toward its latitude.
const FACE_HOME_Y = -Math.PI / 2 - HOME.lng * DEG;
const TILT_X = HOME.lat * DEG * 0.75;

function toVec(lat, lng, r = R) {
  const phi = (90 - lat) * DEG;
  const theta = (lng + 180) * DEG;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

function LandDots() {
  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array((landPoints.length / 2) * 3);
    for (let i = 0; i < landPoints.length; i += 2) {
      toVec(landPoints[i], landPoints[i + 1]).toArray(positions, (i / 2) * 3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uSize: { value: 22 * Math.min(window.devicePixelRatio, 2) },
        uColor: { value: new THREE.Color('#3d9be9') },
      },
      vertexShader: /* glsl */ `
        uniform float uSize;
        varying float vFacing;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vFacing = normalize(normalMatrix * normalize(position)).z;
          gl_PointSize = uSize / -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying float vFacing;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.15, d) * mix(0.2, 1.0, smoothstep(-0.1, 0.7, vFacing));
          gl_FragColor = vec4(uColor, alpha);
          #include <colorspace_fragment>
        }
      `,
    });
    return { geometry, material };
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  return <points geometry={geometry} material={material} />;
}

function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color('#13b9fd') } },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(clamp(-vNormal.z, 0.0, 1.0), 2.2);
            gl_FragColor = vec4(uColor * intensity * 1.6, intensity);
            #include <colorspace_fragment>
          }
        `,
      }),
    [],
  );
  return (
    <mesh scale={1.2} material={material}>
      <sphereGeometry args={[R, 64, 64]} />
    </mesh>
  );
}

function HomeMarker() {
  const pos = useMemo(() => toVec(HOME.lat, HOME.lng, R * 1.002), []);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize()), [pos]);
  const beam = useMemo(() => [pos, pos.clone().multiplyScalar(1.16)], [pos]);
  const ring = useRef(null);

  useFrame((state) => {
    const p = (state.clock.elapsedTime * 0.6) % 1;
    ring.current.scale.setScalar(1 + p * 3);
    ring.current.material.opacity = 1 - p;
  });

  return (
    <group>
      <mesh position={pos}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#5eead4" toneMapped={false} />
      </mesh>
      <mesh ref={ring} position={pos} quaternion={quat}>
        <ringGeometry args={[0.045, 0.06, 40]} />
        <meshBasicMaterial color="#5eead4" transparent side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
      </mesh>
      <Line points={beam} color="#5eead4" lineWidth={2} transparent opacity={0.9} />
    </group>
  );
}

function Arc({ to, index }) {
  const ref = useRef(null);
  const { points, end } = useMemo(() => {
    const start = toVec(HOME.lat, HOME.lng);
    const end = toVec(to.lat, to.lng);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(R + start.distanceTo(end) * 0.38);
    return { points: new THREE.QuadraticBezierCurve3(start, mid, end).getPoints(64), end };
  }, [to]);

  useFrame((_, delta) => {
    ref.current.material.dashOffset -= Math.min(delta, 0.1) * (0.35 + index * 0.04);
  });

  return (
    <group>
      <Line ref={ref} points={points} color="#13b9fd" lineWidth={1.6} dashed dashSize={0.12} gapSize={0.06} transparent opacity={0.9} />
      <mesh position={end}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color="#13b9fd" toneMapped={false} />
      </mesh>
    </group>
  );
}

function Globe({ reduceMotion }) {
  const spin = useRef(null);
  const pointer = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;
    const move = (e) => (pointer.current = (e.clientX / window.innerWidth) * 2 - 1);
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduceMotion]);

  useFrame((state, delta) => {
    if (reduceMotion) return;
    const t = state.clock.elapsedTime;
    const target = FACE_HOME_Y + Math.sin(t * 0.22) * 0.55 + pointer.current * 0.35;
    spin.current.rotation.y = THREE.MathUtils.damp(spin.current.rotation.y, target, 1.5, Math.min(delta, 0.1));
  });

  return (
    <group rotation-x={TILT_X}>
      <group ref={spin} rotation-y={FACE_HOME_Y}>
        <mesh>
          <sphereGeometry args={[R * 0.995, 64, 64]} />
          <meshBasicMaterial color="#060b1c" />
        </mesh>
        <LandDots />
        <HomeMarker />
        {CITIES.map((c, i) => (
          <Arc key={`${c.lat},${c.lng}`} to={c} index={i} />
        ))}
      </group>
      <Atmosphere />
    </group>
  );
}

export default function GlobeCanvas({ active = true, reduceMotion = false }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.3], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden="true"
    >
      <Globe reduceMotion={reduceMotion} />
    </Canvas>
  );
}
