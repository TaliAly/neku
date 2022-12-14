import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

// Components
import Head from "next/head";
import DeadEnd from "../../components/DeadEnd"
import Layout from "../../components/layout";
import Book from "../../components/library/Book";
import SearchBar from "../../components/searchBar"


interface BookInfo {
    title: string,
    background: string,
    images: {
        webp: {
            image_url: string,
            small_image_url: string,
        }
    }
    synopsis: string,
    genres: {
        mal_id: string,
        name: string
    }[]
}


export const getServerSideProps: GetServerSideProps = async context => {

    const { manga } = context.query;
    const options = {
        method: 'GET',
    };

    const res = await fetch(`https://api.jikan.moe/v4/manga/${manga}`, options)
    const data = await res.json()
    return { props: { data } }

}


function Manga({ data }: any) {

    const [getData, setGetData] = useState(false);
    const BookInfo: BookInfo = data.data

    useEffect(() => {
        if (data.status != 404) {
            setGetData(true);
        }
    }, [])

    const router = useRouter()
    const { manga } = router.query

    return (
        <Layout>
            {!getData ? <DeadEnd /> :
                <>
                    <Head>
                        <title>Neku | {manga}</title>

                        <meta name="og:title" content={`Neku | ${manga}`} />
                        <meta name="og:url" content="https://neku-murex.vercel.app/" />
                        <meta name="og:site_name" content="Neku" />
                        <meta
                            name="og:description"
                            content={BookInfo.synopsis}
                        />
                        <meta property="og:image" content={BookInfo.images.webp.image_url} />
                        <meta property="og:image:width" content="500" />
                        <meta property="og:image:height" content="500" />

                    </Head>

                    <SearchBar />
                    <Book
                        MangaCover={BookInfo.images.webp.image_url}
                        MangaSynopsis={BookInfo.synopsis}
                        MangaTitle={BookInfo.title}
                        Genres={BookInfo.genres}
                    />
                </>
            }

        </Layout>
    )
}

export default Manga