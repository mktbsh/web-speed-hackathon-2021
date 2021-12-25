import { PostItem } from './PostItem';
import { Comment, Post } from '../../types';

type Props = {
  post: Post;
  comments?: Comment[];
};

export const PostPageItem = ({ post, comments = [] }: Props) => {
  return <PostItem post={post} />;
};
