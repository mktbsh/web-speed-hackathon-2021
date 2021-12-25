import { memo, useCallback, lazy, Suspense } from 'react';
import { UserResponse } from '../../types';
import { NavigationItem } from '../NavigationItem';

import { FaEdit, FaHome, FaUser, FaSignInAlt, FaBalanceScale } from 'react-icons/fa';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { AspidaClient } from '../../lib/AspidaClient';
import { useEffect } from 'react';

type ModalType = 'auth' | 'post' | 'none';

const AuthModal = lazy(() =>
  import('../ModalContainer/AuthModalContainer').then((m) => ({ default: m.AuthModalContainer })),
);

const isUser = (data: any): data is UserResponse => {
  return data && (data as UserResponse).name;
};

export const Navigation = memo(() => {
  const [activeUser, setActiveUser] = useState<UserResponse | undefined>();
  const { data } = useQuery<UserResponse>(AspidaClient.api.v1.me.$path(), () => AspidaClient.api.v1.me.$get());

  useEffect(() => {
    if (isUser(data)) {
      setActiveUser(data);
    }
  }, [data]);

  const [modalType, setModalType] = useState<ModalType>('none');

  const handleOpenAuthModal = useCallback(() => setModalType('auth'), []);
  const handleCloseModal = useCallback(() => setModalType('none'), []);

  const showAuthModal = activeUser == null && modalType === 'auth';

  return (
    <nav className="fixed z-10 bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-300 lg:relative lg:w-48 lg:h-full lg:border-r lg:border-t-0">
      <ul className="relative grid grid-flow-col items-center justify-evenly lg:fixed lg:gap-2 lg:grid-flow-row lg:justify-start lg:p-2 lg:w-48 lg:h-full lg:auto-rows-min">
        <NavigationItem href="/" icon={<FaHome />} text="ホーム" />
        {activeUser && <NavigationItem icon={<FaEdit />} text="投稿する" />}
        {activeUser ? (
          <NavigationItem href={`/users/${activeUser.username}`} icon={<FaUser />} text="マイページ" />
        ) : (
          <NavigationItem icon={<FaSignInAlt />} text="サインイン" onClick={handleOpenAuthModal} />
        )}
        <NavigationItem href="/terms" preload={1} icon={<FaBalanceScale />} text="利用規約" />
        <Suspense fallback={<div />}>{showAuthModal && <AuthModal onRequestCloseModal={handleCloseModal} />}</Suspense>
      </ul>
    </nav>
  );
});
