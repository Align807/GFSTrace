import React, { useEffect } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from './export.png';
import { Checkbox } from 'semantic-ui-react';
import { transfer_data } from './Tabledatas';
import axios from 'axios';
export default function Transfer() {
    const [selected, toggleselected] = React.useState(false);
   // const [data, setData] = React.useState(transfer_data)
       
    const [data, setData] = React.useState([])
    const [check, setcheck] = React.useState();

    const getgraintransfer= async ( ) => {
      var json = { 
        "paramObject" : {
              "queryId":"FARMER_GRAIN_TRANSFER",
              "paramArray":["3"],
              "strCallerFunction": "DEMO DATA"}
      };
    
      var response= await axios.post('http://localhost:3002/graintransfergenericselect',json)
  
  //console.log(JSON.stringify(response.data))
  if(response)
  {
  setData(response.data);
    console.log(response.data)
   }
    }

    const insertgraintransfer= async (prop) => {
      console.log(prop);
      try{
        var json = {objJsonData:[
    
          {
                       
            "farmid": 1,
            "trn_date": prop.trn_date,
            "grain_qnty": prop.grain_qnty,
            "units": prop.units,
            "trn_status": prop.trn_status,
            "silos": prop.silos,
            "operators": prop.operators,
            "cultivars": prop.cultivars,
            "traits": prop.traits,
            "grain_transfer_notes": prop.grain_transfer_notes,
            "archived": prop.archived,
            "id": prop.id,
            "transfer_amount": prop.transfer_amount
           } 
       
        ]};
        var response= await axios.post("http://localhost:3002/graintransferinsert",json);
        setcheck(1)
        console.log(response.data);
        
      }
      catch(e){
      console.log(e)
      }
      }

      const updategraintransfer = async (prop) => {
       // console.log(parseInt(prop.id))
        var json = {"objJsonData": {"updateSetObjectValue": {
                       
          "farmid": 1,
          "trn_date": prop.trn_date,
          "grain_qnty": prop.grain_qnty,
          "units": prop.units,
          "trn_status": prop.trn_status,
          "silos": prop.silos,
          "operators": prop.operators,
          "cultivars": prop.cultivars,
          "traits": prop.traits,
          "grain_transfer_notes": prop.grain_transfer_notes,
          "archived": prop.archived,
          "id": prop.id,
          "transfer_amount": prop.transfer_amount
        },	
          "whereInObject" : {"id" :[prop.id]}
},
"arrKeyFields" : ["id"]
};
        console.log(json)
      var response = await axios.post('http://localhost:3002/graintransferbulkupdate', json)
      // if (response) {
      //   setData(response.data);
      //   console.log(response.data)
      // }
      setcheck(1)
    }

    const deletegraintransfer= async (prop) => {
      console.log(prop.id);
      try{
        var json =  {
          "strQuery":"delete from farmer.graininventorytransfer where id=$1",
          "arrValues":[prop.id]
          };
        var response= await axios.post("http://localhost:3002/graintransferdelete",json);
          setcheck(1)
        console.log(response.data);
        
      }
      catch(e){
      console.log(e)
      }
      }


    useEffect(()=>{
      getgraintransfer();
   
    }, [check]);
    

    ///////////////////////////////////////////////////////////////
        const columns = [
    //       {
    //     title: 'ID', field: 'id'
    // },
    {
        title: 'Silos', field: 'silos',
    },
    {
        title: 'Date/Time', field: 'trn_date',
    }, {
        title: 'Operators', field: 'operators',
    },
    {
        title: 'Cultivar', field: 'cultivar',
    },
    
    {
        title: 'Amount', field: 'transfer_amount',
    },
    
    {
        title: 'Traits', field: 'traits',
    },
    {
        title: 'Notes', field: 'notes',
    },
    
    
  ]
    const columns_archived = [{
        title: 'ID', field: 'id'
    },
    {
        title: 'Silos', field: 'silos',
    },
    {
        title: 'Date/Time', field: 'trn_date',
    }, {
        title: 'Operators', field: 'operators',
    },
    {
        title: 'Cultivar', field: 'cultivar',
    },
    
    {
        title: 'Amount', field: 'transfer_amount',
    },
    
    {
        title: 'Traits', field: 'traits',
    },
    {
        title: 'Notes', field: 'notes',
    },
    {
        title: 'Archived', field: 'archived',
    },
    
  ]
    return (
        <div>
            <MaterialTable title="TRANSFER"
                data={data}
                columns={selected ? columns_archived : columns}
                editable={{
                  onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setData([...data, newData]);
              insertgraintransfer(newData);
              setTimeout(() => resolve(), 500);
            }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataUpdate = [...data];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          updategraintransfer(newData);
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
                          deletegraintransfer(oldData);
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
                  }}
                 
                  icons={{
                    Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
                    Edit: () => <CreateIcon color="action" />,
                    Export: () => <img src={Export}></img>,
                    Delete: () => <DeleteIcon color="action" />
                   
                  }}
            />
        </div>
    )
}