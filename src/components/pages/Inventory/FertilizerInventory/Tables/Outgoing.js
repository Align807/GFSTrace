import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from '../../../export.png';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { outgoing_data } from './Tabledatas';
import { Checkbox } from "semantic-ui-react";
import axios from "axios";
import { useEffect } from "react";
import './archived.css';
export default function Outgoing() {
  const [selected, toggleselected] = React.useState(false);
  const [data, setData] = React.useState([])
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);

  const [check, setcheck] = React.useState();
  const getfertiliser = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_FERTILISER_OUTGOING",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };
    var response = await axios.post('http://localhost:3002/fertiliseroutgoinggenericselect', json)
    setcheck(1)
    if (response) {
      setData(response.data);
      console.log(response.data)
    }
  }
  useEffect(() => {
    getfertiliser();
  }, [check]);


  const insertfertiliseringoing = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [
          {
            "user_id": db.data[0].user_id,
            "jobtype": prop.jobtype,
            "jobdescription": prop.jobdescription,
            "datetime": prop.datetime,
            "operators": prop.operators,
            "fertiliser": prop.fertiliser,
            "notes": prop.notes,
            "archived": prop.archived,
            "fertiliser_out": prop.fertiliser_out,
            "fertiliser_qnty": prop.fertiliser_qnty,
            "fertiliser_units": prop.fertiliser_units,
            "outgoing_status": prop.outgoing_status
          }
        ]
      };
      var response = await axios.post("http://localhost:3002/fertiliserinventoryoutgoinginsert", json);
      setcheck(1)
    }
    catch (e) {
      console.log(e)
    }
  }
  const updatefertiliseringoing = async (prop) => {
    //console.log(parseInt(prop.id))
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "id": prop.id,
          "user_id": db.data[0].user_id,
          "jobtype": prop.jobtype,
          "jobdescription": prop.jobdescription,
          "datetime": prop.datetime,
          "operators": prop.operators,
          "fertiliser": prop.fertiliser,
          "notes": prop.notes,
          "archived": prop.archived,
          "fertiliser_out": prop.fertiliser_out,
          "fertiliser_qnty": prop.fertiliser_qnty,
          "fertiliser_units": prop.fertiliser_units,
          "outgoing_status": prop.outgoing_status
        },
        "whereInObject": { "id": [parseInt(prop.id)] }
      },
      "arrKeyFields": ["id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/fertiliseroutgoingbulkupdate', json)
    setcheck(1)
  }

  const deletefertiliseringoing = async (prop) => {
    console.log(prop.id);
    try {
      var json = {
        "strQuery": "delete from farmer.fertiliserinventoryoutgoing where id=$1",
        "arrValues": [prop.id]
      };
      var response = await axios.post("http://localhost:3002/fertiliserinventoryoutgoingdelete", json);
      setcheck(1)
      console.log(response.data);
    }
    catch (e) {
      console.log(e)
    }
  }


  const columns = [{
    title: 'Job Type', field: 'jobtype'
  },
  {
    title: 'Job Description', field: 'jobdescription',
  },
  {
    title: 'Date', field: 'datetime', type: "date"
  }, {
    title: 'Operator', field: 'operators',
  },
  {
    title: 'Fertilisers', field: 'fertiliser',
  },
  {
    title: 'Notes', field: 'notes',
  }]
  const columns_archived = [{
    title: 'Job Type', field: 'jobtype'
  },
  {
    title: 'Job Description', field: 'jobdescription',
  },
  {
    title: 'Date', field: 'datetime', type: "date"
  }, {
    title: 'Operator', field: 'operators',
  },
  {
    title: 'Fertilisers', field: 'fertiliser',
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
      <MaterialTable title="OUTGOING"
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
                insertfertiliseringoing(newData)
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
                updatefertiliseringoing(newData)
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
                deletefertiliseringoing(oldData)
                resolve()
              }, 1000)
            }),
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
                  label="Show Archived Tickets"
                />
              </div>
            </div>
          ),
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