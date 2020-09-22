import React, { useContext} from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import 'react-circular-progressbar/dist/styles.css';

import ProgressCard from '../goalDashboardComponents/progressCard'
import HeaderCard from '../goalDashboardComponents/headerCard'
import TimeCard from '../goalDashboardComponents/timeCard'

import ModalContext from '../newGoalModal/context/quickModalContext'

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        [theme.breakpoints.up("xs")]: {
            padding: 10
        },
        [theme.breakpoints.up("sm")]: {
            padding: 15
        },
        [theme.breakpoints.up("md")]: {
            padding: 20
        },
        [theme.breakpoints.up("lg")]: {
            padding: 25
        }
    },
    cardPaper: {
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
    },
    mainContainer: {
        width: "100%",
        [theme.breakpoints.up("xs")]: {
            padding: "0px 5px 0px 5px"
        },
        [theme.breakpoints.up("sm")]: {
            padding: "0px 15px 0px 15px"
        },
        [theme.breakpoints.up("md")]: {
            padding: "0px 8.3% 0px 8.3%"
        },
        [theme.breakpoints.up("lg")]: {
            padding: "0px 16.6% 0px 16.6%"
        }
    },
    sideGridContainer: {
        [theme.breakpoints.up("xs")]: {
            padding: "10px 10px 10px 0px"
        },
        [theme.breakpoints.up("sm")]: {
            padding: "15px 15px 15px 0px"
        },
        [theme.breakpoints.up("md")]: {
            padding: "20px 20px 20px 0px"
        },
        [theme.breakpoints.up("lg")]: {
            padding: "25px 25px 25px 0px"
        }
    },
    sideGridItem: {
        [theme.breakpoints.up("xs")]: {
            marginBottom: 10
        },
        [theme.breakpoints.up("sm")]: {
            marginBottom: 15
        },
        [theme.breakpoints.up("md")]: {
            marginBottom: 20
        },
        [theme.breakpoints.up("lg")]: {
            marginBottom: 20
        }
    },
    circularProgress: {
        marginLeft: "auto",
        marginRight: "auto",
        [theme.breakpoints.up("xs")]: {
            width: "90%"
        },
        [theme.breakpoints.up("sm")]: {
            width: "85%"
        },
        [theme.breakpoints.up("md")]: {
            width: "70%"
        },
        [theme.breakpoints.up("lg")]: {
            width: "60%"
        }
    },
    paper: {
        width: "100%",
        height: "100%"
    }
}));

function GoalsCard(props) {
    const modal = useContext(ModalContext)
    console.log(modal)
    const classes = useStyles()
    const goal = props.goal;
    //console.log(goal.currentValue)
    const deadline = new Date(goal.deadline).toLocaleDateString()
    const dateCreated = new Date(goal.dateCreated).toLocaleDateString()
    const timeCreated = new Date(goal.dateCreated).toLocaleTimeString()

    const startValue = parseFloat(goal.startValue)
    const currentValue = parseFloat(goal.currentValue)
    const targetValue = parseFloat(goal.targetValue)

    
    const progress = Math.abs(currentValue-startValue) / Math.abs(targetValue-startValue) * 100
    const progressPercent = Math.floor(Math.abs(progress))

    //console.log(startValue, currentValue, targetValue)
    //console.log("Fraction: " + progress)
    //console.log("Percent: " + progressPercent)

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid item container direction="row">
                <Grid item xs={4} className={classes.gridContainer}>
                    <ProgressCard percent={progressPercent} currentValue={goal.currentValue} targetValue={goal.targetValue} units={goal.units}/>  {/* Progress card component for displaying the progress on the goal */}
                </Grid>

                <Grid item container direction="column" xs={8} justify="space-between" className={classes.sideGridContainer}>
                    <Grid item className={classes.sideGridItem}>
                        <HeaderCard goal={goal} variant="h4" setOpenQuickModal={modal.setOpenQuickModal} openQuickModal={modal.openQuickModal} />
                    </Grid>


                    <Grid item style={{ flexGrow: 1 }}>
                        <TimeCard deadline={goal.deadline} dateCreated={goal.dateCreated} />
                    </Grid>


                </Grid>
            </Grid>
        </Paper>
    )
}

export default GoalsCard;