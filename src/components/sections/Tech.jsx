import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { technologies, toolbox } from '../../data/portfolio';
import { techIcon } from '../../data/assets';
import SectionWrapper from '../../hoc/SectionWrapper';
import { hasWebGL, useMediaQuery } from '../../utils/device';
import { fadeIn } from '../../utils/motion';
import Icon from '../ui/Icon';
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

      <motion.div variants={fadeIn('up', 0.2)} className="mx-auto mt-14 max-w-5xl">
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-muted">Also fluent in</p>
        <dl className="mt-6 space-y-2">
          {toolbox.map((group) => (
            <div
              key={group.label}
              className={`flex flex-col gap-3 rounded-2xl px-4 py-4 sm:flex-row sm:items-start sm:gap-6 sm:px-6 ${
                group.ai ? 'gradient-border bg-flutter/[0.06]' : 'border-b border-white/5'
              }`}
            >
              <dt
                className={`flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] sm:w-44 sm:pt-2 ${
                  group.ai ? 'text-flutter' : 'text-muted'
                }`}
              >
                {group.ai && <Icon name="sparkles" className="size-4" />}
                {group.label}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                      group.ai
                        ? 'border-flutter/40 bg-flutter/10 text-flutter hover:border-flutter'
                        : 'border-white/10 bg-white/[0.03] text-ink/90 hover:border-flutter/50 hover:text-flutter'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </>
  );
}

export default SectionWrapper(Tech, 'skills');
