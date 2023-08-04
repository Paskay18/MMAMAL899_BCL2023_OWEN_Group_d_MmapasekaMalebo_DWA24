import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import NavBar from './NavBar';

export default function HomeLandingPage() {
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        const showsWithVisibility = data.map((show) => ({
          ...show,
          showDescription: false,
        }));
        setShows(showsWithVisibility);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  const handleToggleDescription = (showId) => {
    setShows((prevShows) =>
      prevShows.map((prevShow) => {
        if (prevShow.id === showId) {
          return {
            ...prevShow,
            showDescription: !prevShow.showDescription,
          };
        } else {
          return prevShow;
        }
      })
    );
  };

  const formatUpdatedAt = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };
  

  return (
    <div className="black-bg container p-2 text-center">
      <NavBar />
      
      <Carousel />
      {/* Show loading state if data is still being fetched */}
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="row row-cols-2 row-cols-md-4 g-4">
          {shows.map((show) => (
            <div key={show.id} className="col">
              <div className="card h-100 p-2 bg-black text-light">
                <Link to={`/${show.id}`}>
                  <img src={show.image} className="card-img-top" alt={show.title} />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{show.title}</h5>
                  <p className="card-text">Seasons: {show.seasons}</p>
                  <p className="card-text">Last updated:{formatUpdatedAt(show.updated)}</p>
                  {/* Button to show/hide description */}
                  <button
                    type="button"
                    className="btn btn-outline-light fw-light"
                    onClick={() => handleToggleDescription(show.id)}
                  >
                    {show.showDescription ? 'Hide Description' : 'Show Description'}
                  </button>
                  {/* Show the description only if show.showDescription is true */}
                  {show.showDescription && <p className="card-text">{show.description}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

