import style from "./Nav.module.scss"
import Link from "next/link"

import Menu from "../menu"
import { AiFillHome, AiFillBook } from "react-icons/ai"
import SearchBar from "./../searchBar"
import useResponsive from "../useResponsive"


export default function Nav() {
    const { responsive } = useResponsive()


    return (
        <nav className={style.nav}>
            <Link href="/"><a> <img src="/neku.ico" alt="neku" /><h1>Neku</h1></a></Link>

            <div>
                {!responsive &&
                    <>
                        <div>
                            <SearchBar />
                        </div>
                        <Link href="/home"><a><AiFillHome /></a></Link>
                        <p><AiFillBook /></p>
                    </>

                }

                <p> <Menu /> </p>
            </div>
        </nav>
    )
}