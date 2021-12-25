import { PostPageItem } from '../../components/Post/PostPageItem';
import { useMatch } from 'react-location';
import { LocationGenerics } from '../../Router';

export const PostPage = () => {
  const {
    data: { post },
  } = useMatch<LocationGenerics>();

  if (!post) return null;

  return <PostPageItem post={post} />;
};
