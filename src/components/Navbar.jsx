import { Link } from "react-router-dom";

function Navbar() {
    return (
        <Link to="/" className="navbar">
            <div>Home</div>
        </Link>
    )
}

export default Navbar;