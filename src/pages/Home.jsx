import { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link, useLocation } from "react-router-dom";
import Card from "../components/Card";
import Landing from "./Landing";

function Home() {
  const [creators, setCreators] = useState([])
  const location = useLocation();
  const [showAdd, setShowAdd] = useState(!!location.state || false);


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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 || !!location.state)  {
        setShowAdd(true);
      } else {
        setShowAdd(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  if (!creators.length) return <p>Loading...</p>;

  

  return (
    <div className="home-wrapper">
      <div className="background"></div>

      {!location.state && <Landing />}

      <div className='card-container'>
        {creators.map((c) => (
          <Card key={c.name} creator={c} />
        ))}
      </div>

        {showAdd &&
          <Link to="/add">
            <button className="add-btn">Add</button>
          </Link>
        }
    </div>
  )
}

export default Home
