import React from 'react';
import InventoryChemicalTable from './InventoryChemicalTable';
import '../../Pages.css';

//import _ from 'lodash';

export default function InventoryChemical() {
   
  return(

<div  className= "table-size">
    
    <div className= "subheader">  
   
        <h1 style={{"color": "black"}}>Chemical Inventory </h1><span>&nbsp;&nbsp;</span>
  
    </div>
  
    <InventoryChemicalTable/>
</div>

      );
}


    
 