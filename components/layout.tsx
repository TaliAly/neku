
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
            </Head>

            <Nav />
            
            <main className={style.layout}>
                {children}
            </main>
        </>
    )
}

export default Layout