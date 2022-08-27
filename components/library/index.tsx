import style from "./index.module.scss"

interface Target {
    EntryId: string,
    MangaCover: string,
    MangaTitle: string
}

import BookManga from "./Cover"
import EndManga from "../DeadEnd"

function Library({ data }: any) {

    data.length=10

    return (
        <div className={style.manga}>
            <h2>Tops</h2>

            <div>
                { data.data.map((target: Target) => {
                    if (target.MangaCover != undefined) {
                        return <BookManga image={target.MangaCover} name={target.MangaTitle} key={target.MangaTitle} />
                    }
                })}
            </div>

            <EndManga />
        </div>
    )
}

export default Library