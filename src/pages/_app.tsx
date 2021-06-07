import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/globals.css";

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="darkreader" content="c82bcfa1-32b6-4785-b0ae-7e0ff52ae217" />
        <title>sylo.digital</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
