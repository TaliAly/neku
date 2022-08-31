import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Head from "next/head";
import DeadEnd from "../../components/DeadEnd"
import { useEffect, useState } from "react";
import Book from "../../components/library/Book";


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
        mal_id:string,
        name:string
    }[]
}


export async function getServerSideProps(context: any) {

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
    console.log(data)

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
                        <meta name="description" content={BookInfo.background} />
                        <meta property="og:image" content={BookInfo.images.webp.image_url} />
                        <meta property="og:title" content={BookInfo.title} />
                    </Head>

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