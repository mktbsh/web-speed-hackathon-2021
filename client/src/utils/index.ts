export * from './paths';

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};
