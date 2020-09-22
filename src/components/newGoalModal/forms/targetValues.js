import React, { useContext } from "react"
import { TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import FormContext from "../context/formContext"

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

function ValuesForm(props) {
    const classes = useStyles()
    const form = useContext(FormContext)
    console.log(form)
    return (
        <form style={{ paddingTop: 20, display: "flex", flexDirection: "column" }} className={classes.container}>
            <FormControl variant="outlined" className={classes.formControl}>

                <InputLabel id="demo-simple-select-outlined-label">Units</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={form.units}
                    onChange={(e) => form.setUnits(e.target.value)}
                    label="Units"

                >
                    <MenuItem value="m" style={{ display: form.type !== "distance" ? "none" : "block" }}>m</MenuItem>
                    <MenuItem value="km" style={{ display: form.type !== "distance" ? "none" : "block" }}>km</MenuItem>

                    <MenuItem value="reps" style={{ display: form.type !== "reps" ? "none" : "block" }}>Reps</MenuItem>

                    <MenuItem value="sec" style={{ display: form.type !== "time" ? "none" : "block" }}>sec</MenuItem>
                    <MenuItem value="hrs" style={{ display: form.type !== "time" ? "none" : "block" }}>hrs</MenuItem>

                    <MenuItem value="kg" style={{ display: form.type !== "weight" ? "none" : "block" }}>kg</MenuItem>
                    <MenuItem value="g" style={{ display: form.type !== "weight" ? "none" : "block" }}>g</MenuItem>

                </Select>
            </FormControl>
            <FormControl>
                <TextField 
                id="outlined-basic" 
                label="Target value" 
                variant="outlined" 
                value={form.targetValue} 
                onChange={(e) => form.setTargetValue(e.target.value)} 
                className={classes.textInput} 
                InputProps={{
                    endAdornment: <InputAdornment position="end">{form.units}</InputAdornment>,
                }}
                />
            </FormControl>
            <FormControl>
                <TextField 
                id="outlined-basic" 
                label={form.isUpdating ? "Current value" : "Start value"}
                variant="outlined" 
                value={form.startValue} 
                onChange={(e) => form.setStartValue(e.target.value)} 
                className={classes.textInput} 
                InputProps={{
                    endAdornment: <InputAdornment position="end">{form.units}</InputAdornment>,
                }}/>
            </FormControl>

            

        </form>
    )
}

export default ValuesForm;