import Link from "next/link"
import Layout from "../components/layout"

export default function Custom404() {
    return (
        <Layout>
            <h3>No sé que quisiste hacer pero no existe esta pagina :/</h3>
            <h4>Tal vez quieras volver a casa</h4>

            <Link href="/">
                <a>Home</a>
            </Link>
        </Layout>
    )
}