import { AppPage } from './components/AppPage';
import { Outlet } from 'react-location';

function App() {
  return (
    <AppPage>
      <Outlet />
    </AppPage>
  );
}

export default App;
