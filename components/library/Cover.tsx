import style from "./Cover.module.scss"
import Link from "next/link"
import { BsBookFill } from "react-icons/bs"
import Image from "next/image"


interface Props {
    image: string,
    name: string,
    mangaId:string,
}

function BookManga(props: Props) {


    return (
        <Link href={`/manga/${props.mangaId}`}>
            <a>
                <div className={style.book}>
                    <span>
                        <Image src={props.image} alt={props.name} width={150} height={200} />
                        <p className={style.hover}> <BsBookFill /> </p>
                    </span>
                    <h4>{props.name}</h4>

                </div>

            </a>
        </Link>
    )
}

export default BookManga