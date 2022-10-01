import style from "./paginations.module.scss";
import Link from "next/link"

interface pagProps {
    last_visible_page: number,
    has_next_page?: boolean,
    current_page: number,
    items: {
        "count": number,
        "total": number,
        "per_page"?: number
    },
    path: string,
    page: string,
}

function Pagination({ items, path, current_page, last_visible_page }: pagProps) {

    const pages: number[] = [];

    for (let index = 0; index < last_visible_page; index++) {
        pages.push(index + 1);
    }

    let toRender = () => {

        if (current_page <= 4) {
            return [...pages.splice(0, 5), "...", last_visible_page]
        }
        if (current_page >= last_visible_page - 3) {
            let show = [...pages.reverse()]
            show.splice(5, last_visible_page)
            show.reverse()

            return [1, "...", ...show]
        }

        return [1, "...", ...pages.splice(current_page - 3, 5), "...", last_visible_page]
    }


    //* What to be rendered
    return (
        <div className={style.paginations}>
            <div>
                {(current_page - 1 <= 0)
                    ? <Link href={`${path}`}><a> {"<"} </a></Link>
                    : <Link href={`${path}?page=${current_page - 1}`}><a> {"<"} </a></Link>
                }

                {
                    toRender().map((r, index) => {

                        //* checks current page
                        if (r == current_page)
                            return <a key={r} className={style.active}>{r}</a>

                        //* checks if it's the main page
                        if (r == 1)
                            return <Link href={`${path}`} key={r}><a>{r}</a></Link>

                        //* checks the "..."
                        if (r == "...")
                            return <a key={r + index} className={style.dots}>{r}</a>

                        return <Link href={`${path}?page=${r}`} key={r}>
                            <a>{r}</a></Link>

                    })
                }

                {(current_page + 1 >= last_visible_page)
                    ? <Link href={`${path}?page=${current_page}`}><a> {">"} </a></Link>
                    : <Link href={`${path}?page=${current_page + 1}`}><a> {">"} </a></Link>
                }
            </div>
        </div>
    )
}

export default Pagination



interface Query {
    page: string,
    genres: string,
}
export const paginationFetch = async (query: Query, setFetch: Function) => {

    if (!!query.page) {
        const data = await
            fetch(`https://api.jikan.moe/v4/manga?genres=${query.genres}&page=${query.page}`)
                .then(r => r.json())

        setFetch(data)
    }
    else {
        const data = await
            fetch(`https://api.jikan.moe/v4/manga?genres=${query.genres}`)
                .then(r => r.json())

        setFetch(data)
    }
}