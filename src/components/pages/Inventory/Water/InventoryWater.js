import React from 'react';
import InventoryWaterTable from './InventoryWaterTable';
import '../../Pages.css';

//import _ from 'lodash';

export default function InventoryWater() {
   
  return(

<div  className= "table-size">
    
    <div className= "subheader">  
   
        <h1 style={{"color": "black"}}>Water Inventory </h1><span>&nbsp;&nbsp;</span>
  
    </div>
  
    <InventoryWaterTable/>
</div>

      );
}


    
 