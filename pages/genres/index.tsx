import Head from "next/head"
import {GetStaticProps } from 'next'
import Link from "next/link"

import Layout from "../../components/layout"

export const getStaticProps:GetStaticProps = async (context) => {

	const res = await fetch(`https://api.jikan.moe/v4/genres/manga`)
	const data = await res.json();

	return {
		props: {
			data,
		}
	}
}


// The real deal!

function genres({data}:any) {

	return (
		<Layout>

			<Head>
				<title>Neku | Genres</title>
			</Head>

            <h1>Hello!</h1>

            { data.data.map( ({mal_id, name}:any) => {
                return <p key={mal_id}><Link href={`/genres/${mal_id}`}><a>{name}</a></Link></p>
            }
            )}

		</Layout>
	)
}

export default genres