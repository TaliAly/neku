import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { PropsData } from "../../components/Type";

// Components
import Head from "next/head";
import DeadEnd from "../../components/deadEnd";
import Layout from "../../components/layout";
import Book from "../../components/library/Book";
import { BookInfo } from "../../components/Type";


export const getServerSideProps: GetServerSideProps = async context => {

    const { manga } = context.query;
    const options = {
        method: 'GET',
    };

    const res = await fetch(`https://api.jikan.moe/v4/manga/${manga}`, options)
    const data = await res.json()

    return { props: { data } }

}


function Manga({ data }: PropsData) {

    const [getData, setGetData] = useState(false);
    const BookInfo: BookInfo = data.data;    

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

                    <Book
                        cover={BookInfo.images.webp.image_url}
                        synopsis={BookInfo.synopsis}
                        title={BookInfo.title}
                        genres={BookInfo.genres}
                    />
                </>
            }

        </Layout>
    )
}

export default Manga