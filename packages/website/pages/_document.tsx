import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Heebo:400,500,700|Fira+Sans:600&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script defer src="https://9writers.com/tag/tag.js" />
        { //@ts-ignore
        <div id="fairlytics-id-ajcu6jd9k7ysd6" fairlyticskey="5d3ebce9f116a5b68efab2f0d4d69a56" />
        }
      </body>
    </Html>
  )
}

    
