import React from "react";
import NTable from "./NTable";
import '../../Pages.css';
export default function Nozzles() {
  return (
    
       <div  className= "table-size">
    
    <div className= "subheader">
             
        <h1 style={{"color": "black", "margin-bottom":"0px"}}>Nozzles </h1><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>

      <NTable />
    </div>
  );
}
