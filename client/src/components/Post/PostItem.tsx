import { memo, lazy, Suspense } from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-location';
import type { Post } from '../../types';
import { getProfileImagePath } from '../../utils';
import { PostsLoader } from '../Loader';
import { VisualyHidden } from '../VisualyHidden';

type Props = {
  post: Post;
};

const ImageArea = lazy(() => import('../MediaArea').then((m) => ({ default: m.ImageArea })));
const MovieArea = lazy(() => import('../MediaArea/MovieArea').then((m) => ({ default: m.MovieArea })));
const SoundArea = lazy(() => import('../SoundArea').then((m) => ({ default: m.SoundArea })));

export const PostItem = memo(({ post }: Props) => {
  const createdAt = new Date(post.createdAt);

  return (
    <Suspense fallback={<PostsLoader />}>
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
            <div className="relative mt-2 w-full">
              {post.images && post.images?.length > 0 ? <ImageArea images={post.images} /> : null}
              {post.movie && <MovieArea movie={post.movie} />}
              {post.sound && <SoundArea sound={post.sound} />}
            </div>
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
    </Suspense>
  );
});
