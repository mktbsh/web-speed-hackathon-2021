import { Route, ReactLocation, MakeGenerics } from 'react-location';
import { ReactLocationSimpleCache } from 'react-location-simple-cache';
import { NotFoundPage } from './pages/NotFound';
import { HomePage } from './pages/Home/Home.page';

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
    element: <HomePage />,
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
