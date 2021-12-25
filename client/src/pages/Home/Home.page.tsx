import { InfiniteScroll } from '../../components/InfiniteScroll';
import { PostsLoader } from '../../components/Loader';
import { TimelineItem } from '../../components/Timeline/TimelineItem';
import { ReactQueryKeys } from '../../configs/ReactQueryKeys';
import { useSetHelmet } from '../../contexts/HelmetContext';
import { AspidaClient } from '../../lib/AspidaClient';

const key = ReactQueryKeys.posts;

export const HomePage = () => {
  useSetHelmet({ title: 'タイムライン' });

  const fetcher = async ({ pageParam = 1 }) =>
    await AspidaClient.api.v1.posts.$get({
      query: {
        page: pageParam,
      },
    });

  return (
    <InfiniteScroll
      key={key}
      queryKey={key}
      fetcher={fetcher}
      renderItem={(item) => {
        return <TimelineItem key={`${key}-${item.id}`} post={item} />;
      }}
      withLoader={<PostsLoader />}
      withError={<p>There was an error</p>}
    />
  );
};
