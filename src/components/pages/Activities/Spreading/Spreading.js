import React, { useState } from "react";
import MaterialTable from "material-table";
import { MTableCell } from "material-table";
import '../../Pages.css';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import {useTranslation,Trans} from 'react-i18next';
import {Icon} from 'semantic-ui-react';
import axios from "axios";
import { useEffect } from "react";

export default function Spreading() {

  const [data, setData] = React.useState([])
  const {t} =useTranslation();
   const [farm, setfarm] = React.useState([]);
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);
  var obj = farm.reduce(function (acc, cur, i) {
    acc[cur.farmid] = cur.farm_name;

    return acc;
  }, {});
  console.log(obj);
  const [check, setcheck] = React.useState();
  const getfarms = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_FARMS",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/farmsgenericselect', json)

    //console.log(JSON.stringify(response.data))
    if (response) {
      setfarm(response.data);
    }

  }
  const getactivity = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_ACTIVITYCOMPLETE",
        "paramArray": [db.data[0].user_id, "Spreading"],
        "strCallerFunction": "DEMO DATA"
      }
    };
    var response = await axios.post('http://localhost:3002/activitygenericselect', json)
    setcheck(1)
    if (response) {
      setData(response.data);
      console.log(response.data)
    }
  }
  useEffect(() => {
    getfarms();
    getactivity();
  }, [check]);


  const insertactivity = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [
          {
            "farmid": prop.farmid,
            "paddockid": prop.paddockid,
            "act_type": "Spreading",
            "act_createdate": prop.act_createdate,
            "act_description": prop.act_description,
            "act_assigned": prop.act_assigned,
            "scheduled_date": prop.scheduled_date,
            "estd_hours": prop.estd_hours,
            "act_contract": prop.act_contract,
            "act_contractor": prop.act_contractor,
            "act_start_date": prop.act_start_date,
            "act_end_date": prop.act_end_date,
            "act_started": prop.act_started,
            "act_completed": prop.act_completed,
            "act_status": prop.act_status,
            "paddock_maint_category": prop.paddock_maint_category,
            "livestock_type": prop.livestock_type,
            "livestock_products": prop.livestock_products,
            "act_approvedby": prop.act_approvedby,
            "act_approved": prop.act_approved,
            "user_id": db.data[0].user_id
          }
        ]
      };
      var response = await axios.post("http://localhost:3002/activityinsert", json);
      setcheck(1)
    }
    catch (e) {
      console.log(e)
    }
  }
  const updateactivity = async (prop) => {
    console.log(parseInt(prop.act_id))
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          "act_id": prop.act_id,
          "farmid": prop.farmid,
          "paddockid": prop.paddockid,
          "act_type": "Spreading",
          "act_createdate": prop.act_createdate,
          "act_description": prop.act_description,
          "act_assigned": prop.act_assigned,
          "scheduled_date": prop.scheduled_date,
          "estd_hours": prop.estd_hours,
          "act_contract": prop.act_contract,
          "act_contractor": prop.act_contractor,
          "act_start_date": prop.act_start_date,
          "act_end_date": prop.act_end_date,
          "act_started": prop.act_started,
          "act_completed": prop.act_completed,
          "act_status": prop.act_status,
          "paddock_maint_category": prop.paddock_maint_category,
          "livestock_type": prop.livestock_type,
          "livestock_products": prop.livestock_products,
          "act_approvedby": prop.act_approvedby,
          "act_approved": prop.act_approved
        },
        "whereInObject": { "act_id": [parseInt(prop.act_id)] }
      },
      "arrKeyFields": ["act_id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/activitybulkupdate', json)
    setcheck(1)
  }

  const deleteactivity = async (prop) => {
    console.log(prop.act_id);
    try {
      var json = {
        "strQuery": "delete from farmer.activity where act_id=$1",
        "arrValues": [prop.act_id]
      };
      var response = await axios.post("http://localhost:3002/activitydelete", json);
      setcheck(1)
      console.log(response.data);
    }
    catch (e) {
      console.log(e)
    }
  }
  
  const columns = [
    {
      title: t('navbar.farms',"Farm"), field: "farmid", lookup: obj, validate: (rowData) => {
        if (rowData.farmid === undefined || rowData.farmid === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      title: t('activities.status',"Status"),
      field: "act_status",validate: (rowData) => {
        if (rowData.act_status === undefined || rowData.act_status === "") {
          return "Required";
        }
        return true;
      },
     
     
    
      lookup: { '0': 'Started',
      '1': 'In-progress',
      '2': 'Completed',
      '3': 'Cancelled',
     
      } ,
      render: rowData => {
        switch (rowData.act_status) {
        case '0':
                return <Icon name='blue circle outline' size='large'/>
        case '2':
                return <Icon name='green circle' size='large'/>
        case '1':
                return <Icon name='blue circle'size='large'/>
        case '3':
               return <Icon name='red circle'size='large'/>
        
      default:
        return <></>
          }
        }

  
},
    
   
{ title: t('activities.contract',"Contract"), field: "act_contract",  
lookup: { '0': 'No',
'1': 'Yes'}
},
    
    { title: t('activities.approved',"Approved"), field: "act_approved",lookup: { '0': 'No',
    '1': 'Yes'}
    
   },
    { title: t('activities.description',"Description"), field: "act_description" },
    { title: t('activities.duedate',"Due Date"), field: "scheduled_date", type:"date", filtering: false },
    // { title:t('activities.started',"Started"), field: "started",lookup: { '0': 'No',
    // '1': 'Yes'}
    // },
    // { title: t('activities.completed',"Completed"), field: "completed", lookup: { '0': 'No',
    // '1': 'Yes'}
    // },
    
  ];
  // const handleChange = (event) => {
  //   toggleselected(!selected)
  //   setData(!selected ? spreadingData_withcomplete : spreadingData_withoutcomplete)
  // };
  return (
    <div  className= "table-size">
    
    <div className= "subheader">
             
        <h1 style={{"color": "black", "margin-bottom":"0px"}}><Trans i18nKey="spreading.heading">spreading</Trans> </h1><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      
        {/* <div className="toggle-switch">
          <Checkbox
            toggle
            onClick={handleChange}
            checked={selected}
          />
        </div>
        <div className="completed"><Trans i18nKey="general.showcompleted">Show Completed</Trans></div> */}
      </div>

      <div className="equipment-table">
        <MaterialTable
          columns={columns}
          data={data}
          editable={{
            //   onRowAdd:(newRow)=> new Promise((resolve,reject)=>{}),
            //   onRowUpdate:(newRow,oldRow)=> new Promise(()=>{}),
            //   onRowDelete:(selectedRow)=> new Promise(()=>{})
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  insertactivity(newData)
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
                  updateactivity(newData)
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
                  deleteactivity(oldData)
                  resolve()
                }, 1000)
              }),
          }}
          localization={{
            toolbar:{
              searchTooltip:t('materialtable.searchtooltip','Search'),
              searchPlaceholder:t('materialtable.searchplaceholder','Search')
            },
            header:{
              actions:t('materialtable.headeractions','Actions')

            },
            body:{
              addTooltip:t('materialtable.bodyaddtooltip','Add'),
              deleteTooltip:t('materialtable.bodydeletetooltip','Delete'),
              editTooltip:t('materialtable.edittooltip','Edit'),
              emptyDataSourceMessage:t('materialtable.emptydatasourcemessage','No records to diplay'),
              editRow:{
                deleteText:t('materialtable.deletetext','Are you sure u want to delete?'),
                cancelTooltip:t('materialtable.editrowcanceltip','Cancel'),
                saveTooltip:t('materialtable.editrowsavetooltip','Save')
              },
              filterRow:{
                filterTooltip:t('materialtable.feltertooltip','Filter')
              }
            },
            pagination:{
              previousTooltip:t('materialtable.previoustooltip','Previous Page'),
              nextTooltip:t('materialtable.nexttooltip','Next Page'),
              labelRowsSelect:t('materialtable.labelrowselect','rows')
              
            }
          }}
          options={{
            showTitle: false,
            paging: true,
            pageSizeOptions: [2, 5, 10, 15, 20],
            paginationType: "stepped",
            showFirstLastPageButtons: false,
            filtering: true,
            actionsColumnIndex:-1,
            maxBodyHeight: 400,
          }}
          components={{
            Cell: (props) => (
              <Tooltip placement="bottom" title={props.value ? props.value : ''}>
                <MTableCell {...props} />
              </Tooltip>       /// Add translation for tooltip also
            ),
          }}
          icons={{
          
            Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
            Edit: () => <CreateIcon color="action" />,
            Delete: () => <DeleteIcon color="action" />
           
          }}
        ></MaterialTable>
      </div>
    </div>
  );
}
