import '../styles/globals.css'
import "../styles/normalize.css"
import Head from 'next/head'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return ( <Component {...pageProps} /> )
}

export default MyApp
