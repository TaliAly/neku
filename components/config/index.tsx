import useDarkMode from "../useDarkMode"
import style from "./config.module.scss"
import { IoSettings } from "react-icons/io5"

import { MdWbSunny } from "react-icons/md"
import { BsFillMoonFill } from "react-icons/bs"
import { useState, useRef } from "react"


function Modal({setCloseModal}:any) {

    const { isEnabled, setIsEnabled } = useDarkMode();
    const ref = useRef(null);

    const handleClick = (target:any) => {

        if ( !(target.target == ref.current || target.target.parentElement == ref.current) ) {
            setCloseModal(false);
        }
    }

    return (
        <div className={style.modal} onClick={handleClick}>
            <div ref={ref}>
                <p onClick={ () => { setIsEnabled(!isEnabled) } }> 
                    {isEnabled ?
                    <> <MdWbSunny /> Light Mode </> :
                    <> <BsFillMoonFill /> Dark mode </>} 
                </p>
            </div>
        </div>
    )
}

function Config() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div>
            <IoSettings onClick={() => { setOpenModal(!openModal) }} />
            {openModal && <Modal setCloseModal={setOpenModal} />}
            <p></p>
        </div>
    )
}


export default Config