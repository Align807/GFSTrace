import React, {useState} from 'react'
import { Segment } from 'semantic-ui-react';
import {Menu} from 'semantic-ui-react';
import TableDetails from './Tabledetails'
import "./Chemical.css"


export default function InventoryChemicalTable()  {
    const [state, setState] = React.useState("CHEMICALS"); 

      return (
        <div className="chemical">
          <Menu pointing>
            <Menu.Item
              name='CHEMICALS'
              active={state === 'CHEMICALS'}
             color="green"
             onClick={() => setState("CHEMICALS")}
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
              name='STOCKTAKE'
              active={state === 'STOCKTAKE'}
              onClick={() => setState("STOCKTAKE")}
              color="green"
            />
          
           
          </Menu>
          <Segment attached='bottom'>
         <TableDetails dataValue={state}/>
        </Segment>
         
        </div>
    );
  }