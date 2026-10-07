import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { projectMedia } from '../../data/assets';
import { lockScroll } from '../../utils/smoothScroll';
import { EASE_OUT } from '../../utils/motion';
import Icon from './Icon';
import PhoneFrame from './PhoneFrame';
import ProjectLinks from './ProjectLinks';
import Tag from './Tag';

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [project, onClose]);

  const media = project ? projectMedia(project.id) : null;
  const shots = media?.screenshots.length ? media.screenshots : [null, null, null];

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[#02040b]/80 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } }}
            exit={{ opacity: 0, y: 40, scale: 0.98, transition: { duration: 0.25 } }}
            className="glass gradient-border relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl sm:p-10"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-ink transition hover:border-flutter/60 hover:text-flutter"
            >
              <Icon name="x" />
            </button>

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-flutter">{project.category}</p>
            <h3 id="project-modal-title" className="mt-2 pr-12 font-display text-3xl font-bold text-ink sm:text-4xl">
              {project.name}
            </h3>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{project.summary}</p>

            <div className="-mx-6 mt-8 flex snap-x gap-5 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:px-10">
              {shots.map((src, i) => (
                <PhoneFrame
                  key={i}
                  src={src}
                  alt={`${project.name} screenshot ${i + 1}`}
                  title={project.name}
                  theme={project.theme}
                  className="w-40 shrink-0 snap-center sm:w-48"
                />
              ))}
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="font-display text-lg font-semibold text-ink">Highlights</h4>
                <ul className="mt-3 space-y-2.5">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-muted">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-teal" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-display text-lg font-semibold text-ink">My role</h4>
                <p className="mt-3 text-sm text-muted">{project.role}</p>
                <h4 className="mt-6 font-display text-lg font-semibold text-ink">Built with</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <ProjectLinks links={project.links} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
