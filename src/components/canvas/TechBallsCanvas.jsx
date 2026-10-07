import { Suspense, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Decal, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { techIcon } from '../../data/assets';

function Ball({ name, icon, position, radius, index, reduceMotion }) {
  const texture = useTexture(icon);
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  }, [texture]);

  const group = useRef(null);
  const mesh = useRef(null);
  const spin = useRef(0);
  const [hovered, setHovered] = useState(false);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1);
    const t = state.clock.elapsedTime;
    const { damp } = THREE.MathUtils;
    const g = group.current;
    const m = mesh.current;
    g.scale.setScalar(damp(g.scale.x, radius * (hovered ? 1.18 : 1), 10, delta));
    m.rotation.y = damp(m.rotation.y, spin.current + (reduceMotion ? 0 : Math.sin(t * 0.7 + index) * 0.45), 4, delta);
    if (reduceMotion) return;
    g.position.y = position[1] + Math.sin(t * 1.1 + index * 0.9) * radius * 0.1;
    m.rotation.x = Math.sin(t * 0.5 + index * 1.3) * 0.2;
  });

  return (
    <group ref={group} position={position} scale={radius}>
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          spin.current += Math.PI * 2;
        }}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#eef3ff" flatShading roughness={0.4} metalness={0.05} polygonOffset polygonOffsetFactor={-5} />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1.15} map={texture} depthTest />
      </mesh>
      <Html center position={[0, -1.6, 0]} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
        <span
          className={`block whitespace-nowrap rounded-full border border-flutter/30 bg-surface/90 px-3 py-1 text-xs font-medium text-ink transition-all duration-300 ${
            hovered ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
          }`}
        >
          {name}
        </span>
      </Html>
    </group>
  );
}

/**
 * All tech balls rendered in ONE WebGL canvas (the template used one canvas per ball,
 * which hits browser context limits). Orthographic camera at zoom 1 → 1 world unit = 1 CSS px.
 */
export default function TechBallsCanvas({ items, active = true, reduceMotion = false }) {
  const wrap = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  const cell = width >= 1024 ? 132 : 116;
  const cols = Math.max(3, Math.min(items.length, Math.floor(width / cell)));
  const rows = Math.ceil(items.length / cols);

  const layout = useMemo(
    () =>
      items.map((item, i) => {
        const row = Math.floor(i / cols);
        const inRow = Math.min(cols, items.length - row * cols);
        const col = i % cols;
        return { ...item, position: [(col - (inRow - 1) / 2) * cell, -(row - (rows - 1) / 2) * cell, 0] };
      }),
    [items, cols, rows, cell],
  );

  return (
    <div ref={wrap} className="relative w-full" style={{ height: width ? rows * cell : 280 }}>
      {width > 0 && (
        <Canvas
          orthographic
          camera={{ zoom: 1, position: [0, 0, 500], near: 1, far: 2000 }}
          dpr={[1, 2]}
          frameloop={active ? 'always' : 'never'}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[150, 250, 400]} intensity={2.2} />
          <directionalLight position={[-200, -100, 200]} intensity={0.7} color="#13b9fd" />
          <Suspense fallback={null}>
            {layout.map((item, i) => (
              <Ball
                key={item.name}
                name={item.name}
                icon={techIcon(item.icon)}
                position={item.position}
                radius={cell * 0.33}
                index={i}
                reduceMotion={reduceMotion}
              />
            ))}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
