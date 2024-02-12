import React from "react";
import Header from "./header/Navbar";
import Footer from "./footer/Footer";

type Props = {
    children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
    return (
        <section>
            <Header />
            {children}
            <Footer />
        </section>
    )
}

export default Layout;