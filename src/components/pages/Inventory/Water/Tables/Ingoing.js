import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useEffect } from "react";
import Export from '../../../export.png';
import { ingoing_data } from '../../../../../Data/InventoryWaterData';
import { Checkbox } from "semantic-ui-react";
import './archived.css';
export default function Ingoing() {
  const [selected, toggleselected] = React.useState(false);
  const [data, setData] = React.useState([])
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);

  const [check, setcheck] = React.useState();
  const getwater = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_WATER_INGOING",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };
    var response = await axios.post('http://localhost:3002/wateringoinggenericselect', json)
    setcheck(1)
    if (response) {
      setData(response.data);
      console.log(response.data)
    }
  }
  useEffect(() => {
    getwater();
  }, [check]);


  const insertwater = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [
          {
            "user_id": db.data[0].user_id,
            "water_qnty": prop.water_qnty,
            "water_storage": prop.water_storage,
            "water_units": prop.water_units,
            "datetime": prop.datetime,
            "operators": prop.operators,
            "archived": prop.archived,
            "amount": prop.amount,
            "notes": prop.notes
          }
        ]
      };
      var response = await axios.post("http://localhost:3002/wateringoinginsert", json);
      setcheck(1)
    }
    catch (e) {
      console.log(e)
    }
  }
  const updatewater = async (prop) => {
    //console.log(parseInt(prop.id))
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "id": prop.id,
          "user_id": db.data[0].user_id,
          "water_qnty": prop.water_qnty,
          "water_storage": prop.water_storage,
          "water_units": prop.water_units,
          "datetime": prop.datetime,
          "operators": prop.operators,
          "archived": prop.archived,
          "amount": prop.amount,
          "notes": prop.notes
        },
        "whereInObject": { "id": [parseInt(prop.id)] }
      },
      "arrKeyFields": ["id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/wateringoingbulkupdate', json)
    setcheck(1)
  }

  const deletewater = async (prop) => {
    console.log(prop.id);
    try {
      var json = {
        "strQuery": "delete from farmer.waterinventoryingoing where id=$1",
        "arrValues": [prop.id]
      };
      var response = await axios.post("http://localhost:3002/wateringoingdelete", json);
      setcheck(1)
      console.log(response.data);
    }
    catch (e) {
      console.log(e)
    }
  }


  const columns = [{
    title: 'Water Storage', field: 'water_storage'
  },
  {
    title: 'Date/Time', field: 'datetime', type: "date"
  }, {
    title: 'Operator', field: 'operators',
  },
  {
    title: 'Amount', field: 'amount',
  },
  {
    title: 'Notes', field: 'notes',
  }]
  const columns_archived = [{
    title: 'Water Storage', field: 'water_storage'
  },
  {
    title: 'Date/Time', field: 'datetime', type: "date"
  }, {
    title: 'Operator', field: 'operators',
  },
  {
    title: 'Amount', field: 'amount',
  },
  {
    title: 'Notes', field: 'notes',
  },
  {
    title: "Archived",
    field: "archived", lookup: {
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
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                insertwater(newData)
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
                updatewater(newData)
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
                deletewater(oldData)
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
              <div className="toggle-switch" style={{ padding: '0px 20px' }}>
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
          Export: () => <img src={Export}></img>,

          Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
          Edit: () => <CreateIcon color="action" />,
          Delete: () => <DeleteIcon color="action" />


        }}
      />
    </div>
  )
}