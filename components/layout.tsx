
import Nav from "./nav"
import React from "react"
import Head from "next/head"
import style from "./layout.module.scss"

type Props = {
    children: React.ReactNode;
}

function Layout({ children }: Props) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/neku.ico" type="image/x-icon" />
                <meta charSet="utf-8" className="next-head" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="author" content="Neku Devs" />
                <meta name="description" content="Neku es un Manga reader enfocado en la simplicidad y facilidad para el usuario" />
                <meta property="og:image" content="/neku.ico" />
                <meta property="og:title" content="Neku Manga" />
            </Head>

            <Nav />
            
            <main className={style.layout}>
                {children}
            </main>
        </>
    )
}

export default Layout