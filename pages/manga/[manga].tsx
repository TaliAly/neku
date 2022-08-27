import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Head from "next/head";
import DeadEnd from "../../components/DeadEnd"
import { useState } from "react";


export async function getServerSideProps(context:any) {

    const { id } = context.query;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bdff903274msh4d7467043c52ac6p1d8499jsn877c34ee4d56',
            'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
        }
    };
    const res = await fetch(`https://manga-scrapper.p.rapidapi.com/fetch/manga/asura/${id}`, options)
    const data = await res.json()
    return { props: { data } }
}

function Manga({data}:any) {

    const [getData, setGetData] = useState(false)

    if (data.status == 200) {
        setGetData(true);
    }

    const router = useRouter()
    const { manga } = router.query

    return (
        <Layout>
            <Head>
                <title>Neku | {manga}</title>
            </Head>
            <h3> Cosa: {manga}</h3>

            {!getData && <DeadEnd />}

        </Layout>
    )
}

export default Manga