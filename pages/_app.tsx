import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { theme } from '@chakra-ui/react';
import { GlobalResizableStyles } from '@/components/GlobalResizableStyles';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <GlobalResizableStyles />
        <Component {...pageProps} />
      </ChakraProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default MyApp;
