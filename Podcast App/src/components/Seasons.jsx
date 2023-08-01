import React from "react";
import { useParams } from "react-router-dom";

export default function ShowDetails() {
  const params = useParams();
  const [seasons, setSeasons] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${params.id}`)
      .then((response) => response.json())
      .then((data) => setSeasons(data.seasons));
  }, [params.id]);

  return (
    <div>
      {seasons.length > 0 ? (
        seasons.map((season) => (
          <div key={season.season}>
          
           <button>   
        <img src={season.image} width="20%" /> {season.title}
           </button>
          
            <h4>{season.description}</h4>
            <h4>Episodes:</h4>
            
              {season.episodes.map((episode) => (
                <div key={episode.id}>
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                  {/* Render other episode details here */}
                </div>
              ))}
            
          </div>
        ))
      ) : (
        <h2>Loading.....</h2>
      )}
    </div>
  );
}
