import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { Paper, Typography, CssBaseline, Grid, Button } from '@material-ui/core'
import { Container } from '@material-ui/core';
import { withRouter, useParams } from "react-router-dom"
import NavBar from "../components/navigation/navbar"
import firebase from '../firebase/firebase';

import ProgressCard from '../components/goalDashboardComponents/progressCard'
import TimeCard from '../components/goalDashboardComponents/timeCard'
import ModalWindow from '../components/newGoalModal/modalWindow'

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        
    },
    cardPaper : {
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
    }
  }));

function GoalPage(props) {
    const classes = useStyles()
    const [openAddModal, setOpenAddModal] = useState(false)
    let { category } = useParams()
    let { goalid } = useParams()
    var goal = {}

    props.goals.map((item, index) => {
        if (item.id == goalid) {
            goal = item
        }
    })

    function handleComplete(){
        if(parseFloat(goal.currentValue)==parseFloat(goal.targetValue)){
            firebase.completeGoal(goal.id)
            alert("Completed!")
        
        }else{
            alert("You haven't completed the goal!")
        }
    }
    
    const progress = (goal.currentValue-goal.startValue) / Math.abs(goal.targetValue-goal.startValue) * 100
    const progressPercent = Math.floor(Math.abs(progress))

    return (
        <React.Fragment>
            <NavBar />
            <Container component="main" maxWidth="xl" className={classes.mainContainer}>
                <CssBaseline />
                
                <Grid container spacing={1} className={classes.gridContainer}>
                    {/* General Info Card component */}
                    <Grid item xs={12}>
                        <Paper className={classes.cardPaper} elevation={3} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <div style={{flexGrow: 1}}>
                                <Typography variant="h3">{goal.name}</Typography>
                                <Typography variant="body1">Category: {category}</Typography>
                            </div>
                            <div>
                                <Button variant="contained" color="primary" onClick={()=>setOpenAddModal(true)}>Edit</Button>
                                <Button variant="contained" style={{backgroundColor: "#388e3c", marginLeft: 10}} onClick={handleComplete}>Complete</Button>
                            </div>
                            
                        </Paper>
                    </Grid>

                     {/* Progress Card component */}
                    <Grid item xs={4}>
                        <ProgressCard percent={progressPercent} currentValue={goal.currentValue} targetValue={goal.targetValue} units={goal.units}/>
                        
                    </Grid>

                     {/* Time Progress Card component */}
                    <Grid item xs={8}>
                        <TimeCard deadline={goal.deadline} dateCreated={goal.dateCreated}/>
                        
                    </Grid>

                     {/* Description card component */}
                    <Grid item xs={12}>
                        <Paper className={classes.cardPaper} style={{display: goal.description ? "inherit" : "none"}} elevation={3}>
                            <Typography variant="body1">Description: {goal.description}</Typography>
                        </Paper>
                    </Grid>

                </Grid>


            </Container>
            {openAddModal ? <ModalWindow setOpenAddModal={setOpenAddModal} openAddModal={openAddModal} goal={goal}/> : null}
        </React.Fragment>

    );
}
const mapStateToProps = state => {
    return {
        goals: state.goals
    }
}

export default connect(mapStateToProps, null)(withRouter(GoalPage));