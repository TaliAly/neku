import type { NextPage } from 'next'
import Head from 'next/head'
import style from "./../styles/index.module.scss"
import { GetStaticProps } from 'next'

import Layout from '../components/Layout'
import { AiFillCaretRight } from "react-icons/ai"
import Link from "next/link"
import Library from '../components/library'
import CarouselReact from '../components/CarouselReact'
import SearchBarBig from '../components/searchBar/searchBarBig'
import useResponsive from '../components/useResponsive'

const Index: NextPage = ({ top, book, info }: any) => {

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
                            <Library data={info.data} type="info" />

                            <h3>Popular</h3>
                            <Library data={book.data} />
                        </div>


                    </div>

                    <div className={style.more}>
                        <h4>Want to see more?</h4>
                        <Link href="/mangas"><a>Go to mangas <AiFillCaretRight /></a></Link>
                    </div>

                </div>

            </Layout>


        </div>
    )
}


export const getStaticProps: GetStaticProps = async () => {

    const topRes = await fetch('https://api.jikan.moe/v4/top/manga?limit=6')
    const top = await topRes.json();

    const infoRes = await fetch("https://api.jikan.moe/v4/manga?order_by=score&limit=6&sfw=true")
    const info = await infoRes.json()

    const bookRes = await fetch("https://api.jikan.moe/v4/manga?order_by=popularity")
    const book = await bookRes.json()

    return { props: { top, book, info }, revalidate: 86400 }
}

export default Index
