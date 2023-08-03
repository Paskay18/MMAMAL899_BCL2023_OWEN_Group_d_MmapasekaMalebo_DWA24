import React from "react"
import { useParams } from "react-router-dom"
import Seasons from "./Seasons"


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
    
           <div key={show.id}>
              <img src={show.image} width="50%"/>
              <h2>{show.title}</h2>
              <h4>{show.description}</h4>
              <Seasons />



           </div>

        )





        : <h2>Loading.....</h2>}



    </div>
  )
}