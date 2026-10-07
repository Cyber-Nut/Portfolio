export default function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-flutter/20 bg-flutter/5 px-2.5 py-1 text-xs font-medium text-flutter/90 ${className}`}
    >
      <span className="size-1 rounded-full bg-flutter" aria-hidden="true" />
      {children}
    </span>
  );
}
