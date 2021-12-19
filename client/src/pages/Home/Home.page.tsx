import { InfiniteScroll } from '../../components/InfiniteScroll';
import { TimelineItem, TimeLineLoader } from '../../components/Timeline';
import { useSetHelmet } from '../../contexts/HelmetContext';
import { AspidaClient } from '../../lib/AspidaClient';

const key = 'posts-timeline-inifinite';

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
      withLoader={<TimeLineLoader />}
      withError={<p>There was an error</p>}
    />
  );
};
