
import Nav from "./nav"
import React from "react"

type Props = {
    children:React.ReactNode;
}

function Layout({ children }:Props ) {
    return (
        <>
            <Nav />
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout