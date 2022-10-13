import { GetServerSideProps } from "next"
import { PropsData } from "../../../components/Type"
import { useRouter } from "next/router"

import Head from "next/head"
import Layout from "../../../components/Layout"
import Library from "../../../components/library"
import Pagination from "../../../components/paginations"
import { useEffect, useState } from "react"

interface spp extends PropsData {
	title: string
	genreName: string,
}
// type Title = boolean | string;

// The real deal!

const Genres = ({ data, genreName }: spp) => {
	const [fetchData, setFetchData] = useState(data);
	const Router = useRouter();

	useEffect(() => {
		setFetchData(data)
	}, [data])


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

			<Library data={fetchData.data}></Library>
			<Pagination
				items={fetchData.pagination?.items}
				current_page={fetchData.pagination?.current_page}
				path={Router.pathname.replace("[genres]", `${Router.query?.genres}`)}
				page={`${Router.query?.page}`}
				last_visible_page={fetchData.pagination?.last_visible_page}
			/>

		</Layout>
	)
}
export default Genres

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

	const genres = query?.genres
	const page = query?.page

	let getMangas = {}

	if (!!page) {
		const resMangas = await fetch(`https://api.jikan.moe/v4/manga?genres=${genres}&page=${page}`)
		getMangas = await resMangas.json()
	}
	else {
		const resMangas = await fetch(`https://api.jikan.moe/v4/manga?genres=${genres}`)
		getMangas = await resMangas.json()
	}

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
			genreName: `${genreName()}`,
		},
	}
}