import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion';
import { getLoadProgress, subscribeLoad } from '../../utils/loadState';
import { lockScroll } from '../../utils/smoothScroll';
import { EASE_OUT } from '../../utils/motion';

const MIN_MS = 900; // keep the intro from flashing
const MAX_MS = 6000; // never block the page longer than this

export default function Loader({ onDone }) {
  const progress = useSyncExternalStore(subscribeLoad, getLoadProgress);
  const [visible, setVisible] = useState(true);
  const [minElapsed, setMinElapsed] = useState(false);

  const pct = useSpring(0, { stiffness: 70, damping: 20 });
  const label = useTransform(pct, (v) => `${Math.round(v)}%`);
  const scaleX = useTransform(pct, [0, 100], [0, 1]);

  useEffect(() => {
    pct.set(progress * 100);
  }, [progress, pct]);

  useEffect(() => {
    const min = setTimeout(() => setMinElapsed(true), MIN_MS);
    const max = setTimeout(() => setVisible(false), MAX_MS);
    return () => {
      clearTimeout(min);
      clearTimeout(max);
    };
  }, []);

  useEffect(() => {
    if (progress < 1 || !minElapsed) return;
    const id = setTimeout(() => setVisible(false), 350);
    return () => clearTimeout(id);
  }, [progress, minElapsed]);

  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  useEffect(() => {
    lockScroll(visible);
    if (!visible) onDoneRef.current?.();
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] grid place-items-center bg-bg"
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.9, ease: EASE_OUT } }}
          style={{ clipPath: 'inset(0 0 0% 0)' }}
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          <div className="flex w-56 flex-col items-center gap-6">
            <div className="relative grid size-20 place-items-center">
              <span className="ring-conic absolute inset-0 rounded-3xl" />
              <span className="absolute inset-[2px] rounded-[22px] bg-bg" />
              <span className="relative font-display text-4xl font-bold">
                <span className="text-gradient">D</span>
                <span className="text-teal">.</span>
              </span>
            </div>
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full origin-left bg-gradient-to-r from-teal to-flutter" style={{ scaleX }} />
            </div>
            <motion.span className="font-display text-sm tabular-nums tracking-[0.3em] text-muted">{label}</motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
