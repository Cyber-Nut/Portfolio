import { motion } from 'framer-motion';
import { personal, services } from '../../data/portfolio';
import { profilePhoto } from '../../data/assets';
import SectionWrapper from '../../hoc/SectionWrapper';
import { fadeIn, zoomIn } from '../../utils/motion';
import Icon from '../ui/Icon';
import Rich from '../ui/Rich';
import SectionHeading from '../ui/SectionHeading';
import TiltCard from '../ui/TiltCard';

function PhotoPlaceholder() {
  return (
    <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_50%_30%,rgb(19_185_253/0.35),transparent_60%),linear-gradient(160deg,#0f1a3a,#060b1c)]">
      <span className="font-display text-[9rem] font-bold leading-none">
        <span className="text-gradient">D</span>
        <span className="text-teal">.</span>
      </span>
    </div>
  );
}

function About() {
  return (
    <>
      <SectionHeading
        eyebrow="About me"
        title={
          <>
            Turning ideas into <span className="text-gradient">delightful apps</span>
          </>
        }
      />

      <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <motion.div variants={zoomIn(0.1, 1)} className="mx-auto w-full max-w-sm lg:max-w-none">
          <TiltCard max={8} scale={1.01} className="rounded-[2.2rem]">
            <div className="ring-conic rounded-[2.2rem] p-[3px] shadow-[0_30px_90px_-25px_rgb(19_185_253/0.55)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2.2rem-3px)] bg-surface">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={`Portrait of ${personal.name}`}
                    className="size-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <PhotoPlaceholder />
                )}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/85 to-transparent" aria-hidden="true" />
                <div className="glass absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl px-4 py-3">
                  <span className="size-2 shrink-0 rounded-full bg-teal shadow-[0_0_12px_#5eead4]" aria-hidden="true" />
                  <p className="text-sm">
                    <span className="font-medium text-ink">{personal.name}</span>
                    <span className="text-muted"> · {personal.roles[0]}</span>
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <div>
          {personal.bio.map((para, i) => (
            <motion.p key={i} variants={fadeIn('up', 0.1 * i)} className="mb-5 text-base leading-relaxed text-muted sm:text-lg">
              <Rich text={para} />
            </motion.p>
          ))}

          <motion.ul variants={fadeIn('up', 0.2)} className="mt-8 grid gap-3 sm:grid-cols-3">
            {personal.facts.map((f) => (
              <li key={f.label} className="glass rounded-2xl p-4">
                <Icon name={f.icon} className="size-5 text-flutter" />
                <p className="mt-3 text-xs uppercase tracking-[0.15em] text-muted">{f.label}</p>
                <p className="mt-1 text-sm font-medium text-ink">{f.value}</p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <TiltCard key={s.title} as="article" variants={fadeIn('up', 0.1 * i)} className="glass-fill gradient-border rounded-3xl p-6">
            <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-flutter/25 to-flutter-deep/25 text-flutter ring-1 ring-flutter/30">
              <Icon name={s.icon} className="size-6" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
          </TiltCard>
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(About, 'about');
