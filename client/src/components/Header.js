import React from 'react'
import { Link, useLocation } from "react-router-dom";

const Header = (props) => {
 const location = useLocation();
 //<Link className={location.pathname === '/' ? "nav-link active" : "nav-link"} to ="/register">Register</Link> :
 const authLink = (props.auth.isAuthenticated === false ) ?
 <Link className={location.pathname === '/' ? "nav-link active" : "nav-link"} to ="/login">Login</Link> :
 <Link className={location.pathname === '/' ? "nav-link active" : "nav-link"} to ="/logout">Logout</Link> ;
    return (
            <div className = "header sticky-top">
                <nav className={"navbar navbar-expand-lg navbar-dark bg-dark font"} id="navigation">
                    <h1 className={"topText navbar-brand text-warning fs-1"}>Pet Me Up!</h1><span className={"fa fa-paw icon"}></span>
                    <div className={"navbar-nav collapse navbar-collapse justify-content-end"}>
                    <Link className={location.pathname === '/' ? "nav-link active" : "nav-link"} to ="/">Home</Link>
                    {authLink}
                    <Link className={location.pathname === '/' ? "nav-link active" : "nav-link"} to ="/dashboard">Dashboard</Link>
                    <Link className={location.pathname === '/' ? "nav-link active" : "nav-link"} to ="/appointment">Appointment</Link>
                    </div>
                </nav>
            </div>
    );
 };
export default Header;
