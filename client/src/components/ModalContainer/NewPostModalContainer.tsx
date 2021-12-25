import { useCallback } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-location';
import { AspidaClient } from '../../lib/AspidaClient';
import { sendImage, sendMovie, sendSound } from '../../lib/fetcher';
import { Modal } from '../Modal/Modal';
import { NewPostModal, PostSubmitParams } from '../Modal/NewPostModal';

type Props = {
  onRequestCloseModal: () => void;
};

const sendNewPost = async ({ images, movie, sound, text }: PostSubmitParams) => {
  const payload = {
    images: images ? await Promise.all(images.map((image) => sendImage(image))) : [],
    movie: movie ? await sendMovie(movie) : undefined,
    sound: sound ? await sendSound(sound) : undefined,
    text,
  };

  return AspidaClient.api.v1.posts.$post({ body: payload });
};

export const NewPostModalContainer = ({ onRequestCloseModal }: Props) => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetError = useCallback(() => {
    setHasError(false);
  }, []);

  const handleSubmit = useCallback(async (params: PostSubmitParams) => {
    try {
      setIsLoading(true);
      const post = await sendNewPost(params);
      onRequestCloseModal();
      navigate({ to: `/posts/${post.id}` });
    } catch (_) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Modal onRequestCloseModal={onRequestCloseModal}>
      <NewPostModal hasError={hasError} isLoading={isLoading} onResetError={handleResetError} onSubmit={handleSubmit} />
    </Modal>
  );
};
