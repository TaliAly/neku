import { GetServerSideProps } from "next"
import { PropsData } from "../../components/Type"
import dynamic from "next/dynamic"

// Components
import Head from "next/head"
import DeadEnd from "../../components/deadEnd"
import Layout from "../../components/Layout"
const Book = dynamic(() => import("../../components/library/Book"))
import style from "./../../styles/manga.module.scss"

function Manga({ data }: PropsData) {

    const {
        genres,
        images,
        status,
        synopsis,
        title,
        volumes,
        title_japanese,
        chapters,
        rank,
        score } = data.data;


    return (
        <Layout>

            <div className={style.manga}>

                {
                    <>
                        <Head>
                            <title>Neku | {title}</title>

                            <meta name="og:title" content={`Neku | ${title}`} />
                            <meta name="og:url" content="https://neku-murex.vercel.app/" />
                            <meta name="og:site_name" content="Neku" />
                            <meta
                                name="og:description"
                                content={synopsis}
                            />
                            <meta property="og:image" content={images.webp.image_url} />
                            <meta property="og:image:width" content="500" />
                            <meta property="og:image:height" content="500" />

                        </Head>

                        <Book
                            mal_id={""}
                            title={title}
                            title_japanese={title_japanese}
                            synopsis={synopsis}
                            cover={images.webp.image_url}
                            genres={genres}
                            chapters={chapters}
                            status={status}
                            background={""}
                            volumes={volumes}
                            score={score}
                            rank={rank}
                            images={{
                                webp: {
                                    image_url: "",
                                    small_image_url: "",
                                    large_image_url: ""
                                }
                            }}

                        />
                    </>
                    || <DeadEnd />
                }

            </div>

        </Layout>
    )
}

export default Manga

export const getServerSideProps: GetServerSideProps = async context => {

    const { manga } = context.query;

    const res = await fetch(`https://api.jikan.moe/v4/manga/${manga}/full`)
    const data = await res.json()

    return { props: { data } }

}
