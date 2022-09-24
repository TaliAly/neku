import useDarkMode from "../useDarkMode"
import style from "./config.module.scss"
import { IoSettings } from "react-icons/io5"

import { MdWbSunny } from "react-icons/md"
import { BsFillMoonFill, BsGithub } from "react-icons/bs"
import { useState, useRef, useEffect } from "react"



// This is de menu
function Modal({ setCloseModal }: any) {
    const { isEnabled, setIsEnabled } = useDarkMode();
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
                        <> Light Mode <MdWbSunny /> </> :
                        <> Dark mode <BsFillMoonFill /> </>}
                </p>
                <p> <a href="https://github.com/TaliAly/Neku"> About <BsGithub/></a></p>
            </span>
        </span>
    )
}


// this will show in the nav bar

function Config() {
    const [openModal, setOpenModal] = useState(false);
    const { isEnabled, setIsEnabled } = useDarkMode();


    useEffect(() => {

        if (window.localStorage.getItem("mode") == "true") {
            setIsEnabled(true);
            console.log(window.localStorage.getItem("mode"), isEnabled)
        }
    }, [])

    return (
        <>
            <IoSettings onClick={() => { setOpenModal(!openModal) }} />
            {openModal && <Modal setCloseModal={setOpenModal} />}
        </>
    )
}


export default Config