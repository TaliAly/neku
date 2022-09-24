import style from "./Book.module.scss"
import { BsBookmark } from "react-icons/bs"
import { AiFillBook } from "react-icons/ai"
import Link from "next/link"
import { BookInfo } from "../Type"

interface Props extends BookInfo {
    cover: string,
}

function Book({ genres, cover, synopsis, title, chapters, status }: Props) {
    return (
        <div className={style.book}>

            <div>

                <div className={style.images}>
                    <img src={cover} alt={title} />
                </div>

                <span>
                    <h2>{title}</h2>

                    <div className={style.bookOpt}>
                        <p className={style.read}>Leer ya <AiFillBook /></p>
                        <p> <BsBookmark /> </p>

                        <span className={style.capsule}>
                            <p>Status: {status} </p>
                        </span>
                    </div>

                    <div className={style.capsule}>{genres.map(({ mal_id, name }) => {
                        return <p key={mal_id}><Link href={`/genres/${mal_id}`}><a>{name}</a></Link></p>
                    })}
                    </div>

                </span>

            </div>

            <div className={style.about}>


                <div className={style.chapters}>
                    <h2>Capitulos {chapters}</h2>
                </div>

                <div>
                    <p>{synopsis}</p>
                </div>

            </div>

        </div>
    )
}

export default Book