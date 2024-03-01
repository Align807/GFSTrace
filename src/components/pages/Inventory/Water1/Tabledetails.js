import React from 'react';
import Storages from './Tables/Storages';
import Ingoing from './Tables/Ingoing';
import Outgoing from './Tables/Outgoing';
export default function TableDetails(props) {
        const dataValue = props.dataValue;
        switch (dataValue) {
                case 'STORAGES':
                        return <Storages />
                case 'INGOING':
                        return <Ingoing />
                case 'OUTGOING':
                        return <Outgoing/>
                default:
                        return (<></>);

        }
}