import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-location';
import type { Post } from '../../types';
import { getProfileImagePath } from '../../utils';
import { ImageArea } from '../MediaArea';
import { MovieArea } from '../MediaArea/MovieArea';
import { SoundArea } from '../SoundArea';
import { VisualyHidden } from '../VisualyHidden';

type Props = {
  post: Post;
};

export const PostItem = memo(({ post }: Props) => {
  const createdAt = new Date(post.createdAt);

  return (
    <article className="px-1 sm:px-4">
      <div className="pb-4 pt-4 px-4 border-b border-gray-300">
        <div className="flex items-center justify-center">
          <div className="flex-grow-0 flex-shrink-0 pr-2">
            <Link
              className="block w-14 h-14 bg-gray-300 border border-gray-300 rounded-full hover:opacity-95 overflow-hidden sm:w-16 sm:h-16"
              to={`/users/${post.user.username}`}
            >
              <VisualyHidden>{`to ${post.user.username}`}</VisualyHidden>
              <img
                alt={post.user.profileImage.alt}
                src={getProfileImagePath(post.user.profileImage.id, true)}
                width={isMobile ? 46 : 62}
                height={isMobile ? 46 : 62}
              />
            </Link>
          </div>
          <div className="flex-grow flex-shrink min-w-0 whitespace-nowrap overflow-hidden overflow-ellipsis">
            <p>
              <Link className="text-gray-800 hover:underline font-bold" to={`/users/${post.user.username}`}>
                {post.user.name}
              </Link>
            </p>
            <p>
              <Link className="text-gray-500 hover:underline" to={`/users/${post.user.username}`}>
                @{post.user.username}
              </Link>
            </p>
          </div>
        </div>
        <div className="pt-2 sm:pt-4">
          <p className="text-gray-800 text-xl leading-relaxed">{post.text}</p>
          {post.images && post.images?.length > 0 ? (
            <div className="relative mt-2 w-full">
              <ImageArea images={post.images} />
            </div>
          ) : null}
          {post.movie ? (
            <div className="relative mt-2 w-full">
              <MovieArea movie={post.movie} />
            </div>
          ) : null}
          {post.sound ? (
            <div className="relative mt-2 w-full">
              <SoundArea sound={post.sound} />
            </div>
          ) : null}
          <p className="mt-2 text-sm sm:mt-4">
            <Link className="text-gray-500 hover:underline" to={`/posts/${post.id}`}>
              <time dateTime={createdAt.toISOString()}>
                {createdAt
                  .toLocaleDateString('ja-JP')
                  .split('/')
                  .reduce((a, c, i) => {
                    a += `${c}${i === 0 ? '年' : i === 1 ? '月' : '日'}`;
                    return a;
                  }, '')}
              </time>
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
});
