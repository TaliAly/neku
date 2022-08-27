import Head from "next/head"

import Layout from "../components/layout"
import style from "../styles/index.module.scss"

import SearchBar from "../components/searchBar"
import About from "../components/info"


function index() {
    return (
        <div>
            <Head>
                <title>Neku Manga</title>
                <link rel="shortcut icon" href="neku.ico" type="image/x-icon" />
                <meta charSet="utf-8" className="next-head" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="author" content="Neku Devs" />
            </Head>

            <Layout>
                <div className={style.landing}>
                    <SearchBar />
                    <About />
                </div>

            </Layout>
        </div>
    )
};

export default index