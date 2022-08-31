import style from "./Book.module.scss"

interface Props {
    MangaCover: string,
    MangaSynopsis: string,
    MangaTitle: string,
    Genres: {
        mal_id: string,
        name: string
    }[]

}


function Book({ MangaCover, MangaSynopsis, MangaTitle, Genres }: Props) {
    return (
        <div className={style.book}>
            <span className={style.images}>
                <img src={MangaCover} alt={MangaTitle} width={200} height={300} />
                <div>{ Genres.map( ({mal_id, name}) => {
                    return <p key={mal_id}>{name}</p>
                })}
                </div>
            </span>

            <span>
                <h2>{MangaTitle}</h2>
                <p>{MangaSynopsis}</p>
            </span>
        </div>
    )
}

export default Book