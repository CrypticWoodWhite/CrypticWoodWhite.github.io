import React from "react";
import Image from "../Image";
import Mole from "./molebackground.png";

const Footer = () => {
    return (
        <section className="footer">
            <Image
                src={Mole}
                key="background"
                className="background"
            />
        </section>
    );
}

export default Footer;