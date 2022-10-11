import Link from "next/link"
import Image from "next/image"
import style from "./Tops.module.scss"
import useDarkMode from "./../useDarkMode"
import useResponsive from "./../useResponsive"


interface Props {
    image: string,
    name: string,
    mal_id: string,
    synopsis: string,
    background: string,
    japanese_name: string,
}

function Tops({ image, mal_id, name, synopsis, background, japanese_name }: Props) {
    const { isEnabled } = useDarkMode()
    const { responsive } = useResponsive()

    let Class = (isEnabled) ? style.tops_dark : style.tops

    return (
        <Link href={`/mangas/${mal_id}`}>
            <a>
                <div className={Class}>
                    <Image src={image} alt={name} width={250} height={300} className={style.top} />
                    <span className={style.info}>
                        <h4>{name}</h4>
                        {
                            !responsive
                            &&
                            <>
                                <h5>{japanese_name}</h5>
                                <p>{synopsis}</p>
                            </>
                        }
                    </span>
                </div>

            </a>
        </Link>
    )
}

export default Tops