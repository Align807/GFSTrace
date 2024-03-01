import React from 'react'
import MaterialTable from 'material-table';
import { fertiliserreport_data } from './ReportTableData';
import Export from './export.png';
function FertiliserReport() {
    const [data, setData] = React.useState(fertiliserreport_data)
    const columns = [{
        title: 'Date', field: 'date',
      },
      {
        title: "Category", field: "category",
      },
      {
        title: 'Fertilisers', field: 'fertilisers',
      },
      {
        title: 'Operator', field: 'operator',
      },
      ]
    return (
        <div>
      <MaterialTable title="Fertiliser"
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

export default FertiliserReport
