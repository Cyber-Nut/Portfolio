import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experiences } from '../../data/portfolio';
import { logoFor } from '../../data/assets';
import SectionWrapper from '../../hoc/SectionWrapper';
import { useMediaQuery } from '../../utils/device';
import { EASE_OUT } from '../../utils/motion';
import Icon from '../ui/Icon';
import Rich from '../ui/Rich';
import SectionHeading from '../ui/SectionHeading';
import Tag from '../ui/Tag';

// Fallback monogram until a logo is added: "TechIndika" → "TI", "RevoltronX" → "RX".
const initials = (name) => (name.match(/[A-Z]/g) ?? [name[0]]).slice(0, 2).join('');

function TimelineItem({ exp, left }) {
  const logo = logoFor(exp.id);
  // Slide in from the side on desktop; rise up on mobile (a sideways start would widen the page).
  const desktop = useMediaQuery('(min-width: 768px)');
  const hidden = desktop ? { opacity: 0, x: left ? -60 : 60 } : { opacity: 0, y: 40 };

  return (
    <li className="relative md:grid md:grid-cols-2 md:gap-20">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="absolute left-5 top-7 z-10 grid size-12 -translate-x-1/2 place-items-center overflow-hidden rounded-full border-2 border-flutter/60 bg-surface shadow-[0_0_0_6px_#050816,0_0_30px_rgb(19_185_253/0.45)] md:left-1/2"
      >
        {logo ? (
          <img src={logo} alt={`${exp.company} logo`} className="size-full object-cover" />
        ) : (
          <span className="text-gradient font-display text-sm font-bold">{initials(exp.company)}</span>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`hidden pt-9 md:flex ${left ? 'md:order-2' : 'md:order-1 md:justify-end'}`}
      >
        <span className="h-fit rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-display text-sm text-ink/90">{exp.date}</span>
      </motion.div>

      <motion.article
        initial={hidden}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className={`glass-fill gradient-border ml-14 rounded-3xl p-6 sm:p-8 md:ml-0 ${left ? 'md:order-1' : 'md:order-2'}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{exp.role}</h3>
            <p className="mt-1 font-medium text-flutter">
              {exp.url ? (
                <a href={exp.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
                  {exp.company}
                  <Icon name="arrowUpRight" className="size-4" />
                </a>
              ) : (
                exp.company
              )}
            </p>
          </div>
          {exp.current && (
            <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal ring-1 ring-teal/30">Current</span>
          )}
        </div>
        <p className="mt-2 text-sm text-muted md:hidden">{exp.date}</p>

        <ul className="mt-5 space-y-3">
          {exp.points.map((p) => (
            <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-flutter" aria-hidden="true" />
              <span>
                <Rich text={p} />
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {exp.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </motion.article>
    </li>
  );
}

function Experience() {
  const track = useRef(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });

  return (
    <>
      <SectionHeading
        eyebrow="Experience"
        title={
          <>
            Where I&apos;ve <span className="text-gradient">shipped</span>
          </>
        }
        description="From internships to leading app releases: the teams I've built with and what I delivered."
      />

      <div ref={track} className="relative mt-16">
        <div aria-hidden="true" className="absolute left-5 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute left-5 top-0 h-full w-[2px] origin-top -translate-x-[0.5px] bg-gradient-to-b from-teal via-flutter to-flutter-deep shadow-[0_0_14px_rgb(19_185_253/0.8)] md:left-1/2 md:-translate-x-1/2"
        />
        <ol className="space-y-12 md:space-y-20">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} left={i % 2 === 0} />
          ))}
        </ol>
      </div>
    </>
  );
}

export default SectionWrapper(Experience, 'experience');
