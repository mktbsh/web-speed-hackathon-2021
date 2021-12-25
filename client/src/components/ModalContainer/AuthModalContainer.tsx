import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import { AspidaClient } from '../../lib/AspidaClient';
import { AuthModal, SubmitParams } from '../Modal/AuthModal';
import { Modal } from '../Modal/Modal';

type Props = {
  onRequestCloseModal: () => void;
};

export const AuthModalContainer = ({ onRequestCloseModal }: Props) => {
  const queryClient = useQueryClient();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetError = useCallback(() => {
    setHasError(false);
  }, []);

  const handleSubmit = useCallback(
    async ({ type, ...params }: SubmitParams) => {
      try {
        setIsLoading(true);
        if (type === 'signin') {
          const user = await AspidaClient.api.v1.signin.$post({ body: params });
          queryClient.setQueryData(AspidaClient.api.v1.me.$path(), user);
        } else if (type === 'signup') {
          const user = await AspidaClient.api.v1.signup.$post({ body: params });
          queryClient.setQueryData(AspidaClient.api.v1.me.$path(), user);
        }
      } catch (_err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
        onRequestCloseModal();
      }
    },
    [onRequestCloseModal, queryClient],
  );

  return (
    <Modal onRequestCloseModal={onRequestCloseModal}>
      <AuthModal
        hasError={hasError}
        isLoading={isLoading}
        onRequestCloseModal={onRequestCloseModal}
        onResetError={handleResetError}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
