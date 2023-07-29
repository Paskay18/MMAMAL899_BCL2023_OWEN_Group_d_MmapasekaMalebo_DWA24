import React from "react";


export default function HomeData () {

const [show, setShowData] = React.useState([])


React.useEffect(()=> {
    fetch("https://podcast-api.netlify.app/shows")
    .then(response => response.json())
    .then((data) => {
        const fetching = data.map((show) => {
            return(
            <div key={show.id}>
            <h1>{show.title}</h1>
              
            <img src={show.image} width = "50%"/>
                
                  </div>
            );
        });
        setShowData(fetching);
    })
  }, []);




 return (
    <div>
        {show}
    </div>
)

}