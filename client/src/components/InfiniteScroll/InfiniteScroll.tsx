import React from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';

import { InfiniteResponse } from '../../types';

type FetcherOption = {
  pageParam?: number;
};

type Props<T> = {
  queryKey: string;
  fetcher: (options: FetcherOption) => Promise<InfiniteResponse<T>>;
  renderItem: (item: T) => React.ReactNode;
  withLoader: JSX.Element;
  withError: JSX.Element;
};

export const InfiniteScroll = <T,>({ queryKey, fetcher, renderItem, withLoader, withError }: Props<T>) => {
  const { data, fetchNextPage, isLoading, isError, hasNextPage } = useInfiniteQuery<InfiniteResponse<T>>(
    queryKey,
    fetcher,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    },
  );

  const items = React.useMemo(() => {
    return data?.pages.map((page) => page.items).flat();
  }, [data?.pages]);

  if (isLoading) return withLoader;

  if (isError) return withError;

  return (
    <InfiniteScroller
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<React.Fragment key={`inifinite-scroll-${queryKey}-loader`}>{withLoader}</React.Fragment>}
    >
      {items && items.map((item) => renderItem(item))}
    </InfiniteScroller>
  );
};
