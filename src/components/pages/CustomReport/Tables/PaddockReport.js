import React from 'react'
import MaterialTable from 'material-table';
import { paddockreport_data } from './ReportTableData';
import { Grid } from '@mui/material';
import Export from './export.png';
function PaddockReport() {
    const [data, setData] = React.useState(paddockreport_data)
    const [field,setfield]=React.useState("");
    const [attribute,setattribute]=React.useState("");
    let columns=null;
    const handleChange = (event) => {
      setfield(event.target.value);
    };
    const columns_spray = [{
      title: 'Date', field: 'date',
    },
    {
        title: 'Status', field: 'status',
      },
      {
        title: "Contract", field: "contract",
      },
      {
        title: 'Description', field: 'description',
      },
      {
        title: 'Chemicals', field: 'chemicals',
      },
      {
        title: 'Completed', field: 'completed',
      },
      ]
      const columns_spreading = [{
        title: 'Date', field: 'date',
      },
      {
        title: 'Status', field: 'status',
      },
      {
        title: "Contract", field: "contract",
      },
      {
        title: 'Description', field: 'description',
      },
      {
        title: 'Fertilisers', field: 'fertilisers',
      },
      {
        title: 'Completed', field: 'completed',
      },
      ]
      const columns_maintainance = [{
        title: 'Date', field: 'date',
      },
      {
        title: 'Status', field: 'status',
      },
      {
        title: "Contract", field: "contract",
      },
      {
        title: 'Description', field: 'description',
      },
      {
        title: 'Category', field: 'category',
      },
      {
        title: 'Completed', field: 'completed',
      },
      ]
      const columns_harvest = [{
        title: 'Date', field: 'date',
      },
      {
        title: 'Status', field: 'status',
      },
      {
        title: "Contract", field: "contract",
      },
      {
        title: 'Description', field: 'description',
      },
      {
        title: 'Completed', field: 'completed',
      },
      ]
      if(attribute==""){
        columns=columns_spray
      }
      else if(attribute=="3" || attribute=="2"){
        columns=columns_spreading
      }
      else if(attribute=="4"){
        columns=columns_maintainance
      }
      else{
        columns=columns_harvest
      }
    return (
        <div>
           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
           <Grid item xs={2}>
        <select class="ui dropdown" style={{ width: 200}} onChange={(e)=>setattribute(e.target.value)}>
            <option value="" >Spray Logs</option>
            <option value={2} >Spreading</option>
            <option value={3} >Planting</option>
            <option value={4} >Maintenance</option>
            <option value={5}>Harvest</option>
          </select>
        </Grid>
        <Grid item xs={2}>
        <select class="ui dropdown" style={{ width: 200}} onChange={handleChange}>
            <option value="" >abc</option>
            <option value={2} >pqr</option>
          </select>
        </Grid>
        <Grid item xs={2}>
        <select class="ui dropdown" style={{ width: 200}} onChange={handleChange}>
            <option value="" >xyz</option>
            <option value={2} >wxy</option>
          </select>
        </Grid>
        </Grid>
      <MaterialTable title="Paddocks"
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

export default PaddockReport
