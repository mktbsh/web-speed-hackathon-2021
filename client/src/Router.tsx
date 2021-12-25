import { Route, ReactLocation, MakeGenerics } from 'react-location';
import { ReactLocationSimpleCache } from 'react-location-simple-cache';
import { NotFoundPage } from './pages/NotFound';
import { Post } from './types';

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    terms: string;
    post: Post;
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
    path: 'posts',
    children: [
      {
        path: ':postId',
        import: () => import('./pages/Post/Post.module').then((m) => m.PostModule),
      },
    ],
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
