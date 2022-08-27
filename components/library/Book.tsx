import style from "./Book.module.scss"

interface Props {
    MangaCover: string,
    MangaSynopsis: string,
    MangaTitle: string,

}

function Book({ MangaCover, MangaSynopsis, MangaTitle }: Props) {
    return (
        <div className={style.book}>
            <img src={MangaCover} alt={MangaTitle} width={200} height={300} />

            <span>
                <h2>{MangaTitle}</h2>
                <p>{MangaSynopsis}</p>
            </span>
        </div>
    )
}

export default Book