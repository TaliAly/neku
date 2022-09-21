import { useEffect, useState } from "react";

function isBrowser() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  }

const useDarkMode = () => {
    const [isEnabled, setIsEnabled] = useState(isBrowser() && (document.body.className == "dark-mode"));

    if (typeof window !== "undefined") {
        var Storage = window.localStorage;
    }
    
    useEffect(() => {
        const className = "dark-mode";
        const element = window.document.body;

        if (isEnabled) {
            element.classList.add(className);
            Storage.setItem("mode", "true")
        } else {
            element.classList.remove(className);
            Storage.removeItem("mode");
        }
    },
        [isEnabled]
    );
    // Return enabled state and setter
    return { isEnabled, setIsEnabled };
}

export default useDarkMode