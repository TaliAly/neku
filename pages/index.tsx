import Head from "next/head"

import Layout from "../components/layout"
import style from "../styles/index.module.scss"

import SearchBarBig from '../components/searchBar/searchBarBig'
import About from "../components/info"


function index() {
    return (
        <div>
            <Head>
                <title>Neku Manga</title>
            </Head>

            <Layout>
                <div className={style.landing}>
                    <SearchBarBig />
                    <About />
                </div>

            </Layout>
        </div>
    )
};

export default index