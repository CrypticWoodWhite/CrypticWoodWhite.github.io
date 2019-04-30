import React from "react";

const Scores = ({ children }) => {
    return (
        <li className="navbar-item">
            {children}
        </li>
    );
}

export default Scores;