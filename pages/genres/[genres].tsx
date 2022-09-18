import { useRouter } from "next/router"
import Head from "next/head"
import { GetStaticPaths, GetStaticProps } from 'next'

import Layout from "../../components/layout"
import Book from "../../components/library/Book"


export const getStaticPaths: GetStaticPaths = async () => {

	const res = await fetch(`https://api.jikan.moe/v4/manga`)
	const data = await res.json();

	const paths = data.data.map(({ mal_id, name }:any) => {
		return {
			params: { genres: `${mal_id}`, name: `${name}` },
		}
	})

	return {
		paths, fallback:false
	}
}

export const getStaticProps:GetStaticProps = async (context) => {

	const res = await fetch(`https://api.jikan.moe/v4/manga?genres=${context.params.data}`)
	const data = await res.json();
	const names = context.params.name

	return {
		props: {
			data,
			names
		}
	}
}


// The real deal!

function genres({data, names}) {

	const router = useRouter();
	const { genres } = router.query;

	return (
		<Layout>

			<Head>
				<title>Neku | {names}</title>
			</Head>

			<h1>Hello! </h1>
			<p>Hello!</p>

		</Layout>
	)
}

export default genres