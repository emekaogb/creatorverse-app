import { useLocation } from "react-router-dom";
import CreatorForm from "../components/CreatorForm";


function EditCreator() {
    const location = useLocation();
    const { creator } = location.state || {};

    if (!creator) return <div>No creator selected.</div>

    return (
        <CreatorForm creator={creator} />
    )

}

export default EditCreator;