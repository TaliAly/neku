import style from "./Book.module.scss"
import { BsBookmark } from "react-icons/bs"
import { AiFillBook } from "react-icons/ai"
import Link from "next/link"
import { BookInfo } from "../Type"

interface Props extends BookInfo {
    cover: string,
}

function Book(
    { genres, cover, synopsis, title, chapters, status, title_japanese, rank, score, volumes }: Props
) {
    return (
        <div className={style.book}>

            <div>

                <div className={style.images}>
                    <img src={cover} alt={title} />
                </div>

                <span>
                    <h2>{title}</h2>
                    <h4>{title_japanese}</h4>

                    <div className={style.bookOpt}>
                        <p className={style.read}>Leer ya <AiFillBook /></p>
                        <p> <BsBookmark /> </p>
                        <span className={style.capsule}>
                            <p>Status: {status} </p>
                        </span>
                    </div>

                    <div className={style.capsule}>
                        {
                            genres.map(({ mal_id, name }) => {
                                return <Link href={`/mangas/genres/${mal_id}`} key={mal_id}><a>{name}</a></Link>
                            })
                        }
                    </div>
                </span>

            </div>

            <div className={style.about}>

                <span>
                    <div className={style.status}>
                        <p> Rank: {rank}</p>
                        <p>Score: {score || 0}</p>
                        <p>status: {status}</p>
                    </div>


                    <div className={style.chapters}>
                        {chapters
                            ? <h2>Chapters {chapters}</h2>
                            : <h2>Couldn't find chapters</h2>
                        }
                    </div>
                </span>

                <div>
                    <p>{synopsis}</p>
                </div>

            </div>

        </div>
    )
}

export default Book