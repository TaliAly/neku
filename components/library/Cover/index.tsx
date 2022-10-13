import style from "./Cover.module.scss"
import Link from "next/link"
import { BsBookFill } from "react-icons/bs"
import Image from "next/image"


interface Props {
    image: string,
    name: string,
    mal_id: string,
}

function Cover(props: Props) {

    return (
        <Link href={`/mangas/${props.mal_id}`}>
            <a>
                <div className={style.book}>
                    <span>
                        <Image src={props.image} alt={props.name} width={140} height={200} />
                        <p className={style.hover}> <BsBookFill /> </p>
                    </span>
                    <h4>{props.name}</h4>

                </div>

            </a>
        </Link>
    )
}

export default Cover