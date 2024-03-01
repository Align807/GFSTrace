import React, {useState} from 'react'
import { Segment } from 'semantic-ui-react';
import {Menu} from 'semantic-ui-react';
import TableDetails from './Tabledetails'
import "./Fertiliser.css"


export default function FertiliserTable()  {
    const [state, setState] = React.useState("FERTILISERS"); 

      return (
        <div className="fertiliser">
          <Menu pointing>
            <Menu.Item
              name='FERTILISERS'
              active={state === 'FERTILISERS'}
             color="green"
             onClick={() => setState("FERTILISERS")}
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
              name='STOKETAKE'
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