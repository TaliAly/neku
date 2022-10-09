import { GetStaticPaths, GetStaticProps } from 'next'
import { BookInfo, PropsData } from "../../../components/Type";
import { useRouter } from "next/router";

import Head from "next/head"
import Layout from "../../../components/layout";
import Library from "../../../components/library";
import Pagination from "../../../components/paginations";
import paginationFetch from '../../../components/paginations/paginationfetch';
import { useEffect, useState } from "react";
import ErrorPage from "next/error"

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
			</Head>

			<h1>Generos para {genreName} </h1>
			{/* (Router.isFallback || Router.isReady) */}

			{!!genres ?
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
				:
				<h1>Error!</h1>
			}

		</Layout>
	)
}
export default Genres



export const getStaticPaths: GetStaticPaths = async () => {

	const data = await fetch(`https://api.jikan.moe/v4/genres/manga`).then(r => r.json());

	let paths: any = {}

	paths = data.data?.map((r: Data) => ({
		params: { genres: `${r?.mal_id}` },
	}))

	return { paths, fallback: false }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

	const genres = params?.genres

	console.log(genres)

	const data = (await (await fetch(`https://api.jikan.moe/v4/manga?genres=${genres}&sfw=true`)).json())

	const resGenre = (await (await fetch(`https://api.jikan.moe/v4/genres/manga`)).json())

	let genreName = ""

	const getGenreName = () => {
		resGenre?.data?.map(({ mal_id, name }: any) => {

			if (genres == mal_id) {
				genreName = name
			}

		})
	}
	getGenreName()

	return {
		props: {
			data,
			genreName
		},
		revalidate: 86400,
	}
}