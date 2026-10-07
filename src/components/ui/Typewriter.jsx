import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/** Types, pauses, deletes and cycles through `words`. Falls back to a gentle fade with reduced motion. */
export default function Typewriter({ words, typeMs = 70, deleteMs = 35, holdMs = 1700 }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? words[0] : '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
      return () => clearInterval(id);
    }
    const word = words[index];
    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === word) delay = holdMs;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(id);
  }, [reduce, words, index, text, deleting, typeMs, deleteMs, holdMs]);

  return (
    <>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true" className="relative inline-flex items-center">
        {reduce ? (
          <AnimatePresence mode="wait">
            <motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {words[index]}
            </motion.span>
          </AnimatePresence>
        ) : (
          <>
            <span className="text-gradient">{text}</span>
            <span className="ml-1 inline-block h-[1em] w-[3px] translate-y-[2px] rounded-full bg-flutter [animation:caret-blink_1s_steps(1)_infinite]" />
          </>
        )}
      </span>
    </>
  );
}
