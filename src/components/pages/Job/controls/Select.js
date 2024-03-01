import { FormControl, Grid, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
import React from 'react'
import {Icon} from "semantic-ui-react";

export default function Select(props) {

    const { name, label, value, onChange, options,restart } = props;
    const [img, setimg] = React.useState(<Icon name='blue angle up'size='large'/>);
    const [status, setstatus] = React.useState(2);
    var d = 3;

    const handleChange = (event) => {
        setstatus(event.target.value);
        d = event.target.value;
        setimg(options[d - 1].icon);
    }
    return (
        <Grid container spacing={0} alignItems="center">
            <Grid item>
                <br />
                {img}
            </Grid>
            <Grid item xs={30} md={4}>
                <FormControl fullWidth
                    variant="standard">
                    <InputLabel>{label}</InputLabel>
                    <MuiSelect
                        label={label}
                        name={name}
                        value={status}
                        onChange={handleChange}
                        inputProps={{ readOnly:restart }}>
                        {
                            options.map(
                                item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                            )
                        }
                    </MuiSelect>
                </FormControl>
            </Grid>
        </Grid>
    )
}
