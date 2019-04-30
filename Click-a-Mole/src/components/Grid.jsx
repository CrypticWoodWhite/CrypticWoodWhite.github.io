import React from "react";

export function Container({ children }) {
    return(
        <div className="container">
            {children}
        </div>
    );
};

export function Row({ idNumber, children }) {
    return (
        <section className="row" id={idNumber}>
            {children}
        </section>
    );
};

export function Column({ idNumber, children }) {
    return (
        <section className="three columns" id={idNumber}>
            {children}
        </section>
    );
};