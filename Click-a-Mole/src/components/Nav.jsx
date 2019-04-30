import React from "react";
import Container from "./Container"

const Nav = ( {children} ) => {
    return (
        <nav className="navbar">
            <Container>
                <ul className="navbar-list">
                    {children}
                    {/* scores will go here */}
                </ul>
            </Container>
        </nav>
    );
}

export default Nav;