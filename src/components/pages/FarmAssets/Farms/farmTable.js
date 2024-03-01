import React, {useState} from 'react';
import {Menu} from 'semantic-ui-react';
import TableDetails from './tableDetails'


export default function FarmTable(props)  {
  const farm = props.farm;
    const [state, setState] = useState("PADDOCK"); 

      return (
        <div>
          <Menu pointing>
            <Menu.Item
              name='PADDOCKS'
              active={state === 'PADDOCK'}
             color="green"
             onClick={() => setState("PADDOCK")}
            />
            <Menu.Item
              name='FUEL TANKS'
              active={state === 'FUEL TANKS'}
              onClick={() => setState("FUEL TANKS")}
              color="green"
            />
            <Menu.Item
              name='SILOS'
              active={state === 'SILOS'}
              onClick={() => setState("SILOS")}
              color="green"
            />
            <Menu.Item
              name='WATER STORAGES'
              active={state === 'WATER STORAGES'}
              onClick={() => setState("WATER STORAGES")}
              color="green"
            />
          
           
          </Menu>
          
         <TableDetails dataValue={state} farm={farm}/>
      <br></br>
         
        </div>
    );
  }
