import { supabase } from "../client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";


function ViewCreator() {
    const [creator, setCreator] = useState([]);
    const { name } = useParams();

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
        }

        getCreators()
    }, [name]);

    if (!creator) return <div>Loading...</div>
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
        </div>
    )
}

export default ViewCreator;