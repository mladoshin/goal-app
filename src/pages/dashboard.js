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
import CategoryChart from "../components/dashboardComponents/categoriesChart";
import UpcomingDeadlines from "../components/dashboardComponents/upcomingDeadlines"

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

  useEffect(() => {
    if (!isFirebaseInit) {
      firebase.isInit().then(val => {
        setIsFirebaseInit(true)
        if (authCheck(userid, firebase.getCurrentUserId())) {
          firebase.loadUserGoals(props.loadGoals, props.loadCategories)
          props.loadAvatar(firebase.auth.currentUser.photoURL)
        }else{
          props.history.replace("/404")
        }
      })
    }
  }, [isFirebaseInit])

  function deadlineSort(a, b){
    let comparison = 0
    console.log(a.deadline, b.deadline)
    if(a.category < b.category){
      comparison = -1
    }
    if(a.category > b.category){
      comparison = 1
    }
    if(comparison==1){
      console.log("Swap")
    }
    return comparison
  }

  var completedGoals = 0
  if (props.goals){
    console.log(props.goals)

    try{
      props.goals.map((goal, i)=>{
        if (goal.isCompleted){
          completedGoals++
        }
      })
    }catch(err){

    }
    
  }

  var sortedGoals = []
  try{
    props.goals.map((goal, iindex)=>{
      if (!goal.isCompleted){
        sortedGoals.push(goal)
      }
    })
  }catch(err){}
  
  sortedGoals.sort((a, b)=>a.deadline-b.deadline)


  
  console.log(sortedGoals)
  
  const percent = isFirebaseInit ? Math.floor(completedGoals/props.goals.length *100) : 0
  const fraction = isFirebaseInit ? completedGoals+"/"+props.goals.length : 0

  function authCheck(urlId, userId) {
    console.log(urlId, userId)
    if (urlId !== userId) {
      return false
    }
    return true
  }

  


  return (
    <React.Fragment>
      <NavBar />
      <Container component="main" maxWidth="xl" style={{ padding: "30px 0px 0px 0px" }}>
        <CssBaseline />
        <Grid container>
          {/*1st Row*/}
          <Grid item xs={false} sm={false} md={1} lg={2} xl={2}></Grid>

          <Grid item xs={12} sm={12} md={4} lg={3} xl={3} style={{ padding: "1em" }}>
            <Card style={{ width: "100%"}} elevation={3}>
              <ProgressOverview percent={percent} fraction={fraction}/>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={5} style={{ padding: "1em" }}>
            <Card style={{ width: "100%", height: "400px", padding: 20 }} elevation={3}>
              <CategoryChart categories={props.goalCategories}/>
            </Card>
          </Grid>

          <Grid item xs={false} sm={false} md={1} lg={2} xl={2}></Grid>

          {/*2nd Row*/}
          <Grid item xs={false} sm={false} md={1} lg={2} xl={2}></Grid>

          <Grid item xs={6} sm={6} md={5} lg={4} xl={4} style={{ padding: "1em" }}>
            <Card style={{ width: "100%", height: 300, padding: 20   }} elevation={3}>
              <UpcomingDeadlines items={sortedGoals}/>
            </Card>
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
        
        }} style={{position: "fixed"}}>
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
    loadCategories: (arr) => dispatch({ type: "GOALS/CATEGORY/LOAD", payload: arr }),
    loadAvatar: (url) => dispatch({type: "AVATAR/LOAD", payload: url })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardPage));