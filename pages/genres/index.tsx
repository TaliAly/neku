import Layout from "../../components/layout";
import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch("https://api.jikan.moe/v4/genres/anime");
    const data = await res.json();

    return {
        props: {
            data
        }
    }

}

function GenresGroup({ data }: any) {
    return (
        <Layout>

            <Head>
                <title>Neku Genres</title>
            </Head>

            <div>
                {data.data.map((target:any) => {
                    return <>
                        <Link href={`/genres/${target.mal_id}`}><a>{target.name}</a></Link>
                        <br />
                    </>
                })}
            </div>

        </Layout>
    )
}

export default GenresGroup

