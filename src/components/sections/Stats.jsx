import { motion } from 'framer-motion';
import { stats } from '../../data/portfolio';
import SectionWrapper from '../../hoc/SectionWrapper';
import { fadeIn } from '../../utils/motion';
import CountUp from '../ui/CountUp';

function Stats() {
  return (
    <motion.dl
      variants={fadeIn('up')}
      className="glass-fill gradient-border grid grid-cols-2 gap-y-10 rounded-3xl px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-10"
    >
      {stats.map((s, i) => (
        <div key={s.label} className={`flex flex-col-reverse text-center ${i ? 'lg:border-l lg:border-white/10' : ''}`}>
          <dt className="mt-2 px-2 text-sm text-muted">{s.label}</dt>
          <dd className="text-gradient font-display text-5xl font-bold sm:text-6xl">
            <CountUp value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </motion.dl>
  );
}

export default SectionWrapper(Stats, 'stats', { padding: 'py-6 sm:py-10' });
