import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFinePointer } from '../../utils/device';
import Icon from './Icon';
import PhoneFrame from './PhoneFrame';

const ProjectPhoneView = lazy(() => import('../canvas/ProjectPhoneView'));

const DRAG_START = 8; // px before a gesture counts as a drag
const SWIPE = 50; // px needed to change screen

/**
 * Media area of a project card: a 3D phone (or a 2D frame without WebGL) showing the
 * project's screenshots. Swipe/drag, arrows, dots and ←/→ keys move between screens.
 */
export default function ScreenSwiper({ name, screens, captions, theme, use3D, show3D, reduceMotion }) {
  const count = screens.length;
  const [{ index, direction }, setSlide] = useState({ index: 0, direction: 1 });
  const [interacted, setInteracted] = useState(false);
  const [ready3D, setReady3D] = useState(false);
  const onReady = useCallback(() => setReady3D(true), []);
  const finePointer = useFinePointer();

  // Read by the 3D phone every frame (no re-renders while dragging/tilting).
  const motionRef = useRef({ tiltX: 0, tiltY: 0, drag: 0 });
  const gesture = useRef(null);

  const go = useCallback(
    (step) => {
      if (count < 2) return;
      setInteracted(true);
      setSlide((s) => ({ index: (s.index + step + count) % count, direction: step > 0 ? 1 : -1 }));
    },
    [count],
  );

  const goTo = (i) => {
    if (i === index) return;
    setInteracted(true);
    setSlide({ index: i, direction: i > index ? 1 : -1 });
  };

  const onPointerDown = (e) => {
    if (count < 2 || (e.pointerType === 'mouse' && e.button !== 0)) return;
    gesture.current = { x: e.clientX, y: e.clientY, horizontal: null, width: e.currentTarget.offsetWidth };
  };

  const onPointerMove = (e) => {
    const m = motionRef.current;
    if (finePointer && !gesture.current) {
      const r = e.currentTarget.getBoundingClientRect();
      m.tiltX = ((e.clientX - r.left) / r.width) * 2 - 1;
      m.tiltY = ((e.clientY - r.top) / r.height) * 2 - 1;
    }
    const g = gesture.current;
    if (!g) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (g.horizontal === null && Math.hypot(dx, dy) > DRAG_START) {
      g.horizontal = Math.abs(dx) > Math.abs(dy);
      if (!g.horizontal) {
        gesture.current = null; // vertical: let the page scroll
        return;
      }
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (g.horizontal) m.drag = Math.max(-1, Math.min(1, dx / g.width));
  };

  const endGesture = (e) => {
    const g = gesture.current;
    gesture.current = null;
    motionRef.current.drag = 0;
    if (!g?.horizontal || e.type === 'pointercancel') return; // cancelled = browser took over (scroll)
    const dx = e.clientX - g.x;
    if (Math.abs(dx) > SWIPE) go(dx < 0 ? 1 : -1);
  };

  const onPointerLeave = () => {
    if (gesture.current) return;
    motionRef.current.tiltX = 0;
    motionRef.current.tiltY = 0;
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
    else return;
    e.preventDefault();
  };

  const multi = count > 1;
  const caption = captions?.[index];

  return (
    <div
      className="relative h-[480px] touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-flutter/60"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${name} screenshots`}
      tabIndex={multi ? 0 : -1}
      onKeyDown={multi ? onKeyDown : undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endGesture}
      onPointerCancel={endGesture}
      onPointerLeave={onPointerLeave}
      style={{ cursor: multi ? 'grab' : undefined }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 55% at 50% 45%, ${theme[0]}40, transparent 70%), linear-gradient(160deg, ${theme[0]}14, ${theme[1]}24)`,
        }}
      />
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />

      {/* 2D frame: shown without WebGL, and as a placeholder until the 3D phone is ready */}
      <div
        className={`absolute inset-0 grid place-items-center transition-opacity duration-500 ${use3D && ready3D ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Same size/position as the 3D phone so the hand-off is seamless */}
        <PhoneFrame
          src={screens[index]}
          alt={`${name} screenshot ${index + 1}`}
          title={name}
          theme={theme}
          className="h-[322px] -translate-y-3.5"
        />
      </div>

      {use3D && show3D && (
        <Suspense fallback={null}>
          <ProjectPhoneView
            theme={theme}
            screens={screens}
            index={index}
            direction={direction}
            motion={motionRef}
            reduceMotion={reduceMotion}
            onReady={onReady}
          />
        </Suspense>
      )}

      {multi && (
        <>
          <AnimatePresence>
            {!interacted && (
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="pointer-events-none absolute left-1/2 top-4 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-bg/70 px-3 py-1 text-[11px] font-medium text-ink/90 backdrop-blur"
              >
                <Icon name="chevronLeft" className="size-3" />
                Swipe
                <Icon name="chevronRight" className="size-3" />
              </motion.span>
            )}
          </AnimatePresence>

          {[
            { step: -1, icon: 'chevronLeft', side: 'left-3', label: 'Previous screenshot' },
            { step: 1, icon: 'chevronRight', side: 'right-3', label: 'Next screenshot' },
          ].map((a) => (
            <button
              key={a.step}
              type="button"
              onClick={() => go(a.step)}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label={a.label}
              className={`absolute ${a.side} top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-bg/60 text-ink backdrop-blur transition hover:border-flutter/60 hover:text-flutter`}
            >
              <Icon name={a.icon} className="size-5" />
            </button>
          ))}

          <div className="absolute inset-x-0 bottom-3 z-10 flex flex-col items-center gap-2">
            {caption && (
              <span className="rounded-full bg-bg/70 px-3 py-1 text-xs font-medium text-ink backdrop-blur">{caption}</span>
            )}
            <div className="flex items-center gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
              {screens.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Screenshot ${i + 1} of ${count}`}
                  aria-current={i === index ? 'true' : undefined}
                  className="grid h-6 place-items-center px-0.5"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-flutter' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <span className="sr-only" aria-live="polite">
            Screenshot {index + 1} of {count}
            {caption ? `: ${caption}` : ''}
          </span>
        </>
      )}

      {!multi && caption && (
        <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-bg/70 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
          {caption}
        </span>
      )}
    </div>
  );
}
