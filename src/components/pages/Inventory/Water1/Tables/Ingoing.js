import React from 'react'
import MaterialTable,{ MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';

import Export from '../../../export.png';
import { ingoing_data } from '../../../../../Data/InventoryWaterData';
import { Checkbox } from "semantic-ui-react";
import './archived.css';
export default function Ingoing() {
  const [selected, toggleselected] = React.useState(false);
    const [data, setData] = React.useState(ingoing_data)
    const columns = [{
        title: 'Water Storage', field: 'water_storage'
    },
    {
        title: 'Date/Time', field: 'date',
    }, {
        title: 'Operator', field: 'operator',
    },
    {
        title: 'Amount', field: 'amount',
    },
    {
        title: 'Notes', field: 'notes',
    }]
    const columns_archived = [{
      title: 'Water Storage', field: 'water_storage'
  },
  {
      title: 'Date/Time', field: 'date',
  }, {
      title: 'Operator', field: 'operator',
  },
  {
      title: 'Amount', field: 'amount',
  },
  {
    title: 'Notes', field: 'notes',
},
 
  {
    title: "Archived",
    field: "archived",
  },]
    return (
        <div>
            <MaterialTable title="INGOING"
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
                    exportButton: true,
                }}
                components={{
                  Toolbar: props => (
                    <div>
                      <MTableToolbar {...props} />
                      <div className="toggle-switch" style={{padding: '0px 20px'}}>
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