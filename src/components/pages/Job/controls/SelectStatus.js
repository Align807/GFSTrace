import { Button, Fade, FormControl, Grid, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
import React from 'react'
import { SampleContext } from '../../../context/SampleContext';
import '../dialog.css';

export default function SelectStatus(props) {
    const classes=useStyles();
    const { name, label, value, onChange, options, restart } = props;
    const [status, setstatus] = React.useState('');
    const [startdate, setstartdate] = React.useState('None');
    const [starttime, setstarttime] = React.useState('');
    const [enddate, setenddate] = React.useState('None');
    const [endtime, setendtime] = React.useState('');
    const [img, setimg] = React.useState();
    const date = "";
    var d = 3;
    const [checked, setChecked] = React.useState(false);
    const { bool, setbool } = React.useContext(SampleContext);
    console.log(bool)
    console.log(restart)
    const handleChange = (event) => {

        setstatus(event.target.value);
        d = event.target.value;
        setimg(options[d - 1].icon);
        if (d == 3 || (status <= 2 && d > 3)) {
            const current = new Date();

            const date = current.toLocaleDateString('en-GB',
                {
                    day: '2-digit', month: 'long', year: 'numeric'
                }).replace(/ /g, ' ');
            setstartdate(date);
            setstarttime(current.toLocaleTimeString("en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                }));
        }
        if (d == 5) {
            const current = new Date();
            setChecked(true);
            setbool(true);
            const date = current.toLocaleDateString('en-GB',
                {
                    day: '2-digit', month: 'long', year: 'numeric'
                }).replace(/ /g, ' ');
            setenddate(date);
            setendtime(current.toLocaleTimeString("en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                }));

        }

    };

    const handleClick = (e) => {
        setChecked(false);
        setbool(false);
        setenddate('None');
        setendtime('');
        setstatus(3);
        setimg(options[2].icon);
    }

    return (
        <Grid container >
            <Grid container>
                <Grid item xs={6} sm={6}>
                    <InputLabel>STARTED</InputLabel>
                    <p>{startdate}</p>
                    <p>{starttime}</p>
                </Grid>

                <Grid item xs={6} sm={6}>
                        <InputLabel>COMPLETED</InputLabel>
                        <p>{enddate}</p>
                        <p>{endtime}</p>
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={6} sm={1}>
                    <br />
                    {img}
                </Grid>
                <Grid item xs={6} sm={4}>
                    <FormControl
                        variant="standard">
                        <InputLabel>{label}</InputLabel>
                        <MuiSelect
                            label={label}
                            name={name}
                            value={status}
                            onChange={handleChange}
                            inputProps={{ readOnly: bool }}>
                            {
                                options.map(
                                    item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                                )
                            }
                        </MuiSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={1} >
                    <Fade in={checked}>
                        <Button variant="text" color="primary" onClick={handleClick}>RE-START JOB</Button>
                    </Fade>
                </Grid>
            </Grid>
        </Grid >
    )
}


