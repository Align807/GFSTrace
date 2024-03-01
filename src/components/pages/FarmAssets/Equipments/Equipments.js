import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import "./Equipment.css";
import '../../Pages.css';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from '../../export.png';
import axios from "axios";

export default function Equipments() {
  const [check, setcheck] = React.useState();

  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);
  const [data, setData] = React.useState([])
  

  const updateequipment = async (prop) => {
    console.log(parseInt(prop.equipment_id))
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "equipment_id": prop.equipment_id,
          "equip_brand": prop.equip_brand,
          "equip_name": prop.equip_name,
          "equip_notes": prop.equip_notes,
          "equip_year":prop.equip_year,
          "equip_serial_No": prop.equip_serial_No,
          "equip_fuelable":prop.equip_fuelable,
          "equip_archived":prop.equip_archived,
          "user_id": db.data[0].user_id
        },
        "whereInObject":{"equipment_id":[parseInt(prop.equipment_id)]}
      },
      "arrKeyFields": ["equipment_id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/equipmentbulkupdate', json)

    setcheck(1)
  }

  const deleteequipment = async (prop) => {

    try {
      var json = {
        "strQuery": "delete from farmer.equipment where equipment_id=$1",
        "arrValues": [parseInt(prop.equipment_id)]
      };
      var response = await axios.post("http://localhost:3002/equipmentdelete", json);
      setcheck(1)
      console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }
  const getequipment = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_EQUIPMENT",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/equipmentgenericselect', json)

    //console.log(JSON.stringify(response.data))
    if (response) {
      setData(response.data);
      setcheck(1)
      console.log(response.data)
    }
  }



  const insertequipment = async (prop) => {
    console.log(prop);
    try {
      var json = { 
        objJsonData: [

          {
            "equip_brand": prop.equip_brand,
            "equip_name": prop.equip_name,
            "equip_notes": prop.equip_notes,
            "equip_year":prop.equip_year,
            "equip_serial_No": prop.equip_serial_No,
            "equip_fuelable":prop.equip_fuelable,
            "equip_archived":prop.equip_archived,
            "user_id": db.data[0].user_id

          }

        ]
      };
      var response = await axios.post("http://localhost:3002/equipmentinsert", json);
      setcheck(1)
      // console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    
    getequipment();
    
  }, [check])
 
  
  const columns = [
    {
      title: "Brand",
      field: "equip_brand",validate: (rowData) => {
        if (rowData.equip_brand === undefined || rowData.equip_brand === "") {
          return "Required";
        }
        return true;
      },
    },
    { title: "Name", field: "equip_name",validate: (rowData) => {
      if (rowData.equip_name === undefined || rowData.equip_name === "") {
        return "Required";
      }
      return true;
    }, },
    { title: "Year", field: "equip_year" },
    { title: "Serial No", field: "equip_serial_No" },
    { title: "Notes", field: "equip_notes" },
    { title: "Fuelable", field: "equip_fuelable" , lookup: { 0: "Yes", 1: "No" }},
    {
      title: "Archived",
      field: "equip_archived",
      lookup: { 0: "Yes", 1: "No" }
    },
  ];
  return (
    <div  className= "table-size">
    
    <div className= "subheader">
             
        <h1 style={{"color": "black", "margin-bottom":"0px"}}>Equipments </h1><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      
      
      </div>

      <div className="equipment-table">
        <MaterialTable
          columns={columns}
          data={data}
          editable={{
            
            onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            setData([...data, newData]);
            insertequipment(newData);
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
            updateequipment(newData);
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
            deleteequipment(oldData);
            resolve()
          }, 1000)
        }),
            }}
          options={{
            showTitle: false,
            paging: true,
            pageSizeOptions: [2, 5, 10, 15, 20],
            paginationType: "stepped",
            showFirstLastPageButtons: false,
            exportButton: true,
            actionsColumnIndex:-1,
            maxBodyHeight: 400,
          }}
          icons={{
            Export: () => <img src={Export} alt="export"></img>,
            Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
            Edit: () => <CreateIcon color="action" />,
            Delete: () => <DeleteIcon color="action" />
          }}
        ></MaterialTable>
      </div>
    </div>
  );
}
