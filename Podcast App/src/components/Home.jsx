 import React from "react";
 import HomeData from "./FetchData";
 import Carousel from "./Carousel";
 import { Link } from "react-router-dom";

 export default function Home () {
 

    
    return (
    <div className= "App">
        <nav className= "App-Header">
        <Link className="nav-link active" to="/">Home</Link>
        </nav>
        <Carousel />
          <HomeData />
    </div>
    )
}