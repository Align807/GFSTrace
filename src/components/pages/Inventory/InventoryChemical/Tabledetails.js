import React from 'react';
import Chemicals from './Tables/Chemicals';
import Ingoing from './Tables/Ingoing';
import Outgoing from './Tables/Outgoing';
import StockTake from './Tables/StockTake';
export default function TableDetails(props) {
        const dataValue = props.dataValue;
        switch (dataValue) {
                case 'CHEMICALS':
                        return <Chemicals />
                case 'INGOING':
                        return <Ingoing />
                case 'OUTGOING':
                        return <Outgoing/>
                case 'STOCKTAKE':
                        return <StockTake/>
                default:
                        return (<></>);

        }
}