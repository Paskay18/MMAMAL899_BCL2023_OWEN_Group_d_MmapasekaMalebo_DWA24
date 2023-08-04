import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const genres = {
  1: "Personal Growth",
  2: "True Crime and Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

export default function HomeData() {
  // To search
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = parseInt(searchParams.get("genres"));
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortDateOrder, setSortDateOrder] = useState("ascending");
  const [showGenres, setShowGenres] = useState(false); // State to toggle genres visibility
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showDescriptions, setShowDescriptions] = useState({}); // State to control the visibility of descriptions
  const [show, setShowData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track the loading state

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        setShowData(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  const filteredShows = show.filter(
    (show) =>
      (!typeFilter || show.genres.includes(typeFilter)) &&
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedShows = filteredShows.slice().sort((a, b) => {
    const titleCompare = a.title.localeCompare(b.title);
    if (titleCompare !== 0) {
      return sortOrder === "asc" ? titleCompare : -titleCompare;
    } else {
      const dateA = new Date(a.updated).getTime();
      const dateB = new Date(b.updated).getTime();
      return sortDateOrder === "ascending" ? dateA - dateB : dateB - dateA;
    }
  });

  const handleToggleDescription = (showId) => {
    setShowDescriptions((prevState) => ({
      ...prevState,
      [showId]: !prevState[showId],
    }));
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
  const showElements = sortedShows.map((show) => (
    <div key={show.id} className="col-6 col-sm-3 col-md-3 black-bg container p-2 text-center fw-light p-3">
      <div className="card" style={{ width: "100%" }}>
        <div className="container">
          <div className="row">
            <Link to={`/${show.id}`}>
              <img src={show.image} className="card-img-top" width="50%" alt={show.title} />
            </Link>
            <div>
              <h3>
                {/* Button to toggle description */}
                <button
                  type="button"
                  className="btn btn-outline-light fw-light fs-5"
                  onClick={() => handleToggleDescription(show.id)}
                >
                  {showDescriptions[show.id] ? "Hide Description" : "Show Description"}
                </button>
              </h3>
              {/* Show the description only if showDescriptions[show.id] is true */}
              {showDescriptions[show.id] && <h3>{show.description}</h3>}
              {/* Format the date in a human-readable format */}
              <h3 className="lastUpdated fw-light fs-5">
                Last updated: {formatUpdatedAt(show.updated)}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className="row">
        <div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => setSearchParams({ search: searchTerm })}
          >
            Search
          </button>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
          </button>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() =>
              setSortDateOrder(sortDateOrder === "ascending" ? "desc" : "asc")
            }
          >
            Sort by Date {sortDateOrder === "ascending" ? "Newest First" : "Oldest First"}
          </button>
          <Link to="/">
            <button type="button" className="btn btn-outline-light">
              Back
            </button>
          </Link>
        </div>
      </div>
      <div>
        {/* Genres button */}
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={() => setShowGenres((prevState) => !prevState)}
        >
          Genres
        </button>
        {showGenres && (
          <ul>
            {Object.keys(genres).map((genreId) => (
              <div key={genreId}>
                <button className="btn btn-outline-light">
                  <Link to={`?genres=${genreId}`}>{genres[genreId]}</Link>
                </button>
              </div>
            ))}
            <div>
              <button className="btn btn-outline-light">
                <Link to=".">Clear</Link>
              </button>
            </div>
          </ul>
        )}
      </div>
      {/* Show loading state if data is still being fetched */}
      {loading ? <h2>Loading...</h2> : <div className="row">{showElements}</div>}
    </div>
  );
}
