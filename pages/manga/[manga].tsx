import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Head from "next/head";
import DeadEnd from "../../components/DeadEnd"
import { useEffect, useState } from "react";
import Book from "../../components/library/Book";


export async function getServerSideProps(context: any) {

    const { manga } = context.query;
    const search = manga.toLowerCase().replaceAll(" ", "-").replaceAll(/\'|’/g, "")

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${process.env.manga_scrapper_key}`,
            'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
        }
    };
    const res = await fetch(`https://manga-scrapper.p.rapidapi.com/fetch/manga/asura/${search}`, options)
    const data = await res.json()
    return { props: { data } }

}


function Manga({ data }: any) {

    const [getData, setGetData] = useState(false);
    const BookInfo = data.data

    useEffect(() => {
        if (data.status == 200) {
            setGetData(true);
        }
    }, [])

    const router = useRouter()
    const { manga } = router.query

    return (
        <Layout>
            <Head>
                <title>Neku | {manga}</title>
                <meta name="description" content={BookInfo.MangaSynopsis} />
                <meta property="og:image" content={BookInfo.MangaCover} />
                <meta property="og:title" content={BookInfo.MangaTitle} />
            </Head>

            {!getData ? <DeadEnd /> : <Book
                MangaCover={BookInfo.MangaCover}
                MangaSynopsis={BookInfo.MangaSynopsis}
                MangaTitle={BookInfo.MangaTitle} />
            }

        </Layout>
    )
}

export default Manga