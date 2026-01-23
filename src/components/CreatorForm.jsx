import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

function CreatorForm() {
    const { name: paramName } = useParams()
    const navigate = useNavigate();

    // Form state
    const [name, setName] = useState()
    const [url, setUrl] = useState()
    const [description, setDescription] = useState()
    const [imageURL, setImageURL] = useState()

    const [loading, setLoading] = useState(!!paramName);

    // Load existing creator if editing
    useEffect(() => {
        if (!paramName) return; // only fetch for edit

        async function getCreator() {
            setLoading(true)
            
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('name', paramName)
                .single();

            if (error) {
                console.error(error)
                return
            } else if (data) {
                setName(data.name)
                setUrl(data.url)
                setDescription(data.description)
                setImageURL(data.imageURL || "")
            }

            setLoading(false)
        }

        getCreator()
    }, [paramName])

    // Handle form submit
    async function handleSubmit(e) {
        e.preventDefault();

        if (paramName) { // editing
            const { error } = await supabase
                .from("creators")
                .update({ name, url, description, imageURL })
                .eq("name", paramName)
            
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

    if (loading) return <div>Loading creator data...</div>

    return (
        <div className="creator-form">
            <h2>{paramName ? "Edit Creator" : "Add Creator"}</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                <input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required/>
                <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                <input placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />

                <button type="submit">{paramName ? "Update" : "Add"} Creator</button>
            </form>
        </div>
    )
}


export default CreatorForm