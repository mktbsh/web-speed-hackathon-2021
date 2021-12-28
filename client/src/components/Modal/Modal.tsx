import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import 'wicg-inert';
import styles from './Modal.module.css';

type Props = {
  onRequestCloseModal: () => void;
  children: React.ReactNode;
};

export const Modal = ({ onRequestCloseModal, children }: Props) => {
  useEffect(() => {
    const app = document.getElementById('app');
    const bodyStyle = document.body.style;
    bodyStyle.setProperty('overflow', 'hidden');
    app?.setAttribute('inert', 'true');

    const handler = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onRequestCloseModal();
      }
    };
    document.addEventListener('keyup', handler);

    return () => {
      bodyStyle.removeProperty('overflow');
      app?.removeAttribute('inert');
      document.removeEventListener('keyup', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div className={styles.container}>
      <div className={styles.close} onClick={onRequestCloseModal}></div>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById('modal') as Element,
  );
};
