import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { useFinePointer } from '../../utils/device';

const SPRING = { stiffness: 260, damping: 16, mass: 0.4 };

export const buttonStyles = {
  base: 'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-60',
  primary:
    'bg-gradient-to-r from-flutter to-[#0b84d8] text-[#031120] shadow-[0_10px_40px_-10px_rgb(19_185_253/0.7)] hover:shadow-[0_14px_50px_-8px_rgb(19_185_253/0.9)]',
  secondary: 'glass text-ink hover:border-flutter/50 hover:text-white',
};

/** Button / link that gets pulled toward the cursor. */
export default function MagneticButton({ as = 'a', variant = 'primary', strength = 0.3, className = '', children, ...rest }) {
  const enabled = useFinePointer() && !useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const Comp = motion[as];

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Comp
      {...rest}
      onPointerMove={enabled ? handleMove : undefined}
      onPointerLeave={enabled ? reset : undefined}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={`${buttonStyles.base} ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </Comp>
  );
}
