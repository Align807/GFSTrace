import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Export from './export.png';
import { outgoing_data } from './Tabledatas';
import { Checkbox } from 'semantic-ui-react';
export default function Outgoing() {
    const [selected, toggleselected] = React.useState(false);
    const [data, setData] = React.useState(outgoing_data)
    const columns = [{
      title: 'ID', field: 'id',filtering:false,
  },
  {
      title: 'Silos', field: 'silos',
  },
  {
      title: 'Date/Time', field: 'dateTime',filtering:false,
  }, {
      title: 'Operators', field: 'operators',filtering:false,
  },
   {
      title: 'Contract', field: 'contract',
  },
  {
      title: 'Cultivar', field: 'cultivar',filtering:false,
  },
  {
      title: 'Transport', field: 'transport',filtering:false,
  },
  {
      title: 'Driver', field: 'driver',filtering:false,
  },
  {
      title: 'Rego', field: 'rego',filtering:false,
  },
  {
      title: 'Tare Weight', field: 'tareWeight',filtering:false,
  },
  {
      title: 'Gross Weight', field: 'grossWeight',filtering:false,
  },
  {
      title: 'Amount', field: 'amount',filtering:false,
  },
  {
      title: 'End Point Amount', field: 'endPointAmount',filtering:false,
  },
  {
      title: 'Paddocks', field: 'paddocks',filtering:false,
  },
  {
      title: 'Traits', field: 'traits',filtering:false,
  },
  {
      title: 'Notes', field: 'notes',filtering:false,
  },
  ]
    const columns_archived = [{
      title: 'ID', field: 'id',filtering:false,
  },
  {
      title: 'Silos', field: 'silos',
  },
  {
      title: 'Date/Time', field: 'dateTime',filtering:false,
  }, {
      title: 'Operators', field: 'operators',filtering:false,
  },
   {
      title: 'Contract', field: 'contract',
  },
  {
      title: 'Cultivar', field: 'cultivar',filtering:false,
  },
  {
      title: 'Transport', field: 'transport',filtering:false,
  },
  {
      title: 'Driver', field: 'driver',filtering:false,
  },
  {
      title: 'Rego', field: 'rego',filtering:false,
  },
  {
      title: 'Tare Weight', field: 'tareWeight',filtering:false,
  },
  {
      title: 'Gross Weight', field: 'grossWeight',filtering:false,
  },
  {
      title: 'Amount', field: 'amount',filtering:false,
  },
  {
      title: 'End Point Amount', field: 'endPointAmount',filtering:false,
  },
  {
      title: 'Paddocks', field: 'paddocks',filtering:false,
  },
  {
      title: 'Traits', field: 'traits',filtering:false,
  },
  {
      title: 'Notes', field: 'notes',filtering:false,
  },
  {
      title: 'Archived', field: 'archived',filtering:false,
  },]
    return (
        <div>
            <MaterialTable title="OUTGOING"
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
                    Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
                    Edit: () => <CreateIcon color="action" />,
                    Export: () => <img src={Export}></img>,
                    Delete: () => <DeleteIcon color="action" />
                   
                  }}
            />
        </div>
    )
}