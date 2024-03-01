import React from 'react'
import MaterialTable from 'material-table';
import { chemicalreport_data } from './ReportTableData';
import Export from './export.png';
function ChemicalReport() {
    const [data, setData] = React.useState(chemicalreport_data)
    const columns = [{
        title: 'Date', field: 'date',
      },
      {
        title: "Category", field: "category",
      },
      {
        title: 'Chemicals', field: 'chemicals',
      },
      {
        title: 'Operator', field: 'operator',
      },
      ]
    return (
        <div>
      <MaterialTable title="Chemicals"
        data={data}
        columns={columns}
        options={{
          search:false,
          exportButton: true,
          maxBodyHeight: 400,
        }}
        icons={{
          Export: () => <img src={Export}></img>,
        }}
      />
    </div>
    )
}

export default ChemicalReport
