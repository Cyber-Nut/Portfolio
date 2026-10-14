import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { projects } from '../../data/portfolio';
import { projectMedia } from '../../data/assets';
import SectionWrapper from '../../hoc/SectionWrapper';
import { hasWebGL } from '../../utils/device';
import { EASE_OUT } from '../../utils/motion';
import Icon from '../ui/Icon';
import ProjectLinks from '../ui/ProjectLinks';
import ScreenSwiper from '../ui/ScreenSwiper';
import SectionHeading from '../ui/SectionHeading';
import Tag from '../ui/Tag';

const ProjectsCanvas = lazy(() => import('../canvas/ProjectsCanvas'));

function ProjectCard({ project, use3D, reduceMotion }) {
  const { screenshots } = projectMedia(project.id);
  // Mount the 3D phone only after the card has faded in (the canvas can't fade with it).
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      onAnimationComplete={() => setRevealed(true)}
      className="glass-fill gradient-border flex w-full flex-col overflow-hidden rounded-3xl md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
    >
      <ScreenSwiper
        name={project.name}
        screens={screenshots}
        captions={project.captions}
        theme={project.theme}
        use3D={use3D}
        show3D={revealed}
        reduceMotion={reduceMotion}
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {project.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-2.5 py-1 text-[11px] font-semibold text-teal">
              <Icon name={project.status.icon} className="size-3" />
              {project.status.label}
            </span>
          )}
          {project.aiFeatures && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-flutter/40 bg-flutter/10 px-2.5 py-1 text-[11px] font-semibold text-flutter">
              <Icon name="sparkles" className="size-3" />
              AI features
            </span>
          )}
        </div>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-flutter">{project.category}</p>

        <h3 className="mt-1.5 font-display text-2xl font-semibold text-ink">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
        {project.company && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-ink/70">
            <Icon name="sparkles" className="size-3.5 text-flutter" />
            Built at {project.company} with an AI-augmented workflow
          </p>
        )}

        <h4 className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-ink/80">What it does</h4>
        <ul className="mt-3 space-y-2">
          {project.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <Icon name="check" className="mt-0.5 size-4 shrink-0 text-teal" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <ProjectLinks links={project.links} compact />
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  const reduceMotion = !!useReducedMotion();
  const webgl = useMemo(() => hasWebGL(), []);
  const area = useRef(null);
  const near = useInView(area, { margin: '100% 0px' });
  const [canvasMounted, setCanvasMounted] = useState(false);

  useEffect(() => {
    if (near) setCanvasMounted(true);
  }, [near]);

  return (
    <>
      <SectionHeading
        eyebrow="My work"
        title={
          <>
            Selected <span className="text-gradient">projects</span>
          </>
        }
        description="Production apps I've built at TechIndika with an AI-augmented workflow, several with AI at their core. Swipe the phones to look inside."
      />

      <div ref={area} className="mt-14 flex flex-wrap justify-center gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} use3D={webgl} reduceMotion={reduceMotion} />
        ))}
      </div>

      {webgl &&
        canvasMounted &&
        createPortal(
          <Suspense fallback={null}>
            <ProjectsCanvas active={near} />
          </Suspense>,
          document.body,
        )}
    </>
  );
}

export default SectionWrapper(Projects, 'work');
