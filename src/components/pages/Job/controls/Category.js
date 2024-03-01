import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { InputLabel, MenuItem, Grid, Select as MuiSelect } from '@material-ui/core';
import question from './question mark.png'

export default function Category(props) {
    const [open, setOpen] = React.useState(false);
    const [category, setcategory] = React.useState("");
    const [cat, setcat] = React.useState({});
    const [img, setimg] = React.useState(question);
    const [img1, setimg1] = React.useState(question);
    var changeCategory = 0;
    var flag=0;
    const arr = {};
    const [field, setfield] = React.useState("CATEGORY")
    const [fieldfarm, setfieldfarm] = React.useState("")
    const [subfield, setSubfield] = React.useState('NONE');
    const [fieldval, setfieldval] = React.useState("CATEGORY")
    const [subfieldval, setSubfieldval] = React.useState('NONE');
    const [c, setc] = React.useState({});

    const handleChange = (event, value) => {
        setcategory(event.target.value);
        changeCategory = event.target.value;
        setfieldval(value.props.children)
        setcat({})
        flag=0;
        const arr = options.filter(
            a => (a.id === changeCategory)
        )
        if (changeCategory != "") {
            setc(arr[0].data);
            setSubfieldval("");
            setfieldfarm("");
            setimg1(options[changeCategory - 1].icon);
        }
        else{
            setc({});
            setfieldval("CATEGORY")
            setSubfieldval("None");
            setfieldfarm("");
            setimg1(question);
        }
    };

    const handleChange1 = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setcat(values => ({ ...values, [name]: value }))
        console.log(cat);
        if (name == "Farm") {
            setfieldfarm(value + " : ");
            flag=1;
        }
        else {
            setSubfieldval(value);
        }
    }
    const handleClickOpen = () => {
        if (!restart) {
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleOk = (event, reason) => {
        if (reason !== 'backdropClick') {
            if (subfieldval=="") {
                alert("No "+fieldval+" Selected")
            }
            else{
                if(fieldfarm!=""){
                    setfield(fieldval);
                    setSubfield(fieldfarm + subfieldval);
                    setimg(img1)
                    setOpen(false);
                }
                else{
                    if(category==1 ||category==5){
                        setfield(fieldval);
                        setSubfield(fieldfarm + subfieldval);
                        setimg(img1)
                        setOpen(false);
                    }
                }
            }
        }
    };


    const { name, label, value, onChange, options, restart } = props;
    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen} size="large" fullWidth="true">
                <Grid container spacing={0}>
                    <Grid item xs={0} sm={0} md={0}>
                        <img src={img} className="img" alt="tractor"></img>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <InputLabel>{field}</InputLabel>
                        <p>{subfield}</p>
                    </Grid>
                </Grid>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Job Category</DialogTitle>
                <DialogContent >
                    <Box component="form" sx={{ display: 'grid' }}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 420 }}>
                            <InputLabel>{label}</InputLabel>
                            <MuiSelect
                                label={label}
                                name={name}
                                value={category}
                                onChange={handleChange}
                                displayEmpty>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    options.map(
                                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                                    )
                                }
                            </MuiSelect>
                        </FormControl>
                        {
                            Object.entries(c).map(
                                ([key, val]) => (
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 420 }}>
                                        <InputLabel>{key}</InputLabel>
                                        <MuiSelect
                                            name={key}
                                            label={key}
                                            value={cat[key]}
                                            onChange={handleChange1}
                                        >
                                            {
                                                val.map(
                                                    (item, index) => (<MenuItem key={index} value={item}>{item}</MenuItem>)
                                                )
                                            }
                                        </MuiSelect>
                                    </FormControl>)
                            )
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CANCEL</Button>
                    <Button onClick={handleOk}>SAVE</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}