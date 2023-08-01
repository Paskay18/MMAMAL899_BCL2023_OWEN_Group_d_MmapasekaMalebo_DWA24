import React from "react";
import {Link} from "react-router-dom";


export default function HomeData () {
    console.log()

const [show, setShowData] = React.useState([])


React.useEffect(()=> {
    fetch("https://podcast-api.netlify.app/shows")
    .then(response => response.json())
    .then((data) => {

        const fetching = data.map((show) => {
           
            return(
           
            <div key={show.id} className="col-6 col-sm-3 col-md-3" >
                 <div className="card" style={{width:"100%"}}>
                 <div className="container">
                <div className="row">
                  
                    <Link to = {`/${show.id}`}>
            <img src={show.image} className="card-img-top" width = "50%"/>
            
                </Link>
                  
                </div>
                </div>
                
                  </div>
            </div>
            );
        });
        setShowData(fetching);
    })
  }, []);




 return (
    <div className="container">
    <div className="row">
      {show}
    </div>
  </div>
)

}