import 'antd/dist/antd.css'
import '../styles/scss/style.scss'
import '../styles/progressbar.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
