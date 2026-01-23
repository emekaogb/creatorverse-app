import { Link } from "react-router-dom";

function Card({ creator }) {
    const { name, description, url, imageURL } = creator;

    return (
        <div className="card" style={{cursor: 'pointer'}}>
            <Link to={`/view/${name}`} className="card-link-wrapper">
                {imageURL && <img src={imageURL} alt={name} className="card-image" />}
                <h2 className="card-title">{name}</h2>
                {description && <p className="class_desc">{description}</p>}
            </Link>
            <Link to={`/edit/${name}`} className="edit-link-wrapper">
                <button>Edit</button>
            </Link>
            {url && <a href={url} className="card-link">Visit</a>}
        </div>
    );
}

export default Card;