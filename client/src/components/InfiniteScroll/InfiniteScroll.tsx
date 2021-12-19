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

export const InfiniteScrollV2 = <T,>({ queryKey, fetcher, renderItem, withLoader, withError }: Props<T>) => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery<InfiniteResponse<T>>(queryKey, fetcher, {
    getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
  });

  const loadMore = React.useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: loadMore,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const chunks = useMemo(() => {
    if (!data) return;
    const a = data.pages.map((page) => page.items).flat();
    const b = a.splice(-3);
    return {
      a: [...a],
      b: [...b],
    };
  }, [data]);

  return (
    <div>
      {status === 'loading' ? (
        <React.Fragment key={`inifinite-scroll-${queryKey}-loading`}>{withLoader}</React.Fragment>
      ) : status === 'error' ? (
        <React.Fragment key={`inifinite-scroll-${queryKey}-error`}>{withError}</React.Fragment>
      ) : (
        <div>
          {chunks && chunks.a.map((item) => renderItem(item))}
          <div ref={loadMore} key={`inifinite-scroll-${queryKey}-loadmore`} className="h-1" />
          {chunks && chunks.b.map((item) => renderItem(item))}
        </div>
      )}
    </div>
  );
};
