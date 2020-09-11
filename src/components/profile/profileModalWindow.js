import React, {useState} from "react"
import {connect} from "react-redux"
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
    const [avatar, setAvatar] = useState(null)

    console.log(avatar)

    function handleFileChange(file){
      setAvatar(file)
      console.log(file)
    }

    function handleUpload(loadAvatar){
      firebase.uploadAvatarToStorage(avatar, loadAvatar)
    }

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
                badgeContent={<IconButton size="small" variant="contained"><CameraAltIcon/></IconButton>}
              >
                <Avatar style={{width: 100, height: 100, marginLeft: "auto", marginRight: "auto"}} src={props.avatar ? props.avatar : null}>{avatarAlt}</Avatar>
                <input type="file" name="avatarInput" style={{height: 100, width: 100, opacity: 0, position: "absolute", zIndex: 100}} onChange={(e)=>handleFileChange(e.target.files[0])}/>
              </Badge>
              
            </Grid>
            
            <Grid item style={{textAlign: "center"}}>
              {avatar ? <Button onClick={()=>handleUpload(props.loadAvatar)}>Upload</Button> : null}
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

const mapStateToProps = (state) => {
  return{
    avatar: state.userAvatar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadAvatar: (url)=>dispatch({type: "AVATAR/LOAD", payload: url})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModalWindow);