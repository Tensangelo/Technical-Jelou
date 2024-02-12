import React from "react";
import Header from "./header/Navbar";

type Props = {
    children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
    return (
        <section>
            <Header />
            {children}
        </section>
    )
}

export default Layout;