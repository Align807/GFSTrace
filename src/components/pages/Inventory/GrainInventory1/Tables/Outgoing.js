import React, { useEffect } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from './export.png';
import { outgoing_data } from './Tabledatas';
import { Checkbox } from 'semantic-ui-react';
import axios from 'axios';
export default function Outgoing() {
    const [selected, toggleselected] = React.useState(false);
    ///const [data, setData] = React.useState(outgoing_data)
   
    const [data, setData] = React.useState([])
    const [check, setcheck] = React.useState();

    const getgrainoutgoing= async ( ) => {
      var json = { 
        "paramObject" : {
              "queryId":"FARMER_GRAIN_OUTGOING",
              "paramArray":["1"],
              "strCallerFunction": "DEMO DATA"}
      };
    
      var response= await axios.post('http://localhost:3002/grainoutgoinggenericselect',json)
  
  //console.log(JSON.stringify(response.data))
  if(response)
  {
  setData(response.data);
    console.log(response.data)
   }
    }

    const insertgrainoutgoing= async (prop) => {
      console.log(prop);
      try{
        var json = {objJsonData:[
    
          {
                       
        "farmid": 1,
        "silo_id": prop.silo_id,
       
        "createdat": prop.createdat,
        "ext_docketno": prop.ext_docketno,
        "truck_rego": prop.truck_rego,
        "transport_co": prop.transport_co,
        "weigh_bridge": prop.weigh_bridge,
        "weigh_unit": prop.weigh_unit,
        "harvt_farm_id": prop.harvt_farm_id,
        "harvt_farm_paddock": prop.harvt_farm_paddock,
        "grain_amount": prop.grain_amount,
        "endconfirm_amount": prop.endconfirm_amount,
        "grainout_from": prop.grainout_from,
        "out_farmid": prop.out_farmid,
        "out_paddockid": prop.out_paddockid,
        "silo_amt": prop.silo_amt,
        "operators": prop.operators,
        "cultivar": prop.cultivar,
        "driver": prop.driver,
        "tare_weight": prop.tare_weight,
        "paddocks": prop.paddocks,
        "traits": prop.traits,        
        "archived": prop.archived,
        "notes": prop.notes
           } 
       
        ]};
        var response= await axios.post("http://localhost:3002/grainoutgoinginsert",json);
        setcheck(1)
        console.log(response.data);
        
      }
      catch(e){
      console.log(e)
      }
      }

      const updategrainoutgoing = async (prop) => {
        console.log(parseInt(prop.id))
        var json = {"objJsonData": {"updateSetObjectValue": {
            "farmid": 1,
            "silo_id": prop.silo_id,
            "id":parseInt(prop.id),
            "createdat": prop.createdat,
            "ext_docketno": prop.ext_docketno,
            "truck_rego": prop.truck_rego,
            "transport_co": prop.transport_co,
            "weigh_bridge": prop.weigh_bridge,
            "weigh_unit": prop.weigh_unit,
            "harvt_farm_id": prop.harvt_farm_id,
            "harvt_farm_paddock": prop.harvt_farm_paddock,
            "grain_amount": prop.grain_amount,
            "endconfirm_amount": prop.endconfirm_amount,
        "grainout_from": prop.grainout_from,
        "out_farmid": prop.out_farmid,
        "out_paddockid": prop.out_paddockid,
            "silo_amt": prop.silo_amt,
            "operators": prop.operators,
            "cultivar": prop.cultivar,
            "driver": prop.driver,
            "tare_weight": prop.tare_weight,
            "paddocks": prop.paddocks,
            "traits": prop.traits,
            "archived": prop.archived,
            "notes": prop.notes
        },	
          "whereInObject" : {"id" :[parseInt(prop.id)]}
},
"arrKeyFields" : ["id"]
};
        //console.log(json)
      var response = await axios.post('http://localhost:3002/grainoutgoingbulkupdate',json)
      // if (response) {
      //   setData(response.data);
      //   console.log(response.data)
      // }
      setcheck(1)
    }

    const deletegrainoutgoing= async (prop) => {
      console.log(prop.id);
      try{
        var json =  {
          "strQuery":"delete from farmer.graininventoryoutgoing where id=$1",
          "arrValues":[prop.id]
          };
        var response= await axios.post("http://localhost:3002/grainoutgoingdelete",json);
          setcheck(1)
        console.log(response.data);
        
      }
      catch(e){
      console.log(e)
      }
      }


    useEffect(()=>{
      getgrainoutgoing();
   
    }, [check]);

    ///////////////////////////////////////////////////////////////////////
    const columns = [
      //   {
      // title: 'ID', field: 'id',filtering:false,
  //},
  // {
  //     title: 'Silos', field: 'silo_id',
  // },
  {
      title: 'Date/Time', field: 'createdat',filtering:false,
  }, {
      title: 'Operators', field: 'operators',filtering:false,
  },
   {
      title: 'Contract', field: 'contract',
  },
  {
      title: 'Cultivar', field: 'cultivar',filtering:false,
  },
  {
      title: 'Transport', field: 'transport_co',filtering:false,
  },
  {
      title: 'Driver', field: 'driver',filtering:false,
  },
  {
      title: 'Rego', field: 'truck_rego',filtering:false,
  },
  {
      title: 'Tare Weight', field: 'tare_weight',filtering:false,
  },
  {
      title: 'Gross Weight', field: 'weigh_unit',filtering:false,
  },
  {
      title: 'Amount', field: 'grain_amount',filtering:false,
  },
  {
      title: 'End Point Amount', field: 'endconfirm_amount',filtering:false,
  },
  {
      title: 'Paddocks', field: 'paddocks',filtering:false,
  },
  {
      title: 'Traits', field: 'traits',filtering:false,
  },
  {
      title: 'Notes', field: 'notes',filtering:false,
  },
  ]
    const columns_archived = [{
      title: 'ID', field: 'id',filtering:false,
  },
  {
      title: 'Silos', field: 'silos',
  },
  {
      title: 'Date/Time', field: 'createdat',filtering:false,
  }, {
      title: 'Operators', field: 'operators',filtering:false,
  },
   {
      title: 'Contract', field: 'contract',
  },
  {
      title: 'Cultivar', field: 'cultivar',filtering:false,
  },
  {
      title: 'Transport', field: 'transport_co',filtering:false,
  },
  {
      title: 'Driver', field: 'driver',filtering:false,
  },
  {
      title: 'Rego', field: 'truck_rego',filtering:false,
  },
  {
      title: 'Tare Weight', field: 'tareWeight',filtering:false,
  },
  {
      title: 'Gross Weight', field: 'weigh_unit',filtering:false,
  },
  {
      title: 'Amount', field: 'grain_amount',filtering:false,
  },
  {
      title: 'End Point Amount', field: 'endconfirm_amount',filtering:false,
  },
  {
      title: 'Paddocks', field: 'paddocks',filtering:false,
  },
  {
      title: 'Traits', field: 'traits',filtering:false,
  },
  {
      title: 'Notes', field: 'notes',filtering:false,
  },
  {
      title: 'Archived', field: 'archived',filtering:false,
  },]
    return (
        <div>
            <MaterialTable title="OUTGOING"
                data={data}
                columns={selected ? columns_archived : columns}
                editable={{
                    onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setData([...data, newData]);
              insertgrainoutgoing(newData);
              setTimeout(() => resolve(), 500);
            }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataUpdate = [...data];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          updategrainoutgoing(newData);
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
                          deletegrainoutgoing(oldData);
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
                    exportButton: true,filtering:true,  
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