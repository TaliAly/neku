import style from "./Book.module.scss"

interface Props {
    cover: string,
    synopsis: string,
    title: string,
    genres: {
        mal_id: string,
        name: string
    }[]

}


function Book({ genres, cover, synopsis, title }: Props) {
    return (
        <div className={style.book}>
            <span className={style.images}>
                <img src={cover} alt={title} width={200} height={300} />
                <div>{ genres.map( ({mal_id, name}) => {
                    return <p key={mal_id}>{name}</p>
                })}
                </div>
            </span>

            <span>
                <h2>{title}</h2>
                <p>{synopsis}</p>
            </span>
        </div>
    )
}

export default Book