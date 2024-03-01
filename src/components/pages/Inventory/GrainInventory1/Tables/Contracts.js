import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from './export.png';
import { Checkbox } from 'semantic-ui-react';
import { contracts_data } from './Tabledatas';

export default function Contracts() {
    const [selected, toggleselected] = React.useState(false);
    const [data, setData] = React.useState(contracts_data)
    const columns = [{
        title: 'Status', field: 'status',
    },
    {
        title: 'Contract No', field: 'contractNo',
    },
    {
        title: 'Start Date', field: 'startDate',
    }, {
        title: 'End Date', field: 'endDate',
    },
    {
        title: 'Buyer', field: 'buyer',
    },
    
    {
        title: 'Destination', field: 'destination',
    },
    {
        title: 'Commodity', field: 'commodity',
    },
    {
        title: 'Fulfilled', field: 'fulfilled',
    },
    {
        title: 'Quantity', field: 'quantity',
    },
    {
        title: 'Grade', field: 'grade',
    },
    {
        title: 'Tolerence', field: 'tolerence',
    },
    {
        title: 'Notes', field: 'notes',
    },
    
  ]
  const columns_archived = [{
    title: 'Status', field: 'status',
},
{
    title: 'Contract No', field: 'contractNo',
},
{
    title: 'Start Date', field: 'startDate',
}, {
    title: 'End Date', field: 'endDate',
},
{
    title: 'Buyer', field: 'buyer',
},

{
    title: 'Destination', field: 'destination',
},
{
    title: 'Commodity', field: 'commodity',
},
{
    title: 'Fulfilled', field: 'fulfilled',
},
{
    title: 'Quantity', field: 'quantity',
},
{
    title: 'Grade', field: 'grade',
},
{
    title: 'Tolerence', field: 'tolerence',
},
{
    title: 'Notes', field: 'notes',
},
{
    title:"Archived",field:"archived",
}
]

    return (
        <div>
            <MaterialTable title="CONTRACTS"
                data={data}
                columns={columns}
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
                    Delete: () => <DeleteIcon color="action" />
                  }}
            />
        </div>
    )
}
