import React from 'react'
import MaterialTable from 'material-table';
import { equipmentreport_data } from './ReportTableData';
import { Grid } from '@mui/material';
import Export from './export.png';
function EquipmentReport() {
  const [data, setData] = React.useState(equipmentreport_data);
  const [selected, toggleselected] = React.useState(false);
  let options = null;
  const type = ["cat1", "cat2", "cat3"];
  if (selected == true) {
    options = <div><div class="default text">Equipment</div> <select class="ui dropdown" style={{ width: 200 }}>{type.map((el) => <option key={el}>{el}</option>)}</select></div>;
  }
  const columns = [{
    title: 'Date', field: 'date',
  },
  {
    title: 'Amount', field: 'amount',
  },
  {
    title: 'Type', field: 'type',
  },
  {
    title: 'Operator', field: 'operator',
  },
  {
    title: 'Task Category', field: 'category',
  },
  {
    title: 'Task Description', field: 'description',
  },
  ]
  const columns_all = [{
    title: 'Date', field: 'date',
  },
  {
    title: "Equipment", field: "equipment",
  },
  {
    title: 'Amount', field: 'amount',
  },
  {
    title: 'Type', field: 'type',
  },
  {
    title: 'Operator', field: 'operator',
  },
  {
    title: 'Task Category', field: 'category',
  },
  {
    title: 'Task Description', field: 'description',
  },
  ]
  return (
    <div>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={2}>
          <br />
          <select class="ui dropdown" style={{ width: 200 }} onChange={() => toggleselected(!selected)}>
            <option value="" >Fuel Tickets - All</option>
            <option value={2} >Fuel Ticket</option>
          </select>
        </Grid>
        <Grid item xs={2}>
          {options}
        </Grid>
      </Grid>
      <MaterialTable title="Equipment"
        data={data}
        columns={selected ? columns : columns_all}
        options={{
          maxBodyHeight: 400,
          search: false,
          exportButton: true,
        }}
        icons={{
          Export: () => <img src={Export}></img>,
        }}
      />
    </div>
  )
}

export default EquipmentReport
