import React, { useEffect } from 'react'
import MaterialTable from 'material-table';
import '../../Pages.css';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function WaterLicence() {


  const [check, setcheck] = React.useState();

  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);
  const [data, setData] = React.useState([])
  const columns = [{
    title: 'Name', field: 'waterlicense_name',validate: (rowData) => {
      if (rowData.waterlicense_name === undefined || rowData.waterlicense_name === "") {
        return "Required";
      }
      return true;
    },
  },
  {
    title: 'License number', field: 'license_number',validate: (rowData) => {
      if (rowData.license_number === undefined || rowData.license_number === "") {
        return "Required";
      }
      return true;
    },
  },
  {
    title: 'Notes', field: 'notes'
  }]

  const updatewaterlicense = async (prop) => {
    console.log(parseInt(prop.water_license_id))
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "water_license_id": parseInt(prop.water_license_id),
          "waterlicense_name": prop.waterlicense_name,
          "notes": prop.notes,
          "license_number": prop.license_number,
          "user_id": db.data[0].user_id
        },
        "whereInObject": { "water_license_id": [parseInt(prop.water_license_id)] }
      },
      "arrKeyFields": ["water_license_id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/waterlicensesbulkupdate', json)
    // if (response) {
    //   setData(response.data);
    //   console.log(response.data)
    // }
    setcheck(1)
  }

  const deletewaterlicense = async (prop) => {

    try {
      var json = {
        "strQuery": "delete from farmer.waterlicenses where water_license_id=$1",
        "arrValues": [parseInt(prop.water_license_id)]
      };
      var response = await axios.post("http://localhost:3002/waterlicensesdelete", json);
      setcheck(1)
      console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }
  const getwaterlicense = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_WATERLICENSES",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/waterlicensesgenericselect', json)

    //console.log(JSON.stringify(response.data))
    if (response) {
      setData(response.data);
      setcheck(1)
      console.log(response.data)
    }
  }



  const insertwaterlicense = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [

          {
            
            "waterlicense_name": prop.waterlicense_name,
            "notes": prop.notes,
            "license_number": prop.license_number,
            "user_id": db.data[0].user_id

          }

        ]
      };
      var response = await axios.post("http://localhost:3002/waterlicensesinsert", json);
      setcheck(1)
      // console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    
    getwaterlicense();
    
  }, [check])
  return (
    <div>
      <div className="table-size">

        <div className="subheader">

          <h1 style={{ "color": "black", "margin-bottom": "0px" }}>Water Licenses</h1><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>

        <MaterialTable
          data={data}
          columns={columns}
          editable={{

            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  insertwaterlicense(newData);
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
                  updatewaterlicense(newData);
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
                  deletewaterlicense(oldData);
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
            maxBodyHeight: 400,
            showTitle: false,
          }}
          icons={{

            Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
            Edit: () => <CreateIcon color="action" />,
            Delete: () => <DeleteIcon color="action" />
          }}
        /> </div>
    </div>
  )
}
