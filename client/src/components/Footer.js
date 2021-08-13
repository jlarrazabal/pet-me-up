import { Link } from "react-router-dom";
export default function Footer() {


    return (

        <div className="Footer" >
            <Link className="navlink" to="/Home">Home</Link>
            <Link className="navlink" to="/Home">Services</Link>
        </div>

    )
}
//Create a tag to connect services so it'll scroll down to the service section when clicked (look that up)