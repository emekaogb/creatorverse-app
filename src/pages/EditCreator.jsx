import { useLocation } from "react-router-dom";
import CreatorForm from "../components/CreatorForm";
import Navbar from "../components/Navbar";


function EditCreator() {
    const location = useLocation();
    const { creator } = location.state || {};

    if (!creator) return <div>No creator selected.</div>

    return (
        <div>
            <Navbar />
            <CreatorForm creator={creator} />
        </div> 
    )

}

export default EditCreator;