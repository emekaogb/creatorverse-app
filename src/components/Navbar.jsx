import { Link } from "react-router-dom";
import homeIcon from "../assets/home_icon.png";

function Navbar() {
    return (
        <Link to="/#creators" className="navbar" state={true}>
            <button>
                <img src={homeIcon} className="home-icon" />
            </button>
        </Link>
    )
}

export default Navbar;