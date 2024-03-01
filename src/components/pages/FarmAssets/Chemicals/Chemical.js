import React from 'react'
import MaterialTable from 'material-table';
import '../../Pages.css';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from '../../export.png';
import axios from "axios";
import { useEffect } from "react";
export default function Chemicals() {
  const [data, setData] = React.useState([])

  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);
  const [check, setcheck] = React.useState();
  const getchemical = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_CHEMICALS",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };
    var response = await axios.post('http://localhost:3002/chemicalsgenericselect', json)
    setcheck(1)
    if (response) {
      setData(response.data);
      console.log(response.data)
    }
  }
  useEffect(() => {
    getchemical();
  }, [check]);


  const insertchemical = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [
          {
            "user_id": db.data[0].user_id,
            "chemical_name": prop.chemical_name,
            "actives": prop.actives,
            "resistance_group": prop.resistance_group,
            "default_application_rate": prop.default_application_rate,
            "withholding_period": prop.withholding_period,
            "inventory": prop.inventory,
            "unit": prop.unit,
            "iunit": prop.iunit
          }
        ]
      };
      var response = await axios.post("http://localhost:3002/chemicalsinsert", json);
      setcheck(1)
    }
    catch (e) {
      console.log(e)
    }
  }
  const updatechemical = async (prop) => {
    console.log(prop.chemical_id)
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "chemical_id": prop.chemical_id,
          "user_id": db.data[0].user_id,
          "chemical_name": prop.chemical_name,
          "actives": prop.actives,
          "resistance_group": prop.resistance_group,
          "default_application_rate": prop.default_application_rate,
          "withholding_period": prop.withholding_period,
          "inventory": prop.inventory,
          "unit": prop.unit,
          "iunit": prop.iunit
        },
        "whereInObject": { "chemical_id": [prop.chemical_id] }
      },
      "arrKeyFields": ["chemical_id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/chemicalsbulkupdate', json)
    setcheck(1)
  }

  const deletechemical = async (prop) => {
    console.log(prop.status);
    try {
      var json = {
        "strQuery": "delete from farmer.chemicals where chemical_id=$1",
        "arrValues": [parseInt(prop.chemical_id)]
      };
      var response = await axios.post("http://localhost:3002/chemicalsdelete", json);
      setcheck(1)
      console.log(response.data);
    }
    catch (e) {
      console.log(e)
    }
  }

  const columns = [

    {
      title: 'Name', field: 'chemical_name',validate: (rowData) => {
        if (rowData.chemical_name === undefined || rowData.chemical_name === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: 'Actives', field: 'actives',
    },
    {
      title: 'Resistance Group', field: 'resistance_group',validate: (rowData) => {
        if (rowData.resistance_group === undefined || rowData.resistance_group === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: 'Default Application rate', field: 'default_application_rate', type: 'numeric',validate: (rowData) => {
        if (rowData.default_application_rate === undefined || rowData.default_application_rate === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: 'Unit', field: 'unit',
      lookup: {
        '0': 'ml/ha', '1': 'Kg/ha', '2': 'L/ha', '3': 'lb/ha', '4': 'oz/ha', '5': 'g/ha',
        '6': 'floz/ac', '7': 'qt/ac', '8': 'pt/ac', '9': 'oz/ac', '10': 'lb/ac', '11': 'g/ac',
        '12': 'Kg/1000L', '13': 't/ha', '14': 'L/Kg', '15': 'L/t',
      },
    },
    {
      title: 'Inventory', field: 'inventory', type: 'numeric',
    },
    {
      title: 'Unit', field: 'iunit',
      lookup: {
        '0': 'mL', '1': 'Kg', '2': 'L', '3': 'lb', '4': 'oz', '5': 'g',
        '6': 'floz', '7': 'qt', '8': 'pt', '9': 't'
      },
    },
    {
      title: 'Witholding Period', field: 'withholding_period', type: 'numeric',

    }]
  return (
    <div>
      <div className="table-size">

        <div className="subheader">

          <h1 style={{ "color": "black", "margin-bottom": "0px" }}>Chemicals </h1><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>

        <MaterialTable
          data={data}
          columns={columns}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  insertchemical(newData);
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
                  updatechemical(newData);
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
                  deletechemical(oldData);
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
            showTitle: false,
            maxBodyHeight: 400,
          }}
          icons={{
            Export: () => <img src={Export} alt="export"></img>,
            Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
            Edit: () => <CreateIcon color="action" />,
            Delete: () => <DeleteIcon color="action" />
          }}
        /> </div>
    </div>
  )
}
