import styles from './VisualyHidden.module.css';

type Props = {
  children: React.ReactNode;
};

export const VisualyHidden = ({ children }: Props) => {
  return <span className={styles.vHidden}>{children}</span>;
};
