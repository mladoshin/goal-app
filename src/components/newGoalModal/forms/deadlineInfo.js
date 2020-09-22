import React, { useContext, useState } from "react"
import { FormControl, TextField, Switch } from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";
import FormContext from "../context/formContext"
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
      margin: theme.spacing(1)
    },
    textInput: {
        margin: theme.spacing(1)
    },
    container: {
        [theme.breakpoints.up("xs")]: {
            height: 300
        },
        [theme.breakpoints.up("sm")]: {
            height: 350
        },
        [theme.breakpoints.up("md")]: {
            
        },
        [theme.breakpoints.up("ld")]: {

        },
        [theme.breakpoints.up("xl")]: {

        }
    }
  }));




function DeadlineForm() {
    const classes = useStyles()
    const form = useContext(FormContext)
    console.log(form)

    const handleDateChange = (date) => {
        try{
            form.setDeadline(Date.parse(date))
        }catch(err){
            alert(err.message)
        }
    }

    const handleSwitchChange = () => {
        form.setOpenTimeInput(!form.openTimeInput)
    }

    return (
        <form style={{ paddingTop: 20, display: "flex", flexDirection: "column" }} className={classes.container}>
            <FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={form.deadline}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />




                </MuiPickersUtilsProvider>
                <div style={{ display: "flex", flexDirection: "row", width: 140, alignItems: "center", justifyContent: "space-between" }}>
                    <h5>Add Time</h5>
                    <Switch
                        checked={form.openTimeInput}
                        onChange={handleSwitchChange}
                        color="primary"
                        name="checkedB"
                    />
                </div>
                {form.openTimeInput ?
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={form.deadline}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}

                        />
                    </MuiPickersUtilsProvider>
                    : null}
            </FormControl>
        </form>
    )
}

export default DeadlineForm;