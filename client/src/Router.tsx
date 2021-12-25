import { Route, ReactLocation, MakeGenerics } from 'react-location';
import { ReactLocationSimpleCache } from 'react-location-simple-cache';
import { NotFoundPage } from './pages/NotFound';
import { Post, User } from './types';

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    terms: string;
    post: Post;
    user: User;
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
    path: 'users',
    children: [
      {
        path: ':username',
        import: () => import('./pages/UserProfile/UserProfile.module').then((m) => m.UserProfileModule),
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
