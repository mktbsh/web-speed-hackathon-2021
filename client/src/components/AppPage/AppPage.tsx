import type { User } from '../../types';

import { Navigation } from '../Navigation';

type Props = {
  activeUser?: User | null;
  children: React.ReactNode;
};

export const AppPage = ({ activeUser, children }: Props) => (
  <div className="relative z-0 flex justify-center bg-gray-100">
    <div className="flex max-w-full min-h-screen text-gray-800 bg-white">
      <aside className="relative z-10">
        <Navigation user={activeUser} />
      </aside>
      <main className="relative z-0 flex-shrink pb-12 w-screen min-w-0 max-w-screen-sm lg:pb-0">{children}</main>
    </div>
  </div>
);
