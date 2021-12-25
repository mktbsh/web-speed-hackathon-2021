import { Route } from 'react-location';
import { AspidaClient } from '../../lib/AspidaClient';

import { LocationGenerics, routeCache } from '../../Router';

export const UserProfileModule: Route<LocationGenerics> = {
  loader: routeCache.createLoader(
    async ({ params: { username } }) => {
      return {
        user: await AspidaClient.api.v1.users._username(username).$get(),
      };
    },
    {
      policy: 'cache-and-network',
    },
  ),
  element: () => import('./UserProfile.page').then((m) => <m.UserProfilePage />),
};
