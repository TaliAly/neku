import style from "./index.module.scss"
import dynamic from 'next/dynamic'

const BookManga = dynamic( () => import("./Cover"))
const EndManga = dynamic(() => import('../DeadEnd'))

interface Target {
    mal_id: string,
    title: string,
    images: {
        webp: {
            image_url:string,
            small_image_url:string,
        }
    }
}

function Library({ data }: any) {

    return (
        <div className={style.manga}>
            <h2>Tops</h2>

            <div className={style.library}>
                {data.map(({mal_id, title, images}: Target) => {
                    return <BookManga image={images.webp.image_url} name={title} key={mal_id} mangaId={mal_id} />
                })}
            </div>

            <EndManga />
        </div>
    )
}

export default Library