import React from 'react'
import MaterialTable from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from '../../export.png';
import axios from "axios";
import { useEffect } from "react";
export default function FertiliserTable() {
  const [data, setData] = React.useState([])

  const [check, setcheck] = React.useState();
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);
  const getfertiliser = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_FERTILISERS",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };
    var response = await axios.post('http://localhost:3002/fertilisergenericselect', json)
    setcheck(1)
    if (response) {
      setData(response.data);
      console.log(response.data)
    }
  }
  useEffect(() => {
    getfertiliser();
  }, [check]);


  const insertfertiliser = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [
          {
            user_id: db.data[0].user_id,
            "fertiliser_name": prop.fertiliser_name,
            "fertiliser_form": prop.fertiliser_form,
            "fertiliser_inventory": prop.fertiliser_inventory,
            "unit": prop.unit,
            "nutrients_name": prop.nutrients_name,
            "nutrients_composition": prop.nutrients_composition,
            "user_id": db.data[0].user_id
          }
        ]
      };
      var response = await axios.post("http://localhost:3002/fertiliserinsert", json);
      setcheck(1)
    }
    catch (e) {
      console.log(e)
    }
  }
  const updatefertiliser = async (prop) => {
    console.log(prop.fertiliser_id)
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "fertiliser_id": prop.fertiliser_id,
          user_id: db.data[0].user_id,
          "fertiliser_name": prop.fertiliser_name,
          "fertiliser_form": prop.fertiliser_form,
          "fertiliser_inventory": prop.fertiliser_inventory,
          "unit": prop.unit,
          "nutrients_name": prop.nutrients_name,
          "nutrients_composition": prop.nutrients_composition
        },
        "whereInObject": { "fertiliser_id": [prop.fertiliser_id] }
      },
      "arrKeyFields": ["fertiliser_id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/fertiliserbulkupdate', json)
    setcheck(1)
  }

  const deletefertiliser = async (prop) => {
    console.log(prop.status);
    try {
      var json = {
        "strQuery": "delete from farmer.fertiliser where fertiliser_id=$1",
        "arrValues": [prop.fertiliser_id]
      };
      var response = await axios.post("http://localhost:3002/fertiliserdelete", json);
      setcheck(1)
      console.log(response.data);
    }
    catch (e) {
      console.log(e)
    }
  }

  const columns = [{
    title: 'Name', field: 'fertiliser_name',validate: (rowData) => {
      if (rowData.fertiliser_name === undefined || rowData.fertiliser_name === "") {
        return "Required";
      }
      return true;
    },
  },
  {
    title: 'Form', field: 'fertiliser_form', lookup: { 0: 'Granular', 1: 'Powder', 2: 'Liquid', 3: 'Gas' }
  },
  {
    title: "Inventory", field: "fertiliser_inventory",  type: 'numeric',
  },
  {
    title: 'Units', field: 'unit', lookup: { 0: 'litres', 1: 'gallons', 2: 'kilograms', 3: 'pounds', 4: 'tonnes' }, filtering: false
  },
  {
    title: 'Nutrient Name', field: 'nutrients_name', filtering: false,validate: (rowData) => {
      if (rowData.nutrients_name === undefined || rowData.nutrients_name === "") {
        return "Required";
      }
      return true;
    },
  },
  {
    title: 'Nutrients Composition', field: 'nutrients_composition', filtering: false, type: "numeric"
  },
  ]
  return (
    <div>
      <div className="table-size">

        <div className="subheader">

          <h1 style={{ "color": "black" }}>Fertilizers </h1><span>&nbsp;&nbsp;</span>

        </div>
        <MaterialTable title="Fertilisers"
          data={data}
          columns={columns}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  insertfertiliser(newData);
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
                  updatefertiliser(newData)
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
                  deletefertiliser(oldData)
                  resolve()
                }, 1000)
              }),
          }}
          options={{
            showTitle: false,
            actionsColumnIndex: -1,
            exportButton: true,
            filtering: true,
            search: false,
            maxBodyHeight: 400,
          }}
          icons={{
            Export: () => <img src={Export} alt="export"></img>,
            Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
            Edit: () => <CreateIcon color="action" />,
            Delete: () => <DeleteIcon color="action" />
          }}
        />
      </div>
    </div>
  )
}