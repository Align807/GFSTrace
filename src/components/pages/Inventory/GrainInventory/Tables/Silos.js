import React from "react";
import MaterialTable,{ MTableToolbar } from "material-table";
import { Progress } from "semantic-ui-react";
import {Checkbox} from "semantic-ui-react";
import {silos_data} from "./Tabledatas";
import Chart from "./Chart";
import "../Grains.css";
import "./archived.css";
import Export from "./export.png";
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Silos() {
  const [selected, toggleselected] = React.useState(false);
const [data, setData] = React.useState(silos_data );
  const columns = [
    {
      title: "Farm",
      field: "farm",
    },
    {
      title: "Silo",
      field: "silo",
    },
    {
      title: "Cultivar",
      field: "cultivar",
    },
    {
      title: "Contents",
      field: "contents",
    },

    {
      title: "Capacity",
      field: "capacity",
    },
    {
      title: "Contents",
      field: "contents",
      render: rowData => {
        return <Progress percent={rowData.contents} progress color="rgb(68, 63, 63)" />
      }
    },
    {
      title: "Status",
      field: "status",
    },
  ]
  const columns_archived = [
    {
      title: "Farm",
      field: "farm",
    },
    {
      title: "Silo",
      field: "silo",
    },
    {
      title: "Cultivar",
      field: "cultivar",
    },
    {
      title: "Contents",
      field: "contents",
    },

    {
      title: "Capacity",
      field: "capacity",
    },
    {
      title: "Contents",
      field: "contents",
      render: rowData => {
        return <Progress percent={rowData.contents} progress color="rgb(68, 63, 63)" />
      }
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Archived",
      field: "archived",
    },
  ]
  return (
    <div>
      <MaterialTable
        title="SILOS"
        data={data}
        columns={selected ? columns_archived : columns}
        // columns={columns}
        detailPanel={(rowData) => {
          return <Chart />;
        }}
        options={{
          actionsColumnIndex: -1,
          paging: true,
          pageSizeOptions: [2, 5, 10, 15, 20],
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          exportButton: true,
          maxBodyHeight: 400,
        }}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div className="toggle-switch">
                <Checkbox
                  toggle
                  onClick={() => toggleselected(!selected)}
                  checked={selected}
                  label="Show Archived"
                />
              </div>
            </div>
          ),
        }}  editable={{
          onRowAdd:(newRow)=> new Promise((resolve,reject)=>{}),
          onRowUpdate:(newRow,oldRow)=> new Promise(()=>{}),
          onRowDelete:(selectedRow)=> new Promise(()=>{})
        }}
        icons={{
          Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
          Edit: () => <CreateIcon color="action" />,
          Export: () => <img src={Export}></img>,
          Delete: () => <DeleteIcon color="action" />
         
        }}
      />
    </div>
  );
}


