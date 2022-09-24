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
				<title>{`Neku | Placeholder`}</title>
			</Head>

			<h1>Genres: Placeholder </h1>
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
			paths, fallback: false
		}
	} catch {
		return {
			paths: [], fallback: false
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

	const genres = params?.genres
	// const [name, data] = await Promise.all([
	// 	fetch("https://api.jikan.moe/v4/genres/manga").then( r => r.json()),
	// 	fetch(`https://api.jikan.moe/v4/manga?genres=${genres}`).then( r => r.json())
	// ])

	// let title: Title = false

	// for (let index = 0; index < name.data.length; index++) {
	// 	const element = name.data[index];

	// 	if (element.mal_id == genres) {

	// 		title = element.name;
	// 		break;
	// 	}
	// 	else { continue; }
	// };

	const data = await fetch(`https://api.jikan.moe/v4/manga?genres=${genres}`).then( r => r.json())

	return {
		props: {
			data,
			// title
		},
		revalidate: 86400,
	}

}