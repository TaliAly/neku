import style from "./paginations.module.scss";
import Link from "next/link"
import useResponsive from "./../useResponsive"

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

function Pagination({ path, current_page, last_visible_page }: pagProps) {

    const { responsive } = useResponsive()
    const pages: number[] = [];

    for (let index = 0; index < last_visible_page; index++) {
        pages.push(index + 1);
    }

    // A lot of logic and if's ,_, I'm dying
    const toRender = () => {

        if (!responsive) {

            if (current_page <= 4)
                return [...pages.splice(0, 5), "...", last_visible_page]


            if (current_page >= last_visible_page - 3) {
                let show = [...pages.reverse()]
                show.splice(5, last_visible_page)
                show.reverse()

                return [1, "...", ...show]
            }

            return [1, "...", ...pages.splice(current_page - 3, 5), "...", last_visible_page]
        }


        if (current_page <= 3)
            return [...pages.splice(0, 3), "...", last_visible_page]


        if (current_page >= last_visible_page - 3) {
            let show = [...pages.reverse()]
            show.splice(3, last_visible_page)
            show.reverse()

            return [1, "...", ...show]
        }

        return [1, "...", ...pages.splice(current_page - 2, 3), "...", last_visible_page]

    }

    interface PathRouter {
        operation: string | null,
        num: number | null
    }

    const pathRouter = ({ operation, num }: PathRouter) => {
        const havingQuery = path.includes("?");

        if (havingQuery) {

            if (operation == "sum") {
                return `${path}&page=${current_page + num!}`
            }
            else if (operation == "sub") {
                return `${path}&page=${current_page - num!}`
            }
        }

        else {

            if (operation && num) {
                if (operation == "sum") {
                    return `${path}?page=${current_page + num}`
                }
                else if (operation == "sub") {
                    return `${path}?page=${current_page - num}`
                }
            }

        }

        return `${path}?page=${current_page}`
    }


    //* What to be rendered
    return (
        <div className={style.paginations}>
            <div>
                {(current_page - 1 <= 0)
                    ?

                    <Link href={`${path}`}>
                        <a> {"<"} </a>
                    </Link>
                    :

                    <Link href={pathRouter({
                        operation: "sub",
                        num: 1
                    })}>
                        <a> {"<"} </a>
                    </Link>

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

                        if (path.includes("?")) {
                            return <Link href={`${path}&page=${r}`} key={r}>
                                <a>{r}</a></Link>
                        }

                        return <Link href={`${path}?page=${r}`} key={r}>
                            <a>{r}</a></Link>

                    })
                }

                {(current_page + 1 >= last_visible_page)
                    ?
                    <Link href={pathRouter({
                        operation: null,
                        num: null
                    })}>
                        <a> {">"} </a>
                    </Link>

                    :
                    <Link href={pathRouter({
                        operation: "sum",
                        num: 1
                    })}>
                        <a> {">"} </a>
                    </Link>
                }
            </div>
        </div>
    )
}

export default Pagination