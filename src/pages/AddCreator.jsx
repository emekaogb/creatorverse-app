import { supabase } from "../client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCreator() {
    const [name, setName] = useState()
    const [url, setUrl] = useState()
    const [description, setDescription] = useState()
    const [imageURL, setImageURL] = useState()
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const { error } = await supabase
            .from("creators")
            .insert([
                { name, url, description, imageURL }
            ]);
        
        if (error) {
            console.error(error)
        } else {
            navigate("/")
        }
    }
    
    
    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
            <input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required/>
            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
            <input placeholder="Image URL (optional)" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />

            <button type="submit">Add Creator</button>
        </form>
    )
    
}

export default AddCreator;