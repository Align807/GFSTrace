import React from 'react'
import PaddockReport from './Tables/PaddockReport';
import EquipmentReport from './Tables/EquipmentReport';
import GrainReport from './Tables/GrainReport';
import ChemicalReport from './Tables/ChemicalReport';
import FuelReport from './Tables/FuelReport';
import FertiliserReport from './Tables/FertiliserReport';
import FarmReport from './Tables/FarmReport';
function ReportTableDetails(props) {
    const dataValue = props.dataValue;
    switch (dataValue) {
        case '2':
            return <PaddockReport/>
        case '3':
            return <EquipmentReport/>
        case '4':
            return <GrainReport/>
        case '5':
            return <ChemicalReport/>
        case '6':
            return <FuelReport/>
        case '7':
            return <FertiliserReport/>
        default:
            return <FarmReport/>;

    }
}

export default ReportTableDetails

