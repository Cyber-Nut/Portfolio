import { lazy, Suspense, useEffect, useMemo, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { personal, socials } from '../../data/portfolio';
import { hasWebGL } from '../../utils/device';
import { markLoaded } from '../../utils/loadState';
import { EASE_OUT, fadeIn, staggerContainer, textVariant } from '../../utils/motion';
import { scrollToId } from '../../utils/smoothScroll';
import Icon from '../ui/Icon';
import MagneticButton from '../ui/MagneticButton';
import PhoneFrame from '../ui/PhoneFrame';
import Typewriter from '../ui/Typewriter';

const PhoneCanvas = lazy(() => import('../canvas/PhoneCanvas'));

export default function Hero({ ready }) {
  const reduce = !!useReducedMotion();
  const webgl = useMemo(() => hasWebGL(), []);
  const stage = useRef(null);
  const inView = useInView(stage, { margin: '120px' });

  useEffect(() => {
    if (!webgl) markLoaded('scene');
  }, [webgl]);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pt-24">
      <div className="section-x grid items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          variants={staggerContainer(0.12, 0.15)}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          className="relative z-10"
        >
          {personal.openToWork && (
            <motion.div
              variants={fadeIn('up', 0, 0.6, 20)}
              className="inline-flex items-center gap-2.5 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1.5 text-xs font-medium text-teal"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-teal [animation:ping-soft_1.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <span className="relative inline-flex size-2 rounded-full bg-teal" />
              </span>
              Open to new opportunities
            </motion.div>
          )}

          <motion.p variants={textVariant()} className="mt-7 font-display text-lg text-muted sm:text-xl">
            Hi there, I&apos;m
          </motion.p>
          <motion.h1
            variants={textVariant()}
            className="mt-1 font-display text-[3.6rem] font-bold leading-[0.95] tracking-tight text-ink xs:text-7xl sm:text-8xl xl:text-[7rem]"
          >
            {personal.name}
            <span className="text-teal">.</span>
          </motion.h1>
          <motion.p variants={textVariant()} className="mt-5 min-h-[1.3em] font-display text-2xl font-medium text-ink sm:text-3xl">
            <Typewriter words={personal.roles} />
          </motion.p>
          <motion.p variants={textVariant()} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {personal.tagline} Currently at <span className="text-ink">TechIndika</span>.
          </motion.p>

          <motion.div variants={fadeIn('up')} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('work');
              }}
            >
              View my work
              <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href={personal.resume} download variant="secondary">
              <Icon name="download" className="size-4" />
              Download résumé
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeIn('up')} className="mt-10 flex items-center gap-4">
            <span className="h-px w-10 bg-white/15" aria-hidden="true" />
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.name}
                className="text-muted transition hover:-translate-y-0.5 hover:text-flutter"
              >
                <Icon name={s.icon} className="size-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          ref={stage}
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT }}
          className="relative -mx-5 h-[460px] sm:mx-0 sm:h-[540px] lg:h-[680px]"
        >
          <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-flutter/25 blur-[90px]" />
          {webgl ? (
            <Suspense fallback={null}>
              <PhoneCanvas active={inView} play={ready} reduceMotion={reduce} />
            </Suspense>
          ) : (
            <div className="grid size-full place-items-center">
              <PhoneFrame title="Flutter apps" className="w-52 rotate-[-6deg]" />
            </div>
          )}
        </motion.div>
      </div>

      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('about');
        }}
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <span className="flex h-12 w-7 justify-center rounded-full border-2 border-white/20 p-1.5">
          <motion.span
            animate={reduce ? undefined : { y: [0, 18, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="size-2 rounded-full bg-flutter"
          />
        </span>
      </a>
    </section>
  );
}
