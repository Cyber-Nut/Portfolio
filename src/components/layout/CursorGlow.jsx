import { useEffect } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { useFinePointer } from '../../utils/device';

const SIZE = 440;
const SPRING = { stiffness: 140, damping: 24, mass: 0.6 };

/** Soft spotlight that trails the cursor (desktop only). */
export default function CursorGlow() {
  const enabled = useFinePointer() && !useReducedMotion();
  const x = useSpring(-SIZE, SPRING);
  const y = useSpring(-SIZE, SPRING);

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] rounded-full bg-[radial-gradient(circle,rgb(19_185_253/0.08),transparent_62%)]"
      style={{ x, y, width: SIZE, height: SIZE }}
    />
  );
}
