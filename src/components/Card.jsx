import { Link } from "react-router-dom";
import editIcon from "../assets/edit.png";
import defaultImg from "../assets/default image.png";
import externalLink from "../assets/external-link.png";

function Card({ creator }) {
    const { name, /*description, */ url, imageURL } = creator;

    return (
        <div className="card" style={{backgroundImage: imageURL ? `url(${imageURL})` : `url(${defaultImg})`}}>
            <Link to={`/view/${name}`} state={{creator}} className="card-link-wrapper">
                {/*{imageURL && <img src={imageURL} alt={name} className="card-image" />}*/}
                <h2 className="card-title">{name}</h2>
                {/*{description && <p className="class_desc">{description}</p>}*/}
            </Link>
            <Link to={`/edit/${name}`} state={{creator}} className="edit-link-wrapper">
                <button className="card-edit-btn"><img src={editIcon} className="edit-icon"/></button>
            </Link>
            {url && <a href={url} className="card-link"><img src={externalLink} className="visit-icon"/></a>}
        </div>
    );
}

export default Card;