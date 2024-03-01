import React from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider ,MobileDatePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"

export default function MyDatePicker(props) {

    const { name, label, value, onChange,restart } = props

    const convertToDefEventPara=(name,value)=>({
        target:{
            name,value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="dialog" inputVariant="standard" autoOk="true" clearable="true"
                label={label}
                format="dd/MM/yyyy"
                name={name}
                value={value}
                onChange={date => onChange(convertToDefEventPara(name,date))}
                inputProps={{ readOnly:restart }}
            />


        </MuiPickersUtilsProvider>
    )
}

