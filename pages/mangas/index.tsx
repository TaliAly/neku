import { GetServerSideProps, GetStaticProps } from "next";
import style from "./index.module.scss"
import { useRouter } from "next/router";
import { BookInfo } from "../../components/Type";

import Layout from "../../components/Layout";
import Library from "../../components/library";
import Pagination from "../../components/paginations";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";




interface Data {
    data: BookInfo,
    status: number,

    pagination: {
        last_visible_page: number,
        has_next_page?: boolean,
        current_page: number,
        items: {
            "count": number,
            "total": number,
            "per_page"?: number
        },
    },
}

interface Props {
    resMangas: Data,
    resGenres: Data
}


const Mangas = ({ resMangas, resGenres }: Props) => {
    const [data, setData] = useState(resMangas)

    const manga = data.data
    const mangaPag = data.pagination
    const genres: any = resGenres.data
    const Router = useRouter()

    useEffect(() => {
        setData(resMangas)
    }, [resMangas])


    return (
        <Layout>

            <Head>
                <title>Neku | Genres</title>
            </Head>

            <div className={style.mangas}>

                <div className={style.mangas_grid}>

                    <div className={style.sticky}>
                        <div>
                            <div className={style.genres_holder}>
                                <h3>genres</h3>
                                {
                                    genres?.map((target: any) => {
                                        return <p key={target.mal_id}>
                                            <Link href={`/mangas/genres/${target.mal_id}`}><a>{target.name}</a></Link>
                                            <br />
                                        </p>
                                    })
                                }
                            </div>
                        </div>
                    </div>



                    <div>
                        <Library data={manga} />
                        <Pagination
                            items={mangaPag.items}
                            current_page={mangaPag.current_page}
                            last_visible_page={mangaPag.last_visible_page}
                            path={`${Router.pathname}`}
                            page={`${Router.query?.page}`} />
                    </div>

                </div>

                <div className={style.menu}>
                    { /* Holder of links :D */}
                    <Link href="/mangas/a-z"><a>a-z</a></Link>
                    <Link href="/mangas/random"><a>random</a></Link>
                    <Link href="/mangas/completos"><a>Completos</a></Link>

                </div>

            </div>

        </Layout>
    )
}

export default Mangas


export const getServerSideProps: GetServerSideProps = async (context) => {

    let resMangas = {}
    const page = context.query?.page

    const resGenres = await fetch("https://api.jikan.moe/v4/genres/manga")
        .then(r => r.json())

    if (context.query?.page) {
        resMangas = await fetch(`https://api.jikan.moe/v4/manga?page=${page}`)
            .then(r => r.json())

        return {
            props: {
                resGenres,
                resMangas
            }
        }
    }
    resMangas = await fetch(`https://api.jikan.moe/v4/manga`)
        .then(r => r.json())

    return {
        props: {
            resGenres,
            resMangas
        }
    }

}
