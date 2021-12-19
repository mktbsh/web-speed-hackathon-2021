import { Route } from 'react-location';
import { AspidaClient } from '../../lib/AspidaClient';
import { fetchTerms } from '../../lib/fetcher';

import { LocationGenerics, routeCache } from '../../Router';

export const TermsModule: Route<LocationGenerics> = {
  loader: routeCache.createLoader(
    async () => {
      return {
        terms: await (await AspidaClient.terms_json.$get()).rawHTML,
      };
    },
    {
      policy: 'cache-first',
    },
  ),
  element: () => import('./Terms.page').then((m) => <m.TermsPage />),
};
