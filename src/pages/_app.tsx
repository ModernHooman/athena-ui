import '@/styles/tailwind.css';
import { NextIntlProvider } from 'next-intl';
import type {AppProps} from 'next/app';
import Head from 'next/head';

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
      </Head>

      <NextIntlProvider messages={pageProps.messages}>
        <Component {...pageProps} />
      </NextIntlProvider>
    </>
  );
}
