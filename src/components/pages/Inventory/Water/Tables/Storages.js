import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import Export from '../../../export.png';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { storages_data } from '../../../../../Data/InventoryWaterData'
import axios from 'axios';
import { useEffect } from "react";
export default function Storages() {
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
              "paramArray": ["1"],
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

    useEffect(()=>{
      getfarms();
      getwater();
   
    }, [check]);


    const columns = [ {title: "Farm", field: "farmid", lookup: obj,validate: (rowData) => {
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
        title: 'Capacity', field: 'ws_capacity',
    }, {
        title: 'Contents', field: 'ws_capacity_unit',
    }]
    
    return (
        <div>
            <MaterialTable title="STORAGES"
                data={data}
                columns={ columns}
                editable={{
                    onRowAdd:(newRow)=> new Promise((resolve,reject)=>{}),
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
                    paging: true,
                    pageSizeOptions: [2, 5, 10, 15, 20],
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    exportButton: true,
                    maxBodyHeight: 400,
                }}
                components={{
                    Toolbar: props => (
                      <div>
                        <MTableToolbar {...props} />
                      </div>
                    ),
                  }}
                  icons={{
                    Export: () => <img src={Export}></img>,
                    
                      Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
                      Edit: () => <CreateIcon color="action" />,
                      Delete: () => <DeleteIcon color="action" />
                     
                   
                  }}
            />
        </div>
    )
}