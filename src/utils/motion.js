// Shared Framer Motion variants (same idea as the template's utils/motion.js).

export const EASE_OUT = [0.16, 1, 0.3, 1];

export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const fadeIn = (direction = 'up', delay = 0, duration = 0.8, distance = 40) => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration, delay, ease: EASE_OUT },
  },
});

export const textVariant = (delay = 0) => ({
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  },
});

export const zoomIn = (delay = 0, duration = 0.8) => ({
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration, delay, ease: EASE_OUT } },
});
