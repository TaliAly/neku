// import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { GetServerSideProps } from "next";
import { PropsData } from "../../../components/Type";
import { useRouter } from "next/router";

import Head from "next/head"
import Layout from "../../../components/layout";
import Library from "../../../components/library";
import Pagination from "../../../components/paginations";
import paginationFetch from '../../../components/paginations/paginationfetch';
import { useEffect, useState } from "react";

interface Data {
	name: string,
	mal_id: number,
}

interface spp extends PropsData {
	title: string
	genreName: string,
}
// type Title = boolean | string;

// The real deal!

const Genres = ({ data, genreName }: spp) => {
	const [fetchData, setFetchData] = useState(data);
	const Router = useRouter();
	const { genres, page }: any = Router.query;


	useEffect(() => {
		if (Router.isReady) {

			paginationFetch({ genres, page }, setFetchData, "genres")
		}

	}, [page])


	return (
		<Layout>

			<Head>
				<title>{`Neku | ${genreName}`}</title>
				<meta
					name="description"
					content={`${genreName} |Buscando por generos un manga que se vuelva tu favorito!.`}
				/>
				<meta
					name="og:description"
					content={`${genreName} |Buscando por generos un manga que se vuelva tu favorito!.`}
				/>
			</Head>

			<h1>Generos para {genreName} </h1>
			{/* (Router.isFallback || Router.isReady) */}

			<>
				<Library data={fetchData.data}></Library>
				<Pagination
					items={fetchData.pagination?.items}
					current_page={fetchData.pagination?.current_page}
					path={Router.pathname.replace("[genres]", `${Router.query?.genres}`)}
					page={`${Router.query?.page}`}
					last_visible_page={fetchData.pagination?.last_visible_page}
				/>
			</>

		</Layout>
	)
}
export default Genres



// export const getStaticPaths: GetStaticPaths = async () => {

// 	const data = await fetch(`https://api.jikan.moe/v4/genres/manga`).then(r => r.json());

// 	let paths: any = {}

// 	paths = data.data?.map((r: Data) => ({
// 		params: { genres: `${r?.mal_id}` },
// 	}))

// 	return { paths, fallback: false }
// }


// export const getStaticProps: GetStaticProps = async ({ params }) => {

// 	const genres = params?.genres


// 	const resMangas = await fetch(`https://api.jikan.moe/v4/manga?genres=${genres}`)
// 	const getMangas = await resMangas.json()

// 	const resGenres = await fetch(`https://api.jikan.moe/v4/genres/manga`)
// 	const getGenres = await resGenres.json()


// 	const genreName = () => {
// 		for (let i = 0; i < getGenres.data?.length; i++) {
// 			if (genres == getGenres.data[i]?.mal_id) {
// 				return getGenres.data[i]?.name
// 			}
// 			continue
// 		}
// 		return "No sé :("
// 	}

// 	return {
// 		props: {
// 			data: getMangas,
// 			genreName: genreName(),
// 		},
// 		revalidate: 86400,
// 	}
// }

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

	const genres = query?.genres

	const resMangas = await fetch(`https://api.jikan.moe/v4/manga?genres=${genres}`)
	const getMangas = await resMangas.json()

	const resGenres = await fetch(`https://api.jikan.moe/v4/genres/manga`)
	const getGenres = await resGenres.json()


	const genreName = () => {
		for (let i = 0; i < getGenres.data?.length; i++) {
			if (genres == getGenres.data[i]?.mal_id) {
				return getGenres.data[i]?.name
			}
			continue
		}
		return "No sé :("
	}

	return {
		props: {
			data: getMangas,
			genreName: genreName(),
		},
	}
}