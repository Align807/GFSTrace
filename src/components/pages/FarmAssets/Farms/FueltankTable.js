import React, { useEffect } from 'react'
import MaterialTable from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
export default function FueltankTable(props) {
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

  const getfueltank = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_FARMFUELTANK",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/farm_fueltanksgenericselect', json)

    //console.log(JSON.stringify(response.data))
    if (response) {
      setData(response.data);
      console.log(response.data)
    }
  }

  const insertFarmfueltank = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [

          {
            farmid: prop.farmid,
            ft_name: prop.ft_name,
            ft_capacity: prop.ft_capacity,
            ft_capacityunits: prop.ft_capacityunits,
            ft_type: prop.ft_type,
            user_id: db.data[0].user_id
          }

        ]
      };
      var response = await axios.post("http://localhost:3002/farm_fueltanksinsert", json);
      setcheck(1)
      console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }

  const updateFueltank = async (prop) => {
    console.log(parseInt(prop.ft_id))
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "ft_id": parseInt(prop.ft_id),
          " farmid": prop.farmid,
          "job_status": prop.job_status,
          "ft_name": prop.ft_name,
          "ft_capacity": prop.ft_capacity,
          "ft_capacityunits": prop.ft_capacityunits,
          "ft_type": prop.ft_type,
        },
        "whereInObject": { "ft_id": [parseInt(prop.ft_id)] }
      },
      "arrKeyFields": ["ft_id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/fueltankbulkupdate', json)
    // if (response) {
    //   setData(response.data);
    //   console.log(response.data)
    // }
    setcheck(1)
  }

  const deletefueltank = async (prop) => {
    console.log(prop.status);
    try {
      var json = {
        "strQuery": "delete from farmer.farm_fueltanks where ft_id=$1",
        "arrValues": [parseInt(prop.ft_id)]
      };
      var response = await axios.post("http://localhost:3002/fueltankdelete", json);
      setcheck(1)
      console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    getfarms();
    getfueltank();

  }, [check]);

  //////////////////////////////////////////////////////////////

  const columns = [
    {
      title: "Farm", field: "farmid", lookup: obj,validate: (rowData) => {
        if (rowData.farmid === undefined || rowData.farmid === "") {
          return "Required";
        }
        return true;
      },
    }, {
      title: 'Name', field: 'ft_name',validate: (rowData) => {
        if (rowData.ft_name === undefined || rowData.ft_name === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: 'Capacity', field: 'ft_capacity',  type: 'numeric',
    },
    {
      title: 'Unit', field: 'ft_capacityunits',
      lookup: { '0': 'Litres', '1': 'Gallons' },
    }, {
      title: 'Type', field: 'ft_type',
      lookup: { '0': 'Avaition', '1': 'Unleaded', '2': 'AdBlue', '3': 'Diesel' },
    }]
  return (
    <div>
      <MaterialTable title="Fuel Tanks"
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
                insertFarmfueltank(newData);
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                updateFueltank(newData);
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
                deletefueltank(oldData);

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

