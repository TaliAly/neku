
import style from "./info.module.scss"

function About() {
    return(
        <div className={style.info}>
            <div className="info">
                <h2>¿Qué es Neku?</h2>
                <p>Neku busca ser un lector de manga sencillo y facil a la vista para los usuarios, tenemos una idea de un lector de manga como no-intrusivo y simple</p>
            </div>
        </div>
    )
}

export default About