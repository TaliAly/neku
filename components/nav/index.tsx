import style from "./Nav.module.scss"

import Link from "next/link"
import logo from "./../../public/neku.ico"

import { IoSettings } from "react-icons/io5"

export default function Nav() {
    return (
        <nav className={style.nav}>
            <Link href="/"><a> <img src="neku.ico" alt="neku" /><h1>Neku</h1></a></Link>

            <div>
                <p>Géneros</p>
                <p>Nuevos</p>
            </div>

            <div>
                <p><Link href="/home"><a>Home</a></Link></p>
                <p>Biblioteca</p>
                <p> <IoSettings /> </p>
            </div>
        </nav>
    )
}