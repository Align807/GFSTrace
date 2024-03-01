import React, { useEffect } from 'react'
import MaterialTable from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
export default function SiloTable(props) {
  // const farm = props.farm;
  const [farm, setfarm] = React.useState([]);
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);
  var obj = farm.reduce(function (acc, cur, i) {
    acc[cur.farmid] = cur.farm_name;

    return acc;
  }, {});


  const [data, setData] = React.useState([])
  const [check, setcheck] = React.useState();

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

  const getsilos = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_SILOS",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/silosgenericselect', json)

    //console.log(JSON.stringify(response.data))
    if (response) {
      setData(response.data);
      console.log(response.data)
    }
  }

  const insertsilos = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [

          {

            " farmid": prop.farmid,
            "silo_id": prop.silo_id,
            "silo_capacity": prop.silo_capacity,
            "silo_name": prop.silo_name,
            "silo_capacityunit": prop.silo_capacityunit,
            "silo_cultivar": prop.silo_cultivar,
            "Silo_Status": prop.silo_status,
            "silo_notes": prop.silo_notes,
            "user_id": db.data[0].user_id
          }

        ]
      };
      var response = await axios.post("http://localhost:3002/silosinsert", json);
      setcheck(1)
      console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }

  const updatesilos = async (prop) => {
    console.log(parseInt(prop.silo_id))
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "silo_id": prop.silo_id,
          " farmid": prop.farmid,
          "silo_name": prop.silo_name,
          "silo_capacity": prop.silo_capacity,
          "silo_capacityunit": prop.silo_capacityunit,
          "silo_cultivar": prop.silo_cultivar,
          "silo_status": prop.silo_status,
          "silo_notes": prop.silo_notes
        },
        "whereInObject": { "silo_id": [prop.silo_id] }
      },
      "arrKeyFields": ["silo_id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/silosbulkupdate', json)
    // if (response) {
    //   setData(response.data);
    //   console.log(response.data)
    // }
    setcheck(1)
  }

  const deletesilos = async (prop) => {
    console.log(prop.status);
    try {
      var json = {
        "strQuery": "delete from farmer.silos where silo_id=$1",
        "arrValues": [prop.silo_id]
      };
      var response = await axios.post("http://localhost:3002/silosdelete", json);
      setcheck(1)
      console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    getfarms();
    getsilos();

  }, [check]);

  ///////////////////////////////////////////////////////////////////

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
      title: 'Name', field: 'silo_name',validate: (rowData) => {
        if (rowData.silo_name === undefined || rowData.silo_name === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: 'Capacity', field: 'silo_capacity', type: 'numeric',
    },
    {
      title: 'Unit', field: 'silo_capacityunit',
      lookup: { '0': 'Tonnes', '1': 'Wheat tonnes', '2': 'Cubic metre', '3': 'Cubic feet' },
    }, {
      title: 'Cultivar', field: 'silo_cultivar',
      lookup: { '0': 'Fallow', '1': 'abc', '2': 'dfg' },
    }, {
      title: 'Status', field: 'silo_status',
      lookup: {
        '0': 'Normal', '1': 'Seed', '2': 'Treated', '3': 'Treated Seed',
        '4': 'Contaminated', '5': 'Archived'
      },
    }]
  return (
    <div>
      <MaterialTable title="Silos"
        data={data}
        columns={columns}
        editable={{
          //   onRowAdd:(newRow)=> new Promise((resolve,reject)=>{}),
          //   onRowUpdate:(newRow,oldRow)=> new Promise(()=>{}),
          //   onRowDelete:(selectedRow)=> new Promise(()=>{})
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                insertsilos(newData);
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                updatesilos(newData);
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
                deletesilos(oldData);
                resolve()
              }, 1000)
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          filtering: true,
          paging: true,
          pageSizeOptions: [2, 5, 10, 15, 20],
          paginationType: "stepped",
          showFirstLastPageButtons: false,
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



