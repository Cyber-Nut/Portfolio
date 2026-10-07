import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useFinePointer } from '../../utils/device';

const SPRING = { stiffness: 220, damping: 20, mass: 0.6 };

/** 3D tilt-on-hover card with a moving glare highlight (replaces the template's react-tilt). */
export default function TiltCard({ as = 'div', max = 10, scale = 1.02, glare = true, className = '', children, ...rest }) {
  const enabled = useFinePointer() && !useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING);
  const glareOpacity = useSpring(0, SPRING);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.16), transparent 55%)`;

  const Comp = motion[as];

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    glareOpacity.set(1);
  };
  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <Comp
      {...rest}
      onPointerMove={enabled ? handleMove : undefined}
      onPointerLeave={enabled ? handleLeave : undefined}
      whileHover={enabled ? { scale } : undefined}
      style={enabled ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      className={`relative ${className}`}
    >
      {children}
      {glare && enabled && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      )}
    </Comp>
  );
}
