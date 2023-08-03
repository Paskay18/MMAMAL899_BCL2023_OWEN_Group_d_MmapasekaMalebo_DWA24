import React from "react";


export default function Preview (props) {
console.log(props)
    return (
<>

{props.showPreviewData.map((show, index)=>
<div>

<img src={show.image} alt="none" width="10%" />
<p>{show.description}</p>
<p>{show.seasons}</p>
<p>{show.updated}</p>

</div>)}



</>


    )





}