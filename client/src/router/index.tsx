import { Route, ReactLocation } from 'react-location';
import { NotFoundPage } from '../pages/NotFound';
import { HomePage } from '../pages/Home';
import { TermsPage } from '../pages/Terms';

export const location = new ReactLocation();

export const routes: Route[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'terms',
    element: <TermsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
