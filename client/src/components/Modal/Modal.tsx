import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import 'wicg-inert';

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

    return () => {
      bodyStyle.removeProperty('overflow');
      app?.removeAttribute('inert');
    };
  }, []);

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onRequestCloseModal();
      }
    };
    document.addEventListener('keyup', handler);
    return () => document.removeEventListener('keyup', handler);
  }, [onRequestCloseModal]);

  return createPortal(
    <div className="fixed z-10 bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute bottom-0 left-0 right-0 top-0" onClick={onRequestCloseModal}></div>
      <div className="flex flex-col items-center justify-center px-2 w-full h-4/6">
        <div className="relative px-2 py-8 w-full max-w-md max-h-full bg-white rounded">
          <div className="relative w-full max-h-full overflow-auto">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById('modal') as Element,
  );
};
