import style from "./Cover.module.scss"
import Link from "next/link"


interface Props {
    image: string,
    name: string,
}

function BookManga(props: Props) {


    return (
        <Link href={`/manga/${props.name}`}>
            <a>
                <div className={style.book}>
                    <img src={props.image} alt={props.name} width={100} height={90} />
                    <h4>{props.name}</h4>
                </div>
            </a>
        </Link>
    )
}

export default BookManga