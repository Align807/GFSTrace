import React from 'react'
import MaterialTable from 'material-table';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { DialogTitle } from '@mui/material';
import Cultivarsmain from './Cultivarsmain';
import Icon from '@mui/material/Icon';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Table() {
    const [open, setOpen] = React.useState(false);
    const [rowdata,setrowdata]=React.useState({name:"",weight:"",Varieties:[],Traits:[]});
    const [newedit, setnewedit] = React.useState(true);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        setOpen(false);

    };

    const handleEdit =(event,rowData)=>{
        setrowdata(rowData)
        setOpen(true);
    };
    const handleAdd =(event)=>{
        setrowdata({name:"",weight:"",Varieties:[],Traits:""})
        setOpen(true);
    };

    const [data, setData] = React.useState([
        { name: 'Wheat', weight: '23kg/hl', Varieties: ['abc'], Traits: 'Defective Grains, Foreign Material' },
        { name: 'Barley', weight: '50kg/hl', Varieties: ['dfg'], Traits: 'Defective Grains,Oil, Purity' },
        { name: 'Canary Seed', weight: '400kg/hl', Varieties:['hij'], Traits: 'Heat Damage, Impurities' },
        { name: 'Faba Bean', weight: '100kg/hl', Varieties: ['abc'], Traits: 'Defective Grains, Heat Damage' }
    ])
    const columns = [{
        title: 'Name', field: 'name'
    },
    {
        title: 'Grain Weight', field: 'weight'
    }, {
        title: 'Varieties', field: 'Varieties', sorting: false
    }, {
        title: 'Traits', field: 'Traits', sorting: false
    }]
    return (
        <div>
            <MaterialTable title="Cultivars"
                data={data}
                columns={columns}
                editable={{
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
                actions={[
                    {
                        icon: () => <Icon sx={{ fontSize: 40 }} color="info">add_circle</Icon>,
                        isFreeAction: true,
                        onClick: (event) => handleAdd(event)
                    },
                    {
                        icon: () => <Icon sx={{ fontSize: 22 }} color="action"><CreateIcon /></Icon>,
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => handleEdit(event,rowData)
                    },
                    //   {
                    //     icon:() => <Icon sx={{ fontSize: 22 }} color="action"><DeleteIcon/></Icon>,
                    //     tooltip: 'Delete User',
                    //     onClick: (event, rowData) => alert("You want to delete " + rowData.name)
                    //   }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                icons={{Delete: () => <DeleteIcon color="action" />}}
            />
            <Dialog open={open} onClose={handleClose} maxWidth="sm" scroll="paper">
                <DialogTitle sx={{ fontSize: 24, fontWeight: 'large' }}>New Item</DialogTitle>
                <DialogContent>
                    <Cultivarsmain data={rowdata} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">CANCEL</Button>
                    <Button onClick={handleClose} color="primary">SAVE</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
