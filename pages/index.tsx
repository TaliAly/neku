import type { NextPage } from 'next'
import Head from 'next/head'
import style from "./../styles/index.module.scss"
import { GetStaticProps } from 'next'

import Layout from '../components/layout'
import { AiFillCaretRight } from "react-icons/ai"
import Link from "next/link"
import SearchBarBig from '../components/searchBar/searchBarBig'
import Library from '../components/library'
import CarouselReact from '../components/CarouselReact'

const Index: NextPage = ({ top, book }: any) => {

    return (
        <div>
            <Head>
                <title>Neku | Home </title>
            </Head>

            <Layout>

                <div className={style.home}>
                    <SearchBarBig />




                    <div className={style.hold}>

                        <CarouselReact data={top.data} />


                        <div className={style.hold_margin}>
                            <Library data={book.data} />
                        </div>


                    </div>

                    <div className={style.more}>
                        <h4>Quieres ver más?</h4>
                        <Link href="/mangas"><a>Entra aquí <AiFillCaretRight /></a></Link>
                    </div>

                </div>

            </Layout>


        </div>
    )
}


export const getStaticProps: GetStaticProps = async () => {

    const topRes = await fetch('https://api.jikan.moe/v4/top/manga?limit=6')
    const top = await topRes.json();

    const bookRes = await fetch("https://api.jikan.moe/v4/manga?order_by=popularity")
    const book = await bookRes.json()

    return { props: { top, book }, revalidate: 86400 }
}

export default Index
