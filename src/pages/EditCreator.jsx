import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useNavigate, useParams } from "react-router-dom";


function EditCreator() {
    const [creator, setCreator] = useState([]);
    const { name: initialName } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState(initialName)
    const [url, setUrl] = useState()
    const [description, setDescription] = useState()
    const [imageURL, setImageURL] = useState()

    useEffect(() => {
        async function getCreators() {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('name', name)
                .single();

            if (error) {
                console.error(error)
                return
            }

            setCreator(data);
            setUrl(creator.url)
            setDescription(creator.description)
            setImageURL(creator.imageURL)
        }

        getCreators()
    },);

    if (!creator) return <div>Loading...</div>
   

    async function handleSubmit(e) {
        e.preventDefault();

        const { error } = await supabase
            .from("creators")
            .update({ name, url, description, imageURL })
            .eq("name", name)
            
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
            <input placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />

            <button type="submit">Add Creator</button>
        </form>
    )

}

export default EditCreator;