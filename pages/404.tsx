import Link from "next/link"
import style from "../styles/404.module.scss"
import Layout from "../components/layout"
import DeadEnd from "./../components/deadEnd"

export default function Custom404() {
    return (
        <Layout>
            <div className={style.error}>
                <DeadEnd />


                <h3>No sé que quisiste hacer pero no existe esta pagina :/</h3>
                <h4>Tal vez quieras volver a casa</h4>

                <Link href="/">
                    <a>Home</a>
                </Link>

            </div>
        </Layout>
    )
}