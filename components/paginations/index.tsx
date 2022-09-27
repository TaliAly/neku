import style from "./paginations.module.scss";
import Link from "next/link"

interface pagProps {
    last_visible_page?: number,
    has_next_page?: boolean,
    current_page?: number,
    items: {
        "count": number,
        "total": number,
        "per_page"?: number
    },
    path:string,
}

function Pagination({ items, path }: pagProps) {

    const pages: number[] = [];

    for (let index = 0; index < (items.total / items.count); index++) {
        pages.push(index+1);

    }

    return (
        <div className={style.paginations}>
            <div>
                {pages.map(r => {
                    if ( r == 1 ) {
                        return <Link href={`${path}`} key={r} ><a>{r}</a></Link>
                    }
                    return <Link href={`${path}?page=${r}`} key={r} ><a>{r}</a></Link>
                })}
            </div>
        </div>
    )
}

export default Pagination