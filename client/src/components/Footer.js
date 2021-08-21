import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className={"footer  row bg-dark text-light text-center justify-content-center"} >
            <Link className={"nav-link text-warning"} to="/Home">Pet me up!  <span className={"fa fa-paw"}></span>  | Copyright 2021</Link>
        </div>
    )
}
