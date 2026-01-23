import { Link, useLocation } from "react-router-dom";
import Card from "../components/Card";


function ViewCreator() {
    const location = useLocation();
    const { creator } = location.state || {};

    if (!creator) return <div>No creator selected.</div>
    //const { dummy, description, url, imageURL } = creator;

    // Some sort of display HTML
    return (
        <div className="creator-view">
            <h2>{creator.name}</h2>

            <img
                src={creator.imageURL}
                alt={creator.name}
                width={300}
            />

            <p>{creator.description}</p>

            <a href={creator.url} target="_blank" rel="noreferrer">
                Visit Creator
            </a>

            <Link to={`/edit/${creator.name}`} state={{creator}} className="edit-link-wrapper">
                <button>Edit</button>
            </Link>
        </div>
    )
}

export default ViewCreator;