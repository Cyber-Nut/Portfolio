import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/motion';

/** Wraps a section: anchor id, consistent spacing, and staggered reveal of children with variants. */
export default function SectionWrapper(Component, id, { padding = 'py-24 sm:py-32' } = {}) {
  function Wrapped(props) {
    return (
      <motion.section
        id={id}
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        className={`relative ${padding}`}
      >
        <div className="section-x">
          <Component {...props} />
        </div>
      </motion.section>
    );
  }
  Wrapped.displayName = `Section(${id})`;
  return Wrapped;
}
