import React from "react";

const Image = ({ src, idString, onClick }) => {
    return (
        <img alt="mole" src={src} id={idString} onClick={onClick} />
    );
};

export default Image;