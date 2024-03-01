import { Button, Checkbox, Dialog, DialogActions, DialogContent, Grid, InputLabel, Menu, MenuItem, TextField } from '@material-ui/core'
import React from 'react'
import Form from './Useform'
import InputAdornment from '@mui/material/InputAdornment';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import wheat from './wheat.png';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};

const grains = [
    { id: 1, title: "Barley(62 kg/hl)", kilo: 62 },
    { id: 2, title: "Canary Seed(70 kg/hl)", kilo: 70 },
    { id: 3, title: "Canola(70 kg/hl)", kilo: 70 },
    { id: 4, title: "Cereal Rye(71 kg/hl)", kilo: 71 },
    { id: 5, title: "Chickpea(75 kg/hl)", kilo: 75 },
    { id: 6, title: "Cowpea(75 kg/hl)", kilo: 75 },
    { id: 7, title: "Faba Bean(75 kg/hl)", kilo: 75 },
    { id: 8, title: "Field Pea(75 kg/hl)", kilo: 75 },
    { id: 9, title: "Grain Sorghum(72 kg/hl)", kilo: 72 },
    { id: 10, title: "Linseed(72 kg/hl)", kilo: 72 },
    { id: 11, title: "Lupin(75 kg/hl)", kilo: 75 },
    { id: 12, title: "Maize(72 kg/hl)", kilo: 72 },
    { id: 13, title: "Millet(62 kg/hl)", kilo: 62 },
    { id: 14, title: "Mungbean(75 kg/hl)", kilo: 75 },
    { id: 15, title: "Navy Bean(75 kg/hl)", kilo: 75 },
    { id: 16, title: "Oats(45 kg/hl)", kilo: 45 },
    { id: 17, title: "Pigeon Pea(75 kg/hl)", kilo: 75 },
    { id: 18, title: "Rice(56 kg/hl)", kilo: 56 },
    { id: 19, title: "Safflower(53 kg/hl)", kilo: 53 },
    { id: 20, title: "Soybean(75 kg/hl)", kilo: 75 },
    { id: 21, title: "Sunflower(40 kg/hl)", kilo: 40 },
    { id: 22, title: "Triticale(65 kg/hl)", kilo: 65 },
    { id: 23, title: "Vetch(75 kg/hl)", kilo: 75 },
    { id: 24, title: "Wheat(75 kg/hl)", kilo: 75 }
];

const trait = [
    'Defective Grains',
    'Foreign Material',
    'Heat Damage',
    'Impurities',
    'Moisture',
    'Oil',
    'Protein',
    'Purity',
    'Screenings',
    'Test Weight',
    'Total Damage',
    'Unmillable Material',
    'Vitreous Kernels', 
    'Grade',
    'Retention',
    'Scale Reading',
    'Falling Numbers'
];

