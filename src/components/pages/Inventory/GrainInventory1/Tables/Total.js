import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from './export.png';
import { total_data } from './Tabledatas';
import { Checkbox } from 'semantic-ui-react';
export default function Total() {
  const [selected, toggleselected] = React.useState(false);
    const [data, setData] = React.useState(total_data)
    const columns = [
    {
        title: 'Cultivar', field: 'cultivar',
    }, {
        title: 'Capacity', field: 'capacity',
    },
    {
        title: 'Contents', field: 'contents',
    },
    {
        title: 'Free', field: 'free',
    },
    {
        title: 'Contracted', field: 'contracted',
    },
    {
        title: 'Delivered', field: 'delivered',
    },
    {
        title: 'Remaining', field: 'remaining',
    }
  ]
    const columns_archived = [
    {
        title: 'Cultivar', field: 'cultivar',
    }, {
        title: 'Capacity', field: 'capacity',
    },
    {
        title: 'Contents', field: 'contents',
    },
    {
        title: 'Free', field: 'free',
    },
    {
        title: 'Contracted', field: 'contracted',
    },
    {
        title: 'Delivered', field: 'delivered',
    },
    {
        title: 'Remaining', field: 'remaining',
    }
  ]
    return (
        <div>
            <MaterialTable title="TOTAL"
                data={data}
                columns={selected ? columns_archived : columns}
                editable={{
                  onRowAdd:(newRow)=> new Promise((resolve,reject)=>{}),
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
                  Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
                  Edit: () => <CreateIcon color="action" />,
                  Export: () => <img src={Export}></img>,
                  Delete: () => <DeleteIcon color="action" />
                 
                }}
            />
        </div>
    )
}