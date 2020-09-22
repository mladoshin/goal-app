import React, { useState } from "react"
import { Dialog, Typography, IconButton, Divider, DialogActions, Button, FormControl, TextField, InputAdornment } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../firebase/firebase"
import { useParams } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    button: {
        marginRight: theme.spacing(1)
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    formControl: {
        width: "100%"
    },
    textInput: {
        margin: theme.spacing(1)
    }
}));

function QuickModal(props) {
    const setOpenQuickModal = props.setOpenQuickModal
    const openQuickModal = props.openQuickModal
    const [newCurrentValue, setNewCurrentValue] = useState(openQuickModal.currentValue)
    const classes = useStyles()

    //console.log(openQuickModal)


    function handleCloseModal(setOpenAddModal) {
        setOpenQuickModal(false)
    }

    function handleResultUpdate(result, goal){
        if(result >= Math.min(goal.startValue, goal.targetValue)  && result <= Math.max(goal.targetValue, goal.startValue)){
            firebase.quickResultUpdate(result, goal.id)   
        }else{
            alert("Current value should be in the valid range!")
        }
        
    }
    
    return (
        <Dialog onClose={() => handleCloseModal(setOpenQuickModal)} open={openQuickModal.currentValue ? true : false} maxWidth="xs">
            <div style={{ display: "flex", flexDirection: "row", padding: "5px 10px 5px 20px", alignItems: "center" }}>
                <Typography variant="h4" style={{ flexGrow: 1, lineHeight: "48px" }}>Update your current result</Typography>

                <IconButton aria-label="close" onClick={() => handleCloseModal(setOpenQuickModal)} style={{}}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Divider />
            <div style={{ padding: "20px 30px 0px 30px" }}>
                <FormControl className={classes.formControl}>
                    <TextField 
                    id="outlined-current_value" 
                    label="Current Value" 
                    variant="outlined" 
                    value={newCurrentValue ? newCurrentValue : ""} 
                    onChange={(e) => setNewCurrentValue(e.target.value)} 
                    className={classes.textInput} 
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{openQuickModal.units}</InputAdornment>,
                    }}
                    />
                </FormControl>
            </div>
            <DialogActions style={{ padding: "0px 30px 20px 30px" }}>
                    <Button variant="outlined" color="primary" onClick={()=>handleCloseModal(setOpenQuickModal)}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={()=>handleResultUpdate(newCurrentValue, openQuickModal)}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}

export default QuickModal;