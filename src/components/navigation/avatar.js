import React, {useState, useEffect} from "react"
import { Avatar } from '@material-ui/core'

function MUIAvatar(props){
    const avatarAlt = props.avatarAlt.toUpperCase()
    return(
    <Avatar alt={avatarAlt} src={props.url ? props.url : null}>{avatarAlt}</Avatar>
    );
}

export default MUIAvatar;