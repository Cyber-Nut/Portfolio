import { navLinks, personal, socials } from '../../data/portfolio';
import { scrollToId } from '../../utils/smoothScroll';
import Icon from '../ui/Icon';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="section-x flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo name={personal.name} />
          <p className="mt-4 text-sm leading-relaxed text-muted">{personal.tagline}</p>
          <div className="mt-5 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.name}
                className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-muted transition hover:border-flutter/60 hover:text-flutter"
              >
                <Icon name={s.icon} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(l.id);
                  }}
                  className="text-muted transition hover:text-ink"
                >
                  {l.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="section-x mt-10 flex flex-col gap-2 border-t border-white/5 pt-6 text-xs text-muted/80 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {personal.name}. Built with React, Three.js, Framer Motion & Tailwind CSS.
        </p>
        <p>
          Inspired by{' '}
          <a
            href="https://github.com/shaqdeff/Portfolio-Template"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-white/20 underline-offset-4 hover:text-ink"
          >
            shaqdeff/Portfolio-Template
          </a>
        </p>
      </div>
    </footer>
  );
}
