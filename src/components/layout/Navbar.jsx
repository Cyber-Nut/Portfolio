import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { navLinks, personal } from '../../data/portfolio';
import { scrollToId } from '../../utils/smoothScroll';
import Icon from '../ui/Icon';
import Logo from './Logo';

export default function Navbar() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 480);
  });

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    const onTop = () => window.scrollY < 200 && setActive('');
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[60]"
      animate={{ y: hidden && !open ? '-110%' : '0%' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <nav
        className={`section-x mt-3 flex items-center justify-between rounded-2xl py-3 transition-all duration-500 ${
          scrolled || open ? 'glass shadow-[0_8px_40px_-12px_rgb(0_0_0/0.6)]' : 'border border-transparent'
        }`}
        style={{ maxWidth: 'min(80rem, calc(100% - 1.5rem))' }}
        aria-label="Main"
      >
        <a href="#top" onClick={(e) => go(e, 'top')} aria-label={`${personal.name}, back to top`}>
          <Logo name={personal.name} />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id} className="relative">
              <a
                href={`#${link.id}`}
                onClick={(e) => go(e, link.id)}
                className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === link.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {link.title}
              </a>
              {active === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full border border-flutter/30 bg-flutter/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={personal.resume}
            download
            className="hidden items-center gap-2 rounded-full border border-flutter/40 bg-flutter/10 px-4 py-2 text-sm font-semibold text-flutter transition hover:bg-flutter hover:text-[#031120] sm:inline-flex"
          >
            <Icon name="download" className="size-4" />
            Resume
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-ink md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'x' : 'menu'} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass mx-3 mt-2 rounded-2xl p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.04 * i } }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => go(e, link.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 font-display text-lg ${
                      active === link.id ? 'bg-flutter/10 text-flutter' : 'text-ink'
                    }`}
                  >
                    {link.title}
                    <Icon name="arrowRight" className="size-4 opacity-50" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={personal.resume}
              download
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-flutter to-[#0b84d8] px-4 py-3 font-semibold text-[#031120]"
            >
              <Icon name="download" className="size-4" />
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
