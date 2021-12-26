import { memo, useCallback, useMemo, lazy, Suspense } from 'react';
import { UserResponse } from '../../types';
import { NavigationItem } from '../NavigationItem';

import { useState } from 'react';
import { useQuery } from 'react-query';
import { AspidaClient } from '../../lib/AspidaClient';
import { FontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIcon';

type ModalType = 'auth' | 'post' | 'none';

const AuthModal = lazy(() =>
  import('../ModalContainer/AuthModalContainer').then((m) => ({ default: m.AuthModalContainer })),
);

const PostModal = lazy(() =>
  import('../ModalContainer/NewPostModalContainer').then((m) => ({ default: m.NewPostModalContainer })),
);

const isUser = (data: any): data is UserResponse => {
  return data && (data as UserResponse).name;
};

export const Navigation = memo(() => {
  const { data } = useQuery<UserResponse>(AspidaClient.api.v1.me.$path(), () => AspidaClient.api.v1.me.$get(), {
    refetchOnWindowFocus: true,
    refetchInterval: 30 * 1000,
  });

  const activeUser = useMemo(() => {
    return isUser(data) ? data : undefined;
  }, [data]);

  const [modalType, setModalType] = useState<ModalType>('none');
  const handleOpenAuthModal = useCallback(() => setModalType('auth'), []);
  const handleOpenPostModal = useCallback(() => setModalType('post'), []);
  const handleCloseModal = useCallback(() => setModalType('none'), []);

  const showAuthModal = activeUser == null && modalType === 'auth';
  const showPostModal = activeUser != null && modalType === 'post';

  return (
    <nav className="fixed z-10 bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-300 lg:relative lg:w-48 lg:h-full lg:border-r lg:border-t-0">
      <ul className="relative grid grid-flow-col items-center justify-evenly lg:fixed lg:gap-2 lg:grid-flow-row lg:justify-start lg:p-2 lg:w-48 lg:h-full lg:auto-rows-min">
        <NavigationItem href="/" icon={<FontAwesomeIcon iconType="home" styleType="solid" />} text="ホーム" />
        {activeUser && (
          <NavigationItem
            icon={<FontAwesomeIcon iconType="edit" styleType="solid" />}
            text="投稿する"
            onClick={handleOpenPostModal}
          />
        )}
        {activeUser ? (
          <NavigationItem
            href={`/users/${activeUser.username}`}
            icon={<FontAwesomeIcon iconType="user" styleType="solid" />}
            text="マイページ"
          />
        ) : (
          <NavigationItem
            icon={<FontAwesomeIcon iconType="sign-in-alt" styleType="solid" />}
            text="サインイン"
            onClick={handleOpenAuthModal}
          />
        )}
        <NavigationItem
          href="/terms"
          preload={1}
          icon={<FontAwesomeIcon iconType="balance-scale" styleType="solid" />}
          text="利用規約"
        />
        <Suspense fallback={<div />}>
          {showAuthModal && <AuthModal onRequestCloseModal={handleCloseModal} />}
          {showPostModal && <PostModal onRequestCloseModal={handleCloseModal} />}
        </Suspense>
      </ul>
    </nav>
  );
});
