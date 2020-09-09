import React from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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
    },
    circularProgress: {
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto",
        [theme.breakpoints.up("xs")]: {
            width: "90%"
        },
        [theme.breakpoints.up("sm")]: {
            width: "85%",
            maxWidth: 150
        },
        [theme.breakpoints.up("md")]: {
            width: "80%",
            maxWidth: 180
        },
        [theme.breakpoints.up("lg")]: {
            width: "70%",
            maxWidth: 200
        }
    }
}));

function ProgressCard(props) {
    const classes = useStyles()
    const progressPercent = props.percent
    const currentlValue = props.currentValue
    const targetValue = props.targetValue
    const units = props.units

    return (
        <Paper className={classes.cardPaper} style={{display: "flex", flexDirection: "column", height: "100%"}}>
            <div className={classes.circularProgress}>
                <CircularProgressbar value={progressPercent ? progressPercent : 0} text={progressPercent!==undefined ? progressPercent+"%" : "error"} styles={buildStyles({
                    pathColor: "#f50057",
                    textColor: "#f50057"
                })} />
            </div>

            <Typography variant="body1" style={{ textAlign: "center", paddingTop: 15, fontWeight: 600 }}>{currentlValue + units} / {targetValue + units}</Typography>

        </Paper>
    )
}

export default ProgressCard;