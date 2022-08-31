import '../styles/globals.css'
import "../styles/normalize.css"
import Head from 'next/head'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/neku.ico" type="image/x-icon" />
        <meta charSet="utf-8" className="next-head" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Neku Devs" />
        <meta property="og:image" content="/neku.ico" />
        <meta property="og:title" content="Neku Manga" />
      </Head>


      <Component {...pageProps} />
    </>
  )
}

export default MyApp
