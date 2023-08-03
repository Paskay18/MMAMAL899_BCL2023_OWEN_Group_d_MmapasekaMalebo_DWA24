import React from "react";
import Preview from "./Preview";


export default function PreviewData () {

    const [showPreviewData, setPreviewData] = React.useState([]);

    React.useEffect(() => {
      fetch("https://podcast-api.netlify.app/shows")
        .then((response) => response.json())
        .then((data) => setPreviewData(data));
    }, []);
  

    return (
<>

<Preview showPreviewData={showPreviewData}/>

</>



    )



}