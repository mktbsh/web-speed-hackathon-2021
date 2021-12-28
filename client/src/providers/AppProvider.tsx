import { QueryClient, QueryClientProvider } from 'react-query';

import { HelmetStateProvider } from '../contexts/HelmetContext';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetStateProvider>{children}</HelmetStateProvider>
    </QueryClientProvider>
  );
};
