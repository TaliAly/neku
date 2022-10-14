import { GetServerSideProps } from "next"
import Layout from "../components/Layout"
import { PropsData } from "../components/Type";

import Head from "next/head";
import DeadEnd from "../components/deadEnd"
import Book from "../components/library/Book";


export default function Random({ data }: PropsData) {
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
                        images={{
                            webp: {
                                image_url: "",
                                small_image_url: "",
                                large_image_url: ""
                            }
                        }}
                        volumes={volumes}
                        rank={rank}
                        score={score}
                    />
                </>
                || <DeadEnd />
            }
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    const resData = await fetch("https://api.jikan.moe/v4/random/manga")
    const data = await resData.json()


    return {
        props: {
            data
        }
    }
}