/** Fixed ambient backdrop: glow blobs, masked grid and film grain. */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_10%,transparent_75%)]" />
      <div className="absolute -top-48 left-1/2 h-[620px] w-[min(1000px,140vw)] -translate-x-1/2 rounded-full bg-flutter/[0.13] blur-[130px]" />
      <div className="absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full bg-flutter-deep/25 blur-[140px] [animation:drift_18s_ease-in-out_infinite]" />
      <div className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-teal/[0.06] blur-[120px] [animation:drift_22s_ease-in-out_infinite_reverse]" />
      <div className="bg-noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}
