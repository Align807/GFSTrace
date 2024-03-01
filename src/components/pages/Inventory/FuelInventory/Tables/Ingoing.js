import React, { useEffect, useState } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { ingoing_data, type_data } from './Tabledatas';
import { Checkbox } from "semantic-ui-react";
import Export from './export.png';
import axios from "axios";
export default function Ingoing() {
  const [selected, toggleselected] = React.useState(false);
  const [type, setType] = useState({});
  const [data, setData] = React.useState([])
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);

  const [check, setcheck] = React.useState();
  const getfuel = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_FUEL_INGOING",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };
    var response = await axios.post('http://localhost:3002/fuelingoinggenericselect', json)
    setcheck(1)
    if (response) {
      setData(response.data);
      console.log(response.data)
    }
  }
  useEffect(() => {
    getfuel();
  }, [check]);


  const insertfuelingoing = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [
          {
            "user_id": db.data[0].user_id,
            "fueltank": prop.fueltank,
            "datetime": prop.datetime,
            "operators": prop.operators,
            "amount": prop.amount,
            "type": prop.type,
            "supplier": prop.supplier,
            "notes": prop.notes,
            "archived": prop.archived
          }
        ]
      };
      var response = await axios.post("http://localhost:3002/fuelinventoryingoinginsert", json);
      setcheck(1)
    }
    catch (e) {
      console.log(e)
    }
  }
  const updatefuelingoing = async (prop) => {
    //console.log(parseInt(prop.id))
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "id": prop.id,
          "user_id": db.data[0].user_id,
          "fueltank": prop.fueltank,
          "datetime": prop.datetime,
          "operators": prop.operators,
          "amount": prop.amount,
          "type": prop.type,
          "supplier": prop.supplier,
          "notes": prop.notes,
          "archived": prop.archived
        },
        "whereInObject": { "id": [parseInt(prop.id)] }
      },
      "arrKeyFields": ["id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/fuelingoingbulkupdate', json)
    setcheck(1)
  }

  const deletefuelingoing = async (prop) => {
    console.log(prop.id);
    try {
      var json = {
        "strQuery": "delete from farmer.fuelinventoryingoing where id=$1",
        "arrValues": [prop.id]
      };
      var response = await axios.post("http://localhost:3002/fuelinventoryingoingdelete", json);
      setcheck(1)
      console.log(response.data);
    }
    catch (e) {
      console.log(e)
    }
  }


  const columns = [{
    title: 'Fuel Tank', field: 'fueltank', filtering: false,
  },

  {
    title: 'Date/Time', field: 'datetime', filtering: false, type: "date"
  }, {
    title: 'Operator', field: 'operators', filtering: false,
  },
  {
    title: 'Amount', field: 'amount', filtering: false,
  },
  {
    title: 'Type', field: 'type', lookup: type,
  },
  {
    title: 'Supplier', field: 'supplier', filtering: false,
  },

  {
    title: 'Notes', field: 'notes', filtering: false,
  },


  ]
  const columns_archived = [{
    title: 'Fuel Tank', field: 'fueltank', filtering: false,
  },

  {
    title: 'Date/Time', field: 'datetime', filtering: false, type: "date"
  }, {
    title: 'Operator', field: 'operators', filtering: false,
  },
  {
    title: 'Amount', field: 'amount', filtering: false,
  },
  {
    title: 'Type', field: 'type', lookup: type,
  },
  {
    title: 'Supplier', field: 'supplier', filtering: false,
  },

  {
    title: 'Notes', field: 'notes', filtering: false,
  },
  {
    title: 'Archived', field: 'archived', lookup: {
      '0': 'No',
      '1': 'Yes'
    }
  },
  ];
  useEffect(() => {
    const type = {};
    type_data.map((row) => (type[row.id] = row.title));
    setType(type);
  }, []);
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
                insertfuelingoing(newData)
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
                updatefuelingoing(newData)
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
                deletefuelingoing(oldData)
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
          filtering: true,
          maxBodyHeight: 400,
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
          Export: () => <img src={Export}></img>,
          Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
          Edit: () => <CreateIcon color="action" />,
          Delete: () => <DeleteIcon color="action" />
        }}
      />
    </div>
  )
}