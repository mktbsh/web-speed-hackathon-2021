export * from './get-paths';

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const getPrefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
