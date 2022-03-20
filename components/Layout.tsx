import Footer from "./footer"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
    return(
        <>
            <Navbar/>
                <div className="md:container pt-16 md:mx-auto bg-white">
                    { children }
                </div>
            <Footer/>
        </>
    )
}

export default Layout