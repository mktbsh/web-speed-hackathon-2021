import { FontAwesomeIcon } from '../../FontAwesomeIcon/FontAwesomeIcon';

import styles from './index.module.css';

type Props = {
  children: string;
  disabled: boolean;
  loading: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ModalSubmitButton = ({ children, disabled, loading, onClick }: Props) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
      onClick={onClick}
      type="submit"
      aria-label="submit"
    >
      {loading && (
        <span className={styles.loading}>
          <span>
            <FontAwesomeIcon iconType="circle-notch" styleType="solid" />
          </span>
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};
