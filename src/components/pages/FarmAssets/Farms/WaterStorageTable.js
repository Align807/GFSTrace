import React, { useEffect } from 'react'
import MaterialTable from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
export default function WaterStorageTable(props) {
  
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

    const getwater= async ( ) => {
      var json = { 
        "paramObject" : {
              "queryId":"FARMER_WATERSTORAGE",
              "paramArray": [db.data[0].user_id],
              "strCallerFunction": "DEMO DATA"}
      };
    
      var response= await axios.post('http://localhost:3002/water_storagegenericselect',json)
  
  //console.log(JSON.stringify(response.data))
  if(response)
  {
  setData(response.data);
    console.log(response.data)
   }
    }

    const insertwater= async (prop) => {
      console.log(prop);
      try{
        var json = {objJsonData:[
    
          {
                       
            " farmid": prop.farmid,
        "waterstorage_id": prop.waterstorage_id,
        "ws_surfacearea": prop.ws_surfacearea,
        "ws_areaunits": prop.ws_areaunits,
        "ws_maxdepth": prop.ws_maxdepth,
        "ws_depthunits": prop.ws_depthunits,
        "ws_slopefactor": prop.ws_slopefactor,
        "ws_capacity": prop.ws_capacity,
        "ws_capacity_unit": prop.ws_capacity_unit,
        "ws_name": prop.ws_name,
        "ws_notes": prop.ws_notes,
        "user_id": db.data[0].user_id
           } 
       
        ]};
        var response= await axios.post("http://localhost:3002/waterinsert",json);
        setcheck(1)
        console.log(response.data);
        
      }
      catch(e){
      console.log(e)
      }
      }

      const updatewater = async (prop) => {
        console.log(parseInt(prop.waterstorage_id))
        var json = {"objJsonData": {"updateSetObjectValue": {
          " farmid": prop.farmid,
        "waterstorage_id": prop.waterstorage_id,
        "ws_surfacearea": prop.ws_surfacearea,
        "ws_areaunits": prop.ws_areaunits,
        "ws_maxdepth": prop.ws_maxdepth,
        "ws_depthunits": prop.ws_depthunits,
        "ws_slopefactor": prop.ws_slopefactor,
        "ws_capacity": prop.ws_capacity,
        "ws_capacity_unit": prop.ws_capacity_unit,
        "ws_name": prop.ws_name,
        "ws_notes": prop.ws_notes,
        "user_id": db.data[0].user_id
        },	
          "whereInObject" : {"waterstorage_id" :[prop.waterstorage_id]}
},
"arrKeyFields" : ["waterstorage_id"]
};
        console.log(json)
      var response = await axios.post('http://localhost:3002/waterbulkupdate', json)
      // if (response) {
      //   setData(response.data);
      //   console.log(response.data)
      // }
      setcheck(1)
    }

    const deletewater= async (prop) => {
      console.log(prop.status);
      try{
        var json =  {
          "strQuery":"delete from farmer.water_storage where waterstorage_id=$1",
          "arrValues":[prop.waterstorage_id]
          };
        var response= await axios.post("http://localhost:3002/waterdelete",json);
          setcheck(1)
        console.log(response.data);
        
      }
      catch(e){
      console.log(e)
      }
      }


    useEffect(()=>{
      getfarms();
      getwater();
   
    }, [check]);

////////////////////////////////////////////////////////////

  const columns = [
    {
      title:"Farm", field: "farmid", lookup: obj,validate: (rowData) => {
        if (rowData.farmid === undefined || rowData.farmid === "") {
          return "Required";
        }
        return true;
      },
    },{
      title: 'Name', field: 'ws_name',validate: (rowData) => {
        if (rowData.ws_name === undefined || rowData.ws_name === "") {
          return "Required";
        }
        return true;
      },
  },
  {
      title: 'Capacity', field: 'ws_capacity', type: 'numeric',
  },
  {
      title: 'Unit', field: 'ws_capacity_unit',
      lookup: { '0': 'Litres',  '1': 'Gallons', '4':'Cubic metre', '2':'Cubic feet','3':'Cubic yard'},
  },{
    title: 'Surface Area', field: 'ws_surfacearea', type: 'numeric',
},
{
    title: 'Unit', field: 'ws_areaunits',
    lookup: { '3': 'Hectares', '2': 'Acres', '1':'Square metre', '0':'Square feet'},
},{
  title: 'Max Depth ', field: 'ws_maxdepth', type: 'numeric',
  
},
{
  title: 'Unit', field: 'ws_depthunits',
  lookup: { '0': 'mm', '1':'cm', '5':'metre', '2': 'inch', '3':'feet', '4':'yard'},
}, {
      title: 'Slope factor', field: 'ws_slopefactor', type: 'numeric', 
      
  }, {
      title: 'Notes', field: 'ws_notes',
    
  }]
    return (
        <div>
            <MaterialTable title="Water Storages"
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
                  insertwater(newData);
                  resolve();
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  updatewater(newData);
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
                  deletewater(oldData);
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
