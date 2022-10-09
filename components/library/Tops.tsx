import Link from "next/link"
import Image from "next/image"
import style from "./Tops.module.scss"
import useDarkMode from "./../useDarkMode"


interface Props {
    image: string,
    name: string,
    mal_id: string,
    synopsis: string,
}

function Tops({ image, mal_id, name, synopsis }: Props) {
    const { isEnabled, setIsEnabled } = useDarkMode()

    let Class = (isEnabled) ? style.tops_dark : style.tops

    return (
        <Link href={`/mangas/${mal_id}`}>
            <a>
                <div className={Class}>
                    <Image src={image} alt={name} width={250} height={300} className={style.top} />

                    <span>
                        <h4>{name}</h4>
                        <p>{synopsis}</p>
                    </span>
                </div>

            </a>
        </Link>
    )
}

export default Tops