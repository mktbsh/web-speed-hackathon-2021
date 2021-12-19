import { Route, ReactLocation, MakeGenerics } from 'react-location';
import { ReactLocationSimpleCache } from 'react-location-simple-cache';
import { NotFoundPage } from './pages/NotFound';

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    terms: string;
  };
}>;

export const location = new ReactLocation();

export const routeCache = new ReactLocationSimpleCache();

export const routes: Route[] = [
  {
    path: '/',
    import: () => import('./pages/Home/Home.module').then((m) => m.HomeModule),
  },
  {
    path: 'terms',
    import: () => import('./pages/Terms/Terms.module').then((m) => m.TermsModule),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
