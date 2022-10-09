import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { PropsData } from "../../components/Type";

// Components
import Head from "next/head";
import DeadEnd from "../../components/deadEnd";
import Layout from "../../components/layout";
import Book from "../../components/library/Book";
import style from "./../../styles/manga.module.scss"


export const getServerSideProps: GetServerSideProps = async context => {

    const { manga } = context.query;
    const options = {
        method: 'GET',
    };

    const res = await fetch(`https://api.jikan.moe/v4/manga/${manga}/full`, options)
    const data = await res.json()

    return { props: { data } }

}


function Manga({ data }: PropsData) {

    const {
        chapters,
        genres,
        images,
        mal_id,
        status,
        synopsis,
        title,
        volumes,
        title_japanese } = data.data;

    return (
        <Layout>

            <div className={style.manga}>

                {!!data.data ?
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
                                    small_image_url: ""
                                }
                            }}
                            volumes={volumes} />
                    </>
                    : <DeadEnd />
                }

            </div>

        </Layout>
    )
}

export default Manga