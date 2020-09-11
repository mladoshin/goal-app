import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Menu, MenuItem, Popover, Switch, Divider, Dialog, DialogActions, Avatar, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import MUIDrawer from './drawer'
import NotificationMenu from "../notifications/notificationMenu"
import ProfileModalWindow from '../profile/profileModalWindow'
import AccountMenu from './accountMenu'
import AccountToolbar from './accountToolbar'
import firebase from '../../firebase/firebase'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  },
  grow: {
    flexGrow: 7
  }
}));

function NavBar(props) {
  const classes = useStyles();
  const notifications = ["Check out our Social Media", "Beta version 1.0 is Launched!", "Check out the dashboard"]
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [accountAnchor, setAccountAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [openProfile, setOpenProfile] = useState(false)

  const nameArr = props.user.name ? props.user.name.split(' ') : ["", ""]
  const avatarAlt = nameArr[0][0] + nameArr[1][0]

  function clearReduxState() {
    props.removeUserInfo()
    props.clearGoalsState()
    props.clearCategoriesState()
  }

  function sortFunction(a, b) {
    return b.dateCreated - a.dateCreated
  }

  const sortedGoals = props.goals ? props.goals : [];
  try {
    sortedGoals.sort(sortFunction)
  } catch (err) { }

  var recent = []
  try {
    var i=0
    sortedGoals.map((item, index) => {
      if (i < 3 && !item.isCompleted) {
        recent.push(item)
        i++
      }
    })
  } catch (err) { }



  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={() => props.history.replace("/home")}>
            Sport Goals
                  </Typography>
          <div className={classes.grow} />
          {props.user.id && props.user.auth ? <AccountToolbar avatarAlt={avatarAlt} url={props.avatar ? props.avatar : null} setAccountAnchor={setAccountAnchor} setNotificationAnchor={setNotificationAnchor} /> : <Button color="inherit" onClick={() => props.history.replace("/signin")}>Login</Button>}

        </Toolbar>
      </AppBar>

      <AccountMenu setAccountAnchor={setAccountAnchor} setOpenProfile={setOpenProfile} accountAnchor={accountAnchor} setTheme={props.setTheme} theme={props.theme} clearReduxState={clearReduxState} />
      <ProfileModalWindow setOpenProfile={setOpenProfile} openProfile={openProfile} avatarAlt={avatarAlt} />
      <NotificationMenu setNotificationAnchor={setNotificationAnchor} notificationAnchor={notificationAnchor} notifications={notifications} />
      <MUIDrawer setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} drawerVariant="temporary" auth={props.user.auth} recentItems={recent} categories={props.goalCategories} />

    </React.Fragment>

  );
}


const mapStateToProps = state => {
  return {
    user: state.user,
    theme: state.theme,
    goals: state.goals,
    goalCategories: state.goalCategories,
    avatar: state.userAvatar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeUserInfo: () => { dispatch({ type: "USER/LOADINFO", payload: { id: null, auth: false } }) },
    setTheme: (str) => dispatch({ type: "THEME/CHANGE", payload: str }),
    clearGoalsState: () => dispatch({ type: "GOALS/LOAD", payload: {} }),
    clearCategoriesState: () => dispatch({ type: "GOALS/CATEGORY/LOAD", payload: [] })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));