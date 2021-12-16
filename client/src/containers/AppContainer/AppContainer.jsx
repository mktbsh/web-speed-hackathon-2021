import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';

import { fetchJSON } from '../../utils/fetchers';

const AuthModalContainer = lazy(() => import('../AuthModalContainer').then((m) => ({ default: m.AuthModalContainer })));
const NewPostModalContainer = lazy(() =>
  import('../NewPostModalContainer').then((m) => ({ default: m.NewPostModalContainer })),
);

const NotFoundContainer = lazy(() =>
  import('../NotFoundContainer').then((module) => ({ default: module.NotFoundContainer })),
);
const PostContainer = lazy(() => import('../PostContainer').then((m) => ({ default: m.PostContainer })));
const TermContainer = lazy(() => import('../TermContainer').then((m) => ({ default: m.TermContainer })));
const TimelineContainer = lazy(() => import('../TimelineContainer').then((m) => ({ default: m.TimelineContainer })));
const UserProfileContainer = lazy(() =>
  import('../UserProfileContainer').then((m) => ({ default: m.UserProfileContainer })),
);

/** @type {React.VFC} */
const AppContainer = () => {
  const [activeUser, setActiveUser] = React.useState(null);
  const { data, isLoading } = useQuery('/api/v1/me', () => fetchJSON('/api/v1/me'));

  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  if (isLoading) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    );
  }

  return (
    <Suspense
      fallback={
        <Helmet>
          <title>読込中 - CAwitter</title>
        </Helmet>
      }
    >
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Routes>
          <Route element={<TimelineContainer />} path="/" />
          <Route element={<UserProfileContainer />} path="/users/:username" />
          <Route element={<PostContainer />} path="/posts/:postId" />
          <Route element={<TermContainer />} path="/terms" />
          <Route element={<NotFoundContainer />} path="*" />
        </Routes>
      </AppPage>

      {modalType === 'auth' && (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      )}
      {modalType === 'post' && <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} />}
    </Suspense>
  );
};

export { AppContainer };
