import React, {useState} from 'react'
import { Segment } from 'semantic-ui-react';
import {Menu} from 'semantic-ui-react';
import TableDetails from './Tabledetails'
import "./Water.css"


export default function InventoryWaterTable()  {
    const [state, setState] = React.useState("STORAGES"); 

      return (
        <div className="water">
          <Menu pointing>
            <Menu.Item
              name='STORAGES'
              active={state === 'STORAGES'}
             color="green"
             onClick={() => setState("STORAGES")}
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
          
           
          </Menu>
          <Segment attached='bottom'>
         <TableDetails dataValue={state}/>
        </Segment>
         
        </div>
    );
  }