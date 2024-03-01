import React from 'react'
import MaterialTable from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
//import farm from "../../../../Data/farmData";
import axios from "axios";
import { useEffect } from "react";
// import PaddockData from "../../../../Data/PaddockData";
export default function PaddockTable(props) {
  const [data, setData] = React.useState([]);
  const [check, setcheck] = React.useState();
  const [farm, setfarm] = React.useState([]);
  const [cultivars, setcultivars] = React.useState([]);

  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);
  var obj = farm.reduce(function (acc, cur, i) {
    acc[cur.farmid] = cur.farm_name;

    return acc;
  }, {});
  var obj1 = cultivars.reduce(function (acc1, cur1, i) {
    acc1[cur1.cultivar_id] = cur1.cultivar_name;

    return acc1;
  }, {});


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
  const getcultivars = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_CULTIVARS",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };
    var response = await axios.post('http://localhost:3002/cultivarsgenericselect', json)
    setcheck(1)
    if (response) {
      setcultivars(response.data);
      console.log(response.data)
    }
  }




  const updatePaddock = async (prop) => {
    console.log(parseInt(prop.paddockid))
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "paddockid": parseInt(prop.paddockid),
          " farmid": prop.farmid,
          "paddock_size": prop.paddock_size,
          "size_unit": prop.size_unit,
          "cultivarid": prop.cultivarid,
          "created_year": prop.created_year,
          "paddock_created": prop.paddock_created,
          "paddock_status": prop.paddock_status,
          "paddock_name": prop.paddock_name,
          "rotation": prop.rotation
        },
        "whereInObject": { "paddockid": [parseInt(prop.paddockid)] }
      },
      "arrKeyFields": ["paddockid"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/paddockbulkupdate', json)
    // if (response) {
    //   setData(response.data);
    //   console.log(response.data)
    // }
    setcheck(1)
  }

  const deletepaddock = async (prop) => {
    console.log(prop.status);
    try {
      var json = {
        "strQuery": "delete from farmer.farmpaddock where paddockid=$1",
        "arrValues": [parseInt(prop.paddockid)]
      };
      var response = await axios.post("http://localhost:3002/farmpaddockdelete", json);
      setcheck(1)
      console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }
  const getpaddock = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_FARMPADDOCK",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/farmpaddockgenericselect', json)

    //console.log(JSON.stringify(response.data))
    if (response) {
      setData(response.data);
      setcheck(1)
      console.log(response.data)
    }
  }



  const insertPaddock = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [

          {
            farmid: prop.farmid,
            paddock_size: prop.paddock_size,
            cultivarid: prop.cultivarid,
            created_year: prop.created_year,
            paddock_created: prop.paddock_created,
            paddock_status: prop.paddock_status,
            paddock_name: prop.paddock_name,
            rotation: prop.rotation,
            size_unit: prop.size_unit,
            user_id: db.data[0].user_id
          }

        ]
      };
      var response = await axios.post("http://localhost:3002/farmpaddockinsert", json);
      setcheck(1)
      // console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getfarms();
    getcultivars();
    getpaddock();

  }, [check]);
  /////////////////////////////////////////////////


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
      title: 'Name', field: 'paddock_name',validate: (rowData) => {
        if (rowData.paddock_name === undefined || rowData.paddock_name === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: 'Size', field: 'paddock_size', type: 'numeric'
    },
    {
      title: 'Unit', field: 'size_unit',
      lookup: { 0: 'feet square', 1: 'metre square', 2: 'acres', 3: 'hectare' },
    }, {
      title: 'Cultivar', field: 'cultivarid',
      lookup: obj1,
    }, {
      title: 'Rotation', field: 'rotation',
      lookup: {
        'D': 'Dryland', 'NR': 'Normal Rotation', 'DC': 'Double Crop', 'LF': 'Long Fallow',
        'SF': 'Short Fallow', 'I': 'Irrigated', 'SI': 'Semi-irrigated', 'AP': 'After Pulse'
      },
    }, {
      title: 'Year', field: 'created_year', type: 'numeric'
    }]
  return (
    <div>
      <MaterialTable title="Paddocks"
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
                insertPaddock(newData);
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                updatePaddock(newData);
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
                deletepaddock(oldData);
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
        // actions={[{
        //   icon: <AddCircleRoundedIcon fontSize="large" color="primary" />,
        //   tooltip: 'Add',
        //   onClick: (evt, data) => (handleAddRows(data))
        // }]} 
        icons={{

          Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
          Edit: () => <CreateIcon color="action" />,
          Delete: () => <DeleteIcon color="action" />
        }}
      />
    </div>
  )
}
