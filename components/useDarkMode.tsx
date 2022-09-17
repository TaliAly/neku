import { useEffect, useState } from "react";

export default function useDarkMode() {
    const [isEnabled, setIsEnabled] = useState((document.body.className == "dark-mode"));

    useEffect(
        () => {
            const className = "dark-mode";
            const element = window.document.body;

            if (isEnabled) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        },
        [isEnabled]
    );
    // Return enabled state and setter
    return {isEnabled, setIsEnabled};
}