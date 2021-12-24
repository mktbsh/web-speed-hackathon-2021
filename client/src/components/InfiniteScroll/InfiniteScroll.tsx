import React from 'react';
import { useMemo } from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { useIntersectionObserver } from '../../hooks/useIntersection';

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

interface SectionProps {
  children: React.ReactNode;
}

const PageSection = React.memo(({ children }: SectionProps) => {
  return <section>{children}</section>;
});

export const InfiniteScroll = <T,>({ queryKey, fetcher, renderItem, withLoader, withError }: Props<T>) => {
  const { data, fetchNextPage, isLoading, isError, hasNextPage } = useInfiniteQuery<InfiniteResponse<T>>(
    queryKey,
    fetcher,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    },
  );

  if (isLoading) return withLoader;

  if (isError) return withError;

  return (
    <InfiniteScroller
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<React.Fragment key={`inifinite-scroll-${queryKey}-loader`}>{withLoader}</React.Fragment>}
    >
      {data &&
        data.pages.map((page) => (
          <PageSection key={`infinite-scroll-${queryKey}-page${page.currentPage}`}>
            {page.items.map((item) => renderItem(item))}
          </PageSection>
        ))}
    </InfiniteScroller>
  );
};
