import { PostItem } from './PostItem';
import { InfiniteScroll } from '../InfiniteScroll';
import { AspidaClient } from '../../lib/AspidaClient';
import { CommentItem } from './CommentItem';
import { Post } from '../../types';

type Props = {
  post: Post;
};

export const PostPageItem = ({ post }: Props) => {
  const key = AspidaClient.api.v1.posts._id(post.id).comments.$path();

  const fetcher = async ({ pageParam = 1 }) =>
    await AspidaClient.api.v1.posts._id(post.id).comments.$get({
      query: {
        page: pageParam,
      },
    });

  return (
    <>
      <PostItem post={post} />
      <InfiniteScroll
        key={key}
        queryKey={key}
        fetcher={fetcher}
        renderItem={(item) => {
          return <CommentItem key={`${key}-${item.id}`} comment={item} />;
        }}
        withLoader={<div />}
        withError={<p>There was an error</p>}
      />
    </>
  );
};
