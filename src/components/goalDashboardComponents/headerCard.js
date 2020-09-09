import React from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Paper, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom"
import firebase from '../../firebase/firebase'
import DirectionsRunRoundedIcon from '@material-ui/icons/DirectionsRunRounded';
import FitnessCenterRoundedIcon from '@material-ui/icons/FitnessCenterRounded';
import PoolRoundedIcon from '@material-ui/icons/PoolRounded';
import SportsFootballRoundedIcon from '@material-ui/icons/SportsFootballRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';


const useStyles = makeStyles((theme) => ({
    cardPaper: {
        height: "100%",
        [theme.breakpoints.up("xs")]: {
            padding: 5
        },
        [theme.breakpoints.up("sm")]: {
            padding: 10
        },
        [theme.breakpoints.up("md")]: {
            padding: 15
        },
        [theme.breakpoints.up("lg")]: {
            padding: 20
        }
    }
}));

const categoryIcon = (category) => {
    const width = 40
    const height = 40
    if (category === "running" || category === "athletics") {
        return <DirectionsRunRoundedIcon style={{width: width, height: height}}/>
    } else if (category === "weightlifting") {
        return <FitnessCenterRoundedIcon style={{width: width, height: height}}/>
    } else if (category === "swimming") {
        return <PoolRoundedIcon style={{width: width, height: height}}/>
    } else {
        return <SportsFootballRoundedIcon style={{width: width, height: height}}/>
    }
}

function HeaderCard(props) {
    const classes = useStyles()
    const name = props.name
    const category = props.category
    const variant = props.variant
    const icon = categoryIcon(category)
    const goalId = props.id
    console.log(props.openQuickModal)

    return (
        <Paper className={classes.cardPaper} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            {icon}
            <Typography variant={variant} style={{flexGrow: 1, marginLeft: 5}}>{name}</Typography>

            <Button variant="outlined" style={{minWidth: 0, width: 36, borderColor: "#4caf50", marginRight: 15}} onClick={()=>props.setOpenQuickModal({currentValue: props.currentValue, units: props.units, id: goalId})}>
                <AddRoundedIcon/>
            </Button>
            
            <Button variant="outlined" color="secondary" onClick={()=>props.history.replace("/dashboard/userId="+firebase.getCurrentUserId()+"/goals/"+category+"/goalId="+goalId)}>Show</Button>
        </Paper>
    )
}

export default withRouter(HeaderCard);