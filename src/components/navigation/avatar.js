import React, {useState, useEffect} from "react"
import { Avatar } from '@material-ui/core'

function MUIAvatar(props){
    const avatarAlt = props.avatarAlt
    return(
        <Avatar alt={avatarAlt} src={props.url}/>
    );
}

export default MUIAvatar;