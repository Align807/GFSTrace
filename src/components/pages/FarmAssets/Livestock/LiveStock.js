import React from "react";
import '../../Pages.css';
import LsTable from "./LsTable";

export default function LiveStock() {
  return (

     <div  className= "table-size">
    
     <div className= "subheader">
              
         <h1 style={{"color": "black", "margin-bottom":"0px"}}>Livestock </h1><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
       </div>
 
       <LsTable />
     </div>
  );
}
