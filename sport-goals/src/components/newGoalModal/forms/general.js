import React, {useContext} from "react"
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import FormContext from "../context/formContext"
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
      margin: theme.spacing(1)
    },
    textInput: {
        margin: theme.spacing(1)
    }
  }));

function GeneralForm() {
    const classes = useStyles()
    const form = useContext(FormContext)
    let {category} = useParams()
    let {goalid} = useParams()
    console.log(form)
    return (
        <form style={{paddingTop: 20, display: "flex", flexDirection: "column"}}>
            <FormControl>
                <TextField id="outlined-basic" label="Goal Name" variant="outlined"  value={form.goalName} onChange={(e)=>form.setGoalName(e.target.value)} className={classes.textInput}/>
            </FormControl>
            
            <FormControl variant="outlined" className={classes.formControl}>
                
                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={category && !goalid ? category : form.category}
                    disabled={category && !goalid ? true : false}
                    onChange={(e)=>form.setCategory(e.target.value)}
                    label="Category"
                    MenuProps={{
                        maxHeight: 100,
                        overflowY: "scroll"
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="athletics">Athletics</MenuItem>
                    <MenuItem value="weightlifting">Weight Lifting</MenuItem>
                    <MenuItem value="swimming">Swimming</MenuItem>
                    <MenuItem value="running">Running</MenuItem>
                    
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                
                <InputLabel id="demo-simple-select-outlined-label">Goal value Type</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={form.type}
                    onChange={(e)=>form.setType(e.target.value)}
                    label="Goal value Type"
                    
                >
                    <MenuItem value="distance">Distance</MenuItem>
                    <MenuItem value="reps">Reps</MenuItem>
                    <MenuItem value="time">Time</MenuItem>
                    <MenuItem value="weight">Weight</MenuItem>
                    <MenuItem value="weightreps">Weight+Reps</MenuItem>
                </Select>
            </FormControl>
        </form>
    )
}

export default GeneralForm;