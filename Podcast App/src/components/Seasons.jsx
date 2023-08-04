import React from "react";
import { useParams } from "react-router-dom";

export default function Seasons() {
  const params = useParams();
  const [seasons, setSeasons] = React.useState([]);
  const [selectedSeason, setSelectedSeason] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${params.id}`)
      .then((response) => response.json())
      .then((data) => setSeasons(data.seasons));
  }, [params.id]);

  const handleSeasonClick = (season) => {
    if (selectedSeason && selectedSeason.season === season.season) {
      // Clicked the same season button again to close
      setSelectedSeason(null);
    } else {
      setSelectedSeason(season);
    }
  };

  return (
    <div>
      {seasons.length > 0 ? (
        seasons.map((season) => (
          
          <div className="container text-center fw-light black-bg" key={season.season}>
            <button type="button" className="btn btn-outline-light "onClick={() => handleSeasonClick(season)}>
              <h4>{season.description}</h4>
              <img src={season.image} width="20%" alt={season.title} />
              {season.title}
            </button>
            {selectedSeason && selectedSeason.season === season.season && (
              <div>
                {selectedSeason.episodes.map((episode) => (
                  <div key={episode.id}>
                    <h3>{episode.title}</h3>
                    <p>{episode.description}</p>
                    <audio controls>
                      <source src={episode.file} />
                    </audio>
                    {/* Render other episode details here */}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <h2>Loading.....</h2>
      )}
    </div>
  );
}


              
            
     