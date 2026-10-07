/** CSS smartphone frame for 2D screenshots. Renders placeholder art when no `src` is given. */
export default function PhoneFrame({ src, alt = '', title, theme = ['#13b9fd', '#02569b'], className = '' }) {
  return (
    <div
      className={`relative aspect-[9/19.5] overflow-hidden rounded-[1.6rem] border-[5px] border-[#1c2440] bg-black shadow-[0_25px_60px_-15px_rgb(0_0_0/0.8)] ring-1 ring-white/10 ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" className="size-full object-cover" />
      ) : (
        <PlaceholderScreen title={title} theme={theme} />
      )}
      <span className="absolute left-1/2 top-1.5 h-[4.5%] w-[30%] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
    </div>
  );
}

function PlaceholderScreen({ title, theme: [a, b] }) {
  return (
    <div className="flex size-full flex-col gap-[6%] bg-[#0a0f1f] p-[9%] pt-[16%]" aria-hidden="true">
      <div className="rounded-xl p-[9%]" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
        <div className="h-1.5 w-1/3 rounded-full bg-white/70" />
        <div className="mt-2 text-[0.6rem] font-semibold leading-tight text-white">{title}</div>
        <div className="mt-3 h-1 w-2/3 rounded-full bg-white/40" />
      </div>
      <div className="grid grid-cols-2 gap-[8%]">
        {[0, 1].map((i) => (
          <div key={i} className="aspect-square rounded-lg bg-white/[0.06] p-[14%]">
            <div className="size-3 rounded-md" style={{ background: i ? b : a }} />
            <div className="mt-2 h-1 w-3/4 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg bg-white/[0.04] p-[6%]">
          <div className="size-3 shrink-0 rounded-full" style={{ background: i % 2 ? b : a, opacity: 0.8 }} />
          <div className="h-1 flex-1 rounded-full bg-white/15" />
        </div>
      ))}
    </div>
  );
}
