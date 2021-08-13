import { Link } from "react-router-dom";

 const Header = () =>(
    
            <div className = "header">
                <nav id="navigation">
                    <h1>
                        Pet Me Up
                    </h1>

                    <Link className="navlink" to ="/">Home</Link>
                    <Link className="navlink" to ="/">Services</Link>
                    <Link className="navlink" to ="/">Login/Register</Link>
                    <Link className="navlink" to ="/">Dashboard</Link>
                    <Link className="navlink" to ="/">Appointment</Link>
                </nav>
            </div>
        
    );
export default Header;
