import React, { useEffect, useState } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Export from './export.png';
import { total_data,type_data } from './Tabledatas';
import { Progress } from "semantic-ui-react";
import { Checkbox } from 'semantic-ui-react';
import { MenuItem, Select } from '@material-ui/core';
export default function Total() {
  const [selected, toggleselected] = React.useState(false);
  const [type, setType] = useState({});

  // const lsType = [
  //   { id: 1, title: "Cattle" },
  //   { id: 2, title: "Bulls" },
  //   { id: 3, title: "Sheep" },
  //   { id: 4, title: "Horses" },
  //   { id: 5, title: "Chickens" },
  //   { id: 6, title: "Pigs" },
  //   { id: 7, title: "Deer" },
  //   { id: 8, title: "Goats" },
  //   { id: 9, title: "Llamas" },
  //   { id: 10, title: "Bees" },
  // ];

    const [data, setData] = React.useState(total_data)
    const columns = [
    {
        title: 'Type', field: 'type',lookup:type,
    }, {
        title: 'Capacity', field: 'capacity',filtering:false,
    },
    {
        title: 'Contents', field: 'contents',filtering:false,
    },
    {
        title: 'Free', field: 'free',filtering:false,
    },
    {
      title: 'Contents', field: 'contents',filtering:false,editable:'never',render: rowData => {
        return <Progress percent={rowData.contents} progress color="rgb(68, 63, 63)" />
      }
  },
    
  ];

  
    const columns_archived = [
      {
        title: 'Type', field: 'type',lookup:type,
    }, {
        title: 'Capacity', field: 'capacity',filtering:false,
    },
    {
        title: 'Contents', field: 'contents',filtering:false,
    },
    {
        title: 'Free', field: 'free',filtering:false,
    },
    {
      title: 'Contents', field: 'contents',filtering:false,editable:'never',render: rowData => {
        return <Progress percent={rowData.contents} progress color="rgb(68, 63, 63)" />
      }
  },
  {
    title: 'Archived', field: 'archived',filtering:false,
},
  ];
  useEffect(() => {
    const type = {};
    type_data.map((row) => (type[row.id] = row.title));
    setType(type);
  }, []);
    return (
        <div>
          {/* <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
     value={type}
    // label="Age"
    // onChange={handleChange}
  >
    <MenuItem value={Diesel}>Diesel</MenuItem>
    <MenuItem value={Unleaded}>Unleaded</MenuItem>
    <MenuItem value={Aviation}>Aviation</MenuItem>
  </Select> */}
            <MaterialTable title="TOTAL"
                data={data}
                columns={selected ? columns_archived : columns}
                editable={{
                  onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setData([...data, newRow]);
              setTimeout(() => resolve(), 500);
            }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataUpdate = [...data];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          setData([...dataUpdate]);
          
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
                    exportButton: true,filtering:true,
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
                  Edit: () => <CreateIcon color="action" />,
        Delete: () => <DeleteIcon color="action" />,
                  Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />
                  }}
            />
        </div>
    )
}