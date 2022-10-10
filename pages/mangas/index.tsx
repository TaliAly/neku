import Layout from "../../components/layout";
import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import style from "./index.module.scss"
import Library from "../../components/library";
import { NextPage } from "next";


const Mangas: NextPage = ({ resMangas, resGenres }: any) => {
    const manga = resMangas.data
    const genres = resGenres.data


    return (
        <Layout>

            <Head>
                <title>Neku Genres</title>
            </Head>

            <div className={style.genres}>
                <h2>Mangas para ver</h2>

                <div className={style.content}>
                    {/* (Router.isFallback || Router.isReady) */}

                    {(resMangas && resGenres) &&
                        <>
                            <Library data={manga} />

                            <div>
                                <h3>Generos</h3>
                                <div className={style.holder}>
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
                        </>
                    }

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


export const getStaticProps: GetStaticProps = async () => {

        const [getGenres, getMangas] = await Promise.all([
            fetch("https://api.jikan.moe/v4/genres/manga"), 
            fetch(`https://api.jikan.moe/v4/manga`)
            ]);
        const [resGenres, resMangas] = await Promise.all([
            getGenres.json(), 
            getMangas.json()
  ]);

    return {
        props: {
            resGenres,
            resMangas
        }
    }

}
