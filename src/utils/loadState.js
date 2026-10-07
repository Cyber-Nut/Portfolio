// Tiny store that drives the intro loader. Each step is marked once when it's done.
export const LOAD_STEPS = ['fonts', 'window', 'scene'];

const done = new Set();
const listeners = new Set();

export function markLoaded(step) {
  if (done.has(step)) return;
  done.add(step);
  listeners.forEach((listener) => listener());
}

export function subscribeLoad(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const getLoadProgress = () => done.size / LOAD_STEPS.length;
