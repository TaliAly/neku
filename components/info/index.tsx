
import style from "./index.module.scss"

function Info() {
    return (
        <div className={style.info}>
            <h2>¿Qué es Neku?</h2>


            <div className={style.text}>
                <p>Neku busca ser un lector de manga sencillo y facil a la vista para los usuarios, tenemos una idea de un lector de manga como no-intrusivo y simple</p>
            </div>
        </div>
    )
}

export default Info