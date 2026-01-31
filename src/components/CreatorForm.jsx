import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import defaultImg from "../assets/default image.png"

function CreatorForm({ creator }) {
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
                .eq("name", creator.name)
            
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
        navigate("/#creators")
    }

    async function handleDelete() {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${creator.name}?`
        )
        if (!confirmed) return;

        const { error } = await supabase
            .from("creators")
            .delete()
            .eq("name", creator.name)

        if (error) {
            console.error(error)
            alert("Failed to delete creator.")
            return;
        }

        navigate("/#creators");
    }

    return (
        <div className="creator-form">
            {/*<h2>{creator ? "Edit Creator" : "Add Creator"}</h2>*/}
            <form onSubmit={handleSubmit}>
                <img 
                    className="picture profile-picture"
                    src={imageURL || defaultImg}
                    alt={name}
                    width={300}
                />
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                <input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required/>
                <textarea placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input placeholder="Image URL (optional)" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
                
                <button type="submit">{creator ? "Update" : "Add"} Creator</button>
                {creator && <button onClick={handleDelete}>Delete Creator</button>}
            </form>
        </div>
    )
}


export default CreatorForm