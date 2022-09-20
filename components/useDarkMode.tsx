import { useEffect, useState } from "react";

const useDarkMode = () => {
    const [isEnabled, setIsEnabled] = useState((document.body.className == "dark-mode"));
    const Storage = window.localStorage;

    useEffect( () => {
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
    return {isEnabled, setIsEnabled};
}

export default useDarkMode