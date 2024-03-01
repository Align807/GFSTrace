import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from '../../../export.png';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { stocktake_data } from '../../../../../Data/InventoryChemicalData';
import { Checkbox } from "semantic-ui-react";
import axios from "axios";
import { useEffect } from "react";
export default function StockTake() {
  const [selected, toggleselected] = React.useState(false);
  const [data, setData] = React.useState([])
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);
  const [check, setcheck] = React.useState();
  const getchemical = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_CHEMICAL_STOCKTAKE",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };
    var response = await axios.post('http://localhost:3002/chemicalstocktakegenericselect', json)
    setcheck(1)
    if (response) {
      setData(response.data);
      console.log(response.data)
    }
  }
  useEffect(() => {
    getchemical();
  }, [check]);


  const insertchemicalstocktake = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [
          {
            "user_id": db.data[0].user_id,
            "paddock_id": prop.paddock_id,
            "datatime": prop.datatime,
            "operators": prop.operators,
            "chemicals": prop.chemicals,
            "reported": prop.reported,
            "archived": prop.archived,
            "chemical_qnty": prop.chemical_qnty,
            "chemical_units": prop.chemical_units,
            "stocktake_status": prop.stocktake_status
          }
        ]
      };
      var response = await axios.post("http://localhost:3002/chemicalinventorystocktakeinsert", json);
      setcheck(1)
    }
    catch (e) {
      console.log(e)
    }
  }
  const updatechemicalstocktake = async (prop) => {
    console.log(prop.id)
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "id": prop.id,
          "user_id": db.data[0].user_id,
          "paddock_id": prop.paddock_id,
          "datatime": prop.datatime,
          "operators": prop.operators,
          "chemicals": prop.chemicals,
          "reported": prop.reported,
          "archived": prop.archived,
          "chemical_qnty": prop.chemical_qnty,
          "chemical_units": prop.chemical_units,
          "stocktake_status": prop.stocktake_status
        },
        "whereInObject": { "id": [prop.id] }
      },
      "arrKeyFields": ["id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/chemicalstocktakebulkupdate', json)
    setcheck(1)
  }

  const deletechemicalstocktake = async (prop) => {
    console.log(prop.id);
    try {
      var json = {
        "strQuery": "delete from farmer.chemicalinventorystocktake where id=$1",
        "arrValues": [prop.id]
      };
      var response = await axios.post("http://localhost:3002/chemicalstocktakedelete", json);
      setcheck(1)
      console.log(response.data);
    }
    catch (e) {
      console.log(e)
    }
  }
  const columns = [
    {
      title: 'Date', field: 'datatime', type: "date"
    }, {
      title: 'Operator', field: 'operators',
    },
    {
      title: 'Chemicals', field: 'chemicals',
    },
    {
      title: 'Reported', field: 'reported',
    }]
  const columns_archived = [
    {
      title: 'Date', field: 'datatime', type: "date"
    }, {
      title: 'Operator', field: 'operators',
    },
    {
      title: 'Chemicals', field: 'chemicals',
    },
    {
      title: 'Reported', field: 'reported',
    },
    {
      title: "Archived",
      field: "archived",
    },]
  return (
    <div>
      <MaterialTable title="STOCKTAKE"
        data={data}
        columns={selected ? columns_archived : columns}
        editable={{
          //   onRowAdd:(newRow)=> new Promise((resolve,reject)=>{}),
          //   onRowUpdate:(newRow,oldRow)=> new Promise(()=>{}),
          //   onRowDelete:(selectedRow)=> new Promise(()=>{})
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                insertchemicalstocktake(newData)
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
                updatechemicalstocktake(newData)
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
                deletechemicalstocktake(oldData)
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