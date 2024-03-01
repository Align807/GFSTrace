import React from 'react'
import MaterialTable from 'material-table';
import { grainreport_data } from './ReportTableData';
import Export from './export.png';
function GrainReport() {
    const [data, setData] = React.useState(grainreport_data)
    const columns = [{
        title: 'Date', field: 'date',
      },
      {
        title: "Category", field: "category",
      },
      {
        title: 'Cultivar', field: 'cultivar',
      },
      {
        title: 'Amount', field: 'amount',
      },
      {
        title: 'Operators', field: 'operators',
      },
      ]
    return (
        <div>
      <MaterialTable title="Grain"
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

export default GrainReport
