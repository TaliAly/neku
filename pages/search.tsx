import { Router, useRouter } from "next/router"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import useResponsive from "../components/useResponsive"

// Components

const Library = dynamic(() => import("../components/library"))
import Layout from "../components/layout"
import Head from "next/head"
import SearchBar from "../components/searchBar"
import Pagination from "../components/paginations"
import { PropsData } from "../components/Type"


function Search({ data }: PropsData) {

    const [getData, setGetData] = useState(data);
    const Router = useRouter();
    const { responsive } = useResponsive();
    const fetchData = data.pagination;
    const query: any = Router.query

    // console.log(getData)


    useEffect(() => {
        setGetData(data)

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
                    responsive && <SearchBar />
                }

                {
                    (!!query?.search)
                        ?
                        <>
                            <h2>Buscaste por: {query?.search}</h2>
                            <Library data={getData.data} />

                            {
                                (fetchData?.last_visible_page >= 2)
                                &&
                                <Pagination
                                    items={fetchData?.items}
                                    current_page={fetchData?.current_page}
                                    path={`${Router.pathname}?search=${query.search}`}
                                    page={`${query?.page}`}
                                    last_visible_page={fetchData?.last_visible_page}
                                />
                            }
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
    let data = {}
    let page = context.query.page


    if (!!page) {
        data = await fetch(`https://api.jikan.moe/v4/manga?q=${search}&order_by=popularity&type=manga&sfw=true&page=${page}`, options).then(r => r.json())
    } else {
        data = await fetch(`https://api.jikan.moe/v4/manga?q=${search}&order_by=popularity&type=manga&sfw=true`, options).then(r => r.json())
    }

    return {
        props: {
            data: data
        }
    }
}