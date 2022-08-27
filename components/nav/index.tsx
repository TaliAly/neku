import style from "./Nav.module.scss"
import Link from "next/link"

import { IoSettings } from "react-icons/io5"
import { useEffect, useState } from "react"

export default function Nav() {
    const [responsive, setResponsive] = useState(false)

    useEffect(() => {
        if (window.innerWidth >= 700) {
            setResponsive(true)
        }
    })

    return (
        <nav className={style.nav}>
            <Link href="/"><a> <img src="neku.ico" alt="neku" /><h1>Neku</h1></a></Link>

            {responsive &&
                <div>
                    <p>Géneros</p>
                    <p>Nuevos</p>
                </div>
            }

            <div>
                <p><Link href="/home"><a>Home</a></Link></p>
                <p>Biblioteca</p>
                <p> <IoSettings /> </p>
            </div>
        </nav>
    )
}