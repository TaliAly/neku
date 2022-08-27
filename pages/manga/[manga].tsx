import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Head from "next/head";

function Manga() {
    const router = useRouter()
    const { manga } = router.query

    return (
        <Layout>
            <Head>
                <title>Neku | {manga}</title>
            </Head>
            <p> Cosa: {manga}</p>
        </Layout>
    )
}

export default Manga