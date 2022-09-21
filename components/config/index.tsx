import useDarkMode from "../useDarkMode"
import style from "./config.module.scss"
import { IoSettings } from "react-icons/io5"

import { MdWbSunny } from "react-icons/md"
import { BsFillMoonFill } from "react-icons/bs"
import { useState, useRef, useEffect } from "react"



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
                        <> <MdWbSunny /> Light Mode </> :
                        <> <BsFillMoonFill /> Dark mode </>}
                </p>
            </span>
        </span>
    )
}

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