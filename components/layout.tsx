import Nav from "./nav"
import React from "react"
import style from "./layout.module.scss"

type Props = {
    children: React.ReactNode;
}

function Layout({ children }: Props) {
    return (
        <>
            <Nav />
            
            <main className={style.layout}>
                {children}
            </main>
        </>
    )
}

export default Layout