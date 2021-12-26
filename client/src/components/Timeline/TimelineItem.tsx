import { useCallback } from 'react';
import { memo } from 'react';
import { Link, useNavigate } from 'react-location';
import type { Post } from '../../types';
import { getProfileImagePath } from '../../utils';
import { ImageArea } from '../MediaArea';
import { MovieArea } from '../MediaArea/MovieArea';
import { SoundArea } from '../SoundArea';
import { VisualyHidden } from '../VisualyHidden';

type Props = {
  post: Post;
};

const isClickedAnchorOrButton = (target: Element | null, currentTarget: Element) => {
  const list = ['button', 'a'];
  while (target != null) {
    const tagName = target.tagName.toLowerCase();
    if (list.includes(tagName)) return true;
    if (currentTarget === target) return false;
    target = target.parentNode as Element;
  }
  return false;
};

export const TimelineItem = memo(({ post }: Props) => {
  const navigate = useNavigate();
  const createdAt = new Date(post.createdAt);

  const handleClick: React.MouseEventHandler = useCallback(
    (ev) => {
      const isSelectedText = document.getSelection()?.isCollapsed === false;
      if (!isClickedAnchorOrButton(ev.target as Element, ev.currentTarget) && !isSelectedText) {
        navigate({ to: `/posts/${post.id}` });
      }
    },
    [post, navigate],
  );

  return (
    <article className="px-1 hover:bg-gray-50 sm:px-4" onClick={handleClick}>
      <div className="flex pb-4 pt-2 px-2 border-b border-gray-300 sm:px-4">
        <div className="flex-grow-0 flex-shrink-0 pr-2 sm:pr-4">
          <Link
            className="block w-12 h-12 bg-gray-300 border border-gray-300 rounded-full hover:opacity-75 overflow-hidden sm:w-16 sm:h-16"
            to={`/users/${post.user.username}`}
          >
            <VisualyHidden>{`to ${post.user.username}`}</VisualyHidden>
            <img
              alt={post.user.profileImage.alt}
              src={getProfileImagePath(post.user.profileImage.id, true)}
              width="72"
              height="72"
            />
          </Link>
        </div>
        <div className="flex-grow flex-shrink min-w-0">
          <p className="whitespace-nowrap text-sm overflow-hidden overflow-ellipsis">
            <Link className="pr-1 text-gray-800 hover:underline font-bold" to={`/users/${post.user.username}`}>
              {post.user.name}
            </Link>
            <Link className="pr-1 text-gray-500 hover:underline" to={`/users/${post.user.username}`}>
              @{post.user.username}
            </Link>
            <span className="pr-1 text-gray-500">-</span>
            <Link className="pr-1 text-gray-500 hover:underline" to={`/posts/${post.id}`}>
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
          <p className="text-gray-800 leading-relaxed">{post.text}</p>
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
        </div>
      </div>
    </article>
  );
});
