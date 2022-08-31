
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
                <meta charSet="utf-8" className="next-head" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="author" content="Neku Team" />
                <meta name="title" content="Neku" />
                <meta
                    name="description"
                    content="Neku Manga es un lector de manga enfocado en la simplicidad y darte una buena calidad mientras lees lo que a ti más te gusta"
                />


                <meta name="og:title" content="Neku" />
                <meta name="og:url" content="https://neku-ne0rbz5ek-talialy.vercel.app/" />
                <meta name="og:site_name" content="Neku" />
                <meta
                    name="og:description"
                    content="Neku Manga es un lector de manga enfocado en la simplicidad y darte una buena calidad mientras lees lo que a ti más te gusta"
                />
                <meta name="keywords" content="Manga, Reader, Neku, Manga Reader" />
                <meta property="og:image" content="https://i.imgur.com/vI4DCKd.png" />
                <meta property="og:image:width" content="500" />
                <meta property="og:image:height" content="500" />
            </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
