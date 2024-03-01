import React, { useState } from "react";
import MaterialTable from "material-table";
import { MTableCell } from "material-table";
import { Checkbox } from "semantic-ui-react";
import "./job.css";
import '../Pages.css';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation, Trans } from 'react-i18next';
import axios from "axios";
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon } from 'semantic-ui-react';
import {
  jobData_withoutcomplete,
  jobData_withcomplete,
} from "../../../Data/JobData";
import { useEffect } from "react";

export default function Job() {
  const [selected, toggleselected] = useState(false);
  const [data, setData] = React.useState([])
  const [check, setcheck] = React.useState();
  const [user, setuser] = React.useState([]);
  const { t } = useTranslation();
  const [columnSelected, setColumnSelected] = React.useState();
  const [hide, sethide] = React.useState(true);
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);

  var obj = user.reduce(function (acc, cur, i) {
    acc[cur.user_id] = cur.user_firstname + " " + cur.user_lastname;

    return acc;
  }, {});
  
  const handleCategory = (props)=>{
    
    if(props==2 || props==3 || props==4){
      sethide(false);
    }
    else{
      sethide(true);
    }
    alert(props);
  }
  const handleFarm= ()=>{

  }
  const getassignee = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_USER_NAME",
        "paramArray": ["2", db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/usersgenericselect', json)

    //console.log(JSON.stringify(response.data))
    if (response) {
      setuser(response.data);
    }

  }

  const getjob = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_JOBS",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/jobsgenericselect', json)

    //console.log(JSON.stringify(response.data))
    if (response) {
      setData(response.data);
      console.log(response.data)
    }
  }



  const insertJob = async (prop) => {
    console.log(prop);
    try {
      var json = {
        objJsonData: [

          {
            farmid:prop.farmid,
            job_status: prop.job_status,
            job_category: prop.job_category,
            job_priority: prop.job_priority,
            job_start_date: prop.job_start_date,
            job_due_date: prop.job_due_date,
            job_notes: prop.job_notes,
            job_subcategory: prop.job_subcategory,
            job_assigned: prop.job_assigned,
            user_id: db.data[0].user_id
          }

        ]
      };
      var response = await axios.post("http://localhost:3002/jobsinsert", json);
      setcheck(1)
      console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }

  const updateJob = async (prop) => {
    console.log(parseInt(prop.job_id))
    var json = {
      "objJsonData": {
        "updateSetObjectuser_firstname": {
          job_status: prop.job_status,
          farmid:prop.farmid,
          job_category: prop.job_category,
          job_priority: prop.job_priority,
          job_start_date: prop.job_start_date,
          job_due_date: prop.job_due_date,
          job_notes: prop.job_notes,
          job_subcategory: prop.job_subcategory,
          job_assigned: prop.job_assigned,
          user_id: db.data[0].user_id
        },
        "whereInObject": { "job_id": [parseInt(prop.job_id)] }
      },
      "arrKeyFields": ["job_id"]
    };
    console.log(json)
    var response = await axios.post('http://localhost:3002/paddockbulkupdate', json)
    // if (response) {
    //   setData(response.data);
    //   console.log(response.data)
    // }
    setcheck(1)
  }

  const deleteJob = async (prop) => {

    try {
      var json = {
        "strQuery": "delete from farmer.jobs where job_id=$1",
        "arruser_firstnames": [parseInt(prop.job_id)]
      };
      var response = await axios.post("http://localhost:3002/jobsdelete", json);
      setcheck(1)
      console.log(response.data);

    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getassignee();
    getjob();

  }, [check]);


  const columns = [
    {

      title: t('jobs.status', "Status"),
      field: "job_status",


      lookup: {
        '0': <Trans i18nKey="jobs.raised">Raised</Trans>,
        '1': t('jobs.raisedandassigned', 'Raised And Assigned'),
        '2': t('jobs.inprogress', 'In Progress'),
        '3': t('jobs.onhold', 'On Hold'),
        '4': t('jobs.completed', 'Completed'),

      },
      render: rowData => {
        return <Tooltip title={rowData.job_status} placement="bottom-start" arrow>
        </Tooltip>
      },
      render: rowData => {
        switch (rowData.job_status) {
          case '0':
            return <Icon name='blue circle outline' size='large' />
          case '4':
            return <Icon name='green circle' size='large' />
          case '1':
            return <Icon name='blue circle' size='large' />
          case '3':
            return <Icon name='red circle' size='large' />
          case '2':
            return <Icon name='orange circle' size='large' />
          default:
            return <></>
        }
      }


    },

    {
      title: t('jobs.priority', 'Priority'), field: "job_priority",
      lookup: {
        '0': t('jobs.low', 'Low'),
        '1': t('jobs.normal', 'Normal'),
        '2': t('jobs.high', 'High'),
        '3': t('jobs.safety', 'Safety')
      },

      render: rowData => {
        switch (rowData.job_priority) {
          case '0':
            return <Icon name='angle down' size='large' />
          case '1':
            return <Icon name='blue angle up' size='large' />
          case '2':
            return <Icon name='red angle double up' size='large' />

          case '3':
            return <Icon name='orange exclamation triangle' size='large' />
          default:
            return <></>
        }
      }
    },

    { title: t('jobs.description', 'Description'), field: "job_notes" },
    {
      title: t('jobs.category', 'Category'), field: "job_category",
      lookup: { '0': 'None', '1': 'Equipment', '2': 'Paddock', '3': 'Fuel Tank', '4': 'Silo' },
      
    },
    { title: 'Farm', field: "farmid", editable: "optional" },
    { title: t('jobs.asset', 'Asset'), field: "job_subcategory" },
    {
      title: "Assigned To", field: "job_assigned", lookup: obj
    },
    { title: " Start Date", field: "job_start_date", type: "date", filtering: false },
    { title: t('jobs.duedate', 'Due Date'), field: "job_due_date", type: "date", filtering: false },


    
  ];
 
  return (
    <div className="table-size">

      <div className="subheader">


        <h1 style={{ "color": "black", "margin-bottom": "0px" }}><Trans i18nKey="jobs.heading">Jobs</Trans> </h1><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>


      </div>

      <div className="equipment-table">
        <MaterialTable
          columns={columns}
          // data={selected ? jobData_withcomplete : jobData_withoutcomplete}
          data={data}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  console.log(newData)
                  insertJob(newData);
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
                  updateJob(newData);
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
                  deleteJob(oldData);
                  resolve()
                }, 1000)
              }),

          }}
          localization={{
            toolbar: {
              searchTooltip: t('materialtable.searchtooltip', 'Search'),
              searchPlaceholder: t('materialtable.searchplaceholder', 'Search')
            },
            header: {
              actions: t('materialtable.headeractions', 'Actions')

            },
            body: {
              addTooltip: t('materialtable.bodyaddtooltip', 'Add'),
              deleteTooltip: t('materialtable.bodydeletetooltip', 'Delete'),
              editTooltip: t('materialtable.edittooltip', 'Edit'),
              emptyDataSourceMessage: t('materialtable.emptydatasourcemessage', 'No records to diplay'),
              editRow: {
                deleteText: t('materialtable.deletetext', 'Are you sure u want to delete?'),
                cancelTooltip: t('materialtable.editrowcanceltip', 'Cancel'),
                saveTooltip: t('materialtable.editrowsavetooltip', 'Save')
              },
              filterRow: {
                filterTooltip: t('materialtable.feltertooltip', 'Filter')
              }
            },
            pagination: {
              previousTooltip: t('materialtable.previoustooltip', 'Previous Page'),
              nextTooltip: t('materialtable.nexttooltip', 'Next Page'),
              labelRowsSelect: t('materialtable.labelrowselect', 'rows')

            }
          }}

          options={{
            showTitle: false,
            paging: true,
            pageSizeOptions: [2, 5, 10, 15, 20],
            paginationType: "stepped",
            showFirstLastPageButtons: false,
            filtering: true,
            actionsColumnIndex: -1,
            maxBodyHeight: 400,
          }}
          components={{
            Cell: (props) => (
              <Tooltip placement="bottom" title={props.user_firstname ? props.user_firstname : ''}>
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
