
import { FormEvent, useEffect, useRef } from "react"
import { MdOutlineSearch } from "react-icons/md"
import style from "./searchBarBig.module.scss"
import { useRouter } from "next/router"

function SearchBarBig() {

    const router = useRouter()
    const queryInput = useRef<HTMLInputElement>(null)

    function getForm(e:FormEvent) {
        e.preventDefault()
        if (router.query ) {
            router.push({
                pathname: "/search",
                query: { search: `${queryInput.current?.value}`, },
                
            })
        }
    }

    return (
        <div className={style.searchBar}>

            <h2>¿Qué leeras hoy?</h2>
            <form onSubmit={getForm}>
                <input type="text" ref={queryInput} />
                <button type="submit"><MdOutlineSearch /></button>
            </form>
            <span>
                <p>Nuevo</p>
                <p>Random</p>
                <p>A-Z</p>
                <p>Completos</p>
            </span>
        </div>
    )
}

export default SearchBarBig