export default function Cultivarsmain(props) {
    console.log(props.data)
    const [grainweight, setgrainweight] = React.useState(props.data.weight);
    const [s, setS] = React.useState(0);
    const [varietyname, setvarietyname] = React.useState();
    const [bool, setbool] = React.useState(false);
    const [bool2, setbool2] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [items, setitems] = React.useState(props.data.Varieties);
    const [name, setname] = React.useState(props.data.name);
    const [dataedit, setdataedit] = React.useState("");
    const [helper, sethelper] = React.useState("");
    const [helper2, sethelper2] = React.useState("");
    const [traits, settraits] = React.useState([]);
    const open = Boolean(anchorEl);
    const [openvariety, setopenvariety] = React.useState(false);
    const [openedit, setopenedit] = React.useState(false);
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChange1 = (event) => {
        setgrainweight(event.target.value);
    };

    const handleChange3 = (event) => {
        setname(event.target.value);
        if (event.target.value == '') {
            setbool(true)
            sethelper("Required")
        }
        else {
            setbool(false)
            sethelper("")
        }
    };

    const handleChange2 = (event) => {
        setvarietyname(event.target.value);
        setdataedit(event.target.value)
        if (event.target.value == '') {
            setbool2(true)
            sethelper2("Required")
        }
        else {
            setbool2(false)
            sethelper2("")
        }
    };
    const handleChangedata = (event) => {
        setdataedit(event.target.value)
        if (event.target.value == '') {
            setbool2(true)
            sethelper2("Required")
        }
        else {
            setbool2(false)
            sethelper2("")
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setopenvariety(false);
        setopenedit(false);
    };
    const handleRemove = (e, d) => {
        setitems(items.filter(item => item !== d))
        setopenedit(false);
    }

    const handleMenuItemClick = (event, index) => {
        setgrainweight(grains[index].kilo);
        setAnchorEl(null);
    };

    const handleClickVariety = (event) => {
        setopenvariety(true)
    }

    const handleOk = (event) => {
        if (varietyname != "") {
            setitems(values => ([...values, varietyname]));
            setopenvariety(false);
            setvarietyname("")
        }
    }
    const handleOkEdit = (event) => {
        if (dataedit != "") {
            let newArr = [...items];
            newArr[s] = dataedit;
            setitems(newArr)
            setopenedit(false);
            setdataedit("")
        }
    }

    const handleCheck = (event) => {
        if (event.target.checked === true) {
            settraits(values => ([...values, event.target.value]));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleEdit = (e, d, index) => {
        setdataedit(d)
        setS(index)
        setopenedit(true)
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        variant="standard"
                        name="name"
                        label="Name"
                        required="true"
                        value={name}
                        onChange={handleChange3}
                        error={bool}
                        helperText={helper}
                        autocomplete="off"
                    />
                    <Grid container alignItems="flex-end">
                        <Grid item xs={12} md={5}>
                            <TextField
                                variant="standard"
                                name="grainweight"
                                label="Grain Weight"
                                value={grainweight}
                                onChange={handleChange1}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg/hl</InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Button variant="text" color="primary" onClick={handleClick}><b>PRESETS</b></Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <DialogTitle>Preset Grain Weights</DialogTitle>
                                {
                                    grains.map(
                                        (item, index) => (<MenuItem key={item.id} value={item.id} onClick={(event) => handleMenuItemClick(event, index)}>{item.title}</MenuItem>)
                                    )
                                }
                            </Menu>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <InputLabel>Varieties</InputLabel>
                            <br />
                            {items.map((data, index) => (
                                <Button onClick={(e) => handleEdit(e, data, index)} fullWidth="true" >
                                    <label style={{ fontSize: 18, paddingLeft: 30 }}><img src={wheat}></img>{data}</label>
                                </Button>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <div align="right"><Button variant="text" color="primary" onClick={handleClickVariety}><b>ADD</b></Button></div>
                            <Dialog open={openvariety} onClose={handleClose}>
                                <DialogTitle>Variety</DialogTitle>
                                <DialogContent>
                                    <Box component="form" sx={{ display: 'grid' }}>
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 420 }}>
                                            <TextField
                                                variant="standard"
                                                name="name"
                                                label="Name"
                                                value={varietyname}
                                                onChange={handleChange2}
                                                helperText={helper2}
                                                error={bool2}
                                                required
                                                autocomplete="off"
                                            />
                                        </FormControl>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">CANCEL</Button>
                                    <Button onClick={handleOk} color="primary">SAVE</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={openedit} onClose={handleClose}>
                                <DialogTitle>Variety</DialogTitle>
                                <DialogContent>
                                    <Box component="form" sx={{ display: 'grid' }}>
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 420 }}>
                                            <TextField
                                                variant="standard"
                                                name="name"
                                                label="Name"
                                                value={dataedit}
                                                onChange={handleChangedata}
                                                helperText={helper2}
                                                error={bool2}
                                                required
                                                autocomplete="off"
                                            />
                                        </FormControl>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={(e) => (handleRemove(e, dataedit))} color="secondary">REMOVE</Button>
                                    <Button onClick={handleClose} color="primary">CANCEL</Button>
                                    <Button onClick={handleOkEdit} color="primary">SAVE</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                    <br />
                    <InputLabel>Traits</InputLabel>

                    <FormControl sx={{ m: 1, width: 200 }}>
                        {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Traits" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {trait.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <label><br />*indicates required field</label>
            </Grid>
        </Form >
    )
}
