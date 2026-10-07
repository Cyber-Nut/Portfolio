import Icon from './Icon';

const LINKS = [
  { key: 'playStore', label: 'Google Play', icon: 'playStore' },
  { key: 'appStore', label: 'App Store', icon: 'apple' },
  { key: 'github', label: 'Source code', icon: 'github' },
  { key: 'video', label: 'Demo video', icon: 'video' },
];

export const availableLinks = (links = {}) => LINKS.filter((l) => links[l.key]);

/** Icon-only (compact) or labelled link buttons for a project. */
export default function ProjectLinks({ links, compact = false }) {
  const items = availableLinks(links);
  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((l) => (
        <a
          key={l.key}
          href={links[l.key]}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={l.label}
          title={l.label}
          className={
            compact
              ? 'grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-ink transition hover:border-flutter/60 hover:text-flutter'
              : 'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-ink transition hover:border-flutter/60 hover:text-flutter'
          }
        >
          <Icon name={l.icon} className="size-4" />
          {!compact && l.label}
        </a>
      ))}
    </div>
  );
}
