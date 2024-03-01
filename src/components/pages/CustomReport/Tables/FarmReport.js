import React from 'react'
import MaterialTable from 'material-table';
import { farmreport_data } from './ReportTableData';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import { Dropdown } from 'semantic-ui-react'
import Export from './export.png';
function FarmReport() {
  const [data, setData] = React.useState(farmreport_data);
  const [selected, toggleselected] = React.useState(false);
  const [activity, setactivity] = React.useState(false);
  let farms = null;
  let column=null;
  const type = ["fa1", "fa2", "fa3"];
  const [field, setfield] = React.useState("");
  const options = [
    { key: 'Approved', text: 'Approved', value: 'Approved' },
    { key: 'Not Approved', text: 'Not Approved', value: 'Not Approved' },
    { key: 'Charged Out', text: 'Charged Out', value: 'Charged Out' },
    { key: 'Not Charged Out', text: 'Not Charged Out', value: 'Not Charged Out' },]
  const handleChange = (event) => {
    setfield(event.target.value);
  };
  const columns_all = [{
    title: 'Date', field: 'date',
  },
  {
    title: 'Status', field: 'status',
  },
  {
    title: "Contract", field: "contract",
  },
  {
    title: 'Activity', field: 'activity',
  },
  {
    title: 'Description', field: 'description',
  },
  {
    title: "Farms", field: "farms",
  },
  {
    title: 'Paddocks', field: 'paddocks',
  },
  
  {
    title: 'Completed', field: 'completed',
  },
  ]
  const columns_all_activity = [{
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
    title: "Farms", field: "farms",
  },
 
  {
    title: 'Completed', field: 'completed',
  },
  ]
  const columns = [{
    title: 'Date', field: 'date',
  },
  {
    title: 'Status', field: 'status',
  },
  {
    title: "Contract", field: "contract",
  },
  {
    title: 'Activity', field: 'activity',
  },
  {
    title: 'Description', field: 'description',
  },
 
  {
    title: 'Completed', field: 'completed',
  },
  ]
  const columns_activity = [{
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
  if (selected == true) {
    farms = <div><select class="ui dropdown" style={{ width: 200 }}>{type.map((el) => <option key={el}>{el}</option>)}</select></div>;
  }
  if (selected == false && activity == false){
      column=columns_all
  }
  else if(selected==false && activity==true){
    column=columns_all_activity
  }
  else if(selected == true && activity == false){
    column=columns
  }
  else if(selected == true && activity == true){
    column=columns_activity
  }
  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
        <Grid item xs={2}>
          <select class="ui dropdown" style={{ width: 200 }} onChange={() => toggleselected(!selected)}>
            <option value="" >Activities - All Farms</option>
            <option value={2} >Activities - Selective</option>
          </select>
        </Grid>
        <Grid item xs={2}>
          {farms}
        </Grid>
        <Grid item xs={2}>
          <select class="ui dropdown" style={{ width: 200 }} onChange={(event)=>{if (event.target.value=="") {
            setactivity(false)
          }
          else{
            setactivity(true)
          }}}>
            <option value="" >All</option>
            <option value={1} >Spray Logs</option>
            <option value={2} >Spreading</option>
            <option value={3} >Planting</option>
            <option value={4} >Maintenance</option>
            <option value={5}>Harvest</option>
          </select>
        </Grid>
        {/* <Grid item xs={4}>
        <Dropdown multiple selection show options={options}/>
        </Grid> */}
        </Grid>
        <br/><br/><br/><br/>
      <MaterialTable title="Farms"
        data={data}
        columns={column}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve()
              }, 1000)
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          search: false,
          exportButton: true,
          maxBodyHeight: 400,
        }}
        icons={{
          Export: () => <img src={Export}></img>,
          Edit: () => <CreateIcon color="action" />,
          Delete: () => <DeleteIcon color="action" />
        }}
      />
    </div>
  )
}

export default FarmReport
