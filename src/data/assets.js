// Resolves images dropped into src/assets/** at build time, so content can be
// added by placing files in folders (see the header of ./portfolio.js).
// Note: import.meta.glob patterns must be string literals.

const basename = (path) => path.split('/').pop().replace(/\.[^.]+$/, '');
const sortedValues = (modules) =>
  Object.keys(modules)
    .sort()
    .map((key) => modules[key]);

const profileModules = import.meta.glob('../assets/profile.{webp,png,jpg,jpeg,avif}', {
  eager: true,
  import: 'default',
});
export const profilePhoto = Object.values(profileModules)[0] ?? null;

const screenModules = import.meta.glob('../assets/screens/*.{webp,png,jpg,jpeg,avif}', {
  eager: true,
  import: 'default',
});
export const heroScreens = sortedValues(screenModules);

const logoModules = import.meta.glob('../assets/logos/*.{svg,webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
});
export const logoFor = (id) => {
  const key = Object.keys(logoModules).find((k) => basename(k) === id);
  return key ? logoModules[key] : null;
};

const techModules = import.meta.glob('../assets/tech/*.svg', { eager: true, import: 'default' });
export const techIcon = (key) => techModules[`../assets/tech/${key}.svg`];

const projectModules = import.meta.glob('../assets/projects/*/*.{webp,png,jpg,jpeg,avif}', {
  eager: true,
  import: 'default',
});
export const projectMedia = (id) => {
  const keys = Object.keys(projectModules)
    .filter((k) => k.startsWith(`../assets/projects/${id}/`))
    .sort();
  const iconKey = keys.find((k) => basename(k) === 'icon');
  return {
    icon: iconKey ? projectModules[iconKey] : null,
    screenshots: keys.filter((k) => k !== iconKey).map((k) => projectModules[k]),
  };
};
