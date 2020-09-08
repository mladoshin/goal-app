import React, {useState, useEffect} from "react"
import { Avatar } from '@material-ui/core'

function MUIAvatar(props){
    const avatarAlt = props.avatarAlt
    return(
        <Avatar>{avatarAlt}</Avatar>
    );
}

export default MUIAvatar;