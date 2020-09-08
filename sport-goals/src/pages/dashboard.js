import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Container, Typography, CssBaseline, Tooltip, Fab, Dialog, DialogActions, IconButton, Divider, Button, Grid, Card } from '@material-ui/core'
import NavBar from "../components/navigation/navbar"
import { withRouter, useParams } from "react-router-dom";
import firebase from '../firebase/firebase';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import ModalWindow from '../components/newGoalModal/modalWindow'
import ProgressOverview from '../components/dashboardComponents/progressOverview'

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

function DashboardPage(props) {
  const [isFirebaseInit, setIsFirebaseInit] = useState(false)
  const { userid } = useParams();
  const classes = useStyles();
  const [openAddModal, setOpenAddModal] = useState(false)

  var completedGoals = 0
  props.goals.map((goal, i)=>{
    if (goal.isCompleted){
      completedGoals++
    }
  })

  var sortedGoals = props.goals
  sortedGoals.sort((a, b)=>{return (a.deadline - b.deadline)})
  console.log(sortedGoals)
  
  const percent = Math.floor(completedGoals/props.goals.length *100)
  const fraction = completedGoals+"/"+props.goals.length

  function authCheck(urlId, userId) {
    console.log(urlId, userId)
    if (urlId !== userId) {
      return false
    }
    return true
  }

  useEffect(() => {
    if (!isFirebaseInit) {
      firebase.isInit().then(val => {
        setIsFirebaseInit(true)
        if (authCheck(userid, firebase.getCurrentUserId())) {
          firebase.loadUserGoals(props.loadGoals, props.loadCategories)
        }else{
          props.history.replace("/404")
        }
      })
    }
  }, [isFirebaseInit])


  return (
    <React.Fragment>
      <NavBar />
      <Container component="main" maxWidth="xl" style={{ padding: "30px 0px 0px 0px" }}>
        <CssBaseline />
        <Grid container>
          {/*1st Row*/}
          <Grid item xs={false} sm={false} md={1} lg={2} xl={2}></Grid>

          <Grid item xs={6} sm={4} md={3} lg={3} xl={3} style={{ padding: "1em" }}>
            <Card style={{ width: "100%"}} elevation={3}>
              <ProgressOverview percent={percent} fraction={fraction}/>
            </Card>
          </Grid>
          <Grid item xs={6} sm={8} md={7} lg={5} xl={5} style={{ padding: "1em" }}>
            <Card style={{ width: "100%", height: 300 }} elevation={3}></Card>
          </Grid>

          <Grid item xs={false} sm={false} md={1} lg={2} xl={2}></Grid>

          {/*2nd Row*/}
          <Grid item xs={false} sm={false} md={1} lg={2} xl={2}></Grid>

          <Grid item xs={6} sm={6} md={5} lg={4} xl={4} style={{ padding: "1em" }}>
            <Card style={{ width: "100%", height: 300 }} elevation={3}></Card>
          </Grid>
          <Grid item xs={6} sm={6} md={5} lg={4} xl={4} style={{ padding: "1em" }}>
            <Card style={{ width: "100%", height: 300 }} elevation={3}></Card>
          </Grid>

          <Grid item xs={false} sm={false} md={1} lg={2} xl={2}></Grid>
        </Grid>
      </Container>


      <Tooltip title="Add" aria-label="add" onClick={() => {
        if(firebase.auth.currentUser.emailVerified){
          setOpenAddModal(true)
        }else{
          alert("Verify your email first!")
        }
        
        }}>
        <Fab color="secondary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <ModalWindow setOpenAddModal={setOpenAddModal} openAddModal={openAddModal}/>
    </React.Fragment>

  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    theme: state.theme,
    goals: state.goals,
    goalCategories: state.goalCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (obj) => dispatch({ type: "USER/LOADINFO", payload: obj }),
    loadGoals: (arr) => dispatch({ type: "GOALS/LOAD", payload: arr }),
    loadCategories: (arr) => dispatch({ type: "GOALS/CATEGORY/LOAD", payload: arr })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardPage));