import { useCallback, useState } from 'react';
import { projects } from '../../data/portfolio';
import { projectMedia } from '../../data/assets';
import SectionWrapper from '../../hoc/SectionWrapper';
import { fadeIn } from '../../utils/motion';
import Icon from '../ui/Icon';
import PhoneFrame from '../ui/PhoneFrame';
import ProjectLinks from '../ui/ProjectLinks';
import ProjectModal from '../ui/ProjectModal';
import SectionHeading from '../ui/SectionHeading';
import Tag from '../ui/Tag';
import TiltCard from '../ui/TiltCard';

function ProjectCard({ project, index, onOpen }) {
  const { icon, screenshots } = projectMedia(project.id);
  const [a, b] = project.theme;

  return (
    <TiltCard
      as="article"
      max={7}
      variants={fadeIn('up', index * 0.12)}
      className="group glass-fill gradient-border flex flex-col overflow-hidden rounded-3xl"
    >
      <div
        className="relative h-64 overflow-hidden"
        style={{ background: `radial-gradient(120% 90% at 50% 0%, ${a}55, transparent 60%), linear-gradient(160deg, ${a}1f, ${b}33)` }}
      >
        <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="absolute left-1/2 top-8 flex -translate-x-1/2 items-start gap-4">
          <PhoneFrame
            src={screenshots[0]}
            alt={`${project.name} screenshot`}
            title={project.name}
            theme={project.theme}
            className="w-32 -rotate-6 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-rotate-3"
          />
          <PhoneFrame
            src={screenshots[1]}
            alt=""
            title={project.name}
            theme={[b, a]}
            className="mt-7 w-32 rotate-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3"
          />
        </div>
        {icon && <img src={icon} alt="" className="absolute right-4 top-4 size-11 rounded-xl ring-1 ring-white/20" />}
        {import.meta.env.DEV && project.draft && (
          <span className="absolute left-4 top-4 rounded-full border border-dashed border-amber-300/60 bg-amber-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
            Draft content
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-flutter">{project.category}</p>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink">
          {/* Stretched button: the whole card opens the details modal. */}
          <button type="button" onClick={onOpen} className="text-left after:absolute after:inset-0 after:content-['']">
            {project.name}
          </button>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-flutter">
            View details
            <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
          <div className="relative z-10">
            <ProjectLinks links={project.links} compact />
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

function Projects() {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <SectionHeading
        eyebrow="My work"
        title={
          <>
            Selected <span className="text-gradient">projects</span>
          </>
        }
        description="Highlights from production apps I've built at TechIndika and RevoltronX. Open a card to see what I built and the stack behind it."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i % 2} onOpen={() => setSelected(p)} />
        ))}
      </div>

      <ProjectModal project={selected} onClose={close} />
    </>
  );
}

export default SectionWrapper(Projects, 'work');
