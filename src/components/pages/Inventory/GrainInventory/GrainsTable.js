import React, {useState} from 'react'
import { Segment } from 'semantic-ui-react';
import {Menu} from 'semantic-ui-react';
import TableDetails from './Tabledetails'
import "./Grains.css"


export default function GrainsTable()  {
    const [state, setState] = React.useState("SILOS"); 

      return (
        <div  className= "table-size">
    
    <div className= "subheader">  
   
        <h1 style={{"color": "black"}}>Grain Inventory </h1><span>&nbsp;&nbsp;</span>
  
    </div>
        <div className="chemical">
          <Menu pointing>
            <Menu.Item
              name='SILOS'
              active={state === 'SILOS'}
             color="green"
             onClick={() => setState("SILOS")}
            />
            <Menu.Item
              name='INGOING'
              active={state === 'INGOING'}
              onClick={() => setState("INGOING")}
              color="green"
            />
            <Menu.Item
              name='OUTGOING'
              active={state === 'OUTGOING'}
              onClick={() => setState("OUTGOING")}
              color="green"
            />
            
            <Menu.Item
              name='TRANSFER'
              active={state === 'TRANSFER'}
              onClick={() => setState("TRANSFER")}
              color="green"
            />
            <Menu.Item
              name='CONTRACTS'
              active={state === 'CONTRACTS'}
              onClick={() => setState("CONTRACTS")}
              color="green"
            />
            <Menu.Item
              name='TOTAL'
              active={state === 'TOTAL'}
              onClick={() => setState("TOTAL")}
              color="green"
            />
          
           
          </Menu>
          <Segment attached='bottom'>
         <TableDetails dataValue={state}/>
        </Segment>
         </div>
        </div>
    );
  }