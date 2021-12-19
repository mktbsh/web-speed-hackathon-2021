import { Route } from 'react-location';
import { ReactQueryKeys } from '../../configs/ReactQueryKeys';
import { AspidaClient } from '../../lib/AspidaClient';
import { queryClient } from '../../providers/AppProvider';

import { LocationGenerics } from '../../Router';

const fetcher = async ({ pageParam = 1 }) =>
  await AspidaClient.api.v1.posts.$get({
    query: {
      page: pageParam,
    },
  });

export const HomeModule: Route<LocationGenerics> = {
  loader: () =>
    queryClient.getQueryData(ReactQueryKeys.posts) ??
    queryClient
      .fetchInfiniteQuery(ReactQueryKeys.posts, fetcher, { getNextPageParam: (lastPage) => lastPage.nextPage ?? false })
      .then(() => ({})),
  element: () => import('./Home.page').then((m) => <m.HomePage />),
};
