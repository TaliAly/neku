import Head from "next/head"
import { GetStaticPaths, GetStaticProps } from 'next'
import { PropsData } from "../../components/Type";
import { useRouter } from "next/router";

import Layout from "../../components/layout";
import Library from "../../components/library";
import Pagination from "../../components/paginations";
import { useEffect, useState } from "react";

interface Data {
	name: string,
	mal_id: number,
}

interface spp extends PropsData {
	title: string
}

// type Title = boolean | string

// The real deal!

const Genres = ({ data }: spp) => {
	const [fetchData, setFetchData] = useState(data);
	const Router = useRouter();

	if (Router.isFallback) return null;

	return (
		<Layout>

			<Head>
				<title>{`Neku`}</title>
			</Head>

			<h1>Genres </h1>
			<Library data={fetchData.data}></Library>
			<Pagination items={fetchData.pagination?.items} path={Router.asPath} />

		</Layout>
	)
}

export default Genres

export const getStaticPaths: GetStaticPaths = async () => {

		const res = await fetch(`https://api.jikan.moe/v4/genres/manga`);
		const data = await res.json();

		if (data) {
			const paths = data?.data?.map((r:Data) => ({
				params: { genres: `${r.mal_id}` },
			}))
		}

		return { paths, fallback: true }
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