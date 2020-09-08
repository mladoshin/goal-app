import React from "react"
import { Typography, Button, IconButton, Badge, Divider, Dialog, DialogActions, Avatar, Grid } from '@material-ui/core';
import firebase from '../../firebase/firebase'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CloseIcon from '@material-ui/icons/Close'

function ProfileModalWindow(props){
    const openProfile = props.openProfile
    const setOpenProfile = props.setOpenProfile
    const name = firebase.auth.currentUser ? firebase.auth.currentUser.displayName : ""
    const email = firebase.auth.currentUser ? firebase.auth.currentUser.email : ""
    const avatarAlt = props.avatarAlt ? props.avatarAlt.toUpperCase() : ""
    
    return(
        <Dialog onClose={()=>setOpenProfile(false)} open={openProfile} fullWidth>
        <div style={{display: "flex", flexDirection: "row", padding: "5px 10px 5px 20px", alignItems: "center"}}>
          <Typography variant="h4" style={{flexGrow: 1, lineHeight: "48px"}}>Profile</Typography>
          
          <IconButton aria-label="close" onClick={()=>setOpenProfile(false)} style={{}}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider/>
        <div style={{padding: 20}}>
          <Grid container direction="column" alignItems="stretch">
            <Grid item style={{textAlign: "center", paddingBottom: 20}}>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<IconButton size="small" variant="contained" onClick={()=>alert("set new profile image")}><CameraAltIcon/></IconButton>}
              >
                <Avatar style={{width: 100, height: 100, marginLeft: "auto", marginRight: "auto"}}>{avatarAlt}</Avatar>
              </Badge>
              
            </Grid>
            <Grid item >
              {firebase.auth.currentUser ? <Typography variant="body1" style={{textAlign: "center"}}>{name}</Typography> : null}
              
            </Grid>
            <Grid item>
              {firebase.auth.currentUser ?  <Typography variant="body1" style={{textAlign: "center"}}>{email}</Typography> : null}
            </Grid>
          </Grid>
          
        </div>
        <DialogActions>
          <Button>Save Changes</Button>
        </DialogActions>
      </Dialog>
    )
}

export default ProfileModalWindow;