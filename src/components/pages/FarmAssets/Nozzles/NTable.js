import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const dropletSize = [
  { id: 0, title: "N/A", icon: <icon>nozzle</icon> },
  { id: 1, title: "Extremely Fine" },
  { id: 2, title: "Very Fine" },
  { id: 3, title: "Fine" },
  { id: 4, title: "Medium" },
  { id: 5, title: "Coarse" },
  { id: 6, title: "Very Coarse" },
  { id: 7, title: "Extremely Coarse" },
  { id: 8, title: "Ultra Coarse" },
]

export default function NTable() {
  const [drop, setDrop] = useState({})
  const [check, setcheck] = React.useState();
  const [farm, setfarm] = React.useState([]);

  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);

  var obj = farm.reduce(function (acc, cur, i) {
    acc[cur.farmid] = cur.farm_name;

    return acc;
  }, {});

  const [tableData, setTableData] = useState([]);
  const columns = [
    {
      title: "Farm", field: "farmid", lookup: obj,validate: (rowData) => {
        if (rowData.farmid === undefined || rowData.farmid === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: "Name", field: "nozzles_name", validate: rowData => {
        if (rowData.nozzles_name === undefined || rowData.nozzles_name === "") { return "Required" }
        else if (rowData.nozzles_name.length < 3) { return "Name Should Contain Atleast 3 chars" }
        return true
      }
    },
    { title: "Operating Pressure", field: "operating_pressure", type: 'numeric', },
    { title: "Unit", field: "pressure_units", lookup: { 0: "PSI", 1: "BAR" } },
    { title: "Droplet Size", field: "droplet_size", lookup: drop }
  ]



  const getfarms = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_FARMS",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/farmsgenericselect', json)

    //console.log(JSON.stringify(response.data))
    if (response) {
      setfarm(response.data);
    }

  }

  const updatenozzle = async (prop) => {
    console.log(parseInt(prop.nozzles_id))
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "nozzles_id": parseInt(prop.nozzles_id),
          "farmid": prop.farmid,
          "nozzles_name": prop.nozzles_name,
          "operating_pressure": prop.operating_pressure,
          "pressure_units": prop.pressure_units,
          "droplet_size": prop.droplet_size,
          "user_id": db.data[0].user_id
        },
        "whereInObject": { "nozzles_id": [parseInt(prop.nozzles_id)] }
      },
      "arrKeyFields": ["nozzles_id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/nozzlesbulkupdate', json)
    // if (response) {
    //   setData(response.data);
    //   console.log(response.data)
    // }
    setcheck(1)
  }

  const deletenozzle = async (prop) => {

    try {
      var json = {
        "strQuery": "delete from farmer.nozzles where nozzles_id=$1",
        "arrValues": [parseInt(prop.nozzles_id)]
      };
      var response = await axios.post("http://localhost:3002/nozzlesdelete", json);
      setcheck(1)
      console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }
  const getnozzle = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_NOZZLES",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/nozzlesgenericselect', json)

    //console.log(JSON.stringify(response.data))
    if (response) {
      setTableData(response.data);
      setcheck(1)
      console.log(response.data)
    }
  }



  const insertnozzle = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [

          {
            farmid: prop.farmid,
            nozzles_name: prop.nozzles_name,
            operating_pressure: prop.operating_pressure,
            pressure_units: prop.pressure_units,
            droplet_size: prop.droplet_size,
            user_id: db.data[0].user_id

          }

        ]
      };
      var response = await axios.post("http://localhost:3002/nozzlesinsert", json);
      setcheck(1)
      // console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getfarms();
    getnozzle();
    const drop = {}
    dropletSize.map(row => drop[row.id] = row.title)
    setDrop(drop)
  }, [check])
  return (
    <div>
      <MaterialTable
        title="Nozzles"
        data={tableData}
        columns={columns}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setTableData([...tableData, newRow]);
              insertnozzle(newRow);
              setTimeout(() => resolve(), 500);
            }),


          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...tableData];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                updatenozzle(newData);
                setTableData([...dataUpdate]);

                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...tableData];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setTableData([...dataDelete]);
                deletenozzle(oldData);
                resolve()
              }, 1000)
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          showTitle: false,
          pageSizeOptions: [2, 5, 10, 15, 20],
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          filtering: true,
          maxBodyHeight: 400,
        }}
        icons={{

          Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
          Edit: () => <CreateIcon color="action" />,
          Delete: () => <DeleteIcon color="action" />
        }}
      />
    </div>
  )
}
