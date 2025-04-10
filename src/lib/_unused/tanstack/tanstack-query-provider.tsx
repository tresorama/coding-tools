/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient({
  // @see https://tanstack.com/query/v5/docs/framework/react/guides/important-defaults
  // defaultOptions: {
  //   queries: {
  //     retry: false,
  //     refetchOnMount: true,
  //     refetchOnReconnect: true,
  //     refetchOnWindowFocus: false,
  //   },
  //   mutations: {
  //     retry: false
  //   }
  // },
});


export const TanstackQueryProvider = ({ children }: { children: React.ReactNode; }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};