import "../styles/globals.css";
import Head from "next/head";

function App({ Component, pageProps }) {
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

export default App;
