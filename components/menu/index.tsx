import useDarkMode from "../useDarkMode"
import style from "./menu.module.scss"
import { useState, useRef, useEffect } from "react"
import useResponsive from "../useResponsive"

import { MdWbSunny } from "react-icons/md"
import { BsFillMoonFill, BsGithub } from "react-icons/bs"
import { AiOutlineQuestion } from "react-icons/ai"
import { HiOutlineMenu } from "react-icons/hi"
import SearchBar from "../searchBar"
import Link from "next/link"



// This is de menu
function Modal({ setCloseModal }: any) {
    const { isEnabled, setIsEnabled } = useDarkMode();
    const { responsive } = useResponsive();
    const ref = useRef(null);

    const handleClick = (target: any) => {

        if (!(target.target == ref.current || target.target.parentElement == ref.current)) {
            setCloseModal(false);
        }
    }

    // If you find a way to make this work without another p tag, then let me know, I'm lazy to do this
    return (
        <span className={style.modal} onClick={handleClick}>
            <span ref={ref}>
                <p onClick={() => { setIsEnabled(!isEnabled) }}>
                    {isEnabled ?
                        <> Día <MdWbSunny /> </> :
                        <> Noche <BsFillMoonFill /> </>}
                </p>
                <Link href="/genres"><a>Géneros <AiOutlineQuestion /> </a></Link>

                {responsive && <>
                    <a href="https://github.com/TaliAly/Neku">About <BsGithub /> </a>

                    <div className={style.menu}>
                        <Link href="/search"><a>Search</a></Link>
                        <p>Random</p>
                        <p>A - Z</p>
                        <p>Completos</p>
                    </div>

                </>}
            </span>
        </span>
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