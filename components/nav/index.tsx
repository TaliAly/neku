import style from "./Nav.module.scss"
import Link from "next/link"

import Menu from "../menu"
import { AiFillHome } from "react-icons/ai"
import SearchBar from "./../searchBar"
import useResponsive from "../useResponsive"


export default function Nav() {
    const { responsive } = useResponsive();


    return (
        <nav className={style.nav}>
            <div className={style.left}>
                <p className={style.menu}> <Menu /> </p>
                <Link href="/"><a> <img src="/neku.ico" alt="neku" /><h1>Neku</h1></a></Link>
            </div>


            <div className={style.right}>
                {!responsive &&
                    <>
                        <div>
                            <SearchBar />
                        </div>
                        <Link href="/"><a><AiFillHome /></a></Link>
                    </>

                }

            </div>
        </nav>
    )
}