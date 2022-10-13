import Link from "next/link"
import Image from "next/image"
import style from "./CoverInfo.module.scss"

interface Props {
    image: string,
    name: string,
    mal_id: string,
    synopsis: string,
}

export default function CoverInfo({ image, name, mal_id, synopsis }: Props) {
    return (
        <Link href={`/mangas/${mal_id}`}>
            <a>
                <div className={style.book}>
                    <span>
                        <Image src={image} alt={name} width={120} height={180} />
                    </span>

                    <span>
                        <h4>{name}</h4>
                        <p>{synopsis}</p>
                    </span>

                </div>

            </a>
        </Link>
    )
}