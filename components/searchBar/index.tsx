
import { FormEvent, useRef } from "react"
import { MdOutlineSearch } from "react-icons/md"
import style from "./index.module.scss"
import { useRouter } from "next/router"


function SearchBar() {

    const router = useRouter()
    const queryInput = useRef<HTMLInputElement>(null)
    const input = useRef<string>("")

    function getForm(e: FormEvent) {
        const refInput = queryInput.current?.value

        e.preventDefault()
        input.current = `${refInput}`
        router.push({
            pathname: "/search",
            query: { search: `${refInput}` }
        })
    }

    return (
        <div className={style.searchBar}>
            <form onSubmit={getForm}>
                <button type="submit"><MdOutlineSearch /></button>
                <input type="text" ref={queryInput} placeholder="busca algo!" defaultValue={input.current} />
            </form>
        </div>
    )
}

export default SearchBar