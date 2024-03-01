import { TextField } from '@material-ui/core';
import React from 'react'

export default function Startdate(props) {
    const {title,date}=props;
    return (
        <div>
            <TextField label={title} value={date} disabled></TextField>
        </div>
    )
}
