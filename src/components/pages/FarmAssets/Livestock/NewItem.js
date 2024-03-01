import { Input, TextField } from '@mui/material'
import React from 'react'
import { Grid } from '@material-ui/core';
//import { Useform, Form } from '../JobPopUp/Useform';

const initialItems = {
    name:'',
    type:'',
    typeoficon:'',
    number:'',
    notes:''
}

export default function NewItem() {

   
    const {
        values,
        setValues,
        handleInputChange
    } = Useform(initialItems);

    return (
        <Form>
            <Grid container maxWidth="sm">
                <Grid item xs={12} >
        <div>
            {/*<h1>new item</h1>*/}
            <TextField required id="standard-basic" label="Name" variant="standard" /><br/>
            <TextField id="standard-basic" label="Type" variant="standard" /><br/>
            <TextField id="standard-basic" label="Number" variant="standard" /><br/>
            <TextField
          id="standard-multiline-static"
          label="Notes"
          multiline
          rows={4}
          //defaultValue="Default Value"
          variant="standard"
        />
        </div>
        
        </Grid>
        </Grid>
        </Form>
    )
}
