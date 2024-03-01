import React from 'react';

import Ingoing from './Tables/Ingoing';
import Outgoing from './Tables/Outgoing';
import Total from './Tables/Total';
import Silos from './Tables/Silos';
import Transfer from './Tables/Transfer';
import Contracts from './Tables/Contracts';
export default function TableDetails(props) {
        const dataValue = props.dataValue;
        switch (dataValue) {
                case 'SILOS':
                        return <Silos />
                case 'INGOING':
                        return <Ingoing />
                case 'OUTGOING':
                        return <Outgoing/>
                case 'TOTAL':
                        return <Total/>
                case 'TRANSFER':
                        return <Transfer/>
                case 'CONTRACTS':
                        return <Contracts/>
                default:
                        return (<></>);

        }
}