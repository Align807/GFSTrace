import React from 'react';

import Ingoing from './Tables/Ingoing';
import Outgoing from './Tables/Outgoing';
import Total from './Tables/Total';
import FuelTank from './Tables/FuelTank';
import StockTake from './Tables/StockTake';
export default function TableDetails(props) {
        const dataValue = props.dataValue;
        switch (dataValue) {
                case 'FUELTANK':
                        return <FuelTank />
                case 'INGOING':
                        return <Ingoing />
                case 'OUTGOING':
                        return <Outgoing/>
                case 'TOTAL':
                        return <Total/>
                case 'STOCKTAKE':
                        return <StockTake/>
                
                default:
                        return (<></>);

        }
}