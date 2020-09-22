import React from "react"
import {Grid} from '@material-ui/core'

function UpcomingDeadlines(props){
    const deadlineItems = props.items.map((item, i)=>{
        var date = new Date(item.deadline).toDateString()
        return(
            <Grid item xs={12} >
                <p>{date}</p>
            </Grid>
        )
    })
    return(
        <Grid container spacing={2} style={{flexDirection: "column"}}>
            {deadlineItems}
        </Grid>
    )
}

export default UpcomingDeadlines;