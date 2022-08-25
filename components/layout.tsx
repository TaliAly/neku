
import Nav from "./nav"


function Layout({ children }) {
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