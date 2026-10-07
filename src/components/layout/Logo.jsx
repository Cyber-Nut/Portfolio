export default function Logo({ name, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid size-9 place-items-center rounded-xl border border-white/10 bg-surface font-display text-lg font-bold">
        <span className="text-gradient">D</span>
        <span className="absolute bottom-1.5 right-1.5 size-1.5 rounded-full bg-teal" />
      </span>
      {name && <span className="font-display text-lg font-semibold tracking-tight text-ink">{name}</span>}
    </span>
  );
}
