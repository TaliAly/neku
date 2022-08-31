import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"

// Components

import DeadEnd from "../components/DeadEnd"
const Library = dynamic(() => import("../components/library"))
import Layout from "../components/layout"
import Head from "next/head"
import SearchBar from "../components/searchBar"


function Search({ data }:any ) {

    const [getData, setGetData] = useState(data.data);

    const {query} = useRouter()
    const router = useRouter()

    useEffect( () => {
        setGetData(data.data)
        
    }, [data])

    return (
        <div>
            <Head>
                <title>Search "{query.search}"</title>
                {/* <meta name="description" content={`Buscaste por ${query.search?.toString()}!`} /> */}
            </Head>

            <Layout>
                <SearchBar />

                {
                    (getData.length != 0)
                    &&
                    <>
                        <h2>Found something!</h2>
                        <Library data={getData} />
                    </>
                }

                <DeadEnd />
            </Layout>
        </div>
    )
}

export default Search

export const getServerSideProps: GetServerSideProps = async context => {

    const options = {
        method: "GET",
    }

    const req = await fetch(`https://api.jikan.moe/v4/manga?q=${context.query.search}&order_by=rank&type=manga`, options);
    const data = await req.json();

    return {
        props: {
            data: data
        }
    }
}