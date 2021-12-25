import { useSetHelmet } from '../../contexts/HelmetContext';
import { AspidaClient } from '../../lib/AspidaClient';
import { User } from '../../types';
import { InfiniteScroll } from '../InfiniteScroll';
import { PostsLoader } from '../Loader';
import { TimelineItem } from '../Timeline/TimelineItem';
import { UserProfileHeader } from './UserProfileHeader';

type Props = {
  user: User;
};

export const UserProfilePageItem = ({ user }: Props) => {
  useSetHelmet({
    title: `${user.name} さんのタイムライン`,
  });

  const key = AspidaClient.api.v1.users._username(user.username).posts.$path();

  const fetcher = async ({ pageParam = 1 }) =>
    await AspidaClient.api.v1.users._username(user.username).posts.$get({
      query: {
        page: pageParam,
      },
    });

  return (
    <>
      <UserProfileHeader user={user} />
      <div className="mt-6 border-t border-gray-300">
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
      </div>
    </>
  );
};
