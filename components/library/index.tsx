import style from "./index.module.scss"
import dynamic from 'next/dynamic'
import { BookInfo } from "../Type"

const Cover = dynamic(() => import("./Cover"))
const CoverInfo = dynamic(() => import("./Cover/CoverInfo"))


function Library({ data, type }: any) {

    if (type == "info") {
        return (
            <div className={style.coverInfo}>
                {!!data
                    ?
                    <div className={style.library}>
                        {data?.map(({ mal_id, title, images, synopsis }: BookInfo) => {
                            return <CoverInfo image={images.webp.image_url} name={title} key={mal_id} mal_id={mal_id} synopsis={synopsis} />
                        })}
                    </div>
                    : <></>
                }
            </div>
        )
    }

    return (
        <div className={style.manga}>

            {!!data
                ?
                <div className={style.library}>
                    {data?.map(({ mal_id, title, images }: BookInfo) => {
                        return <Cover image={images.webp.image_url} name={title} key={mal_id} mal_id={mal_id} />
                    })}
                </div>
                : <></>
            }

        </div>
    )
}

export default Library