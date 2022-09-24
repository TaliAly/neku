import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import useResponsive from "../components/useResponsive"

// Components

import DeadEnd from "../components/deadEnd"
const Library = dynamic(() => import("../components/library"))
import Layout from "../components/layout"
import Head from "next/head"
import SearchBar from "../components/searchBar"


function Search({ data }: any) {

    const [getData, setGetData] = useState(data.data);
    const { query } = useRouter();
    const { responsive } = useResponsive()


    useEffect(() => {
        setGetData(data.data)

    }, [data])

    return (
        <div>
            <Head>
                <title>Buscar {`${query.search}`}</title>
                <meta
                    name="og:description"
                    content={`Buscaste por ${query.search?.toString()}!`}
                />
                <meta name="og:title" content={`Buscando...`} />
                <meta name="og:url" content="https://neku-murex.vercel.app/" />
                <meta name="og:site_name" content="Neku" />
                <meta property="og:image" content="https://i.imgur.com/vI4DCKd.png" />
                <meta property="og:image:width" content="500" />
                <meta property="og:image:height" content="500" />
            </Head>

            <Layout>

                {
                    !responsive && <SearchBar />
                }

                {
                    (getData.length != 0)
                        ?
                        <>
                            <h2>Se encontró algo!</h2>
                            <Library data={getData} />
                            <DeadEnd />

                        </>
                        :
                        <>
                            <h2>Comienza a buscar!</h2>
                        </>
                }

            </Layout>
        </div>
    )
}

export default Search

export const getServerSideProps: GetServerSideProps = async context => {

    const options = {
        method: "GET",
    }
    const search = context.query.search?.toString().replaceAll(" ", "+")

    const req = await fetch(`https://api.jikan.moe/v4/manga?q=${search}&order_by=popularity&type=manga&sfw=true`, options);
    const data = await req.json();

    return {
        props: {
            data: data
        }
    }
}