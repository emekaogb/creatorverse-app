import { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link, useLocation } from "react-router-dom";
import Card from "../components/Card";
import Landing from "../components/Landing";
import addIcon from "../assets/add_icon.png";

function Home() {
  const [creators, setCreators] = useState([])
  const location = useLocation();
  const [showAdd, setShowAdd] = useState(false);

  /* Fetch all creators from the database */
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

  /* Show add button if scrolled to creators */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400)  {
        setShowAdd(true);
      } else {
        setShowAdd(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  /* Scroll to creators if hashed in the link (returning from viewing a single creator) */
  useEffect(() => {
    if (creators.length > 0 && location.hash) {
      document.querySelector(location.hash)?.scrollIntoView();
    }
  }, [location.hash, creators]);

  /* Loading screen if still fetching creators */
  if (!creators.length) return <p>Loading...</p>;  

  return (
    <div className="home-wrapper">
      <div className="background"></div>

      <Landing />

      <div id="creators" className='card-container'>
        {creators.map((c) => (
          <Card key={c.name} creator={c} />
        ))}
      </div>

        {showAdd &&
          <Link to="/add">
            <button className="add-btn"><img src={addIcon} className="add-icon"/></button>
          </Link>
        }
    </div>
  )
}

export default Home
