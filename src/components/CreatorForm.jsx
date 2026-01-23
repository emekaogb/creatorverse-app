import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

function CreatorForm({ creator }) {
    const initialName = creator?.name || ""
    const navigate = useNavigate();

    // Form state
    const [name, setName] = useState(creator?.name || "");
    const [url, setUrl] = useState(creator?.url || "");
    const [description, setDescription] = useState(creator?.description || "");
    const [imageURL, setImageURL] = useState(creator?.imageURL || "");

    // Handle form submit
    async function handleSubmit(e) {
        e.preventDefault();

        if (creator) { // editing
            const { error } = await supabase
                .from("creators")
                .update({ name, url, description, imageURL })
                .eq("name", initialName)
            
            if (error) {
                console.error(error)
                return;
            }
        } else { // adding
            const { error } = await supabase
                .from("creators")
                .insert([{ name, url, description, imageURL }]);

            if (error) {
                console.error(error)
                return;
            }
        }
        navigate("/")
    }

    return (
        <div className="creator-form">
            <h2>{creator ? "Edit Creator" : "Add Creator"}</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                <input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required/>
                <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                <input placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />

                <button type="submit">{creator ? "Update" : "Add"} Creator</button>
            </form>
        </div>
    )
}


export default CreatorForm