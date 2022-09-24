import style from "./Nav.module.scss"
import Link from "next/link"

import { useEffect, useState } from "react"
import Config from "../config"
import {AiFillHome, AiFillBook} from "react-icons/ai"
import SearchBar from "./../searchBar"

function isBrowser() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  }

export default function Nav() {
    const [responsive, setResponsive] = useState(false)

    useEffect(() => {
        if (window.innerWidth >= 700) {
            setResponsive(true);
        }
    }, [isBrowser() && window.innerWidth])

    return (
        <nav className={style.nav}>
            <Link href="/"><a> <img src="/neku.ico" alt="neku" /><h1>Neku</h1></a></Link>

            <div>
                {responsive &&
                    <div>
                        <SearchBar />
                    </div>
                }
                <p><Link href="/home"><a><AiFillHome /></a></Link></p>
                <p><AiFillBook /></p>
                <p> <Config /> </p>
            </div>
        </nav>
        )
}