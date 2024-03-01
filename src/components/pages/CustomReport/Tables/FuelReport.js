import React from 'react'
import MaterialTable from 'material-table';
import { fuelreport_data } from './ReportTableData';
import Export from './export.png';
function FuelReport() {
    const [data, setData] = React.useState(fuelreport_data)
    const columns = [{
        title: 'Date', field: 'date',
      },
      {
        title: "Category", field: "category",
      },
      {
        title: 'Fuel', field: 'fuel',
      },
      {
        title: 'Amount', field: 'amount',
      },
      {
        title: 'Operator', field: 'operator',
      },
      ]
    return (
        <div>
      <MaterialTable title="Fuel"
        data={data}
        columns={columns}
        options={{
          maxBodyHeight: 400,
          search:false,
          exportButton: true,
        }}
        icons={{
          Export: () => <img src={Export}></img>,
        }}
      />
    </div>
    )
}

export default FuelReport
