import { SiStarship } from "react-icons/si"
import style from "./DeadEnd.module.scss"

export default function EndManga() {
    return (
        <div className={style.deadend}>
            <SiStarship /> 
            <h2>Conseguiste un dead-end!</h2>
        </div>
    )
}