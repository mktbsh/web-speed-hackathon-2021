import React from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';

import { InfiniteResponse, Post } from '../../types';

type PostsResponse = {
  posts: Post[];
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
};

type Props<T> = {
  queryKey: string;
  fetcher: () => Promise<InfiniteResponse<T>>;
  render: (item: T) => React.ReactNode;
};

export const InfiniteScroll = <T,>({ queryKey, fetcher, render }: Props<T>) => {
  const { data, fetchNextPage, isLoading, isError, hasNextPage } = useInfiniteQuery<InfiniteResponse<T>>(
    queryKey,
    fetcher,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    },
  );

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>There was an error</p>;

  const items = React.useMemo(() => {
    return data?.pages.map((page) => page.items).flat();
  }, [data]);

  return (
    <InfiniteScroller
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<div key={`infinite-scroll-${queryKey}-loader`}>Loading...</div>}
    >
      {items && items.map((item) => render(item))}
    </InfiniteScroller>
  );
};

// export const InfiniteScroll = <T,>() => {
//   const { data, fetchNextPage, isLoading, isError, hasNextPage } = useInfiniteQuery<InfiniteResponse<T>>(
//     '/v1/posts',
//     async ({ pageParam = 1 }) => await fetch(`/api/v1/posts?page=${pageParam}`).then((res) => res.json()),
//     {
//       getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
//     },
//   );

//   if (isLoading) return <p>Loading...</p>;

//   if (isError) return <p>There was an error</p>;

//   return (
//     <InfiniteScroller
//       loadMore={() => fetchNextPage()}
//       hasMore={hasNextPage}
//       loader={<div key="infinite-scroll-loader">Loading...</div>}
//     >
//       {data &&
//         data.pages.map((page) => (
//           <React.Fragment key={`page-number-${page.currentPage}`}>
//             {page.posts.map((post) => (
//               <div key={post.id}>
//                 <p>{post.id}</p>
//                 <p>{post.text}</p>
//                 <p>{post.createdAt}</p>
//               </div>
//             ))}
//           </React.Fragment>
//         ))}
//     </InfiniteScroller>
//   );
// };
