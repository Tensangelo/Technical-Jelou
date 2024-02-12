import "@/styles/globals.css";
import { useEffect, useMemo } from 'react';
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient, QueryKey  } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import Head from "next/head";
// Store
import store from "@/redux/store";
import { usePersistedReadingList } from "@/redux/features/countBooksSlice";
// Components
import Layout from '@/components/Layout'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  // const queryKey: QueryKey = useMemo(() => ['readingList'], []);
  // const readingList = usePersistedReadingList();

  // useEffect(() => {
  //     queryClient.setQueryData(queryKey, readingList);
  // }, [readingList, queryKey]);

  return (
    <>
      <Head>
          <title>Library jelou</title>
          <meta name="Test tecnico para jelou" content="Angelo Gaona Front End Developer" />
          <link rel="icon" href="/logo.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </QueryClientProvider>
    </>
  )
}
