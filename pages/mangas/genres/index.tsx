import Layout from "../../../components/layout";
import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import style from "./index.module.scss"
import Library from "../../../components/library";

export const getStaticProps: GetStaticProps = async () => {

    const getGenres = await fetch("https://api.jikan.moe/v4/genres/manga")
        .then(res => res.json());

    const getMangas = await fetch("https://api.jikan.moe/v4/manga")
        .then(res => res.json())

    return {
        props: {
            getGenres,
            getMangas
        }
    }

}

function GenresGroup({ getMangas, getGenres }: any) {

    return (
        <Layout>

            <Head>
                <title>Neku Genres</title>
            </Head>

            <div className={style.genres}>
                <h2>Mangas para ver</h2>

                <div>

                    <Library data={getMangas.data} />

                    <div className={style.holder}>
                        {
                            getGenres.data.map((target: any) => {
                                return <p key={target.mal_id}>
                                    <Link href={`/genres/${target.mal_id}`}><a>{target.name}</a></Link>
                                    <br />
                                </p>
                            })
                        }
                    </div>

                </div>

                <div>
                    { /* Holder of links :D */}

                    <Link href="/mangas/a-z"><a>a-z</a></Link>
                    <Link href="/mangas/random"><a>random</a></Link>
                    <Link href="/mangas/completos"><a>Completos</a></Link>
                </div>

            </div>

        </Layout>
    )
}

export default GenresGroup

