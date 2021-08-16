import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="Footer" >
            <Link className="navlink" to="/Home">Home</Link>
            <Link className="navlink" to="/Home">Services</Link>
        </div>
    )
}
