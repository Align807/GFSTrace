import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from './export.png';
import { Checkbox } from 'semantic-ui-react';
import { transfer_data } from './Tabledatas';
export default function Transfer() {
    const [selected, toggleselected] = React.useState(false);
    const [data, setData] = React.useState(transfer_data)
        
        const columns = [{
        title: 'ID', field: 'id'
    },
    {
        title: 'Silos', field: 'silos',
    },
    {
        title: 'Date/Time', field: 'dateTime',
    }, {
        title: 'Operators', field: 'operators',
    },
    {
        title: 'Cultivar', field: 'cultivar',
    },
    
    {
        title: 'Amount', field: 'amount',
    },
    
    {
        title: 'Traits', field: 'traits',
    },
    {
        title: 'Notes', field: 'notes',
    },
    
    
  ]
    const columns_archived = [{
        title: 'ID', field: 'id'
    },
    {
        title: 'Silos', field: 'silos',
    },
    {
        title: 'Date/Time', field: 'dateTime',
    }, {
        title: 'Operators', field: 'operators',
    },
    {
        title: 'Cultivar', field: 'cultivar',
    },
    
    {
        title: 'Amount', field: 'amount',
    },
    
    {
        title: 'Traits', field: 'traits',
    },
    {
        title: 'Notes', field: 'notes',
    },
    {
        title: 'Archived', field: 'archived',
    },
    
  ]
    return (
        <div>
            <MaterialTable title="TRANSFER"
                data={data}
                columns={selected ? columns_archived : columns}
                editable={{
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
                    exportButton: true,
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
                    Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
                    Edit: () => <CreateIcon color="action" />,
                    Export: () => <img src={Export}></img>,
                    Delete: () => <DeleteIcon color="action" />
                   
                  }}
            />
        </div>
    )
}