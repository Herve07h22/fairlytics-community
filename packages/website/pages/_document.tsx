import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        { //@ts-ignore
        <div id="fairlytics-id-ajcu6jd9k7ysd6" data-fairlyticskey={process.env.NEXT_PUBLIC_FAIRLYTICS_KEY} />
        }
      </body>
    </Html>
  )
}

    
