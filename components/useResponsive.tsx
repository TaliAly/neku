import {useState, useEffect} from "react"

function isBrowser() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  }

function useResponsive() {
    const [responsive, setResponsive] = useState(true)

    useEffect(() => {
        if (window.innerWidth >= 700) {
            setResponsive(false);
        }
        console.log(window.innerWidth, responsive);
        
    }, [isBrowser() && window.innerWidth]);

    return {responsive}
}

export default useResponsive