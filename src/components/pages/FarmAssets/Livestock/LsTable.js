import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function LsTable() {


  const [data, setData] = React.useState([])
    const [check, setcheck] = React.useState();
    let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);

  

    const getlivestock= async ( ) => {
      var json = { 
        "paramObject" : {
              "queryId":"FARMER_LIVESTOCK",
              "paramArray":[db.data[0].user_id],
              "strCallerFunction": "DEMO DATA"}
      };
    
      var response= await axios.post('http://localhost:3002/livestockgenericselect',json)
  
  //console.log(JSON.stringify(response.data))
  if(response)
  {
  setData(response.data);
    console.log(response.data)
   }
    }

    const insertlivestock= async (prop) => {
      console.log(prop);
      try{
        var json = {objJsonData:[
    
          {
            user_id: db.data[0].user_id,
            "livestock_id": prop.livestock_id,
            "livestock_created": prop.livestock_created,
            "livestock_type": prop.livestock_type,
            "livestock_name": prop.livestock_name,
            "livestock_number": prop.livestock_number,
            "livestock_ticon": prop.livestock_ticon,
            "livestock_notes": prop.livestock_notes
        }
        
       
        ]};
        var response= await axios.post("http://localhost:3002/livestockinsert",json);
        setcheck(1)
        console.log(response.data);
        
      }
      catch(e){
      console.log(e)
      }
      }

      const updatelivestock = async (prop) => {
        console.log(parseInt(prop.livestock_id))
        var json = {"objJsonData": {"updateSetObjectValue":  {
          user_id: db.data[0].user_id,
          "livestock_id": prop.livestock_id,
          "livestock_created": prop.livestock_created,
          "livestock_type": prop.livestock_type,
          "livestock_name": prop.livestock_name,
          "livestock_number": prop.livestock_number,
          "livestock_ticon": prop.livestock_ticon,
          "livestock_notes": prop.livestock_notes
      },	
          "whereInObject" : {"livestock_id" :[prop.livestock_id]}
},
"arrKeyFields" : ["livestock_id"]
};
        console.log(json)
      var response = await axios.post('http://localhost:3002/livestockbulkupdate', json)
      // if (response) {
      //   setData(response.data);
      //   console.log(response.data)
      // }
      setcheck(1)
    }

    const deletelivestock= async (prop) => {
      console.log(prop.livestock_id);
      try{
        var json =  {
          "strQuery":"delete from farmer.livestock where livestock_id=$1",
          "arrValues":[parseInt(prop.livestock_id)]
          };
        var response= await axios.post("http://localhost:3002/livestockdelete",json);
          setcheck(1)
        console.log(response.data);
        
      }
      catch(e){
      console.log(e)
      }
      }


    useEffect(()=>{
      getlivestock();
   
    }, [check]);


  ///////////////////////////////////////////////////////////////////
  const columns = [
    {
      title: "Type",
      field: "livestock_type",validate: (rowData) => {
        if (rowData.livestock_type === undefined || rowData.livestock_type === "") {
          return "Required";
        }
        return true;
      },
      lookup: {  0:"Cattle" ,
       1: "Bulls" ,
       2: "Sheep" ,
       3: "Horses",
       4: "Chickens" ,
       5: "Pigs" ,
       6: "Deer" ,
       7: "Goats" ,
       8: "Llamas" ,
       9: "Bees" ,},
    },
    {
      title: "Name",
      field: "livestock_name",
      validate: (rowData) => {
        if (rowData.livestock_name === undefined || rowData.livestock_name === "") {
          return "Required";
        } else if (rowData.livestock_name.length < 3) {
          return "Name Should Contain Atleast 3 chars";
        }
        return true;
      },
    },

    {
      title: "Number",
      field: "livestock_number",type:"numeric"
    },
    {
      title: "Notes",
      field: "livestock_notes",
    },
  ];
  // useEffect(() => {
  //   const type = {};
  //   lsType.map((row) => (type[row.id] = row.title));
  //   setType(type);
  // }, []);

  return (
    <div>
      <MaterialTable
        title="Livestock"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setData([...data, newData]);
              insertlivestock(newData);
              setTimeout(() => resolve(), 500);
            }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                updatelivestock(newData);
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
                deletelivestock(oldData);
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
          maxBodyHeight: 400,
        }}
        icons={{
         
          Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
          Edit: () => <CreateIcon color="action" />,
          Delete: () => <DeleteIcon color="action" />
        }}
      />
    </div>
  );
}
