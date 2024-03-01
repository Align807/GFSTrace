import React from 'react';
import FertiliserTable from './FertiliserTable';
import '../../Pages.css';

//import _ from 'lodash';

export default function InventoryFertilizer() {
   
  return(

<div  className= "table-size">
    
    <div className= "subheader">  
   
        <h1 style={{"color": "black"}}>Fertilizer Inventory </h1><span>&nbsp;&nbsp;</span>
  
    </div>
  
    <FertiliserTable/>
</div>

      );
}
