import { InfiniteScroll } from '../components/InfiniteScroll/InfiniteScroll';
import { useSetHelmet } from '../contexts/HelmetContext';

export const HomePage = () => {
  useSetHelmet({ title: 'タイムライン' });
  return <div></div>;
};
