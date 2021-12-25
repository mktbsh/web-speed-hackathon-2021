import FastAverageColor from 'fast-average-color';
import { useCallback } from 'react';
import { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { User } from '../../types';
import { getProfileImagePath } from '../../utils';

type Props = {
  user: User;
};

export const UserProfileHeader = ({ user }: Props) => {
  const [avgColor, setAvgColor] = useState<string>('');

  const handleLoadImage: React.ReactEventHandler<HTMLImageElement> = useCallback((ev) => {
    const fac = new FastAverageColor();
    const { rgb } = fac.getColor(ev.currentTarget, { mode: 'precision' });
    setAvgColor(rgb);
    fac.destroy();
  }, []);

  return (
    <header className="relative">
      <div className="h-32 bg-gray-300" style={{ backgroundColor: avgColor }}></div>
      <div className="absolute left-2/4 m-0 w-28 h-28 bg-gray-300 border border-gray-300 rounded-full overflow-hidden transform -translate-x-1/2 -translate-y-1/2 sm:w-32 sm:h-32">
        <img alt="" crossOrigin="anonymous" onLoad={handleLoadImage} src={getProfileImagePath(user.profileImage.id)} />
      </div>
      <div className="pt-20 px-4">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-600">@{user.username}</p>
        <p className="pt-2">{user.description}</p>
        <p className="pt-2 text-gray-600 text-sm">
          <span className="pr-1">
            <FaCalendarAlt className="inline-block leading-none fill-current" />
          </span>
          <span>
            <time dateTime={user.createdAt}>
              {new Date(user.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            からサービスを利用しています
          </span>
        </p>
      </div>
    </header>
  );
};
