import Head from "next/head"
import { GetStaticPaths, GetStaticProps } from 'next'
import { PropsData } from "../../components/Type"

import Layout from "../../components/layout"
import Library from "../../components/library"

interface Data {
	name: string,
	mal_id: number,
}

interface spp {
	title: string,
}

interface spp extends PropsData  {
	title: string
}


export const getStaticPaths: GetStaticPaths = async () => {

	const res = await fetch(`https://api.jikan.moe/v4/genres/manga`);
	const data = await res.json();


	const paths = data.data.map(({mal_id }: Data) => {
		return {
			params: { genres: `${mal_id}` },
		}
	})

	return {
		paths, fallback: true,
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {


	const bookRes = await fetch(`https://api.jikan.moe/v4/manga?genres=${params?.genres}`)
	const data = await bookRes.json();

	const genreRes = await fetch("https://api.jikan.moe/v4/genres/manga");
	const genresData = await genreRes.json();

	let title = false

	for (let index = 0; index < genresData.data.length; index++) {
		const element = genresData.data[index];		

		if (element.mal_id == params?.genres) {
			title = element.name
			break;
		} else { continue; }
	};

	return {
		props: {
			data,
			title
		},
		revalidate: 86400,
	}
}

// The real deal!

function genres({ data, title }: spp) {

	return (
		<Layout>

			<Head>
				<title>{`Neku | ${title}`}</title>
			</Head>

			<h1>Genres {title} </h1>
			<Library data={data.data}></Library>

		</Layout>
	)
}

export default genres