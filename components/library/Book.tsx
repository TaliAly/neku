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

            <div>

                <div>
                    <span className={style.images}>
                        <img src={cover} alt={title} />
                    </span>

                    <span>
                        <h2>{title}</h2>

                        <div className={style.genres}>{genres.map(({ mal_id, name }) => {
                            return <p key={mal_id}>{name}</p>
                        })}
                        </div>

                    </span>
                </div>

            </div>

            <div className={style.about}>
                <p>{synopsis}</p>
                <h2>Episodes</h2>
            </div>

        </div>
    )
}

export default Book