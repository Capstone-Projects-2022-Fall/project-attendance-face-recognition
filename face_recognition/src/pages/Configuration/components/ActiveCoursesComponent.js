import React from 'react'
import {Button, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function ActiveCoursesComponent(props){
    const courseHandler = (e)=>{
        e.preventDefault()
        props.courseSelected(props.data.id)
    }
    return(
        <Grid item sm={6} xs={12} md={4}>
            <div className={"card"}>
                <div className={"color-header"}></div>
                <div className={"card-body"}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.data.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.data.course_code}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={courseHandler} size="small">View Section</Button>
                    </CardActions>
                </div>
            </div>
        </Grid>
    )
}