import { AppPage } from './components/AppPage';
import { Outlet, useRouter } from 'react-location';
import { useEffect } from 'react';

function App() {
  const { state } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.location.pathname]);

  return (
    <AppPage>
      <Outlet />
    </AppPage>
  );
}

export default App;
