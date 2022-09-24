import style from "./index.module.scss"
import dynamic from 'next/dynamic'
import { Target } from "../Type"

const Cover = dynamic( () => import("./Cover"))


function Library({ data }:any) {

    return (
        <div className={style.manga}>

            <div className={style.library}>
                {data.map(({mal_id, title, images}: Target) => {
                    return <Cover image={images.webp.image_url} name={title} key={mal_id} mal_id={mal_id} />
                })}
            </div>

        </div>
    )
}

export default Library