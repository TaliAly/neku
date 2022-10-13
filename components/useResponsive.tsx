import { useState, useEffect } from "react"

function isBrowser() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

function useResponsive() {
    const [responsive, setResponsive] = useState(false)

    useEffect(() => {
        if (window.innerWidth <= 700) {
            setResponsive(true);
        }

    }, [isBrowser() && window.innerWidth]);

    isBrowser() && window.addEventListener("resize",
        () => {
            if (window.innerWidth > 700) {
                setResponsive(false);
            }
            else if (window.innerWidth <= 700) {
                setResponsive(true);
            }
        }, { passive: true })

    return { responsive }
}

export default useResponsive