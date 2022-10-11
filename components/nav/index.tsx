import style from "./Nav.module.scss"
import Link from "next/link"

import Menu from "../menu"
import { AiFillHome } from "react-icons/ai"
import SearchBar from "./../searchBar"
import useResponsive from "../useResponsive"
import { useEffect, useState } from "react"


export default function Nav() {
    const { responsive } = useResponsive();


    return (
        <nav className={style.nav}>
            <div>
                <p> <Menu /> </p>
                <Link href="/"><a> <img src="/neku.ico" alt="neku" /><h1>Neku</h1></a></Link>
            </div>


            <div>
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