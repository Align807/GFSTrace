import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from '../../../export.png';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Checkbox } from "semantic-ui-react";
import axios from "axios";
import { useEffect } from "react";
export default function Ingoing() {
  const [selected, toggleselected] = React.useState(false);
  const [data, setData] = React.useState([])
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);

  const [check, setcheck] = React.useState();
  const getchemical = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_CHEMICAL_INGOING",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };
    var response = await axios.post('http://localhost:3002/chemicalingoinggenericselect', json)
    setcheck(1)
    if (response) {
      setData(response.data);
      console.log(response.data)
    }
  }
  useEffect(() => {
    getchemical();
  }, [check]);


  const insertchemicalingoing = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [
          {
            "user_id": db.data[0].user_id,
            "supplier": prop.supplier,
            "docket_no": prop.docket_no,
            "operators": prop.operators,
            "dates": prop.dates,
            "notes": prop.notes,
            "archived": prop.archived,
            "ingoing_status": prop.ingoing_status,
            "chemical_qnty": prop.chemical_qnty,
            "chemical_units": prop.chemical_units,
            "chemicals": prop.chemicals
          }
        ]
      };
      var response = await axios.post("http://localhost:3002/chemicalinventoryingoinginsert", json);
      setcheck(1)
    }
    catch (e) {
      console.log(e)
    }
  }
  const updatechemicalingoing = async (prop) => {
    console.log(prop.id)
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "id": prop.id,
          "user_id": db.data[0].user_id,
          "supplier": prop.supplier,
          "docket_no": prop.docket_no,
          "operators": prop.operators,
          "dates": prop.dates,
          "notes": prop.notes,
          "archived": prop.archived,
          "ingoing_status": prop.ingoing_status,
          "chemical_qnty": prop.chemical_qnty,
          "chemical_units": prop.chemical_units,
          "chemicals": prop.chemicals
        },
        "whereInObject": { "id": [prop.id] }
      },
      "arrKeyFields": ["id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/chemicalingoingbulkupdate', json)
    setcheck(1)
  }

  const deletechemicalingoing = async (prop) => {
    console.log(prop.id);
    try {
      var json = {
        "strQuery": "delete from farmer.chemicalinventoryingoing where id=$1",
        "arrValues": [prop.id]
      };
      var response = await axios.post("http://localhost:3002/chemicalingoingdelete", json);
      setcheck(1)
      console.log(response.data);
    }
    catch (e) {
      console.log(e)
    }
  }

  const columns = [{
    title: 'Supplier', field: 'supplier'
  },
  {
    title: 'Docket No.', field: 'docket_no',
  },
  {
    title: 'Date', field: 'dates', type: "date"
  }, {
    title: 'Operator', field: 'operators',
  },
  {
    title: 'Chemicals', field: 'chemicals',
  },
  {
    title: 'Chemical Quantity', field: 'chemical_qnty',
  },
  {
    title: 'Notes', field: 'notes',
  }]
  const columns_archived = [{
    title: 'Supplier', field: 'supplier'
  },
  {
    title: 'Docket No.', field: 'docket_no',
  },
  {
    title: 'Date', field: 'dates', type: "date"
  }, {
    title: 'Operator', field: 'operators',
  },
  {
    title: 'Chemicals', field: 'chemicals',
  },
  {
    title: 'Chemical Quantity', field: 'chemical_qnty',
  },
  {
    title: 'Notes', field: 'notes',
  },
  {
    title: "Archived",
    field: "archived",
    lookup: {
      '0': 'No',
      '1': 'Yes'
    }
  },]
  return (
    <div>
      <MaterialTable title="INGOING"
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
                insertchemicalingoing(newData)
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
                updatechemicalingoing(newData)
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
                deletechemicalingoing(oldData)
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