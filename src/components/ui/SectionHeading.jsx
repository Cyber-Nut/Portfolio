import { motion } from 'framer-motion';
import { textVariant } from '../../utils/motion';

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const centered = align === 'center';
  return (
    <motion.header variants={textVariant()} className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
      <p
        className={`flex items-center gap-3 font-display text-sm font-medium uppercase tracking-[0.25em] text-flutter ${centered ? 'justify-center' : ''}`}
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-flutter" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </motion.header>
  );
}
