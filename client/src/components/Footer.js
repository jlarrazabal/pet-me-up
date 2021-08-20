import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className={"footer  bg-dark text-light text-center justify-content-center"} >
            <Link className={"nav-link"} to="/Home">Home</Link>
            <Link className={"nav-link"} to="/Home">Services</Link>
        </div>
    )
}
