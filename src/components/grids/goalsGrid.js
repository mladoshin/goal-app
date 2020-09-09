import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core'
import GoalCard from './goalCard'

const useStyles = makeStyles((theme) => ({
    gridItem: {
        [theme.breakpoints.up("xs")]: {
            //height: 200
            //marginBottom: 5
        },
        [theme.breakpoints.up("sm")]: {
            //height: 240
            //marginBottom: 10
        },
        [theme.breakpoints.up("md")]: {
            //height: 270
            marginBottom: 20
        },
        [theme.breakpoints.up("lg")]: {
            //height: 300
            marginBottom: 30
        }
    }
}));

function GoalsGrid(props){
    const classes = useStyles()
    const content = props.goals.map((goal, index)=>{
        return(
            <Grid item xs={12} className={classes.gridItem} key={index}>
                <GoalCard goal={goal}/>
                {/* <GoalCard goal={goal}/> */}
            </Grid>
        )
    })

    return(
        <Grid container direction="column" spacing={4}>
            {content}
        </Grid>
    )
}

export default GoalsGrid;