import React, { useCallback } from 'react';
import { useState } from 'react';
import { ModalErrorMessage } from '../ModalErrorMessage';
import { ModalSubmitButton } from '../ModalSubmitButton';
import { AttachFileInputButton } from './AttachFileInputButton';
import { FontAwesomeIcon } from '../../FontAwesomeIcon/FontAwesomeIcon';

export type PostSubmitParams = {
  images: File[];
  movie?: File;
  sound?: File;
  text: string;
};

type Props = {
  hasError: boolean;
  isLoading: boolean;
  onResetError: () => void;
  onSubmit: (params: PostSubmitParams) => void;
};

const initialState: PostSubmitParams = {
  images: [],
  movie: undefined,
  sound: undefined,
  text: '',
};

const MAX_UPLOAD_BYTES_LIMIT = 10 * 1024 * 1024;

export const NewPostModal = ({ hasError, isLoading, onResetError, onSubmit }: Props) => {
  const [params, setParams] = useState<PostSubmitParams>(initialState);
  const [hasFileError, setHasFileError] = useState(false);

  const handleChangeText: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({
      ...params,
      text: value,
    }));
  }, []);

  const handleChangeImages: React.ChangeEventHandler<HTMLInputElement> = useCallback((ev) => {
    const files = Array.from(ev.currentTarget.files || []).slice(0, 4);
    const isValid = files.every((file) => file.size <= MAX_UPLOAD_BYTES_LIMIT);

    setHasFileError(isValid !== true);
    if (isValid) {
      setParams((params) => ({
        ...params,
        images: files,
        movie: undefined,
        sound: undefined,
      }));
    }
  }, []);

  const handleChangeSound: React.ChangeEventHandler<HTMLInputElement> = useCallback((ev) => {
    const file = ev.currentTarget.files?.[0];
    if (!file) return;
    const isValid = file.size <= MAX_UPLOAD_BYTES_LIMIT;

    setHasFileError(isValid !== true);
    if (isValid) {
      setParams((params) => ({
        ...params,
        images: [],
        movie: undefined,
        sound: file,
      }));
    }
  }, []);

  const handleChangeMovie: React.ChangeEventHandler<HTMLInputElement> = useCallback((ev) => {
    const file = ev.currentTarget.files?.[0];
    if (!file) return;
    const isValid = file?.size <= MAX_UPLOAD_BYTES_LIMIT;

    setHasFileError(isValid !== true);
    if (isValid) {
      setParams((params) => ({
        ...params,
        images: [],
        movie: file,
        sound: undefined,
      }));
    }
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (ev) => {
      ev.preventDefault();
      onResetError();
      onSubmit(params);
    },
    [params, onSubmit, onResetError],
  );

  return (
    <section>
      <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
        <textarea
          className="placeholder-gray-300 p-4 w-full h-24 border border-gray-300 rounded resize-none"
          onChange={handleChangeText}
          placeholder="いまなにしてる？"
        />
        <p className="flex items-center justify-evenly mt-4 w-full text-gray-900">
          <AttachFileInputButton
            accept="image/*"
            active={params.images.length !== 0}
            icon={<FontAwesomeIcon iconType="images" styleType="solid" />}
            onChange={handleChangeImages}
          />
          <AttachFileInputButton
            accept="audio/*"
            active={params.sound !== undefined}
            icon={<FontAwesomeIcon iconType="music" styleType="solid" />}
            onChange={handleChangeSound}
          />
          <AttachFileInputButton
            accept="video/*"
            active={params.movie !== undefined}
            icon={<FontAwesomeIcon iconType="video" styleType="solid" />}
            onChange={handleChangeMovie}
          />
        </p>
        <p className="mt-4">
          <ModalSubmitButton disabled={isLoading || params.text === ''} loading={isLoading}>
            投稿する
          </ModalSubmitButton>
        </p>
        <p className="mt-4">
          <ModalErrorMessage>
            {hasFileError ? '10 MB より小さくしてください' : hasError ? '投稿ができませんでした' : undefined}
          </ModalErrorMessage>
        </p>
      </form>
    </section>
  );
};
