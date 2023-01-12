import "../styles/scss/style.scss";
import "../styles/progressbar.css";
import type { AppProps } from "next/app";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://9writers.com/tag/tag.js" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
