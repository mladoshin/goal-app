import React, { useState, createContext, useEffect } from "react"
import { Dialog, Typography, IconButton, Divider, DialogActions, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ModalStepper from "./modalStepper"
import { makeStyles } from "@material-ui/core/styles";
import FormContext from './context/formContext'
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
    }
}));

function ModalWindow(props) {

    const setOpenAddModal = props.setOpenAddModal
    const openAddModal = props.openAddModal
    const [flag, setFlag] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const [goalName, setGoalName] = useState("")
    const [category, setCategory] = useState("")
    const [type, setType] = useState("")
    const [units, setUnits] = useState("")
    const [targetValue, setTargetValue] = useState("")
    const [startValue, setStartValue] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState(Date.now());
    const [openTimeInput, setOpenTimeInput] = useState(false)
    const classes = useStyles()

    useEffect(() => {
        if (props.category) {
            setCategory(props.category)
        }
        if (props.goal) {
            console.log("Setting the states")
            setGoalName(props.goal.name)
            setCategory(props.goal.category)
            setType(props.goal.type)
            setUnits(props.goal.units)
            setTargetValue(props.goal.targetValue)
            setStartValue(props.goal.currentValue) //if you edit the current value should be there
            setDescription(props.goal.description)
            setDeadline(props.goal.deadline)
        }

    }, [])

    console.log(category)
    const handleBtnClick = () => {
        if (activeStep < 3) {
            setActiveStep(activeStep + 1)
        } else {
            if (goalName && category && type && units && targetValue && startValue && (deadline > Date.now())) {

                if (props.goal) {
                    firebase.updateGoal({ name: goalName, category, type, units, targetValue, startValue, deadline, description, id: props.goal.id })
                } else {
                    firebase.addNewGoal({ name: goalName, category, type, units, targetValue, startValue, deadline, description })
                    alert("New goal has been created!")
                }

                setOpenAddModal(false)

            } else if (deadline <= Date.now()) {
                alert("Deadline Error! Pick the right date!")
            } else {
                alert("Required text fields are not filled!")
            }
        }
    }

    var header = ""
    if (props.goal) {
        header = "Edit the goal " + '"' + props.goal.name + '"'
    } else if (category) {
        header = "Add the goal to " + '"' + category + '"'
    } else {
        header = "Add the goal"
    }

    function handleCloseModal(setOpenAddModal) {
        setOpenAddModal(false)
    }

    return (
        <Dialog onClose={() => handleCloseModal(setOpenAddModal)} open={openAddModal} fullWidth maxWidth="md">
            <div style={{ display: "flex", flexDirection: "row", padding: "5px 10px 5px 20px", alignItems: "center" }}>
                <Typography variant="h4" style={{ flexGrow: 1, lineHeight: "48px" }}>{header}</Typography>

                <IconButton aria-label="close" onClick={() => handleCloseModal(setOpenAddModal)} style={{}}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Divider />
            <div style={{ padding: "20px 30px 20px 30px" }}>
                <FormContext.Provider value={{ goalName, setGoalName, category, setCategory, type, setType, units, setUnits, targetValue, setTargetValue, startValue, setStartValue, description, setDescription, deadline, setDeadline, openTimeInput, setOpenTimeInput, categoryDisabled: props.category ? true : false, isUpdating: props.goal ? true : false }}>
                    <ModalStepper setActiveStep={setActiveStep} activeStep={activeStep} />
                </FormContext.Provider>
            </div>
            <DialogActions style={{ padding: "0px 30px 20px 30px" }}>
                <div>
                    <Button
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep(activeStep - 1)}
                        className={classes.button}
                    >
                        Back
              </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBtnClick}
                        className={classes.button}
                    >
                        {activeStep === 3 ? "Add" : "Next"}
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default ModalWindow;