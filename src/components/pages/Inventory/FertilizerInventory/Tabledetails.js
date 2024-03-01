import React from 'react';
import Fertilisers from './Tables/Fertilisers';
import Ingoing from './Tables/Ingoing';
import Outgoing from './Tables/Outgoing';
import StockTake from './Tables/StockTake';
export default function TableDetails(props) {
        const dataValue = props.dataValue;
        switch (dataValue) {
                case 'FERTILISERS':
                        return <Fertilisers />
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