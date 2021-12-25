import { PostPageItem } from '../../components/Post/PostPageItem';
import { useMatch } from 'react-location';
import { LocationGenerics } from '../../Router';
import { useSetHelmet } from '../../contexts/HelmetContext';

export const PostPage = () => {
  const {
    data: { post },
  } = useMatch<LocationGenerics>();

  useSetHelmet({
    title: post ? `${post.user.name} さんのつぶやき` : undefined,
  });

  if (!post) return null;

  return <PostPageItem post={post} />;
};
