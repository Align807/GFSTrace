import React from 'react';
import PaddockTable from './PaddockTable';
import FueltankTable from './FueltankTable';
import SiloTable from './SiloTable';
import WaterStorageTable from './WaterStorageTable';

export default function TableDetails(props) {
  const dataValue = props.dataValue;
    switch (dataValue) {
    case 'PADDOCK':
            return <PaddockTable/>
    case 'FUEL TANKS':
            return <FueltankTable/>
    case 'SILOS':
            return <SiloTable/>
    case 'WATER STORAGES':
           return <WaterStorageTable/>
    
     default:
         return( <></>  ) ;
    }
}
