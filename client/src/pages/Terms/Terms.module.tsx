import { Route } from 'react-location';
import { fetchTerms } from '../../lib/fetcher';

import { LocationGenerics, routeCache } from '../../Router';

export const TermsModule: Route<LocationGenerics> = {
  loader: routeCache.createLoader(
    async () => {
      return {
        terms: await fetchTerms(),
      };
    },
    {
      policy: 'cache-first',
    },
  ),
  element: () => import('./Terms.page').then((m) => <m.TermsPage />),
};
