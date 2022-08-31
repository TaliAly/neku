
import { FormEvent, useRef } from "react"
import { MdOutlineSearch } from "react-icons/md"
import style from "./index.module.scss"
import { useRouter } from "next/router"


function SearchBar() {

    const router = useRouter()
    const queryInput = useRef<HTMLInputElement>(null)

    function getForm(e:FormEvent) {
        e.preventDefault()
        router.push({
            pathname: "/search",
            query: { search: `${queryInput.current?.value}`}
        })
    }

    return (
        <div className={style.searchBar}>

            <form onSubmit={getForm}>
                <button type="submit"><MdOutlineSearch /></button>
                <input type="text" ref={queryInput} />
            </form>
        </div>
    )
}

export default SearchBar