import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import Export from '../../../export.png';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { storages_data } from '../../../../../Data/InventoryWaterData'

export default function Storages() {
    const [data, setData] = React.useState(storages_data)
    const columns = [{
        title: 'Farms', field: 'farm'
    },
    {
        title: 'Name', field: 'name',
    },
    {
        title: 'Capacity', field: 'capacity',
    }, {
        title: 'Contents', field: 'contents',
    }]
    
    return (
        <div>
            <MaterialTable title="STORAGES"
                data={data}
                columns={ columns}
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
                    Toolbar: props => (
                      <div>
                        <MTableToolbar {...props} />
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