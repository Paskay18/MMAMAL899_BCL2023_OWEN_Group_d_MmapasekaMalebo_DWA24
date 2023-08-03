import React from "react";
import PreviewData from "./PreviewData";


export default function Ofcanvas () {
    return(

        <div >
<button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Toggle bottom offcanvas</button>

<div className="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
  <div className="offcanvas-header">
    <PreviewData class="offcanvas-title" id="offcanvasBottomLabel" />
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body small">
    ...
  </div>
</div>
</div>

)}