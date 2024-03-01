import React from 'react'
import MaterialTable from 'material-table';
import {Grid} from '@material-ui/core'


import BarChart from './BarChart';



export default function Chart() {

   


    const [data, setData] = React.useState([
        {id:1,date:"30/11/2021",status:"TOTAL",amount:"20"}
    ])
    const columns = [{
        title: 'ID', field: 'id',
    },
    {
        title: 'Date', field: 'date',
    },
    {
        title: 'Status', field: 'status',
    }, {
        title: 'Amount', field: 'amount',
    },
    {
        title: 'Traits', field: 'traits',
    },
    
    
    
  ]
    return (
        <div>
            <Grid container spacing={0}>
            <Grid item xs={4}>
            <BarChart />
            </Grid>

            <Grid item xs={8}>
            <MaterialTable title=""
                data={data}
                columns={columns}
                
                options={{
                    title:false,
                    actionsColumnIndex: -1,
                    paging: false,
                   
                    search:false,
                    
                }}
                icons={{
                   // Export: () => <img src={Export}></img>,
                    // Edit: () => <CreateIcon color="action" />,
                    // Delete: () => <DeleteIcon color="action" />
                  }}
            />
            </Grid>
            </Grid>
        </div>
    )
}
