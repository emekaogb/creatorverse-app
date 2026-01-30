import { Link } from "react-router-dom";

function Navbar() {
    return (
        <Link to="/" className="navbar">
            <button>Home</button>
        </Link>
    )
}

export default Navbar;