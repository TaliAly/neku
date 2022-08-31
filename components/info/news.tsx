import style from "./news.module.scss"

function News() {
    return (
        <div className={style.news}>
            <h2>Noticias!</h2>

            <div className={style.text}>
                <p>en progreso</p>
            </div>
        </div>
    )
}

export default News