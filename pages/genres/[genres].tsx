import Head from "next/head"
import { GetStaticPaths, GetStaticProps } from 'next'
import { PropsData } from "../../components/Type";
import { useRouter } from "next/router";

import Layout from "../../components/layout";
import Library from "../../components/library";

interface Data {
	name: string,
	mal_id: number,
}

interface spp extends PropsData {
	title: string
}

type Title = boolean | string

// The real deal!

const Genres = ({ data }: spp) => {

	const Router = useRouter()

	if (!!Router.isFallback) return null;

	return (
		<Layout>

			<Head>
				<title>{`Neku`}</title>
			</Head>

			<h1>Genres </h1>
			<Library data={data.data}></Library>

		</Layout>
	)
}

export default Genres

export const getStaticPaths: GetStaticPaths = async () => {

	try {
		const res = await fetch(`https://api.jikan.moe/v4/genres/manga`);
		const data = await res.json();

		const paths = data.data.map(({ mal_id }: Data) => {
			return {
				params: { genres: `${mal_id}` },
			}
		})

		return {
			paths, fallback: true
		}
	} catch {
		return {
			paths: [], fallback: true
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

	const genres = params?.genres

	if (params && genres) {
		const bookRes = await fetch(`https://api.jikan.moe/v4/manga?genres=${genres}`)
		const data = await bookRes.json();

		return {
			props: {
				data,
			},
			revalidate: 86400,
		}
	}

	return {
		props: {
			error: true
		}
	}

}