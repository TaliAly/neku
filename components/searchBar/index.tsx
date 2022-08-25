
import { MdOutlineSearch } from "react-icons/md"
import style from "./searchBar.module.scss"

function SearchBar() {
    return (
        <div className={style.searchBar}>

            <h2>¿Qué leeras hoy?</h2>
            <form>
                <input type="text" />
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

export default SearchBar