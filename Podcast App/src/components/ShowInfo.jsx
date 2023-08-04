import React from "react"
import { useParams } from "react-router-dom"
import Seasons from "./Seasons"
import { Link } from "react-router-dom"


export default function ShowDetails() {


    const params = useParams()
    const [show, setShowData] = React.useState(null)
  
    React.useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${params.id}`)
    .then(response =>response.json())
    .then(data => setShowData(data))


    }, [params.id])
  
  
    return (
    <div>
        {show ?(
           
           <div className="container text-center p-3 fw-light " key={show.id}>
            
            <Link to="/">
            <button type="button" className="btn btn-outline-light" >Back</button>
            
            
            </Link>
              <img className="rounded mx-auto d-block" src={show.image} width="40%"/>
              <h2>{show.title}</h2>
              <h4 className="description fw-light">{show.description}</h4>
             
              <Seasons />



           </div>

        )





        : <h2>Loading.....</h2>}



    </div>
  )
}