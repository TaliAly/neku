import useDarkMode from "../useDarkMode"
import style from "./menu.module.scss"
import { useState, useRef, useEffect } from "react"
import useResponsive from "../useResponsive"

import { MdWbSunny } from "react-icons/md"
import { BsFillMoonFill, BsGithub } from "react-icons/bs"
import { AiFillBook } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import { HiOutlineMenu } from "react-icons/hi"
import Link from "next/link"
import gsap from "gsap"




// This is de menu
function Modal({ setCloseModal }: any) {
    const { isEnabled, setIsEnabled } = useDarkMode()
    const { responsive } = useResponsive()
    const ref = useRef(null)
    const modal = useRef(null)

    useEffect(() => {
        gsap.set(modal.current, { opacity: 0, y: -10 })
        gsap.set(ref.current, { opacity: 0 })

        gsap.to(modal.current, { opacity: 1, y: +10 }).duration(.2)
        gsap.to(ref.current, { opacity: 1 }).duration(.2)

    }, [])

    const handleClick = async (target: any) => {

        if (!(target.target == modal.current || target.target.parentElement == modal.current)) {
            gsap.set(modal.current, { y: +10 })
            gsap.set(ref.current, { opacity: 1 })
            gsap.to(modal.current, { opacity: 0, y: -10 }).duration(.2)
            await gsap.to(ref.current, { opacity: 0 }).duration(.2)
            setCloseModal(false)
        }
    }
    // If you find a way to make this work without another p tag, then let me know, I'm lazy to do this
    return (
        <div className={style.modal} onClick={handleClick} ref={ref}>
            <span ref={modal}>
                {
                    responsive
                        ?
                        <>
                            <p onClick={() => setIsEnabled(!isEnabled)}>
                                {isEnabled ?
                                    <> Light <MdWbSunny /> </> :
                                    <> Dark <BsFillMoonFill /> </>}
                            </p>

                            <Link href="/mangas"><a> Mangas <AiFillBook /> </a></Link>

                            <a href="https://github.com/TaliAly/Neku">About<BsGithub /> </a>

                            <div className={style.menu}>
                                <Link href="/search"><a>Search <BiSearch /></a></Link>
                                <p>Random</p>
                                <p>A - Z</p>
                                <p>Completed</p>
                            </div>

                        </>
                        :
                        <>
                            <p onClick={() => { setIsEnabled(!isEnabled) }}>
                                {isEnabled ?
                                    <> Light <MdWbSunny /> </> :
                                    <> Dark <BsFillMoonFill /> </>}
                            </p>

                            <Link href="/mangas"><a> Mangas <AiFillBook /> </a></Link>

                            <Link href="/search"><a>Search <BiSearch /></a></Link>
                        </>
                }
            </span>
        </div>
    )
}


// this will show in the nav bar

function Menu() {
    const [openModal, setOpenModal] = useState(false);
    const { isEnabled, setIsEnabled } = useDarkMode();


    useEffect(() => {

        if (window.localStorage.getItem("mode") == "true") {
            setIsEnabled(true);
        }
    }, [])

    return (
        <>
            <HiOutlineMenu onClick={() => { setOpenModal(!openModal) }} />
            {openModal && <Modal setCloseModal={setOpenModal} />}
        </>
    )
}


export default Menu