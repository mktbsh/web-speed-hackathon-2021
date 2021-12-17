import { useSetHelmet } from '../contexts/HelmetContext';

export const HomePage = () => {
  useSetHelmet({ title: 'タイムライン' });
  return <div>Home</div>;
};
