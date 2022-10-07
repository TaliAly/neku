import { GetStaticPaths, GetStaticProps } from 'next'
import { PropsData } from "../../../components/Type";
import { useRouter } from "next/router";

import Head from "next/head"
import Layout from "../../../components/layout";
import Library from "../../../components/library";
import Pagination from "../../../components/paginations";
import usePagination from '../../../components/paginations/usePagination';
import { useEffect, useState } from "react";

interface Data {
	name: string,
	mal_id: number,
}

interface spp extends PropsData {
	title: string
	genreName: string,
}

interface Query {
	path: string,
	page: string,
}
// type Title = boolean | string;

// The real deal!

const Genres = ({ data, genreName }: spp) => {
	const [fetchData, setFetchData] = useState(data);
	const Router = useRouter();
	const query: any = Router.query

	useEffect(() => {

		usePagination(query, setFetchData, "genres")

	}, [query.page])

	if (Router.isFallback) return null;


	return (
		<Layout>

			<Head>
				<title>{`Neku | ${genreName}`}</title>
			</Head>

			<h1>Generos para {genreName} </h1>
			{fetchData &&
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
			}

		</Layout>
	)
}
export default Genres



export const getStaticPaths: GetStaticPaths = async () => {

	const data = await fetch(`https://api.jikan.moe/v4/genres/manga`).then(r => r.json());

	let paths: any = {}

	if (!!data && !!data.data) {

		paths = data.data?.map((r: Data) => ({
			params: { genres: `${r?.mal_id}` },
		}))

	} else { paths = { params: {} } }

	return { paths, fallback: true }
}




export const getStaticProps: GetStaticProps = async ({ params }) => {

	const genres = params?.genres

	if (params && genres) {

		const data = await fetch(`https://api.jikan.moe/v4/manga?genres=${genres}`).then(r => r.json())
		const resGenre = await fetch(`https://api.jikan.moe/v4/genres/manga`).then(r => r.json());

		let genreName = null

		const getGenreName = () => {
			resGenre.data.map((target: any) => {
				if (target.mal_id == genres) {
					genreName = target.name
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

	return {
		props: {
			error: true
		}
	}

}