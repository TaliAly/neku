import Head from "next/head"
import { GetStaticPaths, GetStaticProps } from 'next'
import { PropsData } from "../../components/Type"
import type { NextPage } from "next";
import Router, { useRouter } from "next/router";

import Layout from "../../components/layout"
import Library from "../../components/library"

interface Data {
	name: string,
	mal_id: number,
}

interface spp extends PropsData {
	title: string
}

type Title = boolean | string


export const getStaticPaths: GetStaticPaths = async () => {

	const res = await fetch(`https://api.jikan.moe/v4/genres/manga`);
	const data = await res.json();


	if (data.data != undefined) {
		const paths = data.data.map( ({ mal_id }: Data) => {
			return {
				params: { genres: `${mal_id}` },
			}
		})

		return {
			paths, fallback:false
		}
	}

	return {
		paths: {}, fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	
	const genres = params?.genres!

	if (params && genres) {
		const bookRes = await fetch(`https://api.jikan.moe/v4/manga?genres=${genres}`)
		const data = await bookRes.json();

		const genreRes = await fetch("https://api.jikan.moe/v4/genres/manga");
		const genresData = await genreRes.json();
	
		let title:Title = false

		if (genresData.data != undefined) {
			for (let index = 0; index < genresData.data.length; index++) {
	
				const element = genresData.data[index];
				if (element.mal_id == genres) {
					title = element.name
					break;
				} else { continue; }
			};
		} else { title = "error"}
	
		return {
			props: {
				data,
				title
			},
			revalidate: 86400,
		}
	}

	return {
		props: {
			error:true
		}
	}
}

// The real deal!

const Genres: NextPage<spp> = ({ data, title }) => {

	if (useRouter().isFallback) return null;

	return (
		<Layout>

			<Head>
				<title>{`Neku | ${title}`}</title>
			</Head>

			<h1>Genres: {title} </h1>
			<Library data={data.data}></Library>

		</Layout>
	)
}

export default Genres