import React from "react"
import { Typography } from '@material-ui/core'
import {
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProgressOverview(props) {
    const percent = props.percent
    const fraction = props.fraction
    const variant = props.variant

    return (
        <div style={{ display: "flex", flexDirection: "column", padding: 20 }}>

            <div style={{ textAlign: "center", marginBottom: 20 }}> {/*Some Text Block*/}
                <Typography variant="h5">Progress Overview</Typography>
            </div>

            <div style={{ maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>   {/*Progress Bar Container*/}
                <CircularProgressbarWithChildren
                    value={percent}
                    text={fraction}
                    strokeWidth={10}
                    styles={buildStyles({
                        strokeLinecap: "butt"
                    })}
                >
                </CircularProgressbarWithChildren>
            </div>

            <div style={{ textAlign: "center", marginTop: 20 }}> {/*Some Text Block*/}
                <Typography>Hello, World!</Typography>
            </div>
        </div>
    )
}

export default ProgressOverview