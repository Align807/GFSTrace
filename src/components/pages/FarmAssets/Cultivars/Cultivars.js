import React from 'react'
import MaterialTable, { MTableEditField, MTableToolbar } from 'material-table';
import '../../Pages.css';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from '../../export.png';
import farm from "../../../../Data/farmData";
import axios from "axios";
import { useEffect } from "react";
import { Autocomplete } from '@mui/material';
function Cultivars() {
  const [data, setData] = React.useState([])

  const [check, setcheck] = React.useState();
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);
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
      setData(response.data);
      console.log(response.data)
    }
  }
  useEffect(() => {
    getcultivars();
  }, [check]);


  const insertcultivars = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [
          {
            "user_id": db.data[0].user_id,
            "cultivar_id":prop.cultivar_id,
            "cultivar_name":prop.cultivar_name,
            "grain_weight": prop.grain_weight,
            "cultivar_varieties": prop.cultivar_varieties,
            "traits":prop.traits,
        }
        ]
      };
      var response = await axios.post("http://localhost:3002/cultivarsinsert", json);
      setcheck(1)
    }
    catch (e) {
      console.log(e)
    }
  }
  const updatecultivars = async (prop) => {
    console.log(prop.cultivar_id)
    var json = {
      "objJsonData": {
        "updateSetObjectValue":{
          "user_id": db.data[0].user_id,
          "cultivar_id":prop.cultivar_id,
          "cultivar_name":prop.cultivar_name,
          "grain_weight": prop.grain_weight,
          "cultivar_varieties": prop.cultivar_varieties,
          "traits":prop.traits,
      },
        "whereInObject": { "cultivar_id": [prop.cultivar_id] }
      },
      "arrKeyFields": ["cultivar_id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/cultivarsbulkupdate', json)
    setcheck(1)
  }

  const deletecultivars = async (prop) => {
    console.log(prop.status);
    try {
      var json = {
        "strQuery": "delete from farmer.cultivars where cultivar_id=$1",
        "arrValues": [parseInt(prop.cultivar_id)]
      };
      var response = await axios.post("http://localhost:3002/cultivarsdelete", json);
      setcheck(1)
      console.log(response.data);
    }
    catch (e) {
      console.log(e)
    }
  }


  const columns = [{
    title: 'Name', field: 'cultivar_name',validate: (rowData) => {
      if (rowData.cultivar_name === undefined || rowData.cultivar_name === "") {
        return "Required";
      }
      return true;
    },
  },
  {
    title: 'Grain Weight(Kg/hl)', field: 'grain_weight',validate: (rowData) => {
      if (rowData.grain_weight === undefined || rowData.grain_weight === "") {
        return "Required";
      }
      return true;
    },
  }, {
    title: 'Varieties', field: 'cultivar_varieties', sorting: false
  }, {
    title: 'Traits', field: 'traits', sorting: false
  },
  ]
  return (
    <div className="table-size">

      <div className="subheader">

        <h1 style={{ "color": "black", "margin-bottom": "0px" }}>Cultivars </h1><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

      </div>

      <div className="equipment-table"></div>
      <div>
        <MaterialTable
          data={data}
          columns={columns}
          components={{
            EditField: fieldProps => {
              const {
                columnDef: { lookup },
              } = fieldProps
              if (lookup) {
                console.info(fieldProps)
                return <Autocomplete {...fieldProps} />
              } else {
                return <MTableEditField {...{ ...fieldProps, value: fieldProps.value || '' }} />
              }
            },
          }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  insertcultivars(newData);
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
                  updatecultivars(newData);
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
                  deletecultivars(oldData);
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
            actionsColumnIndex: -1,
            maxBodyHeight: 400,
          }}
          icons={{
            Export: () => <img src={Export} alt="export"></img>,
            Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
            Edit: () => <CreateIcon color="action" />,
            Delete: () => <DeleteIcon color="action" />
          }}
        ></MaterialTable>
      </div> </div>
  )
}

export default Cultivars