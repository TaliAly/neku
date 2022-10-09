import '../styles/globals.scss'
import "../styles/normalize.css"
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress


import type { AppProps } from 'next/app'
import { useEffect } from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    //Binding events. 
    NProgress.configure({ showSpinner: false });
    Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());
  }, [])

  return (<Component {...pageProps} />)
}
export default MyApp
