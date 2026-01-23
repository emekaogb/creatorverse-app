import { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import Card from "../components/Card";

function Home() {
  const [creators, setCreators] = useState([])


  useEffect(() => {
    async function getCreators() {
      const { data, error } = await supabase
        .from('creators')
        .select('*');

      if (error) {
        console.error(error)
        return
      }

      setCreators(data)
    }

    getCreators()
  }, [])

  if (!creators.length) return <p>No creators</p>;

  return (
    <>
      <div className='card-container'>
        {creators.map((c) => (
          <Card key={c.name} creator={c} />
        ))}
      </div>

      <div>
        <Link to="/add">
          <button>Add Creator</button>
        </Link>
      </div>
    </>
  )
}

export default Home
