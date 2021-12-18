import { memo } from 'react';
import { User } from '../../types';
import { NavigationItem } from '../NavigationItem';

import { FaEdit, FaHome, FaUser, FaSignInAlt, FaBalanceScale } from 'react-icons/fa';

type Props = {
  user?: User | null;
};

export const Navigation = memo(({ user }: Props) => (
  <nav className="fixed z-10 bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-300 lg:relative lg:w-48 lg:h-full lg:border-r lg:border-t-0">
    <ul className="relative grid grid-flow-col items-center justify-evenly lg:fixed lg:gap-2 lg:grid-flow-row lg:justify-start lg:p-2 lg:w-48 lg:h-full lg:auto-rows-min">
      <NavigationItem href="/" icon={<FaHome />} text="ホーム" />
      {user && <NavigationItem icon={<FaEdit />} text="投稿する" />}
      {user ? (
        <NavigationItem href={`/users/${user.username}`} icon={<FaUser />} text="マイページ" />
      ) : (
        <NavigationItem icon={<FaSignInAlt />} text="サインイン" />
      )}
      <NavigationItem href="/terms" preload={1} icon={<FaBalanceScale />} text="利用規約" />
    </ul>
  </nav>
));
