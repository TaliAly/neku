import { useRouter } from "next/router"
import Head from "next/head"
import { GetStaticPaths, GetStaticProps } from 'next'

import Layout from "../../components/layout"
import Library from "../../components/library"

export const getStaticPaths: GetStaticPaths = async () => {

	const res = await fetch(`https://api.jikan.moe/v4/genres/manga`);
	const data = await res.json();


	console.table(data)

	const paths = data.data.map( ( {name, mal_id} ) => {
		return {
			params: { genres: `${name}`, id: mal_id },
		}
	})
	console.table(paths);

	return {
		paths, fallback:false
	}
}

export const getStaticProps:GetStaticProps = async (context) => {

	const res = await fetch(`https://api.jikan.moe/v4/manga?genres=${context.params?.mal_id}`)
	const data = await res.json();

	return {
		props: {
			data,
		}
	}
}


// The real deal!

function genres({data}:any) {

	const router = useRouter();
	const { genres } = router.query;
	console.log(data)

	return (
		<Layout>

			<Head>
				<title>Neku | {genres}</title>
			</Head>

			<h1>Hello! </h1>
			<Library data={data.data}></Library>

		</Layout>
	)
}

export default genres