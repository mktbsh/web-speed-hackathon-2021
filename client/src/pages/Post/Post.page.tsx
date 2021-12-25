import { PostPageItem } from '../../components/Post/PostPageItem';
import { useMatch } from 'react-location';
import { LocationGenerics } from '../../Router';
import { NotFoundPage } from '../NotFound';
import { Post } from '../../types';

const isPost = (arg: any): arg is Post => {
  return arg && !!(arg as Post).text;
};

export const PostPage = () => {
  const {
    data: { post },
  } = useMatch<LocationGenerics>();

  if (isPost(post)) return <PostPageItem post={post} />;
  return <NotFoundPage />;
};
