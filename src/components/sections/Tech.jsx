import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { technologies, toolbox } from '../../data/portfolio';
import { techIcon } from '../../data/assets';
import SectionWrapper from '../../hoc/SectionWrapper';
import { hasWebGL, useMediaQuery } from '../../utils/device';
import { fadeIn } from '../../utils/motion';
import SectionHeading from '../ui/SectionHeading';

const TechBallsCanvas = lazy(() => import('../canvas/TechBallsCanvas'));

/** Lightweight 2D grid used on phones, with reduced motion, or without WebGL. */
function IconGrid() {
  return (
    <ul className="grid grid-cols-3 gap-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-7">
      {technologies.map((t) => (
        <li key={t.name} className="glass flex flex-col items-center gap-2.5 rounded-2xl px-2 py-4 transition hover:-translate-y-1 hover:border-flutter/40">
          <span className="grid size-14 place-items-center rounded-full bg-[#eef3ff] shadow-[inset_0_-4px_10px_rgb(2_86_155/0.18)]">
            <img src={techIcon(t.icon)} alt="" className="size-8" loading="lazy" />
          </span>
          <span className="text-center text-[11px] font-medium leading-tight text-ink/90">{t.name}</span>
        </li>
      ))}
    </ul>
  );
}

function Tech() {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery('(min-width: 768px)');
  const stage = useRef(null);
  const inView = useInView(stage, { margin: '200px' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (inView) setMounted(true);
  }, [inView]);

  const use3D = desktop && !reduce && hasWebGL();

  return (
    <>
      <SectionHeading
        align="center"
        eyebrow="Skills"
        title={
          <>
            My <span className="text-gradient">tech stack</span>
          </>
        }
        description={`The languages, frameworks and tools I use to ship production apps.${use3D ? ' Hover a ball to give it a spin.' : ''}`}
      />

      <motion.div ref={stage} variants={fadeIn('up', 0.1)} className="mt-14">
        {use3D ? (
          mounted ? (
            <Suspense fallback={<div className="h-[264px]" />}>
              <TechBallsCanvas items={technologies} active={inView} />
            </Suspense>
          ) : (
            <div className="h-[264px]" />
          )
        ) : (
          <IconGrid />
        )}
        {use3D && (
          <ul className="sr-only">
            {technologies.map((t) => (
              <li key={t.name}>{t.name}</li>
            ))}
          </ul>
        )}
      </motion.div>

      <motion.div variants={fadeIn('up', 0.2)} className="mt-14 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">Also fluent in</p>
        <ul className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {toolbox.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-ink/90 transition hover:border-flutter/50 hover:text-flutter"
            >
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}

export default SectionWrapper(Tech, 'skills');
