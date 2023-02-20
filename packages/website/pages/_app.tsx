import "../styles/scss/style.scss";
import "../styles/progressbar.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Heebo } from '@next/font/google'

const heebo = Heebo({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://app.9writers.com/tag/tag.js" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
