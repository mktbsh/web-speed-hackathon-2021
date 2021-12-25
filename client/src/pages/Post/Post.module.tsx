import { Route } from 'react-location';
import { AspidaClient } from '../../lib/AspidaClient';

import { LocationGenerics, routeCache } from '../../Router';

export const PostModule: Route<LocationGenerics> = {
  loader: routeCache.createLoader(
    async ({ params: { postId } }) => {
      return {
        post: await AspidaClient.api.v1.posts._id(postId).$get(),
      };
    },
    {
      policy: 'cache-and-network',
    },
  ),
  element: () => import('./Post.page').then((m) => <m.PostPage />),
};
