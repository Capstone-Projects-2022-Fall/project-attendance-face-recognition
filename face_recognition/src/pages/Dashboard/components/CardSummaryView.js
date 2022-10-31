import React, {Component, Fragment} from 'react'
import Typography from "@mui/material/Typography";

export default function CardSummaryView(props){
    return(
        <Fragment>
            <div className="card">
                <div className={"card-body"}>
                    <Typography variant="h3" component="h4" align={"center"} style={{color:"#0474BA"}}>
                        {props.amount}
                    </Typography>
                    <Typography variant="h6" component="h2" align={"center"}>
                        {props.title}
                    </Typography>
                </div>
            </div>
        </Fragment>
    )
}