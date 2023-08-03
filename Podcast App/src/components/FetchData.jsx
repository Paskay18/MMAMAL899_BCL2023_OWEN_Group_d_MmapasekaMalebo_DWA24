import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Ofcanvas from "./Offcanvas";

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
  const [searchTerm, setSearchTerm] = React.useState(searchParams.get("search") || "");
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [sortDateOrder, setSortDateOrder] = React.useState("ascending");

  const [show, setShowData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setShowData(data));
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

  const showElements = sortedShows.map((show) => (
    <div key={show.id} className="col-6 col-sm-3 col-md-3">
      <div className="card" style={{ width: "100%" }}>
        <div className="container">
          <div className="row">
            <Link to={`/${show.id}`}>
              <img src={show.image} className="card-img-top" width="50%" alt={show.title} />
            </Link>
            {/* <Ofcanvas /> */}
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
          <button onClick={() => setSearchParams({ search: searchTerm })}>Search</button>
          <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
          </button>
          <button onClick={() => setSortDateOrder(sortDateOrder === "ascending" ? "desc" : "asc")}>
            Sort by Date {sortDateOrder === "ascending" ? "Newest First" : "Oldest First"}
          </button>
        </div>
      </div>
      <div className="row">{showElements}</div>
    </div>
  );
}

  
  
  
 
  // const sortedShows = filteredShows.slice().sort((a, b) => {
  //   const titleA = a.title.toLowerCase();
  //   const titleB = b.title.toLowerCase();
  //   if (sortOrder === "asc") {
  //     return titleA.localeCompare(titleB);
  //   } else {
  //     return titleB.localeCompare(titleA);
  //   }
  // });











 
// React.useEffect(()=> {
//     fetch("https://podcast-api.netlify.app/shows")
//     .then(response => response.json())
//     .then((data) => {

//         const fetching = data
//         .map((show) => {
           
//             return(
           
//             <div key={show.id} className="col-6 col-sm-3 col-md-3" >
//                  <div className="card" style={{width:"100%"}}>
//                  <div className="container">
//                 <div className="row">
                  
//                     <Link to = {`/${show.id}`}>
//             <img src={show.image} className="card-img-top" width = "50%"/>
            
//                 </Link>
                  
//                 </div>
//                 </div>
                
//                   </div>
//             </div>
//             );
//         });
//         setShowData(fetching);
//     })
//   }, []);




//  return (
//     <div className="container">
//     <div className="row">

//     <div >
//               <Link to="?genres=1" >Personal Growth</Link>
//               <Link to="?genres=2" >Crime & Journalism</Link>
//               <Link to="?genres=3">History</Link>
//               <Link to="?genres=4">Comedy</Link>
//               <Link to="?genres=5" >Entertainment</Link>
//               <Link to="?genres=6" >Business</Link>
//               <Link to="?genres=7">Fiction</Link>
//               <Link to="?genres=8">News</Link>
//               <Link to="?genres=9">Kids and Family</Link>
//               <Link to="." >Clear</Link>
//             </div>
//       {show}
//     </div>
//   </div>
// )